import React, { Component, createContext } from "react";
import * as api from "../api";

const AuthContext = createContext({
  isLoggedIn: false, // to check if isLoggedIn or not
  user: {}, // store all the user details
  token: "", // token of user
  login: () => {}, // start login process
  signup: () => {}, // start signup process
  logout: () => {} // logout the user
});

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("auth")) || {
      isLoggedIn: false,
      user: {
        role: "visitor"
      },
      token: ""
    };
  }

  login = data => {
    return api.login(data).then(res => {
      const { user, token } = res.data;

      const auth = {
        isLoggedIn: true,
        user,
        token
      };
      localStorage.setItem("auth", JSON.stringify(auth, (key, value) => value));
      this.setState(auth);
    });
  };

  signup = data => {
    return api.createUser(data).then(res => {
      const { user, token } = res.data;

      const auth = {
        isLoggedIn: true,
        user,
        token
      };
      localStorage.setItem("auth", JSON.stringify(auth, (key, value) => value));
      this.setState(auth);
    });
  };

  logout = () => {
    localStorage.removeItem("auth");

    this.setState({
      isLoggedIn: false,
      user: {
        role: "visitor"
      },
      token: ""
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          signup: this.signup,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;
export const Context = AuthContext;
