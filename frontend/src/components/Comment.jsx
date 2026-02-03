import LikeButton from "./LikeButton";
import { likeComment } from "../api/likes.api";

const Comment = ({ comment }) => {
  const handleLike = () => likeComment(comment.id);

  return (
    <div className="mt-3 pl-4 border-l-2 border-gray-200">
      <div className="bg-gray-50 rounded p-3">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">
            {comment.author.username}
          </span>
          : {comment.content}
        </p>

        <div className="mt-2">
          <LikeButton
            onLike={handleLike}
            initialCount={comment.like_count || 0}
          />
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
