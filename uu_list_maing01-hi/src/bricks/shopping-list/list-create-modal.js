import Icon from "@mdi/react";
import { Form, Modal, Button, Navbar, Container, Nav, Card } from 'react-bootstrap';
import React, { useState, useEffect, useMemo } from 'react'
import { createVisualComponent, Lsi } from "uu5g05";
import Config from "./config/config";
import { mdiPlus } from "@mdi/js";
import importLsi from "../../lsi/import-lsi.js";
import {useThemeContext} from "./theme-context.js"
import "./styles.css"

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

    const [isDark] = useThemeContext();

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
        <Form className={isDark ? "dark-theme" : undefined} onSubmit={handleCreateList}>
            <Modal.Header closeButton>
              <Modal.Title>
                <Lsi import={importLsi} path={["CreateList", "createList"]} />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Lsi import={importLsi} path={["CreateList", "name"]} />
                </Form.Label>
                <Form.Control
                  type="text"
                  value={listName}
                  onChange={handleListName}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit"><Lsi import={importLsi} path={["CreateList", "create"]} /></Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Icon path={mdiPlus}
          style={{ color: "whitesmoke", cursor: "pointer", alignSelf: 'center', marginLeft: "15px"}}
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
