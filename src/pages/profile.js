import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Profile from "../components/Profile";
import { Auth } from "../context";
import * as api from "../api";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      posts: [],
      loadingUser: false,
      loadingPosts: false
    };
  }

  isMe = () => this.props.match.params.id === this.context.currentUser.id;

  componentDidMount() {
    this.loadUser();
    this.loadInitialPosts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState({
        isMe: this.isMe()
      });
      this.loadUser();
      this.loadInitialPosts();
    }
  }

  loadUser = () => {
    const userId = this.props.match.params.id;

    return api
      .fetchUser(userId)
      .then(res => this.setState({ user: res.data, isMe: this.isMe() }));
  };

  loadInitialPosts = () => {
    const userId = this.props.match.params.id;

    this.setState({
      loadingPosts: true
    });

    return api
      .fetchUserPosts(userId)
      .then(res => {
        const posts = res.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        this.setState({
          posts
        });
      })
      .catch(err => {
        console.debug(err);
      })
      .finally(this.setState({ loadingPosts: false }));
  };

  addPost = post => {
    const posts = [...this.state.posts, post].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    this.setState({
      posts
    });
  };

  render() {
    return (
      <Container>
        {this.state.user && (
          <div className="row">
            <div className="col-lg-4 mb-3">
              <Profile user={this.state.user} isMe={this.state.isMe} />
            </div>

            <div className="col-lg-8">
              <PostForm
                user={this.state.user}
                addPost={this.addPost}
                isMe={this.state.isMe}
              />
              <PostList posts={this.state.posts} />
            </div>
          </div>
        )}
      </Container>
    );
  }
}

ProfilePage.contextType = Auth.Context;

export default withRouter(ProfilePage);
