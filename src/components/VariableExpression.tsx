import React from 'react'
import Emoji from 'src/components/Emoji'
import Flex from 'src/components/Flex'
import letterEmojiMapping from 'src/lib/letterEmojiMapping'
import { VariableExpression } from 'src/types/ExpressionTypes'

interface VariableExpressionProps {
  expression: VariableExpression
}

const VariableExpression: React.SFC<VariableExpressionProps> = ({
  expression
}) => (
  <Flex p={4} justifyContent="center" flex={1}>
    <Emoji>{letterEmojiMapping[expression.name]}</Emoji>
  </Flex>
)

export default VariableExpression
