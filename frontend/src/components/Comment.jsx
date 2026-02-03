import LikeButton from "./LikeButton";
import { likeComment } from "../api/likes.api";

const Comment = ({ comment }) => {
  const handleLike = () => likeComment(comment.id);

  return (
    <div style={{ marginTop: "8px", paddingLeft: "12px", borderLeft: "2px solid #ddd" }}>
      <p>
        <strong>{comment.author.username}</strong>: {comment.content}
      </p>

      <LikeButton
        onLike={handleLike}
        initialCount={comment.like_count || 0}
      />

      {comment.replies?.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
