// @ts-ignore
// Generator<TFailReturn, TSuccessReturn, NextArgs>
function* listener(): Generator<undefined, number, number> {
  let balance = 100;
  while (balance > 0) {
    // const ff = yield balance;
    // @ts-ignore
    balance += yield balance;
  }
}

const ask2 = listener(); /*?*/
ask2.next(-50); /*?*/
// { value: undefined, done: false }
// listening...

ask2.next(0); /*?*/
ask2.next(70); /*?*/
ask2.next(); /*?*/
ask2.next(-120); /*?*/
const dd = ask2.next(-88).value; /*?*/
// { value: undefined, done: false }
// msg: hello
