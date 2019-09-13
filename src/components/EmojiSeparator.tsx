/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import React from 'react'
import Emoji from 'src/components/Emoji'
import { colors, fontSizes, ns, spaces, maxWidths } from 'src/lib/theme'
import { VariableNames } from 'src/types/VariableNames'
import letterEmojiMapping from 'src/lib/letterEmojiMapping'
import locale from 'src/lib/locale'

interface EmojiSeparatorProps {
  emojis: string[]
  letters?: VariableNames[]
  nodes?: React.ReactNode[]
  size: 'sm' | 'md' | 'lg' | 'mdsm'
  alignCenter: boolean
  Component: React.ComponentType | string
  cssOverrides?: SerializedStyles
  description?: React.ReactNode
  noBottomMargin: boolean
  noTopMargin: boolean
  t?: boolean
}

const fontSize = (size: EmojiSeparatorProps['size']) =>
  ({
    sm: [fontSizes(1.4), fontSizes(1.6)],
    mdsm: [fontSizes(1.6), fontSizes(2)],
    md: [fontSizes(2), fontSizes(2.5)],
    lg: [fontSizes(3), fontSizes(4)]
  }[size])

const margins = (size: EmojiSeparatorProps['size']) =>
  ({
    sm: [spaces(1.75), spaces(2)],
    mdsm: [spaces(1.5), spaces(1.75)],
    md: [spaces(1.25), spaces(1.5)],
    lg: [spaces(0.75), spaces(1)]
  }[size])

const SideSpace = ({ children }: { children: React.ReactNode }) => (
  <span
    css={css`
      margin-left: 0.1em;
      margin-right: 0.1em;
    `}
  >
    {children}
  </span>
)

const EmojiSeparator = ({
  letters,
  emojis,
  nodes,
  size,
  Component,
  alignCenter,
  cssOverrides,
  description,
  noBottomMargin,
  noTopMargin,
  t
}: EmojiSeparatorProps) => (
  <Component
    css={[
      css`
        text-align: ${alignCenter ? 'center' : 'left'};
        margin: ${noTopMargin ? 0 : margins(size)[0]} 0
          ${noBottomMargin ? 0 : margins(size)[1]};
        font-size: ${fontSize(size)[0]};
        ${ns} {
          font-size: ${fontSize(size)[1]};
        }
      `,
      cssOverrides
    ]}
  >
    <>
      <span
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {letters
          ? letters.map((letter, index) => (
              <SideSpace key={`${letter}${index}`}>
                <Emoji size="sm">{letterEmojiMapping[letter]}</Emoji>
              </SideSpace>
            ))
          : nodes
          ? nodes.map((node, index) => (
              <SideSpace key={`node-${index}`}>
                <span
                  css={css`
                    font-size: ${1 / 1.2}em;
                  `}
                >
                  {node}
                </span>
              </SideSpace>
            ))
          : emojis.map((emoji, index) => (
              <SideSpace key={`${emoji}${index}`}>
                <Emoji size="sm">{emoji}</Emoji>
              </SideSpace>
            ))}
      </span>
      {description && (
        <div
          css={[
            css`
              font-size: ${fontSizes(0.85)};
              color: ${colors('grey700')};
              padding-bottom: ${spaces(0.5)};
              max-width: ${maxWidths('xs')};
              margin: 0 auto;
            `,
            !t &&
              locale === 'en' &&
              css`
                opacity: 0.1;
              `
          ]}
        >
          {description}
        </div>
      )}
    </>
  </Component>
)

EmojiSeparator.defaultProps = {
  size: 'md',
  spacing: 'md',
  Component: 'div',
  alignCenter: true,
  emojis: [],
  noBottomMargin: false,
  noTopMargin: false
}

export default EmojiSeparator
