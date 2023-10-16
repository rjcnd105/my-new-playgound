export class M extends Array {
  public m(): this {
    return this;
  }
}
new M(9); /*?*/
const myM = M.from([1, 2, 3]); /*?*/

// const f = myM.m; /*?*/

class A {
  get this() {
    return 0;
  }
  valueOf() {
    return 0;
  }
  [Symbol.toPrimitive]() {
    return 0;
  }
  call() {
    return 0;
  }
  [Symbol.toStringTag]() {
    return "0";
  }
  length() {
    return 0;
  }
}
function LooksLikeConstructor() {
  // check for this if you want
  if (this === undefined) {
  }
  return 1; // some primitive
}
LooksLikeConstructor(); /*?*/
const oneToNum = function (num: number) {
  const n = Number(num);
  n[Symbol.iterator] = function* () {};
};

interface MyNum {
  new (): number;
}

type MyInterface = Record<string, boolean> & {
  a: boolean;
  b: string;
};

type MyInterface2 = {
  [key: string]: boolean;
} & {
  b: string;
};

const a = new A();
a; /*?*/
const n = 10;
n.valueOf(); /*?*/
n; /*?*/

const object1 = {
  [Symbol.toPrimitive](hint: unknown) {
    if (hint === "number") {
      return 42;
    }
    console.log(hint);
    return 11;
  },
  [Symbol.toStringTag]() {
    return "aaa";
  },
};

console.log(+object1);
console.log(object1);
// expected output: 42
