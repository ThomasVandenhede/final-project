import styled from "styled-components";

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  padding: 1em;
  overflow: auto;
  background-color: white;
`;

export const ChatMessages = styled.ul`
  padding-left: 0;
  list-style: none;
  flex: 1;
`;

export const ChatMessage = styled.li`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isMe ? "flex-end" : "flex-start")};

  span {
    font-size: 0.9rem;
    font-weight: bold;
    color: gray;
  }

  div {
    padding: 0.5rem 1rem;
    background: ${props =>
      props.isMe ? "rgba(255, 230, 255)" : "rgba(230, 255, 230)"};
    border-radius: ${props =>
      props.isMe ? "10px 0 10px 10px" : "0 10px 10px 10px"};
  }
`;

export const ChatInput = styled.input`
  width: 100%;
`;
