import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditListModal = ({show, onHide, list, onNameChange, onSave}) =>{
  const handleSave = () => {
    onSave(list.name);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Edit name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="text"
            value={list.name}
            onChange={onNameChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditListModal;

