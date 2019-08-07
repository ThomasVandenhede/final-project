import React, { useState, createContext } from "react";
import * as api from "../api";

const AuthContext = createContext({
  isLoggedIn: false, // to check if isLoggedIn or not
  currentUser: {}, // store all the current user details
  token: "", // token of current user
  login: () => {}, // start login process
  signup: () => {}, // start signup process
  logout: () => {} // logout the current user
});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || {
      isLoggedIn: false,
      currentUser: {
        role: "visitor"
      },
      token: ""
    }
  );

  const login = data => {
    return api.login(data).then(res => {
      const { user: currentUser, token } = res.data;

      const auth = {
        isLoggedIn: true,
        currentUser,
        token
      };
      localStorage.setItem("auth", JSON.stringify(auth, (key, value) => value));
      setAuth(auth);
    });
  };

  const updateUser = ({ data, userId, token }) => {
    return api.updateUser({ data, userId, token }).then(res => {
      const user = res.data;

      const auth = JSON.parse(localStorage.getItem("auth"));
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...auth,
          currentUser: user
        })
      );

      setAuth({
        ...auth,
        currentUser: user
      });
    });
  };

  const signup = data => {
    return api.createUser(data).then(res => {
      const { user, token } = res.data;

      const auth = {
        isLoggedIn: true,
        currentUser: user,
        token
      };
      localStorage.setItem("auth", JSON.stringify(auth, (key, value) => value));
      setAuth(auth);
    });
  };

  const logout = () => {
    localStorage.removeItem("auth");

    setAuth({
      isLoggedIn: false,
      currentUser: {
        role: "visitor"
      },
      token: ""
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login: login,
        signup: signup,
        logout: logout,
        updateUser: updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;
export const Context = AuthContext;
