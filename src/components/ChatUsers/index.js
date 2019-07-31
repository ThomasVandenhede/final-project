import React from "react";
import * as S from "./styles";

const ChatUsers = ({ user, usernames }) => (
  <S.ChatUsersBox>
    <strong>Utilisateurs connectés</strong>
    <S.ChatUserList>
      {usernames.map(username => (
        <S.ChatUser key={username} isMe={user.username === username}>
          {username}
        </S.ChatUser>
      ))}
    </S.ChatUserList>
  </S.ChatUsersBox>
);

export default ChatUsers;
