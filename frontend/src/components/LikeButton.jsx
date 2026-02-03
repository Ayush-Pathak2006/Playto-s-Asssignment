import { useState } from "react";

const LikeButton = ({ onLike, initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);

    // 🔥 optimistic update
    setCount((prev) => prev + 1);

    try {
      await onLike();
    } catch (err) {
      // rollback if something went wrong
      setCount((prev) => prev - 1);
      console.error("Like failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      👍 {count}
    </button>
  );
};

export default LikeButton;
