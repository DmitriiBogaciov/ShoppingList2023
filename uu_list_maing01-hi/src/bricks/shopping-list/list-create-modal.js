import Icon from "@mdi/react";
import {Form, Modal, Button, Navbar, Container, Nav, Card} from 'react-bootstrap';
import React, { useState, useEffect, useMemo } from 'react'
import {createVisualComponent} from "uu5g05";
import Config from "./config/config";
import Uu5Elements from "uu5g05-elements";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {mdiPlus} from "@mdi/js";

const ListCreate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListCreate",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOff:defaultProps
  defaultProps: {},

  render(props) {
    const [isModalShown, setShow] = useState(false);
    const [listName, setListName] = useState('');

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    const handleListName = (e) => {
      setListName(e.target.value);
    }

    const handleCreateList = (e) => {
      e.preventDefault();

      if (listName.trim() !== "") {
        const newShoppingList = {
          name: listName
        }
        props.onCreateList(newShoppingList);
        setListName('');
      }

      handleCloseModal();
    };

    return (
      <div>
        <Modal show={isModalShown} onHide={handleCloseModal}>
          <Form className="mx-auto" onSubmit={handleCreateList}>
            <Modal.Header closeButton>
              <Modal.Title>Create list</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={listName}
                  onChange={handleListName}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">Create</Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Icon path={mdiPlus}
              style={{color:"whitesmoke", cursor: "pointer", alignSelf: 'center', marginLeft: '15px'}}
              size={1.3}
              onClick={handleShowModal}
        />
      </div>
    )

  }

});

//@@viewOn:exports
export { ListCreate };
export default ListCreate;
//@@viewOff:exports
