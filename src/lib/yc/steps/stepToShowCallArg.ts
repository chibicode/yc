import { isFunction, isVariable } from 'src/lib/yc/expressionTypeGuards'
import {
  CallExpression,
  ExecutableCall,
  ExecutableStepCall,
  Expression,
  FunctionExpression,
  NonExecutableStepCall,
  StepChild,
  StepFunction,
  StepVariable,
  VariableExpression
} from 'src/types/yc/ExpressionTypes'

export function toShowCallArg(
  e: VariableExpression,
  funcSide: boolean
): StepVariable<'showCallArg'>
export function toShowCallArg(
  e: FunctionExpression,
  funcSide: boolean
): StepFunction<'showCallArg'>
export function toShowCallArg(
  e: CallExpression,
  funcSide: boolean
): NonExecutableStepCall<'showCallArg'>
export function toShowCallArg(
  e: VariableExpression | FunctionExpression,
  funcSide: boolean
): StepVariable<'showCallArg'> | StepFunction<'showCallArg'>
export function toShowCallArg(
  e: Expression,
  funcSide: boolean
): StepChild<'showCallArg'>
export function toShowCallArg(
  e: Expression,
  funcSide: boolean
): StepChild<'showCallArg'> {
  if (isVariable(e)) {
    if (funcSide) {
      return {
        ...e,
        highlightType: 'active',
        topLeftBadgeType: 'none',
        bottomRightBadgeType: 'none'
      }
    } else {
      return {
        ...e,
        highlightType: 'highlighted',
        topLeftBadgeType: 'none',
        bottomRightBadgeType: 'callArg'
      }
    }
  } else if (isFunction(e)) {
    return {
      ...e,
      arg: toShowCallArg(e.arg, funcSide),
      body: toShowCallArg(e.body, funcSide)
    }
  } else {
    return {
      ...e,
      state: 'default',
      arg: toShowCallArg(e.arg, funcSide),
      func: toShowCallArg(e.func, funcSide)
    }
  }
}

const stepToShowCallArg = (
  e: ExecutableCall
): ExecutableStepCall<'showCallArg'> => ({
  ...e,
  state: 'showCallArg',
  arg: toShowCallArg(e.arg, false),
  func: {
    ...e.func,
    arg: toShowCallArg(e.func.arg, true),
    body: toShowCallArg(e.func.body, true)
  }
})

export default stepToShowCallArg
