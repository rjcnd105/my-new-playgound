type GenericFunction = (...x: never[]) => unknown;

abstract class HKT {
	readonly _1?: unknown;
	readonly new?: GenericFunction;
}

type Assume<T, U> = T extends U ? T : U;
type InstanceOf<T> = T extends new (...args: any) => infer R ? R : never;


type MapTuple<X extends readonly unknown[], F extends HKT> = {
	[K in keyof X]: Apply<F, X[K]>;
};

// ["hellohello", "worldworld"]
type MapResult = MapTuple<["hello", "world"], DoubleString>;

// @ts-ignore
function myMap<const X extends unknown[], F extends typeof HKT>(
	x: readonly [...X],
	f: F 
): MapTuple<X, Assume<InstanceOf<F>, HKT>>; {
	// @ts-ignore
	return x.map(f);
}

// type Kind<F extends HKT, _1> = ReturnType<
// 	(F & {
// 		readonly _1: _1;
// 	})["new"]
// >;
// @ts-ignore
type Apply<F extends HKT, _1> = ReturnType<
// @ts-ignore
	(F & {
		readonly _1: _1;
	})["new"]
>;

const append = <S extends string>(s: S) =>
	class extends HKT {
		override new = (x: Assume<this["_1"], string>) => `${x}${s}` as const;
	};

// ["hello!!!", "world!!!"] 
const result = myMap(["hello", "world"], append("!!!")); /*?*/

interface DoubleString extends HKT {
	new: (x: Assume<this["_1"], string>) => `${typeof x}${typeof x}`;
}

// "hi!hi!"
type Result = Apply<DoubleString, "hi!">; 

// type Apply2<F extends HKT, _1> = ReturnType<
// 	F extends {
// 			new: GenericFunction;
// 		}
// 		? (F & {
// 			readonly _1: _1;
// 		})["new"]
// 		: {
// 			readonly _1: _1;
// 		  _F: F;
// 		}>
