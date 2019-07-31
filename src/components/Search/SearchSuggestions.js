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
  min-height: 50px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1;
  box-shadow: 1px 3px 20px 0 rgba(0, 0, 0, 0.1);
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

const SearchSuggestions = ({ users, onSuggestionClick }) => (
  <UserListContainer>
    <UserList>
      {users.map(user => (
        <UserListItem key={user.id}>
          <Link to={`/users/${user.id}`} onClick={() => onSuggestionClick()}>
            <UserAvatar user={user} size={30} />
            {user.username}
          </Link>
        </UserListItem>
      ))}
    </UserList>
  </UserListContainer>
);

export default SearchSuggestions;
