import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { Auth } from "../context";

const HomePage = () => {
  const { currentUser, isLoggedIn } = useContext(Auth.Context);

  return isLoggedIn ? (
    <Redirect to={`/users/${currentUser.id}`} />
  ) : (
    <Redirect to="/auth" />
  );
};

export default HomePage;
