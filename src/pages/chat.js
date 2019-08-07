import React, { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";

import ChatUsers from "../components/ChatUsers";
import ChatBox from "../components/ChatBox";
import { Auth } from "../context";
import * as api from "../api";

const ChatPage = () => {
  // STATE
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [username, setUsername] = useState("");

  // CONTEXT
  const { currentUser } = useContext(Auth.Context);

  // REF
  let socketRef = useRef(
    io(process.env.REACT_APP_API_URL, { autoConnect: false })
  );

  // Connect and disconnect socket.io
  useEffect(() => {
    const socket = socketRef.current;
    socket.connect();
    socket.emit("connected", currentUser.username);

    return () => socket.disconnect();
  }, [currentUser.username]);

  useEffect(() => {
    const addMessage = data => {
      setMessages([...messages, data]);
    };
    setUsername(currentUser.username);
    api.fetchChatMessages().then(res => {
      setMessages(res.data);
    });
    socketRef.current.on("chat", data => {
      addMessage(data);
    });
    socketRef.current.on("connectedUsers", data => {
      setUsernames([...new Set(data)]);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();
    socketRef.current.emit("chat", {
      username,
      message
    });
    setMessage("");
  };

  const handleChange = event => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <h2>Bienvenue sur le Tchat</h2>

      <div className="row">
        <div className="col-4">
          <ChatUsers user={currentUser} usernames={usernames} />
        </div>

        <div className="col-8">
          <ChatBox
            user={currentUser}
            messages={messages}
            message={message}
            onChange={handleChange}
            onSubmit={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
