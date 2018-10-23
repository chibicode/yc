import difference from 'lodash/difference'
import union from 'lodash/union'
import uniq from 'lodash/uniq'
import zipObject from 'lodash/zipObject'
import conflictingVariableNames from 'src/lib/yc/conflictingVariableNames'
import { isCall, isFunction, isVariable } from 'src/lib/yc/expressionTypeGuards'
import getAllVariableNames from 'src/lib/yc/getAllVariableNames'
import variableNamesArray from 'src/lib/yc/variableNamesArray'
import {
  Expression,
  ImmediatelyExecutableCallExpression
} from 'src/types/yc/ExpressionTypes'
import { VariableNames } from 'src/types/yc/VariableNames'

type ReplaceMapping = Partial<Record<VariableNames, VariableNames>>

function helper<E extends Expression>({
  expression,
  mapping
}: {
  expression: E
  mapping: ReplaceMapping
}): E {
  if (isVariable(expression)) {
    if (mapping[expression.name]) {
      // See: https://github.com/Microsoft/TypeScript/pull/13288#issuecomment-367396818
      return Object.assign({}, expression, {
        name: mapping[expression.name],
        justAlphaConverted: true
      })
    } else {
      return expression
    }
  } else if (isCall(expression)) {
    return Object.assign({}, expression, {
      arg: helper({ expression: expression.arg, mapping }),
      func: helper({ expression: expression.func, mapping })
    })
  } else if (isFunction(expression)) {
    return Object.assign({}, expression, {
      arg: helper({ expression: expression.arg, mapping }),
      body: helper({ expression: expression.body, mapping })
    })
  }
  // See: https://github.com/Microsoft/TypeScript/issues/20235
  throw new Error()
}

export default function alphaConvert(
  expression: ImmediatelyExecutableCallExpression
): ImmediatelyExecutableCallExpression {
  const sortedConflicts = conflictingVariableNames(expression).sort()
  if (sortedConflicts.length === 0) {
    return expression
  }
  const argVariableNames = getAllVariableNames(expression.arg)
  const funcVariableNames = getAllVariableNames(expression.func)
  const allUsedVariableNames = uniq(union(argVariableNames, funcVariableNames))
  const usableVariableNames = difference(
    variableNamesArray,
    allUsedVariableNames
  )
  const usableVariableNamesSliced = usableVariableNames.slice(
    0,
    sortedConflicts.length
  )
  const mapping = zipObject(sortedConflicts, usableVariableNamesSliced)
  return {
    ...expression,
    func: helper({ expression: expression.func, mapping })
  }
}
