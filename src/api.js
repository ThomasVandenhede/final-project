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
