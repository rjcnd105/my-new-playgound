/**
 * union -> { [k in keyof union]: string} 타입 변환
 * @example
 * MakeObjFromKeys<'studentId' | 'favoriteId', string>
 * => { studentId: string; favoriteId: string }
 */
export type MakeObjFromKeys<Keys extends string, V> = { [K in Keys]: V }

const prefix = ':' as const
export type Prefix = typeof prefix

/** *
 * Path 분리
 * @example
 * PathSegments<'https://student/:studentId/favorite/:favoriteId'>
 * => '' | 'https:' | 'student' | ':studentId' | 'favorite' | ':favoriteId'
 * */
export type PathSegments<T, A extends string = never> = T extends string
  ? T extends `${infer L}/${infer R}`
    ? PathSegments<R, A | L>
    : A | T
  : never

/** *
 * string union으로부터 pathParams만 추출
 * @example
 * SegmentToRouteParam<'' | 'https:' | 'student' | ':studentId' | 'favorite' | ':favoriteId'>
 * => 'studentId' | 'favoriteId'
 * */
export type SegmentToRouteParamKeys<T extends string> =
  T extends `${Prefix}${infer P}` ? P : never

/**
 * Path로 pathParams 추출
 * @example
 * PathSegments<'https://student/:studentId/favorite/:favoriteId'
 * => 'studentId' | 'favoriteId'
 */
export type PathToPathParamsKeys<T> = SegmentToRouteParamKeys<PathSegments<T>>

/**
 * routePath에 pathParams를 적용
 * @example
 * parsePathParams('/user/:userId/lesson/:lessenId', { userId: '1', lessenId: '2' })
 * => '/user/1/lesson/2'
 */
export const parsePathParams = <const T extends string>(
  routePath: T,
  routeKV: MakeObjFromKeys<PathToPathParamsKeys<T>, { toString(): string }>,
) => {
  if (!routeKV) {
    return routePath
  }
  let parsedPath: string = routePath

  for (const [k, v] of Object.entries(routeKV) as [
    string,
    { toString(): string },
  ][]) {
    parsedPath = parsedPath.replace(`${prefix}${k}`, v.toString())
  }

  return parsedPath
}
