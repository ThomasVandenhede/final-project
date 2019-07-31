import React, { Component } from "react";
import io from "socket.io-client";

import ChatUsers from "../components/ChatUsers";
import ChatBox from "../components/ChatBox";
import { Auth } from "../context";
import * as api from "../api";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.socket = io(process.env.REACT_APP_API_URL);
    this.socket.on("chat", data => {
      this.addMessage(data);
    });
    this.socket.on("connectedUsers", data => {
      this.setState({
        usernames: [...new Set(data)]
      });
    });

    this.state = {
      usernames: [],
      username: "",
      message: "",
      messages: []
    };
  }

  componentDidMount() {
    this.setState(
      {
        username: this.context.currentUser.username
      },
      () => {
        this.socket.emit("connected", this.state.username);
      }
    );

    api.fetchChatMessages().then(res => {
      this.setState({ messages: res.data });
    });
  }

  addMessage = data => {
    this.setState({ messages: [...this.state.messages, data] });
  };

  sendMessage = event => {
    event.preventDefault();
    this.socket.emit("chat", {
      username: this.state.username,
      message: this.state.message
    });
    this.setState({ message: "" });
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <Auth.Consumer>
        {({ currentUser }) => (
          <div>
            <h2>Bienvenue sur le Chat</h2>

            <div className="row">
              <div className="col-4">
                <ChatUsers
                  user={currentUser}
                  usernames={this.state.usernames}
                />
              </div>

              <div className="col-8">
                <ChatBox
                  user={currentUser}
                  messages={this.state.messages}
                  message={this.state.message}
                  onChange={this.handleChange}
                  onSubmit={this.sendMessage}
                />
              </div>
            </div>
          </div>
        )}
      </Auth.Consumer>
    );
  }
}

ChatPage.contextType = Auth.Context;

export default ChatPage;
