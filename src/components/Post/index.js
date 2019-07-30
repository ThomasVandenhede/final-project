import React from "react";
import { Card, Media } from "react-bootstrap";
import moment from "moment";
import styled from "styled-components";

import { postType } from "../../types";
import UserAvatar from "../UserAvatar";

const S = {
  CardText: styled(Card.Text)`
    white-space: pre-wrap;
  `
};

const Post = ({ post }) => (
  <Card style={{ marginBottom: "1rem" }}>
    <Card.Body>
      <Media>
        <UserAvatar size={36} user={post.author} />
        <Media.Body>
          <Card.Title>{post.author.username}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {moment(post.createdAt).fromNow()}
          </Card.Subtitle>
        </Media.Body>
      </Media>
      <S.CardText>{post.body}</S.CardText>
    </Card.Body>
  </Card>
);

Post.propTypes = {
  post: postType
};

export default Post;
