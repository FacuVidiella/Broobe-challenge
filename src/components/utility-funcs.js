import axios from "axios";

export const setLocalStorage = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key, opts) => {
  let storage = JSON.parse(localStorage.getItem(key));
  if (!opts) return storage;
};

export const getPriorities = async (token) => {
  return await axios({
    method: "get",
    url: "https://challenge.broobe.net/api/v1/priorities",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((err) => err);
};

export const getIssues = async (token) => {
  return await axios({
    method: "get",
    url: "https://challenge.broobe.net/api/v1/issues",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data.sort((a, b) => a.priority_id - b.priority_id))
    .catch((err) => err);
};

export const deleteIssue = async (token, id) => {
  try {
    await axios({
      method: "delete",
      url: `https://challenge.broobe.net/api/v1/issues/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
  return null;
};
