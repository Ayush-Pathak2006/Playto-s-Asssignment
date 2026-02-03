import api from "./axios";

export const createComment = (data) => {
  return api.post("comments/", data);
};

export const updateComment = (id, content) => {
  return api.patch(`comments/${id}/`, { content });
};
