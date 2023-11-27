//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useRef, useSession } from "uu5g05";
import { Button, Pending, useAlertBus } from "uu5g05-elements";
import React, {useState} from "react";
import Config from "./config/config.js";
import {ButtonGroup, Dropdown, Navbar} from "react-bootstrap";
import BackgroundImage from "./Images/backgroundImage1.jpg"
import Card from "react-bootstrap/Card";

import ListCreate from "./list-create-modal";
import ListDelete from "./list-delete-modal";

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
    const { addAlert } = useAlertBus();
    const[filter, setFilter] = useState("notReady");
    const [shoppingLists, setShoppingLists] = useState();

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

    // const filteredShoppingLists = shoppingListList.filter((list) => {
    //   if (filter === "all") {
    //     return true;
    //   } else if (filter === "ready") {
    //     return list.done;
    //   } else if (filter === "notReady") {
    //     return !list.done;
    //   }
    //   return true;
    // });

    const handleCreateList = (listName) => {
      const newShoppingList = {
        name: listName,
        members: [],
        owner: identity,
        items: [],
        done: false
      };

      setShoppingLists((prevLists) => [...prevLists, newShoppingList]);
      console.log(shoppingLists);
    };

    const {identity} = useSession();

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const shoppingListList = props.shoppingListDataList.data.filter((item) => item !== undefined);
    console.log(shoppingListList);

    return (
      <div>
        <Navbar style={{backgroundColor: "#6495ED", marginBottom:"10px"}}>
          <ListCreate onCreateList={handleCreateList} />
          <Dropdown as={ButtonGroup} style={{marginLeft:"10px"}}>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilterChange("all")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange("ready")}>Ready</Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterChange("notReady")}>Not Ready</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
        <div className="row" style={{marginLeft:"5px", marginRight: "5px"}}>
          {shoppingListList.map((list) => {
            const isOwner = identity?.uuIdentity === list.owner;
            return (
              <div key={list.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <Card style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover' }}>
                  <Card.Title style={{ marginLeft: "20px", marginTop: '20px', minHeight: '100px', color: "white"}}>
                    {list.name}
                  </Card.Title>
                  <Card.Text>
                    <div className="row" style={{maxHeight: "40px", minHeight: "40px"}}>
                      <div className="col d-flex align-items-center" style={{color: "white", marginLeft: "10px"}}>{list.owner.name}</div>
                      <div className="col d-flex justify-content-end align-items-center" style={{marginRight: "10px", maxWidth: "40px"}}>{isOwner && <ListDelete name={list.name} />}</div>
                    </div>
                  </Card.Text>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

    );
  }
});

//@@viewOn:exports
export { ShoppingLists };
export default ShoppingLists;
//@@viewOff:exports
