export type KeyType = string | number | symbol;
export type ValueType = string | number | symbol;
export type OneDepthRecord = Record<KeyType, ValueType>;

/**
 * 개요
 * 키는 레코드 형태이며 레코드 형태의 키와 값을 하나의 식별자로서 찾는다.
 * 여러 키-값 식별자를 통해서 AND 연산처럼 할 수도 있다.
 *
 * // 키가 있는 경우
 * m = map('id', [
 *  {id: 44, name: 'aa',         gender: 'f'},
 *  {id: 82, name: 'bb', age: 16, gender: 'm'},
 *  {id: 22, name: 'cc', age: 16, gender: 'f'}
 *  ])
 * // 키가 없는 경우 - 내부적으로 유니크한 키 hash 생성하여 참조
 * m = mapWithGenId([
 *  {name: 'aa',         gender: 'f'},
 *  {name: 'bb', age: 16, gender: 'm'},
 *  {name: 'cc', age: 16, gender: 'f'}
 * ])
 *
 * get(m, { name: 'aa' })
 * ==> [{ name: 'aa', gender: 'm' }]
 *
 * get(m, { gender: 'f' })
 * ==> [{ name: 'aa', gender: 'f' }, { name: 'cc', age: 16, gender: 'f' }]
 *
 * get(m, { age: 16, gender: 'f' })
 * ==> [{name: 'cc', age: 16, gender: 'f'}]
 *
 *
 *
 */

namespace symbols {
  export const KindSym: unique symbol = Symbol.for("@MultikeyMap/kind");
  export type KindSym = typeof KindSym;
  export const Map: unique symbol = Symbol.for("@MultikeyMap/map");
  export type Map = typeof Map;
  export const MapItem: unique symbol = Symbol.for("@MultikeyMap/mapItem");
  export type MapItem = typeof MapItem;

  export const HashedKey: unique symbol = Symbol.for("@MultikeyMap/mapItemKey");
  export type HashedKey = typeof HashedKey;
  export const HashedId: unique symbol = Symbol.for("@MultikeyMap/mapItemId");
  export type MapItemId = typeof HashedId;

  export const LastHashedTime: unique symbol = Symbol.for(
    "@MultikeyMap/lastModifyTime",
  );
  export type LastHashedTime = typeof LastHashedTime;

  export const Hashed: unique symbol = Symbol.for("@MultikeyMap/hashed");
  export type Hashed = typeof Hashed;
}

export interface Structure<
  K extends KeyType = KeyType,
  V extends { [k in K]: ValueType } = { [k in K]: ValueType },
> {
  [symbols.KindSym]: "struct";
  [symbols.Map]: Map<V[K], MapItem<V[K], V>>;
  [symbols.HashedKey]: K;
  [symbols.LastHashedTime]: number;
}

export type Value<T> = T extends Structure<never, infer V> ? V : never;
export type Key<T> = T extends Structure<infer K, never> ? K : never;
export type Id<T> = T extends Structure<infer K, infer V> ? V[K] : never;
interface Matcher {
  type: "matcher";
  matcher: (x: unknown) => boolean;
}
export const eq = <EqT extends OneDepthRecord>(value: EqT) => {
  return {
    matcher: <T extends EqT>(x: T) => {
      for (const [k, v] of Object.entries(value)) {
        if (x[k] !== v) return false;
      }
      return true;
    },
    [symbols.KindSym]: "matcher",
  };
};

export const matcher = <T>(fn: (x: T) => boolean) => {
  return {
    matcher: fn,
    [symbols.KindSym]: "matcher",
  };
};

type MapInitialArgs<V> = Iterable<V> | readonly V[];
interface MapItem<I, V> {
  [symbols.KindSym]: "mapItem";
  [symbols.HashedId]: I;
  value: V;
}

const makeItem = <K extends KeyType, V extends { [k in K]: ValueType }>(
  key: K,
  value: V,
): MapItem<K, V> => {
  return {
    [symbols.KindSym]: "mapItem",
    [symbols.HashedId]: key,
    value,
  };
};
export const map =
  <const IdT extends KeyType>(identifier: IdT) =>
  <V extends { [k in IdT]: ValueType }>(
    iterable?: MapInitialArgs<V> | null,
  ): Structure<IdT, V> => {
    type Key = V[IdT];
    const _map = new Map<Key, MapItem<Key, V>>();

    if (iterable) {
      for (const item of iterable) {
        const key = item[identifier];
        // @ts-expect-error type ignore
        const value = makeItem<Key, V>(key, item);
        _map.set(key, value);
      }
    }
    return {
      [symbols.KindSym]: "struct",
      [symbols.Map]: _map,
      [symbols.HashedKey]: identifier,
      [symbols.LastHashedTime]: Date.now(),
    };
  };

export const getKeySet = <T extends Structure<KeyType, any>>(map: T) =>
  new Set<Key<T>>(map[symbols.Map].keys());

export const getEq = <
  T extends Structure<string, any>,
  SearchT extends {
    [k in Key<T>]: Value<T>[k];
  },
>(
  map: T,
  getters: SearchT,
) => {
  const arr: Value<T>[] = [];
  const allKeys = getKeySet(map);
  const tempKeys = new Set<Key<T>>();

  for (const [key, value] of map) {
    if (getters[key]) {
      arr.push(value);
    }
  }

  return arr;
};

export const _getFromId =
  <T extends Structure<KeyType, any>>(map: T) =>
  (id: Id<T>): Value<T> =>
    map[symbols.Map].get(id)?.value;
export const getFromId = <T extends Structure<KeyType, any>>(
  map: T,
  id: Id<T>,
): Value<T> => _getFromId(map)(id);

export const deletes = <T extends Structure<KeyType, any>>(
  map: T,
  ids: Id<T>[],
) => {
  for (const id of ids) {
    map[symbols.Map].delete(id);
  }
};
export const getFromIds = <T extends Structure<KeyType, any>>(
  map: T,
  ids: Id<T>[],
) => ids.map(_getFromId(map));

const mymap = map("id")([
  {
    id: 1,
    name: "test2",
    age: 14,
    gender: "m",
  },
  {
    id: 2,
    name: "test2",
    age: 14,
    gender: "f",
  },
  {
    id: 3,
    name: "test2",
    age: 15,
    gender: "m",
  },
  {
    id: 4,
    name: "test2",
    age: 16,
    gender: "f",
  },
]);

export const number = Symbol.for("RecordKeyMap/number");

export const stringKey = () => {
  return {};
};
export const numberKey = Symbol.for("RecordKeyMap/numberKey");
export const symbolKey = Symbol.for("RecordKeyMap/symbolKey");

// @internal
export const isObject = (value: unknown): value is Object =>
  Boolean(value && typeof value === "object");

// @internal
export const getSelectionKeys = (pattern: any): string[] => {
  if (isObject(pattern)) {
    if (isMatcher(pattern)) {
      return pattern[symbols.matcher]().getSelectionKeys?.() ?? [];
    }
    if (Array.isArray(pattern)) return flatMap(pattern, getSelectionKeys);
    return flatMap(Object.values(pattern), getSelectionKeys);
  }
  return [];
};
