//@@viewOn:imports
import { createComponent, useDataObject, useEffect, useRef, PropTypes } from "uu5g05";
import Config from "../config/config";
import Calls from "calls";
//@@viewOff:imports

const ItemProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  // propTypes: {
  //   itemsId: PropTypes.array.isRequired,
  // },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const itemtDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
        // loadNext: handleLoadNext,
        listUpdate: handleListUpdate,
        create: handleCreate,
      },
      itemHandlerMap: {
        // update: handleUpdate,
        // delete: handleDelete,
      },
      pageSize: 3,
    });

    const imageUrlListRef = useRef([]);

    function handleLoad() {
      console.log(`Props to load items: `, props);
      const idList = props.itemIds.split(',');
      console.log(`Request to load items: `, idList);
      return Calls.Item.listByIds({ idList });
    }

    function handleCreate(dtoIn) {
      return Calls.Item.create(dtoIn);
    }

    // function handleUpdate(dtoIn) {
    //   return Calls.Item.update(dtoIn);
    // }

    // function handleDelete(dtoIn) {
    //     return Calls.Item.remove(dtoIn);
    // }

    function handleListUpdate(dtoIn) {
        console.log(`DtoIn to update shopping with new item`, dtoIn)
        return Calls.ShoppingList.update(dtoIn);
    }

    useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return () => imageUrlListRef.current.forEach((url) => URL.revokeObjectURL(url));
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);
    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(itemtDataObject) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ItemProvider };
export default ItemProvider;
//@@viewOff:exports