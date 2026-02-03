import Comment from "./Comment";
import LikeButton from "./LikeButton";
import { likePost } from "../api/likes.api";

const Post = ({ post }) => {
  const handleLike = () => likePost(post.id);

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "16px", padding: "12px" }}>
      <h3>{post.author.username}</h3>
      <p>{post.content}</p>

      <LikeButton
        onLike={handleLike}
        initialCount={post.like_count || 0}
      />

      <div style={{ marginLeft: "20px" }}>
        {post.comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Post;
