import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

import { Auth } from "../context";

class AuthPage extends React.Component {
  render() {
    return (
      <Auth.Consumer>
        {({ isLoggedIn, login }) =>
          isLoggedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <div>
              <h2>Connectez-vous ou Inscrivez-vous</h2>

              <h3>Connexion</h3>
              <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Connexion">
                  <LoginForm login={login} />
                </Tab>

                <Tab eventKey="signup" title="Inscription">
                  <SignupForm />
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
