import React from "react";

import * as S from "./styles";

const UserAvatar = ({ user }) => (
  <S.Avatar src={user.picture} height="40" width="40" alt="user avatar" />
);

const UserLink = ({ user }) => (
  <>
    <UserAvatar user={user} />
    <span>{user.username}</span>
  </>
);

export default UserLink;
