//@@viewOn:imports
import { createVisualComponent} from "uu5g05";
import React, {useState} from "react";
import Config from "./config/config.js";
import {Card, Button, Navbar, Nav, Container} from "react-bootstrap";
import "../css/listDetail.css";
import EditItemModal from "./editItemModal";
import EditListModal from "./editListModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'

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
    const [list, setList] = useState(props.shoppingList);
    const [items, setItems] = useState(props.shoppingList.items);
    const [sortBy, setSortBy] = useState('status');
    const [sortButton, setSortButton] = useState('Sort by name');
    const [isEditItemModalShown, setEditItemModalShow] = useState(false);
    const [isEditListModalShown, setEditListModalShown] = useState(false);
    const [isCreateNewItemModalShown, setCreateNewItemModalShown] =useState(false);
    const [editItemName, setEditItemName] = useState('');
    const [editItemCount, setEditItemCount] = useState('');
    const [editListName, setEditListName] = useState('');
    const [newItemName, setNewItemName] = useState('');
    const [newItemCount, setNewItemCount] = useState('');

    let sortedItems = [...items];
    const toggleSort = () => {
      if (sortBy === 'status') {
        setSortBy('name');
        setSortButton('Unsorted')
      } else if (sortBy === "name") {
        setSortBy(null);
        setSortButton('Sort by status')
      } else {
        setSortBy('status');
        setSortButton('Sort by name')
      }
    };

    const handleEditItemClick = (item) => {
      setEditItemName(item.name);
      setEditItemCount(item.count);
      setEditItemModalShow(true);
    };
    const handleEditListClick = (list) => {
      setEditListName(list.name)
      setEditListModalShown(true);
    };
    const handleCreateNewItemClick = () => {
      setNewItemName('');
      setNewItemCount('');
      setCreateNewItemModalShown(true);
    };

    const handleEditItemSave = (newName, newCount) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          ({...item, name: newName, count: newCount})));
      setEditItemModalShow(false);
    };

    const handleCreateItemSave = (newName, newCount) => {
      const newItem = {
        id: generateUniqueId(),
        name: newName,
        count: newCount,
        isDone: false // Устанавливайте начальное значение isDone по вашему усмотрению
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setCreateNewItemModalShown(false);
    }

    const handleEditListSave = (newName) => {
      setList((prevList) => ({...prevList, name: newName}));
      setEditListModalShown(false);
    }

    const toggleEdit = (id) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item));
    };

    const handleEditItemNameChange = (e) => {
      setEditItemName(e.target.value);
    };
    const handleEditItemCountChange = (e) => {
      setEditItemCount(e.target.value);
    };
    const handleEditListNameChange = (e) => {
      setEditListName(e.target.value);
    }
    const handleCreateItemNameChange = (e) => {
      setNewItemName(e.target.value);
    };
    const handleCreateItemCountChange = (e) => {
      setNewItemCount(e.target.value);
    };



    const handleDelete = (id) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
    if (sortBy === "status") {
      sortedItems.sort((a, b) => a.isDone - b.isDone);
    } else if (sortBy === "name") {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    function generateUniqueId() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    return (
      <div className="list-page">
        <Navbar bg="light" expand="lg" className="mb-3">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container>
              <Nav className="mr-auto">
                <Button className="button-sort btn btn-info" variant="primary" style={{margin: "10px 0 0 10px"}} onClick={toggleSort}>{sortButton}</Button>
                <Button className="button-sort btn btn-info" variant="primary" style={{margin: "10px 0 0 10px"}} onClick={() => handleEditListClick(list)}>Edit</Button>
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Navbar>

        <div className="container">
          <div className="row main">
            <div className="col">
          <Card className="list-detail mx-auto" style={{ maxWidth: "700px", minWidth: "350px"}}>
            <div className="list-name">
              <Card.Title className="text-center">
                <h2>{list.name}</h2>
              </Card.Title>
            </div>
            <Button className="btn btn-info" onClick={handleCreateNewItemClick} style={{lineHeight: "1", padding: "2", fontSize: "14px", maxWidth: "90px", margin: "10px 10px 10px 5px"}}>
              Add item
            </Button>
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
                        <FontAwesomeIcon className="col" icon={faPenToSquare} onClick={() => handleEditItemClick(item)}/>
                        <FontAwesomeIcon className="col" icon={faTrash} onClick={() => handleDelete(item.id)}/>
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

        <EditItemModal
          title={"Edit item"} //edit item
          show={isEditItemModalShown}
          onHide={() => setEditItemModalShow(false)}
          item={{name: editItemName, count: editItemCount }}
          onNameChange={handleEditItemNameChange}
          onCountChange={handleEditItemCountChange}
          onSave={handleEditItemSave}
        />
        <EditItemModal //add new item
          title={"Create item"}
          show={isCreateNewItemModalShown}
          onHide={() => setEditItemModalShow(false)}
          item={{name: newItemName, count: newItemCount }}
          onNameChange={handleCreateItemNameChange}
          onCountChange={handleCreateItemCountChange}
          onSave={handleCreateItemSave}
        />
        <EditListModal
          show={isEditListModalShown}
          onHide={() => setEditListModalShown(false)}
          list={{ name: editListName }}
          onNameChange={handleEditListNameChange}
          onSave={handleEditListSave}
          />
      </div>
    );
  }
});

//@@viewOn:exports
export { ListDetail };
export default ListDetail;
//@@viewOff:exports
