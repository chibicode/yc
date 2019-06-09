/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ExpressionRunner, {
  ExpressionRunnerProps,
  InitializeInstruction
} from 'src/components/ExpressionRunner'
import {
  ExpressionContainer,
  SteppedExpressionContainer
} from 'src/types/ExpressionContainerTypes'
import { P } from 'src/components/ContentTags'
import H from 'src/components/H'
import Emoji from 'src/components/Emoji'
import { spaces } from 'src/lib/theme'
import ExpressionRunnerSeparator from 'src/components/ExpressionRunnerSeparator'

const initializeInstructions = ({
  nextIteration,
  nextIterations,
  isDone,
  initialState
}: {
  nextIteration?: boolean
  nextIterations?: number
  isDone?: boolean
  initialState: ExpressionContainer['previouslyChangedExpressionState']
}): readonly InitializeInstruction[] =>
  nextIteration
    ? [
        {
          type: 'nextIteration'
        },
        {
          type: 'stepForwardUntilPreviouslyChangedExpressionState',
          state: initialState
        }
      ]
    : nextIterations
    ? [
        ...Array(nextIterations).fill({ type: 'nextIteration' }),
        {
          type: 'stepForwardUntilPreviouslyChangedExpressionState',
          state: initialState
        }
      ]
    : [
        isDone
          ? {
              type: 'stepForwardUntilTheEnd'
            }
          : {
              type: 'stepForwardUntilPreviouslyChangedExpressionState',
              state: initialState
            }
      ]

interface ExpressionRunnerSimpleProps {
  expressionContainer: SteppedExpressionContainer
  initialState: ExpressionContainer['previouslyChangedExpressionState']
  isDone: boolean
  skipAlphaConvert: boolean
  nextIteration?: boolean
  nextIterations?: number
  showPriorities: boolean
  showAllShowSteps?: ExpressionRunnerProps['showAllShowSteps']
  explanationsVisibility: ExpressionRunnerProps['explanationsVisibility']
  caption?: ExpressionRunnerProps['caption']
  bottomRightBadgeOverrides?: ExpressionRunnerProps['bottomRightBadgeOverrides']
  variableSize: ExpressionRunnerProps['variableSize']
  containerSize?: ExpressionRunnerProps['containerSize']
  highlightOverrides?: ExpressionRunnerProps['highlightOverrides']
  highlightOverrideActiveAfterStart?: ExpressionRunnerProps['highlightOverrideActiveAfterStart']
  highlightOverridesCallArgAndFuncUnboundOnly?: ExpressionRunnerProps['highlightOverridesCallArgAndFuncUnboundOnly']
  showOnlyFocused?: ExpressionRunnerProps['showOnlyFocused']
  argPriorityAggHighlights?: readonly number[]
  funcPriorityAggHighlights?: readonly number[]
}

export const ExpressionRunnerSimple = ({
  expressionContainer,
  initialState,
  isDone,
  explanationsVisibility,
  showPriorities,
  showAllShowSteps,
  caption,
  bottomRightBadgeOverrides,
  highlightOverrides,
  highlightOverrideActiveAfterStart,
  variableSize,
  containerSize,
  skipAlphaConvert,
  nextIteration,
  nextIterations,
  showOnlyFocused,
  highlightOverridesCallArgAndFuncUnboundOnly,
  argPriorityAggHighlights,
  funcPriorityAggHighlights
}: ExpressionRunnerSimpleProps) => (
  <ExpressionRunner
    expressionContainer={expressionContainer}
    hideControls
    hidePriorities={!showPriorities}
    explanationsVisibility={explanationsVisibility}
    showAllShowSteps={showAllShowSteps}
    variableSize={variableSize}
    highlightOverridesCallArgAndFuncUnboundOnly={
      highlightOverridesCallArgAndFuncUnboundOnly
    }
    showOnlyFocused={showOnlyFocused}
    containerSize={containerSize}
    caption={caption}
    skipAlphaConvert={skipAlphaConvert}
    bottomRightBadgeOverrides={bottomRightBadgeOverrides}
    highlightOverrides={highlightOverrides}
    highlightOverrideActiveAfterStart={highlightOverrideActiveAfterStart}
    initializeInstructions={initializeInstructions({
      nextIteration,
      nextIterations,
      isDone,
      initialState
    })}
    argPriorityAggHighlights={argPriorityAggHighlights}
    funcPriorityAggHighlights={funcPriorityAggHighlights}
  />
)

ExpressionRunnerSimple.defaultProps = {
  isDone: false,
  initialState: 'default',
  showPriorities: false,
  explanationsVisibility: 'hidden',
  variableSize: 'lg',
  skipAlphaConvert: false
}

export const ExpressionRunnerPlayButtonOnly = ({
  expressionContainer,
  initialState,
  lastAllowedExpressionState,
  lastAllowedExpressionStateAfterIterations,
  skipToTheEnd,
  hideFuncUnboundBadgeOnExplanation,
  showPriorities,
  nextIteration,
  nextIterations,
  showAllShowSteps,
  speed,
  skipAlphaConvert,
  variableSize,
  containerSize,
  highlightOverrides,
  explanationsVisibility
}: {
  expressionContainer: SteppedExpressionContainer
  initialState: ExpressionContainer['previouslyChangedExpressionState']
  skipToTheEnd: boolean
  hideFuncUnboundBadgeOnExplanation: boolean
  showPriorities: boolean
  lastAllowedExpressionState?: ExpressionContainer['previouslyChangedExpressionState']
  lastAllowedExpressionStateAfterIterations?: number
  nextIteration?: boolean
  nextIterations?: number
  showAllShowSteps?: ExpressionRunnerProps['showAllShowSteps']
  speed: number
  skipAlphaConvert: boolean
  variableSize: ExpressionRunnerProps['variableSize']
  containerSize?: ExpressionRunnerProps['containerSize']
  highlightOverrides?: ExpressionRunnerProps['highlightOverrides']
  explanationsVisibility: ExpressionRunnerProps['explanationsVisibility']
}) => (
  <ExpressionRunner
    speed={speed}
    expressionContainer={expressionContainer}
    hidePriorities={!showPriorities}
    highlightOverrides={highlightOverrides}
    resetIndex
    showAllShowSteps={showAllShowSteps}
    hideFuncUnboundBadgeOnExplanation={hideFuncUnboundBadgeOnExplanation}
    skipToTheEnd={skipToTheEnd}
    variableSize={variableSize}
    containerSize={containerSize}
    skipAlphaConvert={skipAlphaConvert}
    explanationsVisibility={explanationsVisibility || 'hiddenInitialPausedOnly'}
    lastAllowedExpressionState={lastAllowedExpressionState}
    lastAllowedExpressionStateAfterIterations={
      lastAllowedExpressionStateAfterIterations
    }
    initializeInstructions={initializeInstructions({
      nextIteration,
      nextIterations,
      initialState
    })}
  />
)

ExpressionRunnerPlayButtonOnly.defaultProps = {
  initialState: 'default',
  skipToTheEnd: true,
  hideFuncUnboundBadgeOnExplanation: true,
  showPriorities: false,
  speed: 1,
  skipAlphaConvert: false,
  variableSize: 'lg',
  explanationsVisibility: 'hiddenInitialPausedOnly'
}

export const ExpressionRunnerPairSimple = ({
  expressionContainer,
  initialState,
  isDone,
  explanationsVisibility,
  showPriorities,
  showAllShowSteps,
  caption,
  bottomRightBadgeOverrides,
  highlightOverrides,
  highlightOverrideActiveAfterStart,
  variableSize,
  containerSize,
  skipAlphaConvert,
  nextIteration,
  nextIterations,
  showOnlyFocused,
  highlightOverridesCallArgAndFuncUnboundOnly,
  finalState,
  finalCaption,
  finalNextIteration,
  finalNextIterations,
  finalFastForward,
  finalArgPriorityAggHighlights,
  finalFuncPriorityAggHighlights,
  intermediateState,
  intermediateCaption,
  intermediateNextIteration,
  intermediateNextIterations,
  intermediateArgPriorityAggHighlights,
  intermediateFuncPriorityAggHighlights
}: ExpressionRunnerSimpleProps & {
  finalState?: ExpressionRunnerSimpleProps['initialState']
  finalCaption?: ExpressionRunnerSimpleProps['caption']
  finalNextIteration?: ExpressionRunnerSimpleProps['nextIteration']
  finalNextIterations?: ExpressionRunnerSimpleProps['nextIterations']
  finalFastForward?: boolean
  finalArgPriorityAggHighlights?: ExpressionRunnerSimpleProps['argPriorityAggHighlights']
  finalFuncPriorityAggHighlights?: ExpressionRunnerSimpleProps['funcPriorityAggHighlights']
  intermediateState?: ExpressionRunnerSimpleProps['initialState']
  intermediateCaption?: ExpressionRunnerSimpleProps['caption']
  intermediateNextIteration?: ExpressionRunnerSimpleProps['nextIteration']
  intermediateNextIterations?: ExpressionRunnerSimpleProps['nextIterations']
  intermediateArgPriorityAggHighlights?: ExpressionRunnerSimpleProps['argPriorityAggHighlights']
  intermediateFuncPriorityAggHighlights?: ExpressionRunnerSimpleProps['funcPriorityAggHighlights']
}) => (
  <>
    <ExpressionRunnerSimple
      {...{
        expressionContainer,
        initialState,
        explanationsVisibility,
        showPriorities,
        showAllShowSteps,
        caption,
        bottomRightBadgeOverrides,
        highlightOverrides,
        highlightOverrideActiveAfterStart,
        variableSize,
        containerSize,
        skipAlphaConvert,
        nextIteration,
        nextIterations,
        showOnlyFocused,
        highlightOverridesCallArgAndFuncUnboundOnly
      }}
    />
    {intermediateState && (
      <>
        <ExpressionRunnerSeparator fastForward />
        <ExpressionRunnerSimple
          {...{
            expressionContainer,
            explanationsVisibility,
            showPriorities,
            showAllShowSteps,
            bottomRightBadgeOverrides,
            highlightOverrides,
            highlightOverrideActiveAfterStart,
            variableSize,
            containerSize,
            skipAlphaConvert,
            showOnlyFocused,
            highlightOverridesCallArgAndFuncUnboundOnly
          }}
          initialState={intermediateState}
          caption={intermediateCaption}
          nextIteration={intermediateNextIteration}
          nextIterations={intermediateNextIterations}
          argPriorityAggHighlights={intermediateArgPriorityAggHighlights}
          funcPriorityAggHighlights={intermediateFuncPriorityAggHighlights}
        />
      </>
    )}
    <ExpressionRunnerSeparator
      fastForward={!!(finalFastForward || intermediateState)}
    />
    <ExpressionRunnerSimple
      {...{
        expressionContainer,
        isDone,
        explanationsVisibility,
        showPriorities,
        showAllShowSteps,
        bottomRightBadgeOverrides,
        highlightOverrides,
        highlightOverrideActiveAfterStart,
        variableSize,
        containerSize,
        skipAlphaConvert,
        showOnlyFocused,
        highlightOverridesCallArgAndFuncUnboundOnly
      }}
      initialState={finalState}
      caption={finalCaption}
      nextIteration={finalNextIteration}
      nextIterations={finalNextIterations}
      argPriorityAggHighlights={finalArgPriorityAggHighlights}
      funcPriorityAggHighlights={finalFuncPriorityAggHighlights}
    />
  </>
)

ExpressionRunnerPairSimple.defaultProps = {
  ...ExpressionRunnerSimple.defaultProps
}

export const ExpressionRunnerPairSimpleDeprecated = ({
  expressionContainer,
  initialState,
  finalIsDone,
  finalState,
  showPriorities,
  hidePrioritiesOnSecond,
  firstInitializeInstructions,
  secondInitializeInstructions,
  highlightOverrides,
  highlightOverrideActiveAfterStart,
  skipAlphaConvert,
  variableSize
}: {
  expressionContainer: SteppedExpressionContainer
  initialState: ExpressionContainer['previouslyChangedExpressionState']
  finalIsDone: boolean
  finalState?: ExpressionContainer['previouslyChangedExpressionState']
  showPriorities: boolean
  hidePrioritiesOnSecond: boolean
  skipAlphaConvert: boolean
  firstInitializeInstructions?: ExpressionRunnerProps['initializeInstructions']
  secondInitializeInstructions?: ExpressionRunnerProps['initializeInstructions']
  highlightOverrides?: ExpressionRunnerProps['highlightOverrides']
  highlightOverrideActiveAfterStart?: ExpressionRunnerProps['highlightOverrideActiveAfterStart']
  variableSize: ExpressionRunnerProps['variableSize']
}) => (
  <>
    <ExpressionRunner
      expressionContainer={expressionContainer}
      hideControls
      hidePriorities={!showPriorities}
      explanationsVisibility="hidden"
      variableSize={variableSize}
      skipAlphaConvert={skipAlphaConvert}
      highlightOverrides={highlightOverrides}
      highlightOverrideActiveAfterStart={highlightOverrideActiveAfterStart}
      initializeInstructions={
        firstInitializeInstructions
          ? firstInitializeInstructions
          : [
              {
                type: 'stepForwardUntilPreviouslyChangedExpressionState',
                state: initialState
              }
            ]
      }
    />
    <P
      css={css`
        text-align: center;
        margin: ${spaces('-0.75')} 0 ${spaces('-0.5')};
      `}
    >
      {finalState || finalIsDone || secondInitializeInstructions ? (
        <>
          <Emoji size="mdlg">⬇️</Emoji>
        </>
      ) : (
        <>
          <Emoji>🔽</Emoji>{' '}
          <H args={{ name: 'afterPlay' }} highlightType="none" />{' '}
          <Emoji>🔽</Emoji>
        </>
      )}
    </P>
    <ExpressionRunner
      expressionContainer={expressionContainer}
      hideControls
      hidePriorities={!showPriorities || hidePrioritiesOnSecond}
      explanationsVisibility="hidden"
      variableSize={variableSize}
      skipAlphaConvert={skipAlphaConvert}
      highlightOverrides={highlightOverrides}
      highlightOverrideActiveAfterStart={highlightOverrideActiveAfterStart}
      initializeInstructions={
        secondInitializeInstructions
          ? secondInitializeInstructions
          : [
              finalState
                ? {
                    type: 'stepForwardUntilPreviouslyChangedExpressionState',
                    state: finalState
                  }
                : {
                    type: 'stepForwardUntilTheEnd'
                  }
            ]
      }
    />
  </>
)

ExpressionRunnerPairSimpleDeprecated.defaultProps = {
  initialState: 'default',
  finalIsDone: false,
  showPriorities: false,
  skipAlphaConvert: false,
  hidePrioritiesOnSecond: false,
  variableSize: 'lg'
}

export const ExpressionRunnerSingleStep = ({
  expressionContainer,
  initialState,
  finalState,
  hideFuncUnboundBadgeOnExplanation,
  showPriorities,
  explanationsVisibility,
  showAllShowSteps,
  variableSize,
  containerSize,
  nextIteration,
  nextIterations
}: {
  expressionContainer: SteppedExpressionContainer
  initialState: ExpressionContainer['previouslyChangedExpressionState']
  finalState: ExpressionContainer['previouslyChangedExpressionState']
  hideFuncUnboundBadgeOnExplanation: boolean
  showPriorities: boolean
  nextIteration?: boolean
  nextIterations?: number
  variableSize: ExpressionRunnerProps['variableSize']
  containerSize?: ExpressionRunnerProps['containerSize']
  explanationsVisibility: ExpressionRunnerProps['explanationsVisibility']
  showAllShowSteps?: ExpressionRunnerProps['showAllShowSteps']
}) => (
  <ExpressionRunner
    variableSize={variableSize}
    containerSize={containerSize}
    expressionContainer={expressionContainer}
    hidePriorities={!showPriorities}
    hideFuncUnboundBadgeOnExplanation={hideFuncUnboundBadgeOnExplanation}
    hidePlayButton
    explanationsVisibility={explanationsVisibility}
    resetIndex
    lastAllowedExpressionState={finalState}
    showAllShowSteps={showAllShowSteps}
    initializeInstructions={initializeInstructions({
      nextIteration,
      nextIterations,
      initialState
    })}
  />
)

ExpressionRunnerSingleStep.defaultProps = {
  hideFuncUnboundBadgeOnExplanation: false,
  showPriorities: false,
  explanationsVisibility: 'hiddenInitialPausedOnly',
  variableSize: 'lg'
}
