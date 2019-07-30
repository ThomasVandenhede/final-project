import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  InputGroup
} from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import NavLink from "react-bootstrap/NavLink";

import UserLink from "../UserLink";
import Search from "../Search";
import { Auth } from "../../context";

const Navigation = props => (
  <Auth.Consumer>
    {({ isLoggedIn, user, logout }) => (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">Logo</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <IndexLinkContainer to="/">
              <NavLink>Accueil</NavLink>
            </IndexLinkContainer>
            {isLoggedIn && (
              <LinkContainer to="/chat">
                <NavLink>Chat</NavLink>
              </LinkContainer>
            )}
            <LinkContainer to="/about">
              <NavLink>À Propos</NavLink>
            </LinkContainer>
          </Nav>
          {isLoggedIn && <Search />}

          {isLoggedIn && (
            <NavDropdown
              title={<UserLink user={user} />}
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>Mon profil</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/friends">
                <NavDropdown.Item>Mes amis</NavDropdown.Item>
              </LinkContainer>
              {user.role === "admin" && (
                <LinkContainer to="/admin">
                  <NavDropdown.Item>Admin</NavDropdown.Item>
                </LinkContainer>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  logout();
                  props.history.push("/");
                }}
              >
                Déconnexion
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Navbar>
    )}
  </Auth.Consumer>
);

export default withRouter(Navigation);
