import { useEffect, useState } from "react";
import api from "../api/axios";
import Post from "../components/Post";

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
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
