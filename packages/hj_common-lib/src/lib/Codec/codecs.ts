import { Codec } from './Codec.ts'

const dateToString = Codec.make<Date, string>({
  encode: (date) => date.toISOString(),
  decode: (str) => new Date(str),
})

const stringToDate = dateToString.inverse()

export const codecs = {
  dateToString,
  stringToDate,
}
