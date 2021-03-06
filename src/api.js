import axios from "axios";

export const login = data =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/auth`,
    {
      access_token: process.env.REACT_APP_API_KEY
    },
    {
      headers: {
        Authorization: "Basic " + btoa(data.email + ":" + data.password)
      }
    }
  );

export const createUser = data =>
  axios.post(`${process.env.REACT_APP_API_URL}/users`, {
    access_token: process.env.REACT_APP_API_KEY,
    ...data
  });

export const fetchWithToken = ({ url, token }) =>
  axios.get(url, {
    params: {
      access_token: token
    }
  });

export const updateWithToken = ({ data, url, token }) =>
  axios.put(url, { ...data, access_token: token });

export const updateUser = ({ data, userId, token }) => {
  const url = `${process.env.REACT_APP_API_URL}/users/${userId}`;
  return updateWithToken({ data, url, token });
};

export const fetchUsers = ({ token }) =>
  fetchWithToken({
    url: `${process.env.REACT_APP_API_URL}/users`,
    token
  });

export const sendPasswordResetEmail = email =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/password-resets`,
    { email, link: `${window.location.origin}/password-reset` },
    {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
    }
  );

export const resetPassword = ({ password, token }) =>
  axios.put(`${process.env.REACT_APP_API_URL}/password-resets/${token}`, {
    password
  });

export const fetchUser = userId =>
  axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`);

export const fetchUserPosts = userId =>
  axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}/posts`);

export const createPost = ({ userId, authorId, body }) =>
  axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
    body,
    userId,
    authorId
  });

export const fetchChatMessages = () =>
  axios.get(`${process.env.REACT_APP_API_URL}/chat`);

export const searchUsers = ({ q, token }) =>
  axios.get(`${process.env.REACT_APP_API_URL}/users/search`, {
    params: {
      q,
      access_token: token
    }
  });
