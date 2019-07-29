import React from "react";
import { postType } from "../../types";

const Post = ({ post }) => (
  <li>
    <header>{post.author && post.author.name}</header>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
    <footer>{post.timestamp}</footer>
  </li>
);

Post.propTypes = {
  post: postType
};

export default Post;
