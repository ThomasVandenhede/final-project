import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import InformationModal from "../components/InformationModal";
import * as api from "../api";

class PasswordResetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      passwordConfirm: "",
      modalShow: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const token = this.props.location.pathname.split("/").pop();

    if (this.state.password !== this.state.passwordConfirm) {
      return;
    }

    api.resetPassword({ password: this.state.password, token }).then(res => {
      console.log(res);
      this.setState({ modalShow: true });
    });
  };

  render() {
    return (
      <>
        <InformationModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          content={
            <>
              Nouveau mot de passe enregistré avec succès ! <br />
              <Link to="/">Retour à l'acceuil</Link>
            </>
          }
        />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Nouveau mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Votre mot de passe"
              value={this.state.password}
              onChange={event => {
                this.setState({
                  password: event.target.value
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Répéter nouveau mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Votre mot de passe"
              value={this.state.passwordConfirm}
              onChange={event => {
                this.setState({
                  passwordConfirm: event.target.value
                });
              }}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Enregistrer
          </Button>
        </Form>
      </>
    );
  }
}

export default withRouter(PasswordResetPage);
