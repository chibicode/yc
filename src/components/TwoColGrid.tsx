/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Flex from 'src/components/Flex'
import { spaces } from 'src/lib/theme'

const TwoColGrid = ({
  left,
  right,
  noTopNegativeMargin,
  noBottomNegativeMargin
}: {
  left: React.ReactNode
  right: React.ReactNode
  noTopNegativeMargin?: boolean
  noBottomNegativeMargin?: boolean
}) => (
  <Flex
    css={[
      !noTopNegativeMargin &&
        css`
          margin-top: ${spaces('-1.5')};
        `,
      !noBottomNegativeMargin &&
        css`
          margin-top: ${spaces('-0.75')};
        `
    ]}
  >
    <div
      css={css`
        padding: 0 ${spaces(0.75)};
        flex: 1;
      `}
    >
      {left}
    </div>
    <div
      css={css`
        padding: 0 ${spaces(0.75)};
        flex: 1;
      `}
    >
      {right}
    </div>
  </Flex>
)

export default TwoColGrid
