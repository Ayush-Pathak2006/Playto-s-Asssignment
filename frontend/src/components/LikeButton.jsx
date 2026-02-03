import { useState } from "react";

const LikeButton = ({ onLike, count, liked }) => {
  return (
    <button
      onClick={onLike}
      style={{
        marginTop: "8px",
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        cursor: "pointer",
        backgroundColor: liked ? "#2563eb" : "#f3f4f6",
        color: liked ? "white" : "black",
      }}
    >
      👍 {count}
    </button>
  );
};

export default LikeButton;
