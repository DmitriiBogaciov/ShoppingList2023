//@@viewOn:imports
import {createVisualComponent, useSession, Utils} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListDetail from "../bricks/shopping-list/listDetail";
import TestShoppingList from "../bricks/shopping-list/testDataList"
import {useState} from "react";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    data: TestShoppingList
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data } = props;

    const [modalOpen, setModalOpen] = useState(false);

    const { identity } = useSession();
    const isOwner = identity?.uuIdentity === data.owner.id;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListDetail);

    return currentNestingLevel ? (
      <div>
        <RouteBar />
        <Uu5Elements.Block
          // header={
          //   // <Uu5Elements.Text category="interface" segment="title" type="common">
          //   //   {isOwner
          //   //     ? ({ style }) => (
          //   //       <TextInput className={Config.Css.css(style)} id={"header"} value={name} onChange={setName} />
          //   //     )
          //   //     : name}
          //   // </Uu5Elements.Text>
          // }
          // actionList={[
          //   { icon: "uugdsstencil-user-account-key", children: data.owner.name, onClick: () => setModalOpen(true) },
          // ]}
          // headerSeparator={true}
        >
          <ListDetail shoppingList = {data} />
        </Uu5Elements.Block>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
