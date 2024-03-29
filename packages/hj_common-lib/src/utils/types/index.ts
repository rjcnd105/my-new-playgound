export declare const URI: unique symbol

export interface TypeClass<F extends TypeLambda> {
	readonly [URI]?: F
}

export interface TypeLambda {
	readonly In: unknown
	readonly Out2: unknown
	readonly Out1: unknown
	readonly Target: unknown
}


export type Kind<F extends TypeLambda, In, Out2, Out1, Target> = F extends {
		readonly type: unknown
	} ? (F & {
		readonly In: In
		readonly Out2: Out2
		readonly Out1: Out1
		readonly Target: Target
	})["type"]
	: {
		readonly F: F
		readonly In: (_: In) => void
		readonly Out2: () => Out2
		readonly Out1: () => Out1
		readonly Target: (_: Target) => Target
	}
