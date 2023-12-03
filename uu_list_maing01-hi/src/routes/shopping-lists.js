//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { RouteController } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListProvider from "../bricks/shopping-list/list-provider.js";
import List from "../bricks/shopping-list/shopping-lists.js"
//@@viewOff:imports

//@@viewOn:css
const Css = {
  container: () => Config.Css.css({ maxWidth: 1280, margin: "0px auto" }),
  createView: () => Config.Css.css({ margin: "24px 0px" }),
};
//@@viewOff:css

let ShoppingLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingLists",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ListProvider>
          {(shoppingListDataList) => (
            <RouteController routeDataObject={shoppingListDataList}>
              <div className={Css.container()}>
                <List shoppingListDataList={shoppingListDataList} />
              </div>
            </RouteController>
          )}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingLists };
export default ShoppingLists;
//@@viewOff:exports