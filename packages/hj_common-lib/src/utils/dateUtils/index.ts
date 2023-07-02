import { flow } from "@effect/data/Function";

const toYear = (date: Date) => date.getFullYear();
const toMonth = (date: Date) => date.getMonth() + 1;
const toDate = (date: Date) => date.getDate();

const twoDigit = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const mappingFormat = {
  YYYY: toYear,
  MM: flow(toMonth, twoDigit),
  DD: flow(toDate, twoDigit),
} as const;

const mappingKoFormat = {
  YYYY: flow(mappingFormat.YYYY, (str) => `${str}년`),
  MM: flow(mappingFormat.MM, (str) => `${str}월`),
  DD: flow(mappingFormat.DD, (str) => `${str}일`),
} as const;

/*
 * date formatting
 * @example
 * toDateStyle(["YYYY", "MM", "DD"])(new Date())
 * // -> 2023.07.02
 * toDateStyle(["DD", "MM", "YYYY"], "/")(new Date())
 * // -> 02/07/2023
 * */
export const toDateStyle =
  <M extends keyof typeof mappingFormat>(format: M[], separator = ".") =>
  (date: Date) =>
    format.map((f) => mappingFormat[f](date)).join(separator);

/*
 * date korean formatting
 * @example
 * toKoDateStyle(["YYYY", "MM", "DD"])(new Date())
 * // -> 2023년 07월 02일
 * */
export const toKoDateStyle =
  <M extends keyof typeof mappingKoFormat>(format: M[], separator = " ") =>
  (date: Date) =>
    format.map((f) => mappingKoFormat[f](date)).join(separator);

/*
 * weekDay Short format
 * @example
 * korWeekDateTime(new Date()) // 화 */
export const korWeekDateTime = new Intl.DateTimeFormat("ko-KR", {
  weekday: "short",
}).format;
