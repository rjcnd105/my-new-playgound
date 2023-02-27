import * as Str from "@fp-ts/core/String";

/**
 * 3자리마다 ,를 추가한다.
 * @example 14023142.132 => "14,023,142.132"
 */
export function thousandsSeparators(num: number) {
  if (!Number.isFinite(num)) throw new Error("num is not finite number");

  const strNum = num.toString();
  const [integer, ...decimal] = Str.split(".")(strNum);

  return [integer.replace(/\B(?=(\d{3})+(?!\d))/g, ","), ...decimal].join(".");
}

/**
 * 추가된 ,를 제거한다.
 * @example "14,023,142.132" => "14023142.132"
 */
export function removeSeparators(str: string) {
  return str.replace(/,/g, "");
}

export function random(max: number): number;
export function random(min: number, max: number): number;
export function random(min: number, max?: number): number {
  if (typeof max === "number")
    return min + Math.floor(Math.random() * (max - min + 1));
  return random(0, min);
}
