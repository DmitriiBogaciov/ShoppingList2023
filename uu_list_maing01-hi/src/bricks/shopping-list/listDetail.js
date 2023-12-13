//@@viewOn:imports
import { createVisualComponent, PropTypes, useSession } from "uu5g05";
import React, { useState, useEffect } from "react";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import { Card, Button, Navbar, Nav, Container } from "react-bootstrap";
import EditItemModal from "./editItemModal";
import EditListModal from "./editListModal";
import CreateItemModal from "./createItemModal.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

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
  propTypes: {
    listDataObject: PropTypes.object.isRequired,
    itemDataObject: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOff:defaultProps
  defaultProps: {},

  render(props) {
    // console.log(`Item handlerMap`, props.itemDataObject.handlerMap);
    // console.log(`List handlerMap`, props.listDataObject.handlerMap);
    console.log(`itemDataObject: `, props.itemDataObject);
    const [list, setList] = useState(props.listDataObject.data);
    console.log(`List: `, list);
    const [items, setItems] = useState([]);
    // console.log(`Items: `, items);
    const [sortBy, setSortBy] = useState('status');
    const [sortButton, setSortButton] = useState('Sort by name');
    const [newItemName, setNewItemName] = useState('');
    const [newItemCount, setNewItemCount] = useState('');

    const { identity } = useSession();
    const isOwner = identity?.uuIdentity === list.owner.id;

    useEffect(() => {
      const loadItems = async () => {
        try {
          const loadedItems = await props.itemDataObject.handlerMap.getItems(list.items);
          setItems(loadedItems.items.itemList || []);
          console.log(`Loaded Items with getItems: `, loadedItems.items.itemList);
        } catch (error) {
          console.error("Error loading items:", error);
        }
      };
      loadItems();
    }, []);


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

    async function handleEditItemSave(newItem) {
      try {
        const editedItem = await props.itemDataObject.handlerMap.update(newItem);

        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editedItem.id ? editedItem : item
          )
        );
      } catch (error) {
        console.error("Error to update item", error);
        throw error;
      }
    }

    async function handleCreateItemSave(newItem) {
      try {
        const createdItem = await props.itemDataObject.handlerMap.create(newItem);
        
        setItems((prevItems) => [...prevItems, createdItem]);
    
        const updatedList = await props.listDataObject.handlerMap.update({
          id: list.id,
          items: [...list.items, createdItem.id],
        });
    
        console.log(`Updated list: `, updatedList);
      } catch (error) {
        console.error("Ошибка при сохранении элемента", error);
        throw error;
      }
    }

    async function handleEditListSave(newList) {
      try {
        const editedList = await props.listDataObject.handlerMap.update(newList);
      } catch (error) {
        console.error("Error updating list:", error);
        throw error;
      }
    }

    const toggleEdit = (id) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item));
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
                <Button className="button-sort btn btn-info" variant="primary" style={{ margin: "10px 0 0 10px" }}
                  onClick={toggleSort}>{sortButton}</Button>
                {isOwner &&
                  <EditListModal
                    list={list}
                    onEditList={handleEditListSave}
                  />
                }
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Navbar>

        <div className="container">
          <div className="row main">
            <div className="col">
              <Card className="list-detail mx-auto" style={{ maxWidth: "700px", minWidth: "350px" }}>
                <div className="list-name">
                  <Card.Title className="text-center">
                    <h2>{list.name}</h2>
                  </Card.Title>
                </div>
                <Uu5Elements.Block
                  header={
                    isOwner && (
                      <CreateItemModal 
                      onSave={handleCreateItemSave} />
                    )
                  }
                  actionList={[
                    { icon: "uugdsstencil-user-account-key", children: list.owner.name },
                  ]}
                  headerSeparator={true}
                >
                </Uu5Elements.Block>
                <div>
                  {sortedItems.map((item) => (
                    <div className="row list-item" key={item.id}>
                      <div className="col">
                        <div className="form-check" style={{ paddingLeft: "30px" }}>
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
                            {isOwner &&
                              <EditItemModal
                                item={item}
                                onSave={handleEditItemSave}
                              />
                            }
                            <FontAwesomeIcon className="col" icon={faTrash} onClick={() => handleDelete(item.id)} />
                          </div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* <EditItemModal //add new item
          title={"Create item"}
          show={isCreateNewItemModalShown}
          onHide={() => setCreateNewItemModalShown(false)}
          item={{ name: newItemName, count: newItemCount }}
          onNameChange={handleCreateItemNameChange}
          onCountChange={handleCreateItemCountChange}
          onSave={handleCreateItemSave}
        /> */}

      </div>
    );
  }
});

//@@viewOn:exports
export { ListDetail };
export default ListDetail;
//@@viewOff:exports
