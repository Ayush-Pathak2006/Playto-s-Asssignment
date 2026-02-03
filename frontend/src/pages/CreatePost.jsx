import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Post cannot be empty");
      return;
    }

    try {
      await api.post("posts/", { content });
      navigate("/");
    } catch {
      setError("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Create Post
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            className="
              w-full
              border
              border-gray-300
              rounded-md
              px-3
              py-2
              mb-4
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-md
              hover:bg-blue-700
              transition
            "
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
