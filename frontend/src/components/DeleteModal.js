import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function DeleteModal({ person, onCancel, onSubmit }) {
  const [updatedPerson, setUpdatedPerson] = useState(person);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedPerson);
    onCancel();
  };

  const handleClose = () => {
    onCancel(null);
  };

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title className="black-title">Delete Person</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label className="black-label">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={updatedPerson && updatedPerson.nombre}
              onChange={(e) =>
                setUpdatedPerson({ ...updatedPerson, nombre: e.target.value })
              }
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label className="black-label">Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={updatedPerson && updatedPerson.apellido}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="black-label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={updatedPerson && updatedPerson.email}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label className="black-label">Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={updatedPerson && updatedPerson.telefono}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formBasicId">
            <Form.Label className="black-label">ID</Form.Label>
            <Form.Control type="text" value={updatedPerson && updatedPerson.id} readOnly />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
