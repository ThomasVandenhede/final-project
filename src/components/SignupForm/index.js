import React from "react";

import { Form, Button } from "react-bootstrap";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control type="email" placeholder="Votre email" />
          <Form.Text className="text-muted">
            Nous ne communiquerons jamais ces informations à personne.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Mot de Passe</Form.Label>
          <Form.Control type="password" placeholder="Votre mot de passe" />
        </Form.Group>
        <Button variant="primary" type="submit" onSubmit={this.handleSubmit}>
          Inscription
        </Button>
      </Form>
    );
  }
}

export default SignupForm;
