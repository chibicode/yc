import React from 'react'
import EpisodeCardList from 'src/components/EpisodeCardList'
import { P, Strong, Em, Ul, UlLi } from 'src/components/ContentTags'
import H from 'src/components/H'
import BubbleQuotes from 'src/components/BubbleQuotes'
import Emoji from 'src/components/Emoji'
import EmojiNumber from 'src/components/EmojiNumber'
import ExpressionRunnerSeparator from 'src/components/ExpressionRunnerSeparator'
import CustomEmoji from 'src/components/CustomEmoji'
import EmojiForLetter from 'src/components/EmojiForLetter'
// import ExpressionRunnerCaptionOnly from 'src/components/ExpressionRunnerCaptionOnly'
import TwoColGrid from 'src/components/TwoColGrid'
import InlineBorder from 'src/components/InlineBorder'
import * as R from 'src/components/Runners'
// import NextLessonButton from 'src/components/NextLessonButton'

export default () => (
  <EpisodeCardList
    cards={[
      {
        title: <>とても複雑な弁当箱</>,
        content: (
          <>
            <BubbleQuotes
              quotes={[
                {
                  type: 'dog',
                  children: (
                    <>
                      <P>
                        では、これから「<Strong>繰り返しの機能</Strong>{' '}
                        <Emoji>🔁</Emoji>
                        」を弁当箱で再現するのに役立つヒントを出していきますね。
                      </P>
                    </>
                  )
                }
              ]}
            />
            <TwoColGrid
              left={
                <>
                  <R.Bwnp>
                    <CustomEmoji type="plusOne" /> を{' '}
                    <CustomEmoji type="blankNumber" /> 回<br />
                    繰り返す
                  </R.Bwnp>
                </>
              }
              right={
                <>
                  <R.Ewfr>
                    <CustomEmoji type="minusOne" /> を{' '}
                    <CustomEmoji type="blankNumber" /> 回<br />
                    繰り返す
                  </R.Ewfr>
                </>
              }
            />
            <BubbleQuotes
              quotes={[
                {
                  type: 'dog',
                  children: (
                    <>
                      <P>まずは、こちらの弁当箱をご覧ください。</P>
                    </>
                  )
                }
              ]}
            />
            <R.Bnyo>
              <H args={{ name: 'runAndConertToMathbox' }} />
              <br />
              するとどうなる？
            </R.Bnyo>
            <BubbleQuotes
              quotes={[
                {
                  type: 'tired',
                  children: (
                    <>
                      <P>めちゃくちゃ複雑な弁当箱だなあ…</P>
                    </>
                  )
                },
                {
                  type: 'dog',
                  children: (
                    <>
                      <P>
                        ここで質問です。
                        <Strong>
                          上の弁当箱を、
                          <H args={{ name: 'runAndConertToMathbox' }} />{' '}
                          すると、どんな結果になるでしょう？
                        </Strong>
                      </P>
                    </>
                  )
                },
                {
                  type: 'sad',
                  children: (
                    <>
                      <P>
                        <Em>そんなの、すぐ答えられるわけないだろう！</Em>
                        こんな複雑な弁当箱、
                        <H args={{ name: 'play' }} /> するのもひと苦労だよ！
                      </P>
                    </>
                  )
                },
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        サヤはすぐ分かったよ！
                        <H args={{ name: 'runAndConertToMathbox' }} /> すると、
                        <Strong>
                          結果は <EmojiNumber number={4} /> になる
                        </Strong>
                        んじゃない？
                      </P>
                      <R.Kizi>
                        <Emoji>👧🏻</Emoji> 結果は <EmojiNumber number={4} />{' '}
                        になると思う！
                      </R.Kizi>
                    </>
                  )
                },
                {
                  type: 'dog',
                  children: (
                    <>
                      <P>
                        <Strong>
                          まさにその通り！サヤちゃん、正解です！
                          <Emoji>🎉</Emoji>
                        </Strong>
                      </P>
                    </>
                  )
                },
                {
                  type: 'surprised',
                  children: (
                    <>
                      <P>へ？なんでそんな早く正解が分かるの…？</P>
                      <P>
                        <Em>
                          サヤちゃん、まさか一瞬で頭の中で
                          <H args={{ name: 'play' }} /> したのかい？
                        </Em>
                      </P>
                    </>
                  )
                },
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        ううん、そんなことはしてないよ。じゃあ、どうやって解いたかを教えてあげるね！
                      </P>
                    </>
                  )
                }
              ]}
            />
          </>
        )
      },
      {
        title: <>計算箱に置き換える</>,
        content: (
          <>
            <BubbleQuotes
              quotes={[
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        まず、
                        <Em>
                          一番上の部分と、右の真ん中の部分に注目してみて！
                        </Em>
                      </P>
                    </>
                  )
                }
              ]}
            />
            <R.Dpaw>
              一番上の部分と、
              <br />
              右の真ん中の部分に注目
            </R.Dpaw>
            <BubbleQuotes
              quotes={[
                {
                  type: 'surprised',
                  children: (
                    <>
                      <P>
                        あ、
                        <Em>
                          一番上の部分をよく見ると、これは{' '}
                          <EmojiNumber number={3} /> に変換できる弁当箱だ！
                        </Em>
                      </P>
                      <R.Ayrl>
                        <H
                          args={{
                            name: 'canBeConvertedCaption',
                            letter: 'l',
                            number: 3
                          }}
                        />
                      </R.Ayrl>
                      <P>
                        さらに、
                        <Em>
                          右の真ん中の部分をよく見ると、これは{' '}
                          <EmojiNumber number={0} /> に変換できる弁当箱だ！
                        </Em>
                      </P>
                      <R.Vhte>
                        <H
                          args={{
                            name: 'canBeConvertedCaption',
                            letter: 'g',
                            number: 0
                          }}
                        />
                      </R.Vhte>
                    </>
                  )
                },
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        そう！だから、とりあえずこれらを
                        <Strong>
                          <EmojiNumber number={3} /> と{' '}
                          <EmojiNumber number={0} /> に置き換えてみる
                        </Strong>
                        ね。
                      </P>
                    </>
                  )
                }
              ]}
            />
            <R.Wgby>
              それぞれ <EmojiNumber number={3} /> と <EmojiNumber number={0} />{' '}
              に置き換えてみる
            </R.Wgby>
            <BubbleQuotes
              quotes={[
                {
                  type: 'surprised',
                  children: (
                    <>
                      <P>なるほど…！</P>
                    </>
                  )
                },
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>次に、この右の黄色の部分に注目してみて！</P>
                    </>
                  )
                }
              ]}
            />
            <R.Poha>右の部分に注目</R.Poha>
            <BubbleQuotes
              quotes={[
                {
                  type: 'surprised',
                  children: (
                    <>
                      <P>
                        これはもしかして…
                        <Em>
                          中級その3でやった、
                          <H args={{ name: 'plusOneEffect' }} />
                          がある弁当箱かな？
                        </Em>
                      </P>
                      <R.Vcqp>
                        <H args={{ name: 'plusOneEffect' }} />
                        がある弁当箱
                      </R.Vcqp>
                    </>
                  )
                },
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        その通り！だから、この部分をいったん{' '}
                        <Strong>
                          <CustomEmoji type="plusOne" /> に置き換える
                        </Strong>
                        ね。
                      </P>
                    </>
                  )
                }
              ]}
            />
            <R.Cpdy>
              <CustomEmoji type="plusOne" /> に置き換えてみる
            </R.Cpdy>
            <BubbleQuotes
              quotes={[
                {
                  type: 'thinking',
                  children: (
                    <>
                      <P>なるほど、だいぶシンプルになってきたぞ…</P>
                    </>
                  )
                },
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>最後に、右下の全ての部分に注目してみて！</P>
                    </>
                  )
                }
              ]}
            />
            <R.Lxgj>右下の全ての部分に注目</R.Lxgj>
            <BubbleQuotes
              quotes={[
                {
                  type: 'surprised',
                  children: (
                    <>
                      <P>
                        そういればこれは、前回やった「
                        <Strong>条件分岐の機能</Strong> <Emoji>↕️</Emoji>
                        」に変換できる弁当箱と同じだ！
                      </P>
                      <R.Vlhb>
                        「<Strong>条件分岐の機能</Strong> <Emoji>↕️</Emoji>
                        」に変換できる弁当箱
                      </R.Vlhb>
                    </>
                  )
                },
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        そう！だから、右下の部分を「
                        <Strong>条件分岐の機能</Strong> <Emoji>↕️</Emoji>
                        」に置き換えるんだ。
                      </P>
                      <R.Ruou>
                        「<Strong>条件分岐の機能</Strong> <Emoji>↕️</Emoji>
                        」に置き換える
                      </R.Ruou>
                      <P>
                        以下のように置き換えてみるよ。
                        <Strong>
                          複雑なので、↓の置き換え方は読み飛ばしても大丈夫！
                        </Strong>
                      </P>
                      <Ul>
                        <UlLi>
                          上にある <EmojiForLetter letter="f" />{' '}
                          <CustomEmoji type="plusOne" /> は{' '}
                          <InlineBorder type="falseCase" /> の部分へ
                        </UlLi>
                        <UlLi>
                          その下にある <EmojiNumber number={0} /> は{' '}
                          <InlineBorder type="trueCase" /> の部分へ
                        </UlLi>
                        <UlLi>
                          一番下の <EmojiForLetter letter="f" /> は{' '}
                          <InlineBorder type="condition" /> の部分へ
                        </UlLi>
                      </Ul>
                      <P>置き換えるとこうなります！</P>
                    </>
                  )
                }
              ]}
            />
            <R.Awbq>
              「<Strong>条件分岐の機能</Strong> <Emoji>↕️</Emoji>
              」<br />
              の部分を置き換えた後
            </R.Awbq>
            <BubbleQuotes
              quotes={[
                {
                  type: 'surprised',
                  children: (
                    <>
                      <P>なんと、超シンプルになった！</P>
                    </>
                  )
                }
              ]}
            />
          </>
        )
      },
      {
        title: <>あとは実行するだけ</>,
        content: (
          <>
            <BubbleQuotes
              quotes={[
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        あとは、これを
                        <H args={{ name: 'play' }} />{' '}
                        するだけだよ。というわけで、
                        <H args={{ name: 'pressFastForward', girl: true }} />
                      </P>
                    </>
                  )
                }
              ]}
            />
            <R.Gmzn />
            <BubbleQuotes
              quotes={[
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        ここまできたら、後は簡単だよね。
                        <Strong>
                          <InlineBorder type="condition" /> が{' '}
                          <EmojiNumber number={3} /> だから、
                          <InlineBorder type="falseCase" /> に入っている{' '}
                          <EmojiNumber number={3} />{' '}
                          <CustomEmoji type="plusOne" /> が残る
                        </Strong>
                        んだ。
                      </P>
                      <P>
                        <H args={{ name: 'pressFastForward', girl: true }} />
                      </P>
                    </>
                  )
                }
              ]}
            />
            <R.Uiwl />
            <BubbleQuotes
              quotes={[
                {
                  type: 'saya',
                  children: (
                    <>
                      <P>
                        ほらね、サヤがさっき言ったように、
                        <Strong>
                          最後に <EmojiNumber number={4} /> が残った
                        </Strong>
                        でしょう？
                      </P>
                      <R.Kizi>
                        <Emoji>👧🏻</Emoji> 結果は <EmojiNumber number={4} />{' '}
                        になった！
                      </R.Kizi>
                    </>
                  )
                },
                {
                  type: 'thinking',
                  children: (
                    <>
                      <P>たしかに…！</P>
                    </>
                  )
                }
              ]}
            />
          </>
        )
      },
      {
        title: <>そのまま実行していたら？</>,
        content: (
          <>
            <BubbleQuotes
              quotes={[
                {
                  type: 'roll',
                  children: (
                    <>
                      <P>
                        しかし…
                        <Em>サヤちゃんがとった手法はズルなんじゃないか？</Em>
                      </P>
                      <P>
                        サヤちゃんは、もともとの弁当箱を、それぞれの要素に対応する計算箱に置き換えてから実行したけど…
                      </P>
                    </>
                  )
                }
              ]}
            />
            <R.Bnyo>
              <Emoji>🍱</Emoji> もともとの弁当箱を…
            </R.Bnyo>
            <ExpressionRunnerSeparator />
            <R.Ghwe>
              <Emoji>🎁</Emoji> 対応する計算箱に置き換える
            </R.Ghwe>
            <BubbleQuotes
              quotes={[
                {
                  type: 'roll',
                  children: (
                    <>
                      <P>
                        <Strong>
                          もともとの弁当箱を、そのまま
                          <H args={{ name: 'play' }} />{' '}
                          しても、同じ結果になっていたのかな？
                        </Strong>
                      </P>
                      <P>とりあえず、確かめてみるか。</P>
                    </>
                  )
                },
                {
                  type: 'dog',
                  children: (
                    <>
                      <P>
                        では、
                        <H args={{ name: 'play' }} />
                        を押してみてください！
                      </P>
                      <P>
                        (
                        <Em>
                          早送りをすると時間が非常にかかるので、今回は省略します。
                        </Em>
                        )
                      </P>
                    </>
                  )
                }
              ]}
            />
            <R.Ynoy></R.Ynoy>
            <BubbleQuotes
              quotes={[
                {
                  type: 'dog',
                  children: (
                    <>
                      <P>
                        最後に残った以下の弁当箱は、
                        <EmojiNumber number={4} /> に変換できる弁当箱ですね。
                      </P>
                      <R.Gmgs>
                        <H
                          args={{
                            name: 'canBeConvertedCaption',
                            letter: 'j',
                            number: 4
                          }}
                        />
                      </R.Gmgs>
                      <P>
                        つまり、
                        <H args={{ name: 'runAndConertToMathbox' }} />{' '}
                        すると、結果は <EmojiNumber number={4} /> になるのです。
                      </P>
                      <R.Kizi></R.Kizi>
                    </>
                  )
                }
              ]}
            />
          </>
        )
      }
      // TODO: でも、サヤちゃんがやったのはズルじゃないか？もしそのまま実行していたらどうなっていたんだろう？
    ]}
  />
)
