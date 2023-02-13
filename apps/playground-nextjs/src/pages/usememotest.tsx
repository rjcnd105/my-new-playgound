import React, { useState, useMemo } from "react";
import { range } from "@fp-ts/core/ReadonlyArray";

const MyExpensiveComponent = React.memo(
  ({ data }: { data: number[] }) => {
    console.log("render");
    let result = 0;
    for (let i = 0; i < data.length; i++) {
      result += data[i];
    }
    return <div>Result: {result}</div>;
  },
  (prev, next) => {
    return prev.data === next.data;
  },
);

MyExpensiveComponent.displayName = "MyExpensiveComponent";

const MyApp = () => {
  const [data, setData] = useState(range(0, 10000000));
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setData([...data, data.length + 1])}>
        Add data
      </button>
      <button onClick={() => setCounter(counter + 1)}>Increment counter</button>
      <MyExpensiveComponent data={data} />
      {/*<MyExpensiveComponent data={data} />*/}
      counter: {counter}
    </div>
  );
};

export default MyApp;
