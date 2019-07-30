import axios from "axios";

export const login = data => {
  return axios.post(
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
};

export const createUser = data => {
  return axios.post(`${process.env.REACT_APP_API_URL}/users`, {
    access_token: process.env.REACT_APP_API_KEY,
    ...data
  });
};

export const fetchWithToken = ({ url, token }) =>
  axios.get(url, {
    params: {
      access_token: token
    }
  });

export const fetchUsers = ({ token }) => {
  return fetchWithToken({
    url: `${process.env.REACT_APP_API_URL}/users`,
    token
  });
};

export const sendPasswordResetEmail = email => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/password-resets`,
    { email, link: `${window.location.origin}/password-reset` },
    {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
    }
  );
};

export const resetPassword = ({ password, token }) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/password-resets/${token}`,
    {
      password
    }
  );
};
