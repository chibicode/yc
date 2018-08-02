import React from 'react'
import ExpressionBox from 'src/components/ExpressionBox'
import expressionContainerToSimpleString from 'src/lib/expressionContainerToSimpleString'
import expressionToParams from 'src/lib/expressionToParams'
import stepExpressionContainer from 'src/lib/stepExpressionContainer'
import {
  PrioritizedDoneExpressionContainer,
  PrioritizedExpressionContainer
} from 'src/types/ExpressionContainerTypes'

interface ExpressionExecutorProps {
  expressionContainer:
    | PrioritizedExpressionContainer
    | PrioritizedDoneExpressionContainer
}

type ExpressionExecutorState = Pick<
  ExpressionExecutorProps,
  'expressionContainer'
>

export default class ExpressionExecutor extends React.Component<
  ExpressionExecutorProps,
  ExpressionExecutorState
> {
  constructor(props: ExpressionExecutorProps) {
    super(props)
    this.state = {
      expressionContainer: props.expressionContainer
    }
  }

  public logParams = () => {
    console.log(expressionToParams(this.state.expressionContainer.expression))
    console.log(
      JSON.stringify(
        expressionToParams(this.state.expressionContainer.expression),
        null,
        2
      )
    )
  }

  public stepExpression = () => {
    if (!this.state.expressionContainer.done) {
      const x = stepExpressionContainer(this.state.expressionContainer)
      this.setState({
        expressionContainer: x
      })
    }
  }

  public render() {
    const { expressionContainer } = this.state
    return (
      <div>
        <div style={{ maxWidth: 300 }}>
          <ExpressionBox expression={expressionContainer.expression} />
        </div>
        <div>
          <div>{expressionContainerToSimpleString(expressionContainer)}</div>
          <button onClick={this.stepExpression}>step</button>{' '}
          <button onClick={this.logParams}>log</button>
        </div>
      </div>
    )
  }
}
