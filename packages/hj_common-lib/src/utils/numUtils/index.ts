export function thousandsSeparators(num: string | number) {
  const numParts = (typeof num === "string" ? num : num.toString()).split(".");
  if (!numParts[0]) return String(num);
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numParts.join(".");
}
export function removeSeparators(str: string) {
  return str.replaceAll(",", "");
}
export function random(max: number): number;
export function random(min: number, max: number): number;
export function random(min: number, max?: number): number {
  if (typeof max === "number")
    return min + Math.floor(Math.random() * (max - min + 1));
  return random(0, min);
}
