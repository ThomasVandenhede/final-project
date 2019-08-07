import React, { useState } from "react";

import { Form, Button, Col } from "react-bootstrap";

const SignupForm = ({ signup }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: ""
  });
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
    }
    setValidated(true);

    signup(formData);
  };

  return (
    <Form
      style={{ padding: "1rem", backgroundColor: "white" }}
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Votre prénom"
            value={formData.firstName}
            onChange={event =>
              setFormData({
                ...formData,
                firstName: event.target.value
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
            value={formData.lastName}
            onChange={event =>
              setFormData({
                ...formData,
                lastName: event.target.value
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
          value={formData.username}
          onChange={event =>
            setFormData({
              ...formData,
              username: event.target.value
            })
          }
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={event =>
            setFormData({
              ...formData,
              email: event.target.value
            })
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Votre mot de passe"
          value={formData.password}
          onChange={event =>
            setFormData({
              ...formData,
              password: event.target.value
            })
          }
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
              setFormData({
                ...formData,
                gender: "female"
              })
            }
            value={formData.gender}
          />
          <Form.Check
            required
            inline
            type="radio"
            label="Homme"
            name="gender"
            id="male"
            onChange={event =>
              setFormData({
                ...formData,
                gender: "male"
              })
            }
            value={formData.gender}
          />
        </div>
      </Form.Group>
      <Button type="submit" variant="primary">
        Inscription
      </Button>
    </Form>
  );
};

export default SignupForm;
