import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";

import { Auth } from "../context";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    description: ""
  });
  const [validated, setValidated] = useState(false);
  const { isLoggedIn, currentUser, token, updateUser } = useContext(
    Auth.Context
  );

  useEffect(() => {
    setFormData({
      formData: currentUser
    });
  }, [currentUser]);

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    const transformedData = (({
      firstName,
      lastName,
      gender,
      picture,
      description
    }) => ({ firstName, lastName, gender, picture, description }))(formData);

    if (form.checkValidity() === false) {
    }

    setValidated(true);

    updateUser({
      data: transformedData,
      userId: currentUser.id,
      token
    });
  };

  console.log("TCL: formData", formData);

  return isLoggedIn ? (
    <Form
      style={{ padding: "1rem", backgroundColor: "white" }}
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Nom d'utilisateur</Form.Label>
        <Form.Control
          disabled
          type="text"
          placeholder="Votre nom d'utilisateur"
          value={formData.username}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          disabled
          type="email"
          placeholder="Votre email"
          value={formData.email}
        />
      </Form.Group>

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

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="2"
          placeholder="Ta description..."
          value={formData.description}
          onChange={event => {
            setFormData({
              ...formData,
              description: event.target.value
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
              setFormData({
                ...formData,
                gender: "female"
              })
            }
            checked={formData.gender === "female"}
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
            checked={formData.gender === "male"}
          />
        </div>
      </Form.Group>
      <Button type="submit" variant="primary">
        Enregistrer modifications
      </Button>
    </Form>
  ) : (
    <Redirect to="/" />
  );
};

export default SettingsPage;
