"use strict";
const ShoppingListAbl = require("../../abl/shopping-list-abl");

class ShoppingListController {
  create(ucEnv) {
    return ShoppingListAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession().getIdentity());
    };

  list(ucEnv) {
    return ShoppingListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  };

  get(ucEnv) {
    return ShoppingListAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return ShoppingListAbl.update(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getSession().getIdentity(), ucEnv.getAuthorizationResult());
  }

  remove(ucEnv) {
    return ShoppingListAbl.remove(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  listForUser(ucEnv) {
    return ShoppingListAbl.listForUser(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession().getIdentity());
  };
}
  

// remove(ucEnv) {
//   let dtoIn = ucEnv.getDtoIn();

//   return {
//     shoppingList: dtoIn.shoppingList,
//     uuAppErrorMap: {}
//   };
// }





// addMember(ucEnv) {
//   let dtoIn = ucEnv.getDtoIn();

//   return {
//     shoppingList: dtoIn.shoppingList,
//     uuAppErrorMap: {}
//   };
// }

// addItem(ucEnv) {
//   let dtoIn = ucEnv.getDtoIn();

//   return {
//     shoppingList: dtoIn.shoppingList,
//     uuAppErrorMap: {}
//   };
// }

// deleteItem(ucEnv) {
//   let dtoIn = ucEnv.getDtoIn();
//   return {
//     shoppingList: dtoIn.shoppingList,
//     uuAppErrorMap: {}
//   };
// }

// markAsDone(ucEnv) {
//   let dtoIn = ucEnv.getDtoIn();

//   return {
//     shoppingList: dtoIn.shoppingList,
//     uuAppErrorMap: {}
//   };
// }

// updateItem(ucEnv) {
//   let dtoIn = ucEnv.getDtoIn();

//   return {
//     shoppingList: dtoIn.shoppingList,
//     uuAppErrorMap: {}
//   };
// }

// markItemAsDone(ucEnv) {
//   let dtoIn = ucEnv.getDtoIn()

//   return {
//     shoppingList: dtoIn.shoppingList,
//     uuAppErrorMap: {}
//   };
// }

module.exports = new ShoppingListController();
