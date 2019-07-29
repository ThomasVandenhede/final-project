import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import NavLink from "react-bootstrap/NavLink";

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
            <LinkContainer to="/about">
              <NavLink>À Propos</NavLink>
            </LinkContainer>
            {isLoggedIn && (
              <LinkContainer to="/chat">
                <NavLink>Chat</NavLink>
              </LinkContainer>
            )}
          </Nav>
          {isLoggedIn && (
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          )}

          {isLoggedIn && (
            <NavDropdown
              title={
                <>
                  <img src={user.picture} alt="user avatar" />
                  <span>{user.username}</span>
                </>
              }
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>Mon profil</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/friends">
                <NavDropdown.Item>Mes amis</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin">
                <NavDropdown.Item>Admin</NavDropdown.Item>
              </LinkContainer>
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
