import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";

import { Auth } from "../context";
import * as api from "../api";

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        gender: "",
        description: ""
      },
      validated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      formData: this.context.currentUser
    });
  }

  handleSubmit(event) {
    const { currentUser, token, updateUser } = this.context;
    console.log("TCL: SettingsPage -> handleSubmit -> updateUser", updateUser);
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const transformedData = (({
      firstName,
      lastName,
      gender,
      picture,
      description
    }) => ({ firstName, lastName, gender, picture, description }))(
      this.state.formData
    );

    if (form.checkValidity() === false) {
    }
    this.setState({
      validated: true
    });

    updateUser({
      data: transformedData,
      userId: currentUser.id,
      token
    });
  }

  render() {
    return (
      <Auth.Consumer>
        {({ currentUser, isLoggedIn }) =>
          isLoggedIn ? (
            <Form
              style={{ padding: "1rem", backgroundColor: "white" }}
              validated={this.state.validated}
              onSubmit={this.handleSubmit}
            >
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Votre nom d'utilisateur"
                  value={this.state.formData.username}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  disabled
                  type="email"
                  placeholder="Votre email"
                  value={this.state.formData.email}
                />
              </Form.Group>
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

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  placeholder="Ta description..."
                  value={this.state.formData.description}
                  onChange={event => {
                    this.setState({
                      formData: {
                        ...this.state.formData,
                        description: event.target.value
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
                    checked={this.state.formData.gender === "female"}
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
                    checked={this.state.formData.gender === "male"}
                  />
                </div>
              </Form.Group>
              <Button type="submit" variant="primary">
                Enregistrer modifications
              </Button>
            </Form>
          ) : (
            <Redirect to="/" />
          )
        }
      </Auth.Consumer>
    );
  }
}

SettingsPage.contextType = Auth.Context;

export default SettingsPage;
