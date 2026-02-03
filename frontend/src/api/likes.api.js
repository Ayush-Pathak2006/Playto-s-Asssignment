import api from "./axios"

export const togglePostLike = (postId) => {
  return api.post(`/likes/posts/${postId}/`)
}


export const likeComment = async (commentId) => {
  const response = await api.post(`likes/comments/${commentId}/`);
  return response.data;
};
