import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/posts/${post.id}`)}
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "16px",
        cursor: "pointer"
      }}
    >
      <h3>{post.author.username}</h3>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
