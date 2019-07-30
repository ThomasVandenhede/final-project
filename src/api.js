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
