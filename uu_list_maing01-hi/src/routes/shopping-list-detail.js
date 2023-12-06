//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import { RouteController } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListDetail from "../bricks/shopping-list/listDetail";
import ListDetailProvider from "../bricks/shopping-list/providers/listDetail-provider.js";
import ItemProvider from "../bricks/shopping-list/providers/item-provider.js"
import DataObjectStateResolver from "../core/data-object-state-resolver.js";

//@@viewOff:imports

//@@viewOn:css
const Css = {
  container: () => Config.Css.css({ maxWidth: 1280, margin: "0px auto" }),
  createView: () => Config.Css.css({ margin: "24px 0px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // listId: PropTypes.string.isRequired,
    // itemIds: PropTypes.array.isRequired,
  },

  render(props) {
    return (
      <>
        <RouteBar />
        <ListDetailProvider listId={props.params.listId}>
          {(listDataObject) => (
            <RouteController routeDataObject={listDataObject}>
              <div className={Css.container()}>
                <ItemProvider listId={props.params.listId} itemIds={props.params.itemIds}>
                  {(itemDataObject) => (
                    <DataObjectStateResolver dataObject={itemDataObject}>
                      <ListDetail listDataObject={listDataObject} itemDataObject={itemDataObject} />
                    </DataObjectStateResolver>
                  )}
                </ItemProvider>
              </div>
            </RouteController>
          )}
        </ListDetailProvider>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
