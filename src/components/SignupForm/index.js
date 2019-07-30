import React, { Component } from "react";

import { Form, Button } from "react-bootstrap";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { email: "", username: "", password: "", passwordConfirm: "" },
      validated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(state) {}

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    }
    this.setState({
      validated: true
    });

    this.props.signup(this.state.formData);
  }

  render() {
    console.log(this.state);

    return (
      <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            type="text"
            placeholder="Votre nom d'utilisateur"
            value={this.state.formData.username}
            onChange={event => {
              this.setState({
                formData: {
                  ...this.state.formData,
                  username: event.target.value
                }
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Votre email"
            value={this.state.formData.email}
            onChange={event => {
              this.setState({
                formData: {
                  ...this.state.formData,
                  email: event.target.value
                }
              });
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Votre mot de passe"
            value={this.state.formData.password}
            onChange={event => {
              this.setState({
                formData: {
                  ...this.state.formData,
                  password: event.target.value
                }
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPasswordConfirmation">
          <Form.Label>Répéter mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Votre mot de passe"
            value={this.state.formData.passwordConfirm}
            onChange={event => {
              this.setState({
                formData: {
                  ...this.state.formData,
                  passwordConfirm: event.target.value
                }
              });
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onSubmit={this.handleSubmit}>
          Inscription
        </Button>
      </Form>
    );
  }
}

export default SignupForm;
