import api from "./axios";

// Feed (list)
export const fetchPosts = async () => {
  const response = await api.get("posts/");
  return response.data;
};

// Post Detail (single post)
export const getPostById = async (postId) => {
  const response = await api.get(`posts/${postId}/`);
  return response.data;
};
