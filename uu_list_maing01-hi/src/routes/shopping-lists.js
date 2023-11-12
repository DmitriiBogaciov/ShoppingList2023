//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import TestDataLists from "../bricks/shopping-list/testDataLists";
import List from "../bricks/shopping-list/shopping-lists";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingLists",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingLists);

    return currentNestingLevel ? (
      <div>
        <RouteBar />
        <List shoppingLists={TestDataLists}/>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingLists };
export default ShoppingLists;
//@@viewOff:exports
