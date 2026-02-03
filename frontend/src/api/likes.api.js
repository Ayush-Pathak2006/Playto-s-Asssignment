import api from "./axios";

export const likePost = async (postId) => {
  const response = await api.post(`likes/posts/${postId}/`);
  return response.data;
};

export const likeComment = async (commentId) => {
  const response = await api.post(`likes/comments/${commentId}/`);
  return response.data;
};
