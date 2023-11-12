//@@viewOn:imports
import { createVisualComponent, useSession} from "uu5g05";
import React, {useState} from "react";
import Config from "./config/config.js";
import {ButtonGroup, Dropdown, Navbar} from "react-bootstrap";
import BackgroundImage from "./Images/backgroundImage1.jpg"
import Card from "react-bootstrap/Card";

import ListCreate from "./list-create-modal";
import ListDelete from "./list-delete-modal";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListDetail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOff:defaultProps
  defaultProps: {},

  render(props) {
    const[filter, setFilter] = useState("notReady")

    const handleFilterChange = (newFilter) => {
      setFilter(newFilter);
    }

    const filteredShoppingLists = props.shoppingLists.filter((list) => {
      if (filter === "all") {
        return true;
      } else if (filter === "ready") {
        return list.done;
      } else if (filter === "notReady") {
        return !list.done;
      }
      return true;
    });

    const {identity} = useSession();

    return (
      <div>
        <Navbar style={{backgroundColor: "#6495ED", marginBottom:"10px"}}>
          <ListCreate lists={props.shoppingLists}/>
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
          {filteredShoppingLists.map((list) => {
            const isOwner = identity?.uuIdentity === list.owner.id;
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
