//@@viewOn:imports
import { createVisualComponent, PropTypes, useSession, Lsi } from "uu5g05";
import React, { useState, useEffect } from "react";
import Config from "./config/config.js";
import { Card, Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import EditItemModal from "./item-edit-modal.js";
import EditListModal from "./list-edit-modal.js";
import CreateItemModal from "./item-create-modal.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import importLsi from "../../lsi/import-lsi.js";
import { useThemeContext } from "./theme-context.js"

import "./styles.css"

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
    const [list, setList] = useState(props.listDataObject.data);
    const [items, setItems] = useState([]);
    const [sortType, setSortType] = useState("default");
    const [showOnlyUndoneItems, setShowOnlyUndoneItems] = useState(false);

    const [isDark] = useThemeContext();

    const { identity } = useSession();
    const isOwner = identity?.uuIdentity === list.owner.id;

    useEffect(() => {
      const loadItems = async () => {
        try {
          const loadedItems = await props.itemDataObject.handlerMap.getItems(list.items);
          const sortedItems = sortItems(loadedItems.items.itemList, sortType);
          setItems(sortedItems);
          console.log(`Loaded Items with getItems: `, sortedItems);
        } catch (error) {
          console.error("Error loading items:", error);
        }
      };
      loadItems();
    }, [sortType]);

    const sortItems = (items, sortBy) => {
      switch (sortBy) {
        case "default":
          return items.sort((a, b) => a.done - b.done);
        case "name":
          return items.sort((a, b) => a.name.localeCompare(b.name));
        case "count":
          return items.sort((a, b) => a.count - b.count);
        default:
          return items;
      }
    };

    const handleSortClick = (sortBy) => {
      setSortType(sortBy);
    };

    const handleToggleShowOnlyUndoneItems = () => {
      setShowOnlyUndoneItems(!showOnlyUndoneItems);
    };

    const filteredItems = showOnlyUndoneItems ? items.filter(item => !item.done) : items;

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

        // Обновите состояние list после успешного обновления
        setList(updatedList);
      } catch (error) {
        console.error("Error creating item", error);
        throw error;
      }
    }

    async function handleEditListSave(newList) {
      try {
        const editedList = await props.listDataObject.handlerMap.update(newList);
        setList(editedList);
      } catch (error) {
        console.error("Error updating list:", error);
        throw error;
      }
    }

    async function toggleEdit(id) {
      try {
        const currentItem = items.find(item => item.id === id);

        const updatedItem = await props.itemDataObject.handlerMap.update({
          id: id,
          done: !currentItem.done
        });

        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item
          )
        );
      } catch (error) {
        console.error("Error updating item done:", error);
        throw error;
      }
    };

    async function handleRemoveItem(id) {
      try {
        // Удалите элемент из сервера
        await props.itemDataObject.handlerMap.remove({ id, listId: list.id });

        // Обновите состояние items, убрав удаленный элемент
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));

        console.log(`Item with id ${id} removed successfully.`);
      } catch (error) {
        console.error("Ошибка при удалении элемента", error);
        throw error;
      }
    }

    async function markListDone() {
      try {
        const updatedList = await props.listDataObject.handlerMap.update({
          id: list.id,
          done: !list.done,
        });
        setList(updatedList);

        console.log(`List with id ${list.id} marked as done successfully.`);
      } catch (error) {
        console.error("Error marking list as done:", error);
        throw error;
      }
    }

    return (
      <div className={isDark ? "dark-theme" : undefined} style={{ height: "100vh" }}>
        <Container style={{ maxWidth: "700px", minWidth: "350px" }}>
          <div className="row main">
            <div className="col">
              <Card className={isDark ? "dark-theme" : undefined} >
                <div className="list-name">
                  <Card.Title className="text-center">
                    <h2>{list.name}</h2>
                  </Card.Title>
                </div>
                <Navbar bg={isDark ? "#333" : "white"} data-bs-theme={isDark ? "dark" : "white"} expand="lg" style={{ marginLeft: "5px" }}>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <NavDropdown title={<Lsi import={importLsi} path={["ListDetail", "sort"]} />} id="basic-nav-dropdown">
                        <NavDropdown.Item
                          onClick={() => handleSortClick("default")}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span><Lsi import={importLsi} path={["ListDetail", "sortDefault"]} /></span>
                          {sortType === "default" && <FontAwesomeIcon icon={faCheck} className="text-primary" />}
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => handleSortClick("name")}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span><Lsi import={importLsi} path={["ListDetail", "sortByName"]} /></span>
                          {sortType === "name" && <FontAwesomeIcon icon={faCheck} className="text-primary" />}
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => handleSortClick("count")}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span><Lsi import={importLsi} path={["ListDetail", "sortByCount"]} /></span>
                          {sortType === "count" && <FontAwesomeIcon icon={faCheck} className="text-primary" />}
                        </NavDropdown.Item>
                      </NavDropdown>

                      <Nav.Link
                        onClick={handleToggleShowOnlyUndoneItems}>
                        {showOnlyUndoneItems ? <Lsi import={importLsi} path={["ListDetail", "showAllItems"]} /> : <Lsi import={importLsi} path={["ListDetail", "showOnlyUndoneItems"]} />}
                      </Nav.Link>

                      {isOwner && (
                        <EditListModal
                          list={list}
                          onEditList={handleEditListSave}
                        />
                      )}
                      <Nav.Link
                        onClick={markListDone}>
                        {list.done ? <Lsi import={importLsi} path={["ListDetail", "markAsUndone"]} /> : <Lsi import={importLsi} path={["ListDetail", "markAsDone"]} />}
                      </Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", marginBottom: "10px", paddingBottom: "5px" }}>
                  <div>
                    {isOwner && !list.done && (
                      <CreateItemModal onSave={handleCreateItemSave} />
                    )}
                  </div>
                  <div className="user" style={{ marginRight: "5px" }}>
                    <FontAwesomeIcon icon={faUser} size="lg" style={{ marginRight: "5px" }} />
                    {list.owner && (
                      <span>{list.owner.name}</span>
                    )}
                  </div>
                </div>
                <div>
                  {filteredItems.map((item) => (
                    <div className="row list-item" key={item.id}>
                      <div className="col">
                        <div className="form-check" style={{ paddingLeft: "30px" }}>
                          {!list.done && (
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item.done}
                              onChange={() => toggleEdit(item.id)}
                            />
                          )}
                          <label className="form-check-label" htmlFor={`checkbox-${item.id}`}>
                            {item.name}
                          </label>
                        </div>
                      </div>
                      <div className="col col-auto align-items-center">{item.count}</div>
                      <div className="col">
                        {!list.done && !item.done && (
                          <div className="row manageItem">
                            {isOwner && (
                              <EditItemModal
                                item={item}
                                onSave={handleEditItemSave}
                              />
                            )}
                            <div className="col col-auto align-items-center" style={{ marginRight: "10px" }}>
                              <FontAwesomeIcon size="sm" icon={faTrash} onClick={() => handleRemoveItem(item.id)} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    );
  }
});

//@@viewOn:exports
export { ListDetail };
export default ListDetail;
//@@viewOff:exports
