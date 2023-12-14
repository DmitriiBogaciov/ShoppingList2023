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
    const itemDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
        // loadNext: handleLoadNext,
        getItems: handleGetItems,
        create: handleCreate,
        update: handleUpdate,
        remove: handleDelete,
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
      const idList = props.itemIds ? props.itemIds.split(',') : [];
      console.log(`Request to load items: `, {idList: idList});
      return Calls.Item.listByIds({idList: idList});
    }

    function handleCreate(dtoIn) {
      return Calls.Item.create(dtoIn);
    }

    function handleUpdate(dtoIn) {
      return Calls.Item.update(dtoIn);
    }

    function handleDelete(dtoIn) {
        return Calls.Item.remove(dtoIn);
    }

    function handleGetItems(dtoIn) {
      console.log(`Dtoin to load items`, dtoIn);
      return Calls.Item.listByIds({idList: dtoIn});
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
    return typeof props.children === "function" ? props.children(itemDataObject) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ItemProvider };
export default ItemProvider;
//@@viewOff:exports