import { isFunction, isVariable, isCall } from 'src/lib/yc/expressionTypeGuards'
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
  VariableWithState,
  ShorthandFunctionExpression,
  StepShorthandFunction
} from 'src/types/yc/ExpressionTypes'

export function toShowFuncUnbound(
  e: VariableExpression,
  funcSide: boolean,
  highlight: boolean
): StepVariable<'showFuncUnbound'>
export function toShowFuncUnbound(
  e: FunctionExpression,
  funcSide: boolean,
  highlight: boolean
): StepFunction<'showFuncUnbound'>
export function toShowFuncUnbound(
  e: ShorthandFunctionExpression,
  funcSide: boolean,
  highlight: boolean
): StepShorthandFunction<'showFuncBound'>
export function toShowFuncUnbound(
  e: CallExpression,
  funcSide: boolean,
  highlight: boolean
): NonExecutableStepCall<'showFuncUnbound'>
export function toShowFuncUnbound(
  e: VariableExpression | FunctionExpression,
  funcSide: boolean,
  highlight: boolean
): StepVariable<'showFuncUnbound'> | StepFunction<'showFuncUnbound'>
export function toShowFuncUnbound(
  e: Expression,
  funcSide: boolean,
  highlight: boolean
): StepChild<'showFuncUnbound'>
export function toShowFuncUnbound(
  e: Expression,
  funcSide: boolean,
  highlight: boolean
): StepChild<'showFuncUnbound'> {
  if (isVariable(e)) {
    if (funcSide && e.bound) {
      return {
        ...e,
        highlightType: 'active',
        topLeftBadgeType: 'none',
        bottomRightBadgeType: 'funcBound'
      }
    } else if (funcSide && !e.bound) {
      if (highlight) {
        return {
          ...e,
          highlightType: 'highlighted',
          topLeftBadgeType: 'none',
          bottomRightBadgeType: 'funcUnbound'
        }
      } else {
        return {
          ...e,
          highlightType: 'active',
          topLeftBadgeType: 'none',
          bottomRightBadgeType: 'funcUnbound'
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
      arg: toShowFuncUnbound(e.arg, funcSide, highlight),
      body: toShowFuncUnbound(e.body, funcSide, highlight)
    }
  } else if (isCall(e)) {
    return {
      ...e,
      state: 'default',
      arg: toShowFuncUnbound(e.arg, funcSide, highlight),
      func: toShowFuncUnbound(e.func, funcSide, highlight)
    }
  } else {
    return {
      ...e,
      highlightType: 'default'
    }
  }
}

export const activeFuncArg = (
  e: VariableExpression
): VariableWithState<'activeFuncArg'> => ({
  ...e,
  highlightType: 'active',
  topLeftBadgeType: 'none',
  bottomRightBadgeType: 'funcArg'
})

const stepToShowFuncUnbound = (
  e: ExecutableCallRegular,
  highlight: boolean
): ExecutableStepCallRegular<'showFuncUnbound'> => ({
  ...e,
  state: 'showFuncUnbound',
  arg: toShowFuncUnbound(e.arg, false, highlight),
  func: {
    ...e.func,
    arg: activeFuncArg(e.func.arg),
    body: toShowFuncUnbound(e.func.body, true, highlight)
  }
})

export default stepToShowFuncUnbound
