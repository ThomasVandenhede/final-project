import React from "react";
import { Redirect } from "react-router-dom";

import { Auth } from "../context";

const HomePage = () => (
  <Auth.Consumer>
    {({ isLoggedIn }) =>
      isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/auth" />
    }
  </Auth.Consumer>
);

export default HomePage;
