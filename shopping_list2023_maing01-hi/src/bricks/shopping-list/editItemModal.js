import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const EditItemModal = ({title, show, onHide, item, onNameChange, onCountChange, onSave }) => {
  const handleSave = () => {
    if (item.name.trim() !== '' && item.count.trim() !== '') {
      onSave(item.name, item.count);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row">
          <Form.Text className="col" style={{ maxWidth: "70%", margin: "0 10px 0 10px" }}>
            Name
          </Form.Text>
          <Form.Text className="col" style={{ maxWidth: "30%", marginRight: "10px" }}>
            Count
          </Form.Text>
        </Form>
        <Form className="row">
          <Form.Control className="col"
            type="text"
            style={{ maxWidth: "70%", margin: "0 10px 0 10px" }}
            value={item.name}
            onChange={onNameChange}
          />
          <Form.Control className="col"
            type="text"
            style={{ maxWidth: "30%", marginRight: "10px"}}
            value={item.count}
            onChange={onCountChange}
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

export default EditItemModal;
