import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

const InformationModal = props =>
  ReactDOM.createPortal(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {props.title && (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>
        <p>{props.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("modal-root")
  );

InformationModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

InformationModal.defaultProps = {
  title: "",
  content: ""
};

export default InformationModal;
