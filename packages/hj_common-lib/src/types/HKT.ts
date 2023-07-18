/*
* 
* 
* declare const mapArray: 
  <A>(self: Array<A>, f: (a: A) => B) => Array<B>

declare const mapTree: 
  <A>(self: Tree<A>, f: (a: A) => B) => Tree<B>

declare const mapOption: 
  <A>(self: Option<A>, f: (a: A) => B) => Option<B>
* 
* 
* const stringify = 
  <F>(T: Mappable<F>) => 
  (self: F<number>): F<string> => 
  T.map(self, (n) => `number: ${n}`)
*   
* 
* const stringifiedArray: Array<string> = 
  stringify(MappableArray)([0, 1, 2])
* 
* interface Mappable<F<~>> {
  readonly map: 
    <A, B>(self: F<A>, f: (a: A) => B) => F<B>
}
* 
* declare const mapArray: Mappable<Array>["map"]
declare const mapTree: Mappable<Tree>["map"]
declare const mapOption: Mappable<Option>["map"]
* 
* 
* declare const ArrayMappable: Mappable<Array>
declare const TreeMappable: Mappable<Tree>
declare const OptionMappable: Mappable<Option>
* 
* interface Mappable<F<~, ~, ~>> {
*  readonly map: <R, E, A, B>(
    self: F<R, E, A>, 
    f: (a: A) => B
  ) => F<R, E, B>
}
* 
* */

export declare const URI: unique symbol;

interface MyInterface {
  readonly x?: unknown;
}

type X = (MyInterface & { readonly x: number })["x"];

interface MyInterface {
  readonly x?: unknown;
  readonly y: this["x"];
}

type Y = (MyInterface & { readonly x: number })["y"];

interface HKT {
  // will reference the A type
  readonly _A?: unknown;

  // will represent the computed type
  readonly type?: unknown;
}

type Kind<F extends HKT, A> = F extends {
  readonly type: unknown;
}
  ? // F has a type specified, it is concrete (like F = ArrayHKT)
    (F & {
      readonly _A: A;
    })["type"]
  : // F is generic, we need to mention all the type parameters
    // to guarantee that they are never excluded from type checking
    {
      readonly _F: F;
      readonly _A: () => A;
    };

interface ArrayHKT extends HKT {
  readonly type: Array<this["_A"]>;
}

type XX = Kind<ArrayHKT, number>;

interface Mappable<F extends HKT> {
  readonly map: <A, B>(self: Kind<F, A>, f: (a: A) => B) => Kind<F, B>;
}

const MappableArray: Mappable<ArrayHKT> = {
  map: <A, B>(self: A[], f: (a: A) => B) => self.map(f),
};
