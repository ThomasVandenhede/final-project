import React from "react";

import UserAvatar from "../UserAvatar";

const UserLink = ({ user }) => (
  <>
    <UserAvatar user={user} />
    <span>{user.username}</span>
  </>
);

export default UserLink;
