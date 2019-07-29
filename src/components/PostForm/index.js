import React from "react";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder="Exprimez-vous..."
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default PostForm;
