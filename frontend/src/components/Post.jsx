import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/posts/${post.id}`)}
      className="
        bg-white
        border
        rounded-lg
        p-4
        mb-4
        cursor-pointer
        shadow-sm
        hover:shadow-md
        transition-shadow
      "
    >
      <h3 className="font-semibold text-gray-800 mb-1">
        {post.author.username}
      </h3>

      <p className="text-gray-700">
        {post.content}
      </p>
    </div>
  );
};

export default Post;
