// @ts-ignore
function* listener() {
  console.log("listening...");
  while (true) {
    const msg: string = yield;
    console.log("msg: ", msg);
  }
}

const ask = listener(); /*?*/
ask.next("are you listening?"); /*?*/
// { value: undefined, done: false }
// listening...

ask.next("hello"); /*?*/
// { value: undefined, done: false }
// msg: hello
