import React from "react";
import { Redirect } from "react-router-dom";

import { Auth } from "../context";
import Profile from "../components/Profile";

const ProfilePage = () => (
  <Auth.Consumer>
    {({ user, isLoggedIn }) => {
      console.log(user, isLoggedIn);
      return isLoggedIn ? (
        <div>
          <h2>Welcome to React RBAC.</h2>
          <Profile />
        </div>
      ) : (
        <Redirect to="/" />
      );
    }}
  </Auth.Consumer>
);

export default ProfilePage;
