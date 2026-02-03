const LikeButton = ({ onLike, count, liked }) => {
  return (
    <button
      onClick={onLike}
      className={`
        mt-2 px-3 py-1.5 rounded-md border text-sm font-medium
        transition-colors duration-200
        ${
          liked
            ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
        }
      `}
    >
      👍 {count}
    </button>
  );
};

export default LikeButton;
