export function flip(f) {
  return function () {
    const firstArguments = arguments;
    return function () {
      return f.apply(this, arguments).apply(this, firstArguments);
    };
  };
}
