import Icon from "@mdi/react";
import {Form, Modal, Button, Navbar, Container, Nav, Card} from 'react-bootstrap';
import React, { useState, useEffect, useMemo } from 'react'
import {createVisualComponent} from "uu5g05";
import Config from "./config/config";
import Uu5Elements from "uu5g05-elements";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {mdiPlus} from "@mdi/js";

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
            <Button variant="danger" onClick={handleCloseModal}>
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
