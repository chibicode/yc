import betaReduce from 'src/lib/betaReduce'
import buildExpressionContainer from 'src/lib/buildExpressionContainer'
import expressionToSimpleString from 'src/lib/expressionToSimpleString'
import findNextCallExpressionAndParent from 'src/lib/findNextCallExpressionAndParent'
import prioritizeExpressionContainer from 'src/lib/prioritizeExpressionContainer'

describe('betaReduce', () => {
  it('beta reduces simple expression', () => {
    const result = findNextCallExpressionAndParent(
      prioritizeExpressionContainer(
        buildExpressionContainer([
          {
            arg: 'x',
            body: 'x'
          },
          'y'
        ])
      ).expression
    )
    if ('notFound' in result && result.notFound) {
      throw new Error()
    }
    expect(expressionToSimpleString(betaReduce(result.expression))).toBe('y')
  })

  it('beta reduces complex expression', () => {
    const result = findNextCallExpressionAndParent(
      prioritizeExpressionContainer(
        buildExpressionContainer([
          {
            arg: 'x',
            body: {
              arg: 'y',
              body: {
                arg: 'z',
                body: ['x', ['y', 'z']]
              }
            }
          },
          {
            arg: 'a',
            body: 'a'
          },
          {
            arg: 'b',
            body: 'b'
          },
          'c'
        ])
      ).expression
    )
    if ('notFound' in result && result.notFound) {
      throw new Error()
    }
    expect(expressionToSimpleString(betaReduce(result.expression))).toEqual(
      '(y => (z => (a => a)(y(z))))'
    )
  })
})
