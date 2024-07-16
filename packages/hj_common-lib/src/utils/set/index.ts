export const intersection = <A>(a1: Set<A>, a2: Set<A>) => {
  const result = new Set<A>();
  const basis = a1.size < a2.size ? a1 : a2;
  const other = basis === a1 ? a2 : a1;

  for (const el of basis) {
    if (other.has(el)) result.add(el);
  }

  return result;
};
export const difference = <A>(basis: Set<A>, sub: Set<A>) => {
  const result = new Set<A>();

  for (const el of basis) {
    if (!sub.has(el)) result.add(el);
  }

  return result;
};

export function union<A>(...sets: Set<A>[]): Set<A> {
  const resultSet = new Set<A>(sets.shift());

  for (const set of sets) {
    for (const element of set) {
      resultSet.add(element);
    }
  }

  return resultSet;
}
