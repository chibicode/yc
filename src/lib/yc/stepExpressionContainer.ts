import { getConflicts } from 'src/lib/yc/variablesHelper'
import { isContainerWithState } from 'src/lib/yc/expressionContainerGuards'
import { StepOptions } from 'src/lib/yc/ExpressionContainerManager'
import findNextCallExpressionAndParent from 'src/lib/yc/findNextCallExpressionAndParent'
import hasUnboundVariables from 'src/lib/yc/hasUnboundVariables'
import prioritizeExpressionContainer from 'src/lib/yc/prioritizeExpressionContainer'
import resetExpressionContainer from 'src/lib/yc/resetExpressionContainer'
import replaceCallParentKey from 'src/lib/yc/replaceCallParentKey'
import { isExecutableCallRegular } from 'src/lib/yc/expressionTypeGuards'
import replaceFuncParentKey from 'src/lib/yc/replaceFuncParentKey'
import {
  removeCrossed,
  stepToActive,
  stepToShorthandResult,
  stepToAlphaConvertDone,
  stepToBetaReducePreviewAfter,
  stepToBetaReducePreviewBefore,
  stepToBetaReducePreviewCrossed,
  stepToNeedsAlphaConvert,
  stepToShowCallArg,
  stepToShowFuncArg,
  stepToShowFuncBound,
  stepToShowFuncUnbound
} from 'src/lib/yc/steps'
import { ContainerWithState } from 'src/types/yc/ExpressionContainerTypes'
import {
  CallExpression,
  CallStates,
  ExecutableCallRegular,
  ExecutableCallShorthand,
  ExecutableCall,
  FunctionExpression,
  StepChild
} from 'src/types/yc/ExpressionTypes'
import prioritizeExpression from 'src/lib/yc/prioritizeExpression'

const stepExpressionContainerReset = (
  e: ContainerWithState<'needsReset'>
): ContainerWithState<'done'> | ContainerWithState<'ready'> => {
  const newContainer = prioritizeExpressionContainer(
    resetExpressionContainer(e)
  )
  const nextCallExpressionAndParent = findNextCallExpressionAndParent(
    newContainer.expression
  )
  if (nextCallExpressionAndParent.expression) {
    return newContainer
  } else {
    return {
      ...newContainer,
      containerState: 'done'
    }
  }
}

const stepShorthand = (
  e: ExecutableCallShorthand
): {
  nextExpression: ExecutableCall | StepChild<'default'>
  matchExists?: boolean
  previouslyChangedExpressionState: CallStates
} => {
  switch (e.state) {
    case 'default': {
      return {
        nextExpression: stepToActive(e),
        previouslyChangedExpressionState: 'active'
      }
    }
    case 'active': {
      return {
        nextExpression: stepToShorthandResult(e),
        previouslyChangedExpressionState: 'default'
      }
    }
    default: {
      throw new Error()
    }
  }
}

const stepRegular = (
  e: ExecutableCallRegular,
  { showAllShowSteps, skipAlphaConvert }: StepOptions,
  matchExists?: boolean
): {
  nextExpression: ExecutableCall | StepChild<'default'>
  matchExists?: boolean
  previouslyChangedExpressionState: CallStates
} => {
  const toNeedsAlphaConvertOrBetaReducePreviewBefore = (): {
    nextExpression: ExecutableCall | StepChild<'default'>
    matchExists?: boolean
    previouslyChangedExpressionState: CallStates
  } => {
    const conflicts = skipAlphaConvert ? {} : getConflicts(e)
    if (Object.keys(conflicts).length > 0) {
      return {
        nextExpression: stepToNeedsAlphaConvert(e, conflicts),
        previouslyChangedExpressionState: 'needsAlphaConvert'
      }
    } else {
      return {
        ...stepToBetaReducePreviewBefore(e),
        previouslyChangedExpressionState: 'betaReducePreviewBefore'
      }
    }
  }

  switch (e.state) {
    case 'default': {
      return {
        nextExpression: stepToActive(e),
        previouslyChangedExpressionState: 'active'
      }
    }
    case 'active': {
      if (showAllShowSteps) {
        return {
          nextExpression: stepToShowCallArg(e),
          previouslyChangedExpressionState: 'showCallArg'
        }
      } else {
        if (hasUnboundVariables(e.func.body)) {
          return {
            nextExpression: stepToShowFuncUnbound(e, false),
            previouslyChangedExpressionState: 'showFuncUnbound'
          }
        } else {
          return {
            nextExpression: stepToShowFuncBound(e, false),
            previouslyChangedExpressionState: 'showFuncBound'
          }
        }
      }
    }
    case 'showCallArg': {
      return {
        nextExpression: stepToShowFuncArg(e),
        previouslyChangedExpressionState: 'showFuncArg'
      }
    }
    case 'showFuncArg': {
      return {
        nextExpression: stepToShowFuncBound(e, true),
        previouslyChangedExpressionState: 'showFuncBound'
      }
    }
    case 'showFuncBound': {
      if (hasUnboundVariables(e.func.body)) {
        return {
          nextExpression: stepToShowFuncUnbound(e, true),
          previouslyChangedExpressionState: 'showFuncUnbound'
        }
      } else {
        return toNeedsAlphaConvertOrBetaReducePreviewBefore()
      }
    }
    case 'showFuncUnbound': {
      return toNeedsAlphaConvertOrBetaReducePreviewBefore()
    }
    case 'needsAlphaConvert': {
      return {
        nextExpression: stepToAlphaConvertDone(e),
        previouslyChangedExpressionState: 'alphaConvertDone'
      }
    }
    case 'alphaConvertDone': {
      return {
        ...stepToBetaReducePreviewBefore(e),
        previouslyChangedExpressionState: 'betaReducePreviewBefore'
      }
    }
    case 'betaReducePreviewBefore': {
      if (matchExists) {
        return {
          nextExpression: stepToBetaReducePreviewAfter(e),
          previouslyChangedExpressionState: 'betaReducePreviewAfter'
        }
      } else {
        return {
          nextExpression: stepToBetaReducePreviewCrossed(e),
          previouslyChangedExpressionState: 'betaReducePreviewCrossed'
        }
      }
    }
    case 'betaReducePreviewAfter': {
      return {
        nextExpression: stepToBetaReducePreviewCrossed(e),
        previouslyChangedExpressionState: 'betaReducePreviewCrossed'
      }
    }
    case 'betaReducePreviewCrossed': {
      return {
        nextExpression: removeCrossed(e),
        previouslyChangedExpressionState: 'default'
      }
    }
    default: {
      throw new Error()
    }
  }
}

const runStep = (
  e: ContainerWithState<'ready'> | ContainerWithState<'stepped'>,
  stepOptions: StepOptions
):
  | ContainerWithState<'needsReset'>
  | ContainerWithState<'stepped'>
  | ContainerWithState<'ready'> => {
  const {
    expression,
    callParent,
    funcParent,
    callParentKey
  } = findNextCallExpressionAndParent<
    ExecutableCallRegular,
    CallExpression,
    FunctionExpression
  >(e.expression)
  if (!expression) {
    // Special case - already done to begin with
    return {
      ...e,
      containerState: 'needsReset'
    }
  }

  const {
    nextExpression,
    matchExists,
    previouslyChangedExpressionState
  } = isExecutableCallRegular(expression)
    ? stepRegular(expression, stepOptions, e.matchExists)
    : stepShorthand(expression)

  if (!callParent && !callParentKey && !funcParent) {
    const newContainer = {
      expression:
        previouslyChangedExpressionState === 'betaReducePreviewAfter'
          ? prioritizeExpression(nextExpression)
          : nextExpression,
      previouslyChangedExpressionState,
      matchExists
    }
    return previouslyChangedExpressionState === 'default'
      ? { ...newContainer, containerState: 'needsReset' }
      : { ...newContainer, containerState: 'stepped' }
  }

  let newExpression: typeof e.expression

  if (callParent && callParentKey) {
    newExpression = replaceCallParentKey(
      e.expression,
      callParent,
      callParentKey,
      nextExpression
    )
  } else if (funcParent) {
    newExpression = replaceFuncParentKey(
      e.expression,
      funcParent,
      nextExpression
    )
  } else {
    throw new Error()
  }

  if (previouslyChangedExpressionState === 'default') {
    return {
      ...e,
      expression: newExpression,
      containerState: 'needsReset',
      matchExists,
      previouslyChangedExpressionState
    }
  } else {
    return {
      ...e,
      expression:
        previouslyChangedExpressionState === 'betaReducePreviewAfter'
          ? prioritizeExpression(newExpression)
          : newExpression,
      containerState: 'stepped',
      matchExists,
      previouslyChangedExpressionState
    }
  }
}

export default function stepExpressionContainer(
  e: ContainerWithState<'ready'> | ContainerWithState<'stepped'>,
  stepOptions: StepOptions
):
  | ContainerWithState<'done'>
  | ContainerWithState<'stepped'>
  | ContainerWithState<'ready'> {
  const result = runStep(e, stepOptions)

  if (isContainerWithState(result, 'needsReset')) {
    return stepExpressionContainerReset(result)
  } else {
    return result
  }
}
