const DEFAULT_KEY_ID = Symbol.for('__DEFAULT_KEY__')

type DotSeparated = `${string}.${string}` | string

const _getOrDefault = (obj: any, [key, ...restKeys]: string[]): any => {
  if (typeof obj !== 'object' || obj === null) return undefined

  const hasKey = key in obj
  const defaultValue = obj[DEFAULT_KEY_ID] ?? undefined

  if (!hasKey) {
    return defaultValue
  }

  const value = obj[key]
  if (restKeys.length === 0) {
    return value
  }

  return _getOrDefault(value, restKeys) ?? defaultValue
}

/**
 * @example
 * const testObj = {
 *   a: {
 *     [DEFAULT_KEY_ID]: 'a default',
 *     b: {
 *       c: {
 *         [DEFAULT_KEY_ID]: 'c default',
 *         d: 'find!',
 *       },
 *     },
 *   },
 * }
 * console.log(getOrDefault<string>(testObj, 'a.failkey')); // 'a default'
 * console.log(getOrDefault<string>(testObj, 'a.b.failkey')); // 'a default'
 * console.log(getOrDefault<string>(testObj, 'a.b.c.failkey')); // 'c default'
 * console.log(getOrDefault<string>(testObj, 'a.b.c.d')); // 'find!'
 *
 * const testNoneDefaultObj = {
 *   a: {
 *     b: 'find!',
 *   },
 * }
 * console.log(getOrDefault<string>(testNoneDefaultObj, 'a.b.c.failkey')); // undefined
 * console.log(getOrDefault<string>('fall back', testNoneDefaultObj, 'a.b.c.failkey')); // 'fall back'
 */

export const getOrDefault = <T>(obj: any, dotPathKey: DotSeparated, defaultValue?: T): T | undefined =>
  _getOrDefault(
    obj,
    dotPathKey.split('.').filter((v) => v !== ''),
  ) ?? defaultValue
