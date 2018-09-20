import buildExpressionContainer from 'src/lib/buildExpressionContainer'
import prioritizeExpressionContainer from 'src/lib/prioritizeExpressionContainer'
import { PrioritizedExpressionContainer } from 'src/types/ExpressionContainerTypes'
import {
  CallExpressionParams,
  ExpressionParams,
  FunctionExpressionParams,
  VariableExpressionParams
} from 'src/types/ExpressionParamTypes'
import {
  PrioritizedCallExpression,
  PrioritizedFunctionExpression,
  PrioritizedVariableExpression
} from 'src/types/PrioritizedExpressionTypes'

export default function initializeExpressionContainer(
  expressionParams: VariableExpressionParams
): PrioritizedExpressionContainer<PrioritizedVariableExpression>
export default function initializeExpressionContainer(
  expressionParams: CallExpressionParams
): PrioritizedExpressionContainer<PrioritizedCallExpression>
export default function initializeExpressionContainer(
  expressionParams: FunctionExpressionParams
): PrioritizedExpressionContainer<PrioritizedFunctionExpression>
export default function initializeExpressionContainer(
  expressionParams: ExpressionParams
) {
  return prioritizeExpressionContainer(
    buildExpressionContainer(expressionParams)
  )
}
