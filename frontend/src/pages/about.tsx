import { useEffect, useState } from "react";
import { api } from "../libs/api";

function AboutPage() {
  type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };

  const [posts, setPosts] = useState<Post[]>([]);

  async function getPosts() {
    const response = await api.get("/home");
    console.log(response.data);
    setPosts(response.data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1> About Page</h1>
      {posts.map((value) => {
        return (
          <div style={{ borderBottom: "2px solid black" }}>
            <h1>{value.title}</h1>
            <h1>{value.body}</h1>
          </div>
        );
      })}
    </>
  );
}

export default AboutPage;
