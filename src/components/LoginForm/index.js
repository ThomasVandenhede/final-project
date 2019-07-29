import React from "react";

import { Form, Button } from "react-bootstrap";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: ""
      },
      validated: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    }
    this.setState({
      validated: true
    });

    this.props.login(this.state.formData);
  };

  render() {
    return (
      <Form
        validated="true"
        action={`${process.env.REACT_APP_API_URL}/auth`}
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Votre email"
            value={this.state.formData.email}
            onChange={event => {
              this.setState({
                formData: { ...this.state.formData, email: event.target.value }
              });
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de Passe</Form.Label>
          <Form.Control
            isInvalid="true"
            isValid="true"
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
        <Button variant="primary" type="submit" onSubmit={this.handleSubmit}>
          Connexion
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
