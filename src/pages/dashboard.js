import React from "react";
import axios from "axios";

import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { Auth } from "../context";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
      .then(res => {
        this.setState({ posts: res.data.rows });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(this.setState({ isLoading: false }));
  }

  render() {
    return (
      <Auth.Consumer>
        {({ user }) => (
          <div>
            <PostForm />
            <PostList posts={this.state.posts} />
          </div>
        )}
      </Auth.Consumer>
    );
  }
}

export default DashboardPage;
