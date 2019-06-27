import { ExpressionRunnerShorthandConfig } from '../expressionRunnerShorthandConfig'
import * as initialExpressionContainers from '../initialExpressionContainers'

const config: ExpressionRunnerShorthandConfig = {
  runner: 'simple',
  initialExpressionContainer: initialExpressionContainers.jsdg,
  showPriorities: true,
  containerSize: 'xs',
  variableSize: 'sm'
}

export default config
