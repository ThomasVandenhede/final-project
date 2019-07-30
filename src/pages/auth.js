import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

import { Auth } from "../context";

class AuthPage extends Component {
  render() {
    return (
      <Auth.Consumer>
        {({ currentUser, isLoggedIn, login, signup }) =>
          isLoggedIn ? (
            <Redirect to={`/users/${currentUser.id}`} />
          ) : (
            <div>
              <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Connexion">
                  <LoginForm login={login} />
                </Tab>

                <Tab eventKey="signup" title="Inscription">
                  <SignupForm signup={signup} />
                </Tab>
              </Tabs>
            </div>
          )
        }
      </Auth.Consumer>
    );
  }
}

export default AuthPage;
