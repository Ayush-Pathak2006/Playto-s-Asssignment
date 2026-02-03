import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LikeButton from "../components/LikeButton";
import { togglePostLike } from "../api/likes.api";
import { getPostById } from "../api/feed.api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);

 useEffect(() => {
  const fetchPost = async () => {
    try {
      const data = await getPostById(id);
      console.log("Post detail response:", data); // DEBUG
      setPost(data);
    } catch (err) {
      console.error("Failed to load post", err);
      setPost(null);
    }
  };

  fetchPost();
}, [id]);

  const handleLike = async () => {
    const res = await togglePostLike(id);
    setLiked(res.data.liked);
    setPost(prev => ({
      ...prev,
      like_count: res.data.like_count
    }));
  };
  
  if (post === null) return <p>Post not found</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "16px" }}>
      <h2>{post.author.username}</h2>
      <p>{post.content}</p>

      {/* LIKE BUTTON IS HERE */}
      <LikeButton
        onLike={handleLike}
        count={post.like_count}
        liked={liked}
      />
    </div>
  );
};

export default PostDetail;
