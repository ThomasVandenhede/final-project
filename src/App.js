import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ChatPage from "./pages/chat";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile";
import AuthPage from "./pages/auth";
import ForgotPasswordPage from "./pages/forgot-password";
import PasswordResetPage from "./pages/password-reset";
import { Auth } from "./context";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => (
  <Auth.Provider>
    <Router>
      <div className="App">
        <Header />

        <main>
          <div className="jumbotron container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route path="/password-reset" component={PasswordResetPage} />
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/chat" component={ChatPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/auth" component={AuthPage} />
            </Switch>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  </Auth.Provider>
);

export default App;
