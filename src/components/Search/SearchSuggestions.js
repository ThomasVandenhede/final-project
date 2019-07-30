import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const UserListContainer = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid #ced4da;
  border-top: none;
  padding: 0.5rem;
  height: 400px;
  overflow-y: auto;
`;

const UserList = styled.ul`
  padding-left: 0;
  margin: 0;
  list-style: none;
`;

const SearchSuggestions = ({ users }) => (
  <UserListContainer>
    <p>Utilisateurs</p>

    <UserList>
      {users.map(user => (
        <li key={user.id}>
          <Link to={user.id}>{user.username}</Link>
        </li>
      ))}
    </UserList>
  </UserListContainer>
);

export default SearchSuggestions;
