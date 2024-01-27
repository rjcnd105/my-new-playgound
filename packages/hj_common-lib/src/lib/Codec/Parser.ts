export interface ParserUnify<A, B> {
  (a: A): B
}

export module Parser {
  export type From<ParserT> =
    ParserT extends ParserUnify<infer A, any> ? A : never
  export type To<ParserT> =
    ParserT extends ParserUnify<any, infer B> ? B : never
}
