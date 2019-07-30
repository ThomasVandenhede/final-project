import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { Auth } from "../../context";
import * as api from "../../api";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleSubmit = event => {
    const { currentUser: author } = this.context;
    const userId = this.props.location.pathname.split("/").pop();

    event.preventDefault();
    event.stopPropagation();

    api
      .createPost({
        userId,
        authorId: author.id,
        body: this.state.message
      })
      .then(res => {
        const post = res.data;

        this.setState({ message: "" });
        this.props.addPost(post);
      });
  };

  render() {
    const { isMe, user } = this.props;

    return (
      <Form style={{ marginBottom: "2rem" }} onSubmit={this.handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows="2"
            placeholder={
              isMe
                ? "Exprimez-vous"
                : `Dites quelque chose à ${user.username}...`
            }
            value={this.state.message}
            onChange={event => {
              this.setState({
                message: event.target.value
              });
            }}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          {isMe ? "Publier" : "Partager"}
        </Button>
      </Form>
    );
  }
}

PostForm.contextType = Auth.Context;

export default withRouter(PostForm);
