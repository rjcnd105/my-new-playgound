export declare function flip<A, B, C>(
  f: (...a: [...A]) => (...b: [...B]) => C,
): (...b: [...B]) => (...a: [...A]) => C;
