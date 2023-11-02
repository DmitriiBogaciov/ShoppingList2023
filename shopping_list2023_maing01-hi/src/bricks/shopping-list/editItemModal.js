import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditItemModal = ({ show, onHide, item, onNameChange, onSave }) => {
  const handleSave = () => {
    onSave(item.id, item.name);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Change item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="text"
            style={{ maxWidth: "70%" }}
            value={item.name}
            onChange={onNameChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItemModal;
