import React from "react";

import { Auth } from "../../context";

const Profile = () => (
  <Auth.Consumer>
    {({ user }) => (
      <div>
        <h2>User Profile</h2>
        <ul>
          <li>ID: {user.id}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
        </ul>
      </div>
    )}
  </Auth.Consumer>
);

export default Profile;
