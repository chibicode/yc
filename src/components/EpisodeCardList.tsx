/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import CardWrapper from 'src/components/CardWrapper'
import EpisodePageInitialRenderWarning from 'src/components/EpisodePageInitialRenderWarning'
import EpisodeHero from 'src/components/EpisodeHero'
import { CardProps } from 'src/components/Card'
import useConditionalCards from 'src/hooks/useConditionalCards'
import H from 'src/components/H'
import { P } from 'src/components/ContentTags'
import { shareVisible } from 'src/lib/twitter'
import NextLessonButton from 'src/components/NextLessonButton'
import { spaces } from 'src/lib/theme'

export interface EpisodeCardType {
  type?: 'yesNoQuiz' | 'sideNote' | 'meta' | 'summary' | 'transparent'
  title?: React.ReactNode
  preview?: CardProps['preview']
  content: React.ReactNode
  footer?: CardProps['footer']
}

export type EpisodeCardListType = readonly EpisodeCardType[]

const EpisodeCardList = ({ cards }: { cards: EpisodeCardListType }) => {
  const { lastVisibleCardIndex, setLastVisibleCardIndex } = useConditionalCards(
    cards
  )
  return (
    <>
      <EpisodePageInitialRenderWarning />
      <EpisodeHero />
      {cards.length > 0 ? (
        <>
          {cards.map(({ title, type, content, preview, footer }, index) =>
            index <= lastVisibleCardIndex ? (
              <CardWrapper
                slideNumber={index + 1}
                slideCount={cards.length}
                key={`card${index}`}
                type={type}
                title={title}
                setLastVisibleCardIndex={setLastVisibleCardIndex}
                preview={preview}
                isLast={index === lastVisibleCardIndex}
                footer={footer}
              >
                {content}
              </CardWrapper>
            ) : null
          )}
          {shareVisible && cards.length - 1 === lastVisibleCardIndex && (
            <div
              css={css`
                margin: ${spaces(3)} 0 0;
              `}
            >
              <CardWrapper
                type="transparent"
                isLast
                setLastVisibleCardIndex={setLastVisibleCardIndex}
                title={<H args={{ name: 'shareTitle' }} />}
              >
                <H args={{ name: 'shareContent' }} />
                <NextLessonButton />
              </CardWrapper>
            </div>
          )}
        </>
      ) : (
        <CardWrapper setLastVisibleCardIndex={setLastVisibleCardIndex}>
          <P>
            <H args={{ name: 'pageUnderConstruction' }} />
          </P>
        </CardWrapper>
      )}
    </>
  )
}

export default EpisodeCardList
