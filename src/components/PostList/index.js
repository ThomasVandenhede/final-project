import React from "react";
import PropTypes from "prop-types";

import Post from "../Post";

const PostList = ({ posts }) =>
  posts.length ? (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
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
