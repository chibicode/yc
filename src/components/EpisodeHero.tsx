/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useContext } from 'react'
import { InternalLink } from 'src/components/ContentTags'
import EmojiSeparator from 'src/components/EmojiSeparator'
import EpisodeContext from 'src/components/EpisodeContext'
import episodeEmojis from 'src/lib/episodeEmojis'
import {
  colors,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  spaces
} from 'src/lib/theme'
import H from 'src/components/H'
export const jsxBabelFix = jsx

const commonTitleClasses = css`
  line-height: ${lineHeights(1.1)};
  letter-spacing: ${letterSpacings('title')};
  text-align: center;
`

const EpisodeHero = () => {
  const { episodeTitle, episodeNumber } = useContext(EpisodeContext)
  return (
    <>
      <>
        {episodeTitle ? (
          <>
            <h3
              css={[
                commonTitleClasses,
                css`
                  color: ${colors('grey600')};
                  padding: ${spaces(1)} 0 ${spaces(0.5)};
                  font-size: ${fontSizes(1.25)};
                  margin: 0 auto;
                `
              ]}
            >
              <InternalLink
                href={'/'}
                css={css`
                  text-decoration: none;
                `}
              >
                <H args={{ name: 'titleSplit' }} />
              </InternalLink>
            </h3>
            <h1
              css={[
                commonTitleClasses,
                css`
                  color: ${colors('grey900')};
                  font-size: ${fontSizes(2)};
                  font-weight: ${fontWeights(800)};
                  margin: 0 auto ${spaces(0.5)};
                `
              ]}
            >
              {episodeTitle}
            </h1>
          </>
        ) : (
          <h1
            css={[
              commonTitleClasses,
              css`
                color: ${colors('grey900')};
                padding-top: ${spaces(0.5)};
                font-size: ${fontSizes(2)};
                margin: 0 auto ${spaces(0.5)};
                font-weight: ${fontWeights(800)};
              `
            ]}
          >
            <H args={{ name: 'titleSplit' }} />
          </h1>
        )}
      </>
      <EmojiSeparator size="lg" emojis={episodeEmojis[episodeNumber]} />
    </>
  )
}

export default EpisodeHero
