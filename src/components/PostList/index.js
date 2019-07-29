import React from "react";
import PropTypes from "prop-types";

import Post from "../Post";

const PostList = ({ posts }) =>
  posts.length ? (
    <ul>
      {posts.map(post => (
        <Post post={post} />
      ))}
    </ul>
  ) : (
    <div>Aucune publication à afficher.</div>
  );

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes))
};

PostList.defaultProps = {
  posts: []
};

export default PostList;
