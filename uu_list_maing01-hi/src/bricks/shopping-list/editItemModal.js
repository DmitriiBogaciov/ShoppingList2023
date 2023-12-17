import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { createVisualComponent, Lsi } from 'uu5g05';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Config from './config/config';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import importLsi from "../../lsi/import-lsi.js";

const EditModal = createVisualComponent({
  uu5Tag: Config.TAG + 'EditModal',
  nestingLevel: ['areaCollection', 'area'],

  defaultProps: {},

  render(props) {
    console.log(`props to edit Item`, props);
    const [isEditModalShown, setShow] = useState(false);
    const [editedItem, setEditedItem] = useState({ ...props.item });

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const handleEditItem = (property, value) => {
      setEditedItem((prevItem) => ({ ...prevItem, [property]: value }));
    };

    const handleSave = () => {
      props.onSave(editedItem);
      handleCloseModal();
    };

    return (
      <div className="col d-flex justify-content-end align-items-center">
        <FontAwesomeIcon icon={faPenToSquare}
          onClick={handleShowModal}
          size='sm'
        />
        <Modal show={isEditModalShown} onHide={handleCloseModal}>
          <Modal.Header>
            <Modal.Title>
            <Lsi import={importLsi} path={["EditItem", "editItem"]} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="row">
              <Form.Group className="col" style={{ maxWidth: "70%", margin: "0 10px 0 10px" }}>
                <Form.Label>
                <Lsi import={importLsi} path={["EditItem", "name"]} />
                </Form.Label>
                <Form.Control
                  type="text"
                  value={editedItem.name}
                  onChange={(e) => handleEditItem('name', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="col" style={{ maxWidth: "30%", marginRight: "10px" }}>
                <Form.Label>
                <Lsi import={importLsi} path={["EditItem", "count"]} />
                </Form.Label>
                <Form.Control
                  type="text"
                  value={editedItem.count}
                  onChange={(e) => handleEditItem('count', e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSave}>
            <Lsi import={importLsi} path={["EditItem", "save"]} />
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
            <Lsi import={importLsi} path={["EditItem", "cancel"]} />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
});

export default EditModal;
