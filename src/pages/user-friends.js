import React from "react";

import { Auth } from "../context";

const FriendsPage = props => (
  <Auth.Consumer>
    {({ isLoggedIn }) => (
      <div>
        <p>dfqsdf</p>
        hello
      </div>
    )}
  </Auth.Consumer>
);

export default FriendsPage;
