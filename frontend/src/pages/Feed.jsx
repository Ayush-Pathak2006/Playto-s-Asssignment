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

  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        {error}
      </p>
    );

  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      {/* LEFT: FEED */}
      <div className="w-3/4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Feed
        </h2>

        {posts.length === 0 && (
          <p className="text-gray-500">
            No posts yet
          </p>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* RIGHT: LEADERBOARD */}
      <div className="w-1/4">
        <Leaderboard />
      </div>
    </div>

    
  );
};

export default Feed;
