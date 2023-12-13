import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { createVisualComponent } from 'uu5g05';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Config from './config/config';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const CreateModal = createVisualComponent({
  uu5Tag: Config.TAG + 'EditModal',
  nestingLevel: ['areaCollection', 'area'],

  defaultProps: {},

  render(props) {
    console.log(`props to create Item`, props);
    const [isCreateModalShown, setShow] = useState(false);
    const [createdItem, setCreatedItem] = useState('');

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const handleEditItem = (property, value) => {
      setCreatedItem((prevItem) => ({ ...prevItem, [property]: value }));
    };

    const handleSave = () => {
      props.onSave(createdItem);
      handleCloseModal();
    };

    return (
      <div>
        <Button className="col"
          onClick={handleShowModal}>
            +add
        </Button>
        <Modal show={isCreateModalShown} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Create Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="row">
              <Form.Group className="col" style={{ maxWidth: "70%", margin: "0 10px 0 10px" }}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={createdItem.name}
                  onChange={(e) => handleEditItem('name', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col" style={{ maxWidth: "30%", marginRight: "10px" }}>
                <Form.Label>Count</Form.Label>
                <Form.Control
                  type="text"
                  value={createdItem.count}
                  onChange={(e) => handleEditItem('count', e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
});

export default CreateModal;
