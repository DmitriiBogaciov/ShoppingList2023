import ShoppingList2023 from "shopping_list2023_maing01-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`ShoppingList2023.Routes.ShoppingLists`, () => {
  testProperties(ShoppingList2023.Routes.ShoppingLists, CONFIG);
});
