import axios from "axios";
import { useEffect, useState } from "react";

export default function PostPage() {
  const [, setData] = useState();
  const [counter, setCounter] = useState<number>(0);

  async function getData() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );

      setData(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("gagal mengambil data");
      }
    }
  }

  useEffect(() => {
    // componentDidMount => yang pertama kali dijalankan ketika pertama kali di render
    getData();

    return () => {
      // componentWillUnmount
    };
  }, [counter]); // componentDidUpdate

  return (
    <>
      <h1 style={{ color: "white" }}>{counter}</h1>
      <button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={() => setCounter((prev) => prev + 1)}
      >
        tambah
      </button>
    </>
  );
}
