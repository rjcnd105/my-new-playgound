/**
 * union -> { [k in keyof union]: string} 타입 변환
 * @example
 * UnionToObj<'studentId' | 'favoriteId', string>
 * => { studentId: string; favoriteId: string }
 */
export type MakeObjFromKeys<Keys extends string, V> = { [K in Keys]: V }
export type Remover<T, RemoveT = never> = Pick<
  T,
  { [KeyType in keyof T]: T[KeyType] extends RemoveT ? never : KeyType }[keyof T]
>
