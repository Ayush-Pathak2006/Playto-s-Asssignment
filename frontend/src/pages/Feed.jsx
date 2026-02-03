import { useEffect, useState } from "react";
import api from "../api/axios";
import Post from "../components/Post";
import Leaderboard from "../components/Leaderboard";

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
    <div style={{ display: "flex", gap: "24px" }}>
       <div style={{ flex: 3 }}>
      <h2>Feed</h2>

      {posts.length === 0 && <p>No posts yet</p>}

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
    {/* RIGHT: LEADERBOARD */}
    <div style={{ flex: 1 }}>
      <Leaderboard />
    </div>
    </div>

  );
};

export default Feed;
