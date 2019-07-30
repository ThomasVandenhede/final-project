import React, { Component } from "react";

import { Form, Button } from "react-bootstrap";
import * as api from "../api";
import InformationModal from "../components/InformationModal";

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      modalShow: false,
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

    api
      .sendPasswordResetEmail(this.state.email)
      .then(res => {
        this.setState({ modalShow: true, validated: true });
      })
      .catch(err => {
        this.setState({ validated: false });
      });
  };

  render() {
    return (
      <>
        <InformationModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          title="Email de confirmation envoyé"
          content={
            <>
              Un email contenant un lien de réinitialisation de votre mot de
              passe vient de vous être envoyé à l'adresse{" "}
              <strong>{this.state.email}</strong>
            </>
          }
        />
        <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Entrez l'adresse email avec laquelle vous vous êtes inscrit pour
              recevoir le lien de réinitialisation de votre mot de passe
            </Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Votre email"
              value={this.state.email}
              onChange={event => {
                this.setState({ email: event.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">
              L'adresse saisie n'existe pas
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">
            Envoyer
          </Button>
        </Form>
      </>
    );
  }
}

export default ForgotPasswordPage;
