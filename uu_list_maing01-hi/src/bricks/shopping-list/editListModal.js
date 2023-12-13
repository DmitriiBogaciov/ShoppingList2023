import { Form, Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createVisualComponent } from 'uu5g05';
import Config from './config/config';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const EditModal = createVisualComponent({
  uu5Tag: Config.TAG + 'EditModal',
  nestingLevel: ['areaCollection', 'area'],

  defaultProps: {},

  render(props) {
    const [isEditModalShown, setShow] = useState(false);
    const [editedList, setEditedList] = useState({ ...props.list });
    const [newMember, setNewMember] = useState('');

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
        <Button
          className="button-edit btn btn-info"
          variant="primary"
          style={{ margin: '10px 0 0 10px' }}
          onClick={handleShowModal}
        >
          Edit
        </Button>

        <Modal show={isEditModalShown} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Text >Name</Form.Text>
              <Form.Control style={{ marginTop: "5px", marginBottom: "10px" }}
                type="text"
                value={editedList.name}
                onChange={(e) => handleEditList('name', e.target.value)}
              />
              <Form.Group controlId="newMemberInput" style={{ marginBottom: "15px" }}>
              <Form.Text>Members</Form.Text>
              <div className="row">
                <Form.Control className="col"
                  type="text"
                  placeholder="Add Member"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                />
                <Button className="col" style={{ maxWidth: "40px", marginLeft: "5px" }} variant="primary" onClick={handleAddMember}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
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
                      className="col"
                      icon={faTrash}
                      onClick={() => handleDeleteMember(index)}
                    />
                  </div>
                </div>
              ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditListSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
});

export { EditModal };
export default EditModal;
