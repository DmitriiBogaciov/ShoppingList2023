import { Form, Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createVisualComponent, Lsi } from 'uu5g05';
import Config from './config/config.js';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Nav } from 'react-bootstrap';
import importLsi from "../../lsi/import-lsi.js";
import {useThemeContext} from "./theme-context.js"
import "./styles.css"


const EditModal = createVisualComponent({
  uu5Tag: Config.TAG + 'EditModal',
  nestingLevel: ['areaCollection', 'area'],

  defaultProps: {},

  render(props) {
    const [isEditModalShown, setShow] = useState(false);
    const [editedList, setEditedList] = useState({ ...props.list });
    const [newMember, setNewMember] = useState('');

    const [isDark] = useThemeContext();

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const handleEditList = (property, value) => {
      setEditedList((prevList) => ({ ...prevList, [property]: value }));
    };

    const handleAddMember = () => {
      if (newMember.trim() !== '') {
        setEditedList({
          ...editedList,
          members: [...editedList.members, newMember.trim()],
        });
        setNewMember('')
      }
    };

    const handleDeleteMember = (memberIndex) => {
      setEditedList((prevList) => {
        const updatedMembers = [...prevList.members];
        updatedMembers.splice(memberIndex, 1);
        return {
          ...prevList,
          members: updatedMembers,
        };
      });
    };

    const handleEditListSave = () => {
      console.log('sending new list', editedList);
      props.onEditList(editedList);
      handleCloseModal();
    };

    return (
      <div>
        <Nav.Link
          variant="outline-secondary"
          onClick={handleShowModal}
        >
          <Lsi import={importLsi} path={["ListEdit", "edit"]} />
        </Nav.Link>

        <Modal show={isEditModalShown} onHide={handleCloseModal}>
          <Modal.Header closeButton className={isDark ? "dark-theme" : undefined}>
            <Modal.Title><Lsi import={importLsi} path={["ListEdit", "edit"]} /></Modal.Title>
          </Modal.Header>
          <Modal.Body className={isDark ? "dark-theme" : undefined}>
            <Form.Label>
              <Lsi import={importLsi} path={["ListEdit", "name"]} />
            </Form.Label>
            <Form.Control
              style={{ width: "100%" }}
              type="text"
              value={editedList.name}
              onChange={(e) => handleEditList('name', e.target.value)}
            />
            <Form.Group controlId="newMemberInput" style={{ marginBottom: "15px" }}>
              <Form.Label>
              <Lsi import={importLsi} path={["ListEdit", "members"]} />
              </Form.Label>
              <div className="row">
                <div className="col">
                  <Form.Control
                    type="text"
                    placeholder={"Add Member"}
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                  />
                </div>
                <div className="col-auto" >
                  <Button variant="primary" onClick={handleAddMember}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
              </div>
            </Form.Group>
            {editedList.members.map((member, index) => (
              <div
                className="row"
                key={index}
                style={{
                  borderBottom: "1px solid #ccc",
                  marginBottom: "8px",
                  paddingBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flex: 20 }}>{member}</div>
                <div style={{ flex: 1 }}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteMember(index)}
                  />
                </div>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className={isDark ? "dark-theme" : undefined}>
            <Button variant="secondary" onClick={handleCloseModal}>
            <Lsi import={importLsi} path={["ListEdit", "cancel"]} />
            </Button>
            <Button variant="primary" onClick={handleEditListSave}>
            <Lsi import={importLsi} path={["ListEdit", "save"]} />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
});

export { EditModal };
export default EditModal;
