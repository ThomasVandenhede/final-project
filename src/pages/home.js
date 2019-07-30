import React from "react";
import { Redirect } from "react-router-dom";

import { Auth } from "../context";

const HomePage = () => (
  <Auth.Consumer>
    {({ currentUser, isLoggedIn }) =>
      isLoggedIn ? (
        <Redirect to={`/users/${currentUser.id}`} />
      ) : (
        <Redirect to="/auth" />
      )
    }
  </Auth.Consumer>
);

export default HomePage;
