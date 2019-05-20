import { isFunction, isVariable, isCall } from 'src/lib/yc/expressionTypeGuards'
import { activeFuncArg } from 'src/lib/yc/steps/stepToShowFuncUnbound'
import {
  CallExpression,
  ExecutableCallRegular,
  ExecutableStepCallRegular,
  Expression,
  FunctionExpression,
  NonExecutableStepCall,
  StepChild,
  StepFunction,
  StepVariable,
  VariableExpression,
  ShorthandFunctionExpression,
  StepShorthandFunction
} from 'src/types/yc/ExpressionTypes'

export function toShowFuncBound(
  e: VariableExpression,
  funcSide: boolean,
  highlight: boolean
): StepVariable<'showFuncBound'>
export function toShowFuncBound(
  e: FunctionExpression,
  funcSide: boolean,
  highlight: boolean
): StepFunction<'showFuncBound'>
export function toShowFuncBound(
  e: ShorthandFunctionExpression,
  funcSide: boolean,
  highlight: boolean
): StepShorthandFunction<'showFuncBound'>
export function toShowFuncBound(
  e: CallExpression,
  funcSide: boolean,
  highlight: boolean
): NonExecutableStepCall<'showFuncBound'>
export function toShowFuncBound(
  e: VariableExpression | FunctionExpression,
  funcSide: boolean,
  highlight: boolean
): StepVariable<'showFuncBound'> | StepFunction<'showFuncBound'>
export function toShowFuncBound(
  e: Expression,
  funcSide: boolean,
  highlight: boolean
): StepChild<'showFuncBound'>
export function toShowFuncBound(
  e: Expression,
  funcSide: boolean,
  highlight: boolean
): StepChild<'showFuncBound'> {
  if (isVariable(e)) {
    if (funcSide) {
      if (e.bound) {
        if (highlight) {
          return {
            ...e,
            highlightType: 'highlighted',
            topLeftBadgeType: 'none',
            bottomRightBadgeType: 'funcBound'
          }
        } else {
          return {
            ...e,
            highlightType: 'active',
            topLeftBadgeType: 'none',
            bottomRightBadgeType: 'funcBound'
          }
        }
      } else {
        return {
          ...e,
          highlightType: 'active',
          topLeftBadgeType: 'none',
          bottomRightBadgeType: 'none'
        }
      }
    } else {
      return {
        ...e,
        highlightType: 'active',
        topLeftBadgeType: 'none',
        bottomRightBadgeType: 'callArg'
      }
    }
  } else if (isFunction(e)) {
    return {
      ...e,
      arg: toShowFuncBound(e.arg, funcSide, highlight),
      body: toShowFuncBound(e.body, funcSide, highlight)
    }
  } else if (isCall(e)) {
    return {
      ...e,
      state: 'default',
      arg: toShowFuncBound(e.arg, funcSide, highlight),
      func: toShowFuncBound(e.func, funcSide, highlight)
    }
  } else {
    return {
      ...e,
      highlightType: 'default'
    }
  }
}

const stepToShowFuncBound = (
  e: ExecutableCallRegular,
  highlight: boolean
): ExecutableStepCallRegular<'showFuncBound'> => ({
  ...e,
  state: 'showFuncBound',
  arg: toShowFuncBound(e.arg, false, highlight),
  func: {
    ...e.func,
    arg: activeFuncArg(e.func.arg),
    body: toShowFuncBound(e.func.body, true, highlight)
  }
})

export default stepToShowFuncBound
