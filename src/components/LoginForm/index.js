import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    setValidated(true);

    login(formData);
  };

  return (
    <Form
      style={{ padding: "1rem", backgroundColor: "white" }}
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={event => {
            setFormData({ ...formData, email: event.target.value });
          }}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Mot de Passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Votre mot de passe"
          value={formData.password}
          onChange={event => {
            setFormData({
              ...formData,
              password: event.target.value
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
};

export default LoginForm;
