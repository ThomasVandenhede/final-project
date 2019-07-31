import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import NavLink from "react-bootstrap/NavLink";

import UserLink from "../UserLink";
import Search from "../Search";
import { Auth } from "../../context";

const Navigation = props => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Auth.Consumer>
      {({ isLoggedIn, currentUser, logout }) => (
        <Navbar
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          bg="light"
          expand="lg"
          style={{ marginBottom: "1rem" }}
        >
          <Container>
            <Navbar.Brand>
              <Link to="/">Logo</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <IndexLinkContainer to="/" onClick={() => setExpanded(false)}>
                  <NavLink>Accueil</NavLink>
                </IndexLinkContainer>
                {isLoggedIn && (
                  <LinkContainer to="/chat" onClick={() => setExpanded(false)}>
                    <NavLink>Discussion</NavLink>
                  </LinkContainer>
                )}
                <LinkContainer to="/about" onClick={() => setExpanded(false)}>
                  <NavLink>À propos</NavLink>
                </LinkContainer>
              </Nav>
              {isLoggedIn && <Search />}

              {isLoggedIn && (
                <NavDropdown
                  title={<UserLink user={currentUser} />}
                  id="basic-nav-dropdown"
                >
                  <LinkContainer to={`/users/${currentUser.id}`}>
                    <NavDropdown.Item>Mon profil</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/friends">
                    <NavDropdown.Item>Mes amis</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <NavDropdown.Item>Paramètres</NavDropdown.Item>
                  </LinkContainer>
                  {currentUser.role === "admin" && (
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
          </Container>
        </Navbar>
      )}
    </Auth.Consumer>
  );
};

export default withRouter(Navigation);
