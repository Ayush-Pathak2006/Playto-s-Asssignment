import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LikeButton from "../components/LikeButton";
import { togglePostLike, likeComment } from "../api/likes.api";
import { getPostById } from "../api/feed.api";
import api from "../api/axios";

/* =======================
   CommentItem (recursive)
   ======================= */
const CommentItem = ({ comment, currentUserId, refreshPost, postId }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.like_count || 0);

  const handleReply = async () => {
    if (!replyText.trim()) return;

    await api.post("/comments/", {
      post: postId,
      parent: comment.id,
      content: replyText,
    });

    setReplyText("");
    setShowReply(false);
    refreshPost();
  };

  const handleEdit = async () => {
    if (!editText.trim()) return;

    await api.patch(`/comments/${comment.id}/`, {
      content: editText,
    });

    setIsEditing(false);
    refreshPost();
  };

  const handleLike = async () => {
    const res = await likeComment(comment.id);
    setLiked(res.liked);
    setLikeCount(res.like_count);
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "12px" }}>
      <p>
        <strong>{comment.author.username}</strong>
      </p>

      {!isEditing ? (
        <p>{comment.content}</p>
      ) : (
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      )}

      <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
        <button onClick={handleLike}>👍 {likeCount}</button>

        <button onClick={() => setShowReply(!showReply)}>Reply</button>

        {comment.author.id === currentUserId && (
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}

        {isEditing && <button onClick={handleEdit}>Save</button>}
      </div>

      {showReply && (
        <div style={{ marginTop: "8px" }}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <br />
          <button onClick={handleReply}>Submit Reply</button>
        </div>
      )}

      {/* Recursive replies */}
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          currentUserId={currentUserId}
          refreshPost={refreshPost}
          postId={postId}
        />
      ))}
    </div>
  );
};

/* =======================
   CommentList
   ======================= */
const CommentList = ({ comments, currentUserId, refreshPost, postId }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return comments.map((comment) => (
    <CommentItem
      key={comment.id}
      comment={comment}
      currentUserId={currentUserId}
      refreshPost={refreshPost}
      postId={postId}
    />
  ));
};

/* =======================
   PostDetail (MAIN)
   ======================= */
const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  const currentUserId = Number(localStorage.getItem("user_id")); 
  // ⬆️ assumes you stored user_id on login

  const fetchPost = async () => {
    try {
      const data = await getPostById(id);
      setPost(data);
    } catch (err) {
      console.error("Failed to load post", err);
      setPost(null);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  /* ===== EXISTING POST LIKE (UNCHANGED) ===== */
  const handleLike = async () => {
    const res = await togglePostLike(id);
    setLiked(res.data.liked);
    setPost((prev) => ({
      ...prev,
      like_count: res.data.like_count,
    }));
  };

  /* ===== ADD NEW TOP-LEVEL COMMENT ===== */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    await api.post("/comments/", {
      post: id,
      content: newComment,
    });

    setNewComment("");
    fetchPost();
  };

  if (post === null) return <p>Post not found</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "16px" }}>
      <h2>{post.author.username}</h2>
      <p>{post.content}</p>

      {/* POST LIKE (UNCHANGED) */}
      <LikeButton
        onLike={handleLike}
        count={post.like_count}
        liked={liked}
      />

      <hr />

      {/* ADD COMMENT */}
      <h3>Add a comment</h3>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <br />
      <button onClick={handleAddComment}>Submit</button>

      <hr />

      {/* COMMENTS */}
      <h3>Comments</h3>
      <CommentList
        comments={post.comments}
        currentUserId={currentUserId}
        refreshPost={fetchPost}
        postId={id}
      />
    </div>
  );
};

export default PostDetail;
