import { useState, useEffect } from "react";

export function Counter() {
  //   const [count, setCount] = useState<number>(0); // 3
  //   let data : any = [];
  const [data, setData] = useState(); // 0 => 1

  async function getData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    setData(await response.json());
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCount(count + 1);
    // }, 1000);

    // return () => {
    //   clearInterval(interval);
    // };

    getData();
  }, []);

  //   return <h1>{count}</h1>;
  return <>{JSON.stringify(data)}</>;
}
