import Icon from "@mdi/react";
import {Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect, useMemo } from 'react'
import {createVisualComponent} from "uu5g05";
import Config from "./config/config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const ListDelete = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListCreate",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOff:defaultProps
  defaultProps: {},

  render(props) {
    const [isDeleteModalShown, setShow] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const handleDeleteList = () => {
      console.log(`Props in delete modal`, props)
      props.onDeleteList({id: props.listId});
      handleCloseModal();
    }

    return (
      <div>
        <Modal show={isDeleteModalShown} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the list "{props.name}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteList}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="danger" size="sm" onClick={handleShowModal}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    )

  }

});

//@@viewOn:exports
export { ListDelete };
export default ListDelete;
//@@viewOff:exports
