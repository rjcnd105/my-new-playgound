const gray = {
  $50: '#FCFCFC',
  $100: '#FAFAFA',
  $200: '#F5F5F5',
  $230: '#F0F0F0',
  $260: '#EBEBEB',
  $300: '#E8E8E8',
  // border, divider
  $400: '#E0E0E0',
  $470: '#CCCCCC',
  $500: '#C0C0C0',
  $550: '#ABABAB',
  // guide text
  $600: '#959595',
  $700: '#707070',
  $800: '#5c5c5c',
  // main black
  $900: '#333333',
} as const

const blue = {
  $100: '#ecf8ff',
  $200: '#94DCFF',
  $300: '#00ABFF',
  $400: '#1A8EF9',
  $500: '#00A5F5',
} as const

const red = {
  $100: '#FFEBEE',
  $200: '#FFCDD2',
  $300: '#FF707D',
  $400: '#fd5354',
} as const

const studentGreen = {
  $1: '#2b6589',
  $2: '#367e8e',
  $3: '#4aa596',
  $4: '#57bf9c',
  $5: '#f1f2c2',
  $6: '#8ed5bd',
  $7: '#e1f5ee',
} as const

const subYellow = '#ffc64d' as const
const subGreen = '#54c0b1' as const
const monoWhite = '#ffffff' as const
const monoBlack = '#000000' as const

const border = gray.$400
const primary = studentGreen.$4
const positive = '#00C853' as const
const negative = red.$400

export const colors = {
  gray,
  blue,
  red,
  subYellow,
  subGreen,
  monoWhite,
  monoBlack,
  border,
  primary,
  positive,
  negative,
  studentGreen,
}
