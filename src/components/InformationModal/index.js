import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { Modal, Button } from "react-bootstrap";

class InformationModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ReactDOM.createPortal(
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {this.props.title && (
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          <p>{this.props.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Fermer</Button>
        </Modal.Footer>
      </Modal>,
      document.getElementById("modal-root")
    );
  }
}

InformationModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

InformationModal.defaultProps = {
  title: "",
  content: ""
};

export default InformationModal;
