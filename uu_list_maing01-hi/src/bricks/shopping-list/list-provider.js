//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const shoppingListDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        // loadNext: handleLoadNext,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: handleUpdate,
        // delete: handleDelete,
      },
      pageSize: 3,
    });

    const imageUrlListRef = useRef([]);

    // function handleLoad(dtoIn) {
    //   return Calls.ShoppingList.list(dtoIn);
    // }

    function handleLoad(dtoIn) {
      return Calls.ShoppingList.listForUser(dtoIn);
    }

    function handleCreate(dtoIn) {
      return Calls.ShoppingList.create(dtoIn);
    }

    function handleUpdate(dtoIn) {
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
    return typeof props.children === "function" ? props.children(shoppingListDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports