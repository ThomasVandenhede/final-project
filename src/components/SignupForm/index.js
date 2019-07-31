import React, { Component } from "react";

import { Form, Button, Col } from "react-bootstrap";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        gender: ""
      },
      validated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    return (
      <Form
        style={{ padding: "1rem", backgroundColor: "white" }}
        validated={this.state.validated}
        onSubmit={this.handleSubmit}
      >
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Votre prénom"
              value={this.state.formData.firstName}
              onChange={event =>
                this.setState({
                  formData: {
                    ...this.state.formData,
                    firstName: event.target.value
                  }
                })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Votre nom"
              value={this.state.formData.lastName}
              onChange={event =>
                this.setState({
                  formData: {
                    ...this.state.formData,
                    lastName: event.target.value
                  }
                })
              }
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control
            required
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
            required
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

        <Form.Group>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            required
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
          <Form.Label>Sexe</Form.Label>
          <div key="inline-radio" className="mb-3">
            <Form.Check
              required
              inline
              type="radio"
              label="Femme"
              name="gender"
              id="female"
              onChange={event =>
                this.setState({
                  formData: {
                    ...this.state.formData,
                    gender: "female"
                  }
                })
              }
              value={this.state.formData.gender}
            />
            <Form.Check
              required
              inline
              type="radio"
              label="Homme"
              name="gender"
              id="male"
              onChange={event =>
                this.setState({
                  formData: {
                    ...this.state.formData,
                    gender: "male"
                  }
                })
              }
              value={this.state.formData.gender}
            />
          </div>
        </Form.Group>
        <Button type="submit" variant="primary">
          Inscription
        </Button>
      </Form>
    );
  }
}

export default SignupForm;
