import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import UserAvatar from "../UserAvatar";

const UserListContainer = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid #ced4da;
  border-top: none;
  padding: 1rem;
  height: 400px;
  overflow-y: auto;
`;

const UserList = styled.ul`
  padding-left: 0;
  margin: 0;
  list-style: none;
`;

const UserListItem = styled.li`
  display: flex;
  align-items: center;
  height: 40px;
`;

const SearchSuggestions = ({ users }) => (
  <UserListContainer>
    <h4>Utilisateurs</h4>

    <UserList>
      {users.map(user => (
        <UserListItem key={user.id}>
          <Link to={`/${user.id}`}>
            <UserAvatar user={user} size={30} />
            {user.username}
          </Link>
        </UserListItem>
      ))}
    </UserList>
  </UserListContainer>
);

export default SearchSuggestions;
