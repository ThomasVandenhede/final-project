import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import InformationModal from "../components/InformationModal";
import * as api from "../api";

const PasswordResetPage = ({ location }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const token = location.pathname.split("/").pop();

    if (password !== passwordConfirm) {
      return;
    }

    api.resetPassword({ password, token }).then(res => setModalShow(true));
  };

  return (
    <>
      <InformationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={
          <>
            Nouveau mot de passe enregistré avec succès ! <br />
            <Link to="/">Retour à l'acceuil</Link>
          </>
        }
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Nouveau mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Répéter nouveau mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Votre mot de passe"
            value={passwordConfirm}
            onChange={event => setPasswordConfirm(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Enregistrer
        </Button>
      </Form>
    </>
  );
};

export default withRouter(PasswordResetPage);
