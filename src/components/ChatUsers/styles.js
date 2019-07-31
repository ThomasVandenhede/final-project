import styled from "styled-components";

export const ChatUsersBox = styled.div`
  height: 400px;
  overflow: auto;
  background-color: white;
  padding: 1rem;
`;

export const ChatUserList = styled.ul`
  padding-left: 0;
  list-style: none;
`;

export const ChatUser = styled.li`
  color: ${props => (props.isMe ? "red" : "green")};
`;
