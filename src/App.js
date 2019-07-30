import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ChatPage from "./pages/chat";
import ProfilePage from "./pages/profile";
import AuthPage from "./pages/auth";
import ForgotPasswordPage from "./pages/forgot-password";
import PasswordResetPage from "./pages/password-reset";
import FriendsPage from "./pages/user-friends";
import SettingsPage from "./pages/user-settings";
import NoMatch from "./pages/404.js";
import { Auth } from "./context";

import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => (
  <Auth.Provider>
    <Router>
      <Header />

      <main>
        <div className="jumbotron container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <Route path="/password-reset" component={PasswordResetPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/users/:id" component={ProfilePage} />
            <Route path="/friends" component={FriendsPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </main>

      <Footer />
    </Router>
  </Auth.Provider>
);

export default App;
