import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { Auth } from "../../context";
import * as api from "../../api";

const PostForm = ({ isMe, user, addPost, location }) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(Auth.Context);

  const handleSubmit = event => {
    const userId = location.pathname.split("/").pop();

    event.preventDefault();
    event.stopPropagation();

    api
      .createPost({
        userId,
        authorId: currentUser.id,
        body: message
      })
      .then(res => {
        const post = res.data;

        setMessage("");
        addPost(post);
      });
  };

  return (
    <Form style={{ marginBottom: "2rem" }} onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          rows="2"
          placeholder={
            isMe ? "Exprime-toi..." : `Dis quelque chose à ${user.username}...`
          }
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        {isMe ? "Publier" : "Partager"}
      </Button>
    </Form>
  );
};

export default withRouter(PostForm);
