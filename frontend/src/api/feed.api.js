import api from "./axios";

export const fetchPosts = async () => {
  const response = await api.get("posts/");
  return response.data;
};
