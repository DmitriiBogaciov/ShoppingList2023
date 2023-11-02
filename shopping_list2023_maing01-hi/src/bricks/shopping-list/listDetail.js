//@@viewOn:imports
import { createVisualComponent} from "uu5g05";
import React, {useState} from "react";
import Config from "./config/config.js";
import {Card, Button, Navbar, Nav, Container, Modal, Form} from "react-bootstrap";
import "../css/listDetail.css";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListDetail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOff:defaultProps
  defaultProps: {},

  render(props) {
    const [sortBy, setSortBy] = useState('status');
    const [sortButton, setSortButton] = useState('Sort by name');
    const [items, setItems] = useState(props.shoppingList.items);
    const [isEditModalShown, setEditModalShow] = useState(false);
    const [itemName, setItemName] = useState(''); //for editing name
    const [itemId, setItemId] = useState(''); //for editing

    const handleShowEditModal = (item) => {
      setItemId(item.id);
      setItemName(item.name);
      setEditModalShow(true);
    }
    const handleCloseEditModal = () => setEditModalShow(false);

    let sortedItems = [...items];



    const toggleSort = () => {
      if (sortBy === 'status') {
        setSortBy('name');
        setSortButton('Unsort')
      } else if (sortBy === "name") {
        setSortBy(null);
        setSortButton('Sort by status')
      } else {
        setSortBy('status');
        setSortButton('Sort by name')
      }
    };

    const toggleEdit = (id) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item));
    };

    const handleItemNameChange = (e) => {
      setItemName(e.target.value);
    };

    const handleEditItem = () => {
      setItems((prevItems) =>
        prevItems.map((item) =>
        item.id === itemId ? {...item, name: itemName}: item));
      handleCloseEditModal();
    };

    const handleDelete = (id) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    if (sortBy === "status") {
      sortedItems.sort((a, b) => a.isDone - b.isDone);
    } else if (sortBy === "name") {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    }



    return (
      <div className="list-page">
        <Navbar bg="light" expand="lg" className="mb-3">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container>
              <Nav className="mr-auto">
                <Button className="button-sort" onClick={toggleSort}>{sortButton}</Button>
                <Button className="button-edit" size="sm">
                  Edit
                </Button>
                <Button>Delete</Button>
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Navbar>

        <div className="container">
          <div className="row main">
            <div className="col">
          <Card className="list-detail mx-auto" style={{ maxWidth: "700px", minWidth: "350px"}}>
            <div className="row list-name">
              <Card.Title className="col text-center">
                <h2>{props.shoppingList.name}</h2>
              </Card.Title>
            </div>
            <Card.Text>
              {sortedItems.map((item) => (
                <div className="row list-item" key={item.id}>
                  <div className="col">
                  <div className="form-check" style={{paddingLeft: "30px"}}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={item.isDone}
                      onChange={() => toggleEdit(item.id)}
                    />
                      <label className="form-check-label" htmlFor={`checkbox-${item.id}`}>
                        {item.name}
                      </label>
                    </div>
                  </div>
                  <div className="col">{item.count}</div>
                <div className="col">
                    {!item.isDone &&
                      <div className="row manageItem">
                        <div className="col"><Button onClick={() => handleShowEditModal(item)}>Edit</Button></div>
                        <div className="col"><Button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                        </div>
                      </div>
                    }
                </div>
                </div>
              ))}
            </Card.Text>
          </Card>
            </div>
        </div>
        </div>

        <Modal show={isEditModalShown} onHide={handleCloseEditModal}>
          <Modal.Header editButton>
            <Modal.Title>Change item</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>
            <Form>
              <Form.Control
                type="text"
                style={{ maxWidth: '70%' }}
                value={itemName}
                onChange={handleItemNameChange}
              />
            </Form>
            <Button variant="secondary" onClick={handleEditItem}>
              Confirm
            </Button>
            <Button variant="danger" onClick={handleCloseEditModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

//@@viewOn:exports
export { ListDetail };
export default ListDetail;
//@@viewOff:exports
