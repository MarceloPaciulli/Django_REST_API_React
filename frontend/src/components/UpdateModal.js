import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UpdateModal({ person, onSubmit, onClose }) {
  const [updatedPerson, setUpdatedPerson] = useState(person);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
    onSubmit(updatedPerson);
    setValidated(true);
  };


  const handleClose = () => {
    onClose(null);
  };

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title className="black-title">Update Person</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label className="black-label">Name</Form.Label>
            <Form.Control
             required
              type="text"
              placeholder="Enter name"
              value={updatedPerson && updatedPerson.nombre}
              onChange={(e) =>
                setUpdatedPerson({ ...updatedPerson, nombre: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label className="black-label">Lastname</Form.Label>
            <Form.Control
            required
              type="text"
              placeholder="Enter last name"
              value={updatedPerson && updatedPerson.apellido}
              onChange={(e) =>
                setUpdatedPerson({ ...updatedPerson, apellido: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="black-label">Email</Form.Label>
            <Form.Control
            required
              type="email"
              placeholder="Enter email"
              value={updatedPerson && updatedPerson.email}
              onChange={(e) =>
                setUpdatedPerson({ ...updatedPerson, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label className="black-label">Phone</Form.Label>
            <Form.Control
            required
              type="text"
              placeholder="Enter phone number"
              value={updatedPerson && updatedPerson.telefono}
              onChange={(e) =>
                setUpdatedPerson({ ...updatedPerson, telefono: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicId">
            <Form.Label className="black-label">ID</Form.Label>
            <Form.Control
              type="text"
              value={updatedPerson && updatedPerson.id}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
