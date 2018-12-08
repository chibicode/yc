import { css, cx } from 'emotion'
import React from 'react'
import Emoji from 'src/components/Emoji'
import { colors } from 'src/lib/theme'
import { VariableExpression } from 'src/types/yc/ExpressionTypes'

interface EmojiBadgeProps {
  bottomRightBadgeType: Exclude<
    VariableExpression['bottomRightBadgeType'],
    'none'
  >
  inline?: boolean
}

const funcArgColor = colors('pink400')
const funcBodyUnboundColor = colors('grey500')

const bottomRightBadgeTypeToColors = (
  x: EmojiBadgeProps['bottomRightBadgeType']
): string =>
  ({
    callArg: css`
      border-color: ${colors('indigo300')};
    `,
    funcArg: css`
      border-color: ${funcArgColor};
    `,
    funcUnbound: css`
      border-color: ${funcBodyUnboundColor};
    `,
    funcBound: css`
      border-color: ${colors('yellow800')};
    `
  }[x])

const sqrt2Div2 = Math.sqrt(2) / 2
const sqrt3Div3 = Math.sqrt(3) / 3
const circleWidth = 1.5
const hexWidth = 1.4
const squareWidth = 1.35
const squareAdjustTop = -0.07
const hexAdjustTop = -0.35
const sqrt2Border = 2 * Math.sqrt(2)

const bottomRightBadgeTypeToShapeAndSize = (
  x: EmojiBadgeProps['bottomRightBadgeType']
) => {
  const funcArgCssOrfuncBoundCss = (color: string) => css`
    width: ${hexWidth}em;
    height: ${hexWidth * sqrt3Div3}em;
    position: relative;
    border-left-width: 2px;
    border-left-style: solid;
    border-right-width: 2px;
    border-right-style: solid;
    transform: translateY(${hexAdjustTop}em);
    background-color: #fff;

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: ${hexWidth * sqrt2Div2}em;
      height: ${hexWidth * sqrt2Div2}em;
      transform: scaleY(${sqrt3Div3}) rotate(-45deg);
      background-color: inherit;
    }

    &:before {
      top: ${(hexWidth * sqrt2Div2) / -2}em;
      border-top: ${sqrt2Border}px solid ${color};
      border-right: ${sqrt2Border}px solid ${color};
    }

    &:after {
      bottom: ${(hexWidth * sqrt2Div2) / -2}em;
      border-bottom: ${sqrt2Border}px solid ${color};
      border-left: ${sqrt2Border}px solid ${color};
    }
  `
  const funcBodyCss = css`
    border-radius: 100%;
    width: ${circleWidth}em;
    height: ${circleWidth}em;
    border-width: 2px;
    border-style: solid;
    background-color: #fff;
  `
  return {
    callArg: css`
      width: ${squareWidth}em;
      height: ${squareWidth}em;
      transform: translateY(${squareAdjustTop}em);
      border-width: 2px;
      border-style: solid;
      background-color: #fff;
    `,
    funcArg: funcArgCssOrfuncBoundCss(funcArgColor),
    funcUnbound: funcArgCssOrfuncBoundCss(funcBodyUnboundColor),
    funcBound: funcBodyCss
  }[x]
}

const bottomRightBadgeTypeToEmoji = (
  x: EmojiBadgeProps['bottomRightBadgeType']
) =>
  ({
    callArg: '👨‍🍳',
    funcArg: '😋',
    funcBound: '🍽',
    funcUnbound: '😎'
  }[x])

const inlineVerticalOffset = (x: EmojiBadgeProps['bottomRightBadgeType']) =>
  ({
    callArg: 0.05,
    funcArg: 0.15 + hexAdjustTop,
    funcBound: 0.2,
    funcUnbound: 0.15 + hexAdjustTop
  }[x])

const EmojiBadge: React.SFC<EmojiBadgeProps> = ({
  bottomRightBadgeType,
  inline
}) => (
  <span
    className={cx(
      css`
        align-items: center;
        justify-content: center;
      `,
      bottomRightBadgeTypeToColors(bottomRightBadgeType),
      bottomRightBadgeTypeToShapeAndSize(bottomRightBadgeType),
      {
        [css`
          display: flex;
          font-size: '0.55em';
        `]: !inline,
        [css`
          display: inline-flex;
          font-size: 1em;
          vertical-align: text-bottom;
          transform: translateY(
            ${inlineVerticalOffset(bottomRightBadgeType)}em
          );
        `]: inline
      }
    )}
  >
    <span
      className={cx(
        css`
          position: relative;
          z-index: 2;
          display: inline-flex;
        `
      )}
    >
      <Emoji noVerticalTransform>
        {bottomRightBadgeTypeToEmoji(bottomRightBadgeType)}
      </Emoji>
    </span>
  </span>
)

export default EmojiBadge
