export type VariableNames =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'question'
  | 'A'
  | 'B'
  | 'shorthandNumber'
  | 'shorthandBinary'
  | 'magical'
  | 'someNumber'
  | 'abbreviated'
  | 'Amult'
  | 'questionV2'
  | 'blankNumber'
  | 'shorthandFunc'
  | 'verticalDotDotDot'
  | 'questionFoodGrey'
  | 'questionFoodRed'

export interface VariableNamesWithAlphaConvertCount {
  name: VariableNames
  count: number
}
