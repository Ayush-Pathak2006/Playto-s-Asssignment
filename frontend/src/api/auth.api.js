import api from "./axios";

export const loginUser = async (username, password) => {
  const res = await api.post("auth/login/", {
    username,
    password,
  });

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);

  return res.data;
};

export const registerUser = async (username, password) => {
  const res = await api.post("auth/register/", {
    username,
    password,
  });

  return res.data;
};
