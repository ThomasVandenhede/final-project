import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import * as api from "../api";
import InformationModal from "../components/InformationModal";
import { Auth } from "../context";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const { isLoggedIn, currentUser } = useContext(Auth.Context);

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    api
      .sendPasswordResetEmail(email)
      .then(res => {
        setValidated(true);
        setModalShow(true);
      })
      .catch(err => {
        setValidated(false);
      });
  };

  return isLoggedIn ? (
    <Redirect to={`/users/${currentUser.id}`} />
  ) : (
    <>
      <InformationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Email de confirmation envoyé"
        content={
          <>
            Un email contenant un lien de réinitialisation de votre mot de passe
            vient de vous être envoyé à l'adresse <strong>{email}</strong>
          </>
        }
      />
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>
            Entrez l'adresse email avec laquelle vous vous êtes inscrit pour
            recevoir le lien de réinitialisation de votre mot de passe
          </Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Votre email"
            value={email}
            onChange={event => {
              setEmail(event.target.value);
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
};

export default ForgotPasswordPage;
