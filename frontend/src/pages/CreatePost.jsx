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
      navigate("/"); // go back to feed
    } catch {
      setError("Failed to create post");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Create Post</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          style={{ width: "100%", marginBottom: "12px" }}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
