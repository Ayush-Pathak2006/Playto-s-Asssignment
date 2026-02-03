import { useEffect, useState } from "react";
import { fetchPosts } from "../api/feed.api";
import Post from "../components/Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, []);

  if (loading) return <p>Loading feed...</p>;

  return (
    <div>
      <h1>Community Feed</h1>

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
