//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useSession, useRoute, Lsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import React, { useState } from "react";
import Config from "./config/config.js";
import { ButtonGroup, Dropdown, Navbar, Container } from "react-bootstrap";
import BackgroundImage from "./Images/backgroundImage1.jpg"
import Card from "react-bootstrap/Card";

import ListCreate from "./list-create-modal";
import ListDelete from "./list-delete-modal";
import importLsi from "../../lsi/import-lsi.js";
import { useThemeContext } from "./theme-context.js"

import "./styles.css"

//@@viewOn:css
const Css = {
  buttonArea: () => Config.Css.css({ textAlign: "center", marginBottom: 24 }),
};
//@@viewOff:css


const ShoppingLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListDetail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shoppingListDataList: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOff:defaultProps
  defaultProps: {},

  render(props) {
    console.log(`List handlerMap`, props.shoppingListDataList.handlerMap);
    const [, setRoute] = useRoute();
    const [shoppingLists, setShoppingLists] = useState(props.shoppingListDataList.data);
    console.log(`Shopping lists`, shoppingLists)
    const { addAlert } = useAlertBus();
    const [filter, setFilter] = useState("notReady");

    const [isDark] = useThemeContext();

    const { identity } = useSession();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    const handleFilterChange = (newFilter) => {
      setFilter(newFilter);
    }

    const filteredShoppingLists = shoppingLists.filter((list) => {
      if (filter === "all") {
        return true;
      } else if (filter === "ready") {
        return list.data.done;
      } else if (filter === "notReady") {
        return !list.data.done;
      }
      return true;
    });

    async function handleCreateList(newShoppingList) {
      try {
        const createdList = await props.shoppingListDataList.handlerMap.create(newShoppingList);
        console.log(`created list`, createdList);

        // Reload the page after successful creation
        // window.location.reload();
        setRoute("shoppingListDetail", { listId: createdList.id });
      } catch (error) {
        console.error("Error creating list:", error);
        throw error;
      }
    }

    const handleDeleteList = async (listId) => {
      try {
        // Delete the list
        await props.shoppingListDataList.handlerMap.delete(listId);

        const updatedLists = shoppingLists.filter((list) => list.data.id !== listId.id);

        // Update the state 
        setShoppingLists(updatedLists);

        // Log 
        console.log(`List with ID ${listId.id} has been deleted.`);

      } catch (error) {
        console.error("Error deleting list:", error);
        showError(error, "Error Deleting List");
      }
    };

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div className={isDark ? "dark-theme" : undefined} style={{ height: "100vh" }}>
        <Container style={{ maxWidth: "1280px" }}>
          <Navbar style={{
            backgroundColor: isDark ? "#333" : "#6495ED",
            color: isDark ? "#fff" : "#000",
            marginBottom: "10px"
          }}>
            <ListCreate
              onCreateList={handleCreateList}
            />
            <Dropdown as={ButtonGroup} style={{ marginLeft: "10px" }}>
              <Dropdown.Toggle
                variant="outline-light"
                id="dropdown-basic"
                style={{
                  backgroundColor: isDark ? "#333" : "#6495ED",
                  color: isDark ? "#fff" : "#000t",
                }}
              >
                <Lsi import={importLsi} path={["Lists", "filter"]} />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ backgroundColor: isDark ? "#333" : "#fff" }}>
                <Dropdown.Item className={isDark ? "dark-theme" : undefined} onClick={() => handleFilterChange("all")}>
                  <Lsi import={importLsi} path={["Lists", "filterAll"]} />
                </Dropdown.Item>
                <Dropdown.Item className={isDark ? "dark-theme" : undefined} onClick={() => handleFilterChange("ready")}>
                  <Lsi import={importLsi} path={["Lists", "filterReady"]} />
                </Dropdown.Item>
                <Dropdown.Item className={isDark ? "dark-theme" : undefined} onClick={() => handleFilterChange("notReady")}>
                  <Lsi import={importLsi} path={["Lists", "filterNotReady"]} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar>
          <div className="row">
            {filteredShoppingLists.map((list) => {
              const isOwner = identity?.uuIdentity === list.data.owner.id;
              return (
                <div key={list.data.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <Card style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover' }}>
                    <Card.Title onClick={() => setRoute("shoppingListDetail", { listId: list.data.id, itemIds: list.data.items })} style={{ marginLeft: "20px", marginTop: '20px', minHeight: '100px', color: "white" }}>
                      {/* {console.log(`list items:`, list.data.items)} */}
                      {list.data.name}
                    </Card.Title>
                    <Card.Text>
                      <div className="row" style={{ maxHeight: "40px", minHeight: "40px" }}>
                        <div className="col d-flex align-items-center" style={{ color: "white", marginLeft: "10px" }}>{list.data.owner.name}</div>
                        <div className="col d-flex justify-content-end align-items-center" style={{ marginRight: "10px", maxWidth: "40px" }}>
                          {isOwner &&
                            <ListDelete
                              name={list.data.name}
                              listId={list.data.id}
                              onDeleteList={handleDeleteList}
                            />}</div>
                      </div>
                    </Card.Text>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

    );
  }
});

//@@viewOn:exports
export { ShoppingLists };
export default ShoppingLists;
//@@viewOff:exports
