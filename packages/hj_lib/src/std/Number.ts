import * as List from "./List"
import {pipe} from "fp-ts/function";
import { Combinator } from "./utils";


export const identityAddElem = 0
export const identityMultipleElem = 1

export const add: Combinator<number> = (a, b) => a + b
export const sub: Combinator<number> = (a, b) => a - b
export const div: Combinator<number> = (a, b) => a / b
export const multiple: Combinator<number> = (a, b) => a * b
export const mod: Combinator<number> = (a, b) => a % b


// const foldl = List.foldl<number>


List.reverse([1, 2, 3]) /*?*/
List.foldl(div)(1)([1, 2, 3]) /*?*/

const adds = List.foldl(add)(identityAddElem)
const subs = List.foldl(sub)(identityAddElem)
const divs = List.foldl(div)(identityMultipleElem)


adds([1, 2, 3, 5, 8, 14, 2]) /*?*/
divs([1 / 7, 5]) /*?*/ 


const cup = <T>(oz: T) => (f: (x: T) => T) => f(oz)
type Cup<T> = ReturnType<typeof cup<T>>

const myCup = cup(10) 
const getOz = (x: number) => x
myCup(getOz) /*?*/
pipe(getOz, myCup) /*?*/
const getOzOfTheCup = (aCup: Cup<number>) => pipe(getOz, aCup)


const drink = (aCup: Cup<number>) => (drunkOz: number) => {
    const afterOz = getOzOfTheCup(aCup) - drunkOz
    return cup(afterOz > 0 ? afterOz : 0)
}
const afterAShip = drink(myCup)(1)
getOzOfTheCup(afterAShip) /*?*/ 

