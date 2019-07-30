import React from "react";
import { Redirect } from "react-router-dom";

import { Auth } from "../context";

const SettingsPage = () => (
  <Auth.Consumer>
    {({ isLoggedIn }) =>
      isLoggedIn ? (
        <div>
          <h2>settings</h2>
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  </Auth.Consumer>
);

export default SettingsPage;
