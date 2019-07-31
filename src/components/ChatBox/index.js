import React from "react";
import moment from "moment";
import * as S from "./styles";
export { S };

const ChatBox = ({
  user,
  messages,
  message: inputMessage,
  onChange,
  onSubmit
}) => (
  <S.ChatBox>
    <S.ChatMessages>
      {messages.map(message => {
        console.log(user.username === message.username);
        return (
          <S.ChatMessage
            key={message.createdAt}
            isMe={user.username === message.username}
          >
            <span>
              {message.username}{" "}
              {moment(message.createdAt).format("[le] DD/MM/YY [à] HH[h]mm")}
            </span>
            <div>{message.message}</div>
          </S.ChatMessage>
        );
      })}
    </S.ChatMessages>
    <div>
      <form onSubmit={onSubmit}>
        <S.ChatInput
          type="text"
          name="message"
          placeholder="Entrez votre message"
          onChange={onChange}
          value={inputMessage}
        />
      </form>
    </div>
  </S.ChatBox>
);

export default ChatBox;
