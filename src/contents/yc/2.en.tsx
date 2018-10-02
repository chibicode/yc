import React from 'react'
import {
  Blockquote,
  Em,
  ExternalLink,
  H3,
  P,
  Strong,
  Ul,
  UlLi
} from 'src/components/ContentTags'
import Emoji from 'src/components/Emoji'
import EmojiSeparator from 'src/components/EmojiSeparator'
import NextLessonButton from 'src/components/NextLessonButton'
import ExpressionRunner from 'src/components/Yc/ExpressionRunner'
import ExpressionRunnerWrapper from 'src/components/Yc/ExpressionRunnerWrapper'
import { yc } from 'src/lib/pathHelpers'
import {
  episode2Expression1,
  episode2Expression2
} from 'src/lib/yc/lessonExpressions'

export default () => (
  <>
    <P>
      <Strong>Quiz Review:</Strong> Let’s take a look at the quiz from the last
      episode:
    </P>
    <Ul size="lg">
      <UlLi>
        <Emoji size="lg">🍽</Emoji> Dishes → <Emoji size="lg">🥩</Emoji>{' '}
        <Emoji size="lg">🥪</Emoji> <Emoji size="lg">🥗</Emoji>
      </UlLi>
      <UlLi>
        <Emoji size="lg">😋</Emoji> Eating → <Emoji size="lg">🥗</Emoji>
      </UlLi>
      <UlLi>
        <Emoji size="lg">👨‍🍳</Emoji> Preparing → <Emoji size="lg">🌮</Emoji>
      </UlLi>
    </Ul>
    <P>
      <Strong>The answer is</Strong>: <Emoji size="lg">🥩</Emoji>{' '}
      <Emoji size="lg">🥪</Emoji> <Emoji size="lg">🌮</Emoji>. Hope you got it
      right!
    </P>
    <P>
      Now, let’s move on to the next topic: <Strong>Bento Boxes</Strong>.
    </P>
    <EmojiSeparator emojis={['🍱', '🤔', '🍱']} />
    <P>
      Bento boxes <Emoji>🍱</Emoji> are{' '}
      <Em>traditional Japanese lunch boxes</Em> (as shown in the above emojis).
      Here’s what{' '}
      <ExternalLink href="https://simple.wikipedia.org/wiki/Bento">
        Wikipedia (Simple English)
      </ExternalLink>{' '}
      says:
    </P>
    <Blockquote>
      <P>
        <Strong>Bento [box]</Strong> is a meal common in Japanese cuisine, made
        to take away from home to be eaten somewhere else. A traditional bento
        consists of rice, fish or meat, and one or more pickled or cooked
        vegetables as a side dish. ... People often take bento for a picnic.
      </P>
    </Blockquote>
    <P>
      In this tutorial, we’re going to play with an{' '}
      <Em>
        interactive bento box <Emoji>🍱</Emoji>
      </Em>
      . Here’s what it looks like. It kind of looks like a bento box, right?
    </P>
    <ExpressionRunnerWrapper>
      <ExpressionRunner
        expressionContainer={episode2Expression1}
        showPriorities={false}
        showControls={false}
        variableSize={'lg'}
      />
    </ExpressionRunnerWrapper>
    <P>
      <Strong>But what does each cell mean?</Strong> Well let me explain.{' '}
      <Em>
        The <Strong>top</Strong> cell represents what the chef <Emoji>👨‍🍳</Emoji>{' '}
        is preparing.
      </Em>
    </P>
    <ExpressionRunnerWrapper>
      <ExpressionRunner
        expressionContainer={episode2Expression1}
        showPriorities={false}
        showControls={false}
        variableSize={'lg'}
        initialStep={2}
      />
    </ExpressionRunnerWrapper>
    <P>
      <Em>
        Next, the <Strong>bottom left</Strong> cell represents what you’re
        eating next <Emoji>😋</Emoji>.
      </Em>
    </P>
    <ExpressionRunnerWrapper>
      <ExpressionRunner
        expressionContainer={episode2Expression1}
        showPriorities={false}
        showControls={false}
        variableSize={'lg'}
        initialStep={3}
      />
    </ExpressionRunnerWrapper>
    <P>
      <Em>
        Finally, the <Strong>bottom right</Strong> cell represents the current
        set of dishes <Emoji>🍽</Emoji>.
      </Em>
    </P>
    <ExpressionRunnerWrapper>
      <ExpressionRunner
        expressionContainer={episode2Expression1}
        showPriorities={false}
        showControls={false}
        variableSize={'lg'}
        initialStep={4}
      />
    </ExpressionRunnerWrapper>
    <P>Let’s do a quiz to check if you understood this!</P>
    <EmojiSeparator emojis={['❓', '🤔', '❓']} />
    <H3>Quiz</H3>
    <P>What scenario does the this “bento box” represent?</P>
    <ExpressionRunnerWrapper>
      <ExpressionRunner
        expressionContainer={episode2Expression2}
        showPriorities={false}
        showControls={false}
        variableSize={'lg'}
      />
    </ExpressionRunnerWrapper>
    <Ul size="lg">
      <UlLi>
        <Emoji size="lg">🍽</Emoji> Dishes → <Emoji size="lg">❓</Emoji>
      </UlLi>
      <UlLi>
        <Emoji size="lg">😋</Emoji> Eating → <Emoji size="lg">❓</Emoji>
      </UlLi>
      <UlLi>
        <Emoji size="lg">👨‍🍳</Emoji> Preparing → <Emoji size="lg">❓</Emoji>
      </UlLi>
    </Ul>
    <P>Go to the next episode to find out the answer!</P>
    <NextLessonButton
      href={yc(3)}
      primaryText={<>Check My Answer</>}
      secondaryText={
        <>
          Continue to Episode 3 <Emoji>👋</Emoji>
        </>
      }
    />
  </>
)
