import { useEffect, useState } from "react";
import api from "../api/axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("posts/")
      .then((res) => setPosts(res.data))
      .catch(() => setError("Failed to load posts"));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h2>Feed</h2>

      {posts.length === 0 && <p>No posts yet</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <p>{post.content}</p>
          <small>Author ID: {post.author}</small>
        </div>
      ))}
    </div>
  );
};

export default Feed;
