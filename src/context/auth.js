import React, { Component, createContext } from "react";
import * as api from "../api";

const AuthContext = createContext({
  isLoggedIn: false, // to check if isLoggedIn or not
  currentUser: {}, // store all the current user details
  token: "", // token of current user
  login: () => {}, // start login process
  signup: () => {}, // start signup process
  logout: () => {} // logout the current user
});

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("auth")) || {
      isLoggedIn: false,
      currentUser: {
        role: "visitor"
      },
      token: ""
    };
  }

  login = data => {
    return api.login(data).then(res => {
      const { user: currentUser, token } = res.data;

      const auth = {
        isLoggedIn: true,
        currentUser,
        token
      };
      localStorage.setItem("auth", JSON.stringify(auth, (key, value) => value));
      this.setState(auth);
    });
  };

  updateUser = ({ data, userId, token }) => {
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

      this.setState({
        currentUser: user
      });
    });
  };

  signup = data => {
    return api.createUser(data).then(res => {
      const { user, token } = res.data;

      const auth = {
        isLoggedIn: true,
        currentUser: user,
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
      currentUser: {
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
          logout: this.logout,
          updateUser: this.updateUser
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
