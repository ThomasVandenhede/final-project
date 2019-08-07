import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Profile from "../components/Profile";
import { Auth } from "../context";
import * as api from "../api";

const ProfilePage = ({ match }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const { currentUser } = useContext(Auth.Context);

  useEffect(() => {
    const loadUser = () => {
      const userId = match.params.id;

      return api.fetchUser(userId).then(res => {
        setUser(res.data);
      });
    };

    const loadInitialPosts = () => {
      const userId = match.params.id;

      setLoadingPosts(true);

      return api
        .fetchUserPosts(userId)
        .then(res => {
          const posts = res.data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setPosts(posts);
        })
        .catch(err => {
          console.debug(err);
        })
        .finally(setLoadingPosts(false));
    };

    setIsMe(match.params.id === currentUser.id);
    loadUser();
    loadInitialPosts();
  }, [match.params.id, currentUser.id]);

  const addPost = newPost => {
    const newPosts = [...posts, newPost].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setPosts(newPosts);
  };

  return (
    <Container>
      {user && (
        <div className="row">
          <div className="col-lg-4 mb-3">
            <Profile user={user} />
          </div>

          <div className="col-lg-8">
            <PostForm user={user} addPost={addPost} isMe={isMe} />
            {loadingPosts ? (
              <p>Chargement des publications...</p>
            ) : (
              <PostList posts={posts} />
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default withRouter(ProfilePage);
