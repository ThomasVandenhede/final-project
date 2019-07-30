import React from "react";
import PropTypes from "prop-types";

import * as S from "./styles";

const UserAvatar = ({ user, size }) => (
  <S.Avatar src={user.picture} height={size} width={size} alt="user avatar" />
);

UserAvatar.propTypes = {
  size: PropTypes.number
};

UserAvatar.defaultProps = {
  size: 40
};

export default UserAvatar;
