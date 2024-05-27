import { useMemo, useState } from "react";

export function TestMemo() {
  const [count, setCount] = useState<number>(0);

  const countMemo = useMemo(() => {
    return count + 2;
  }, [count]);

  return (
    <>
      <h1>{countMemo}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
    </>
  );
}
