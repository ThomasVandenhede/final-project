import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

class LoginForm extends Component {
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
      return;
    }
    this.setState({
      validated: true
    });

    this.props.login(this.state.formData);
  };

  render() {
    return (
      <Form
        style={{ padding: "1rem", backgroundColor: "white" }}
        validated={this.state.validated}
        onSubmit={this.handleSubmit}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
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
        <Form.Group>
          <Form.Text className="text-muted">
            <Link to="/forgot-password">Mot de passe oublié ?</Link>
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary">
          Connexion
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
