// [...myMap].map(...) 보다 약 2배 이상 빠름
export function mapIterToArr<T1, T2>(
  iterable: IterableIterator<T1>,
  callback: (value: T1) => T2,
) {
  const arr: T2[] = [];
  for (const x of iterable) {
    arr.push(callback(x));
  }
  return arr;
}
