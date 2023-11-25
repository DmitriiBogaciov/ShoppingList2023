// "use strict";
// const CreateAbl = require("../../abl/ShoppingList/create-abl");
// const ListAbl = require("../../abl/ShoppingList/list-abl");
// const GetAbl = require("../../abl/ShoppingList/get-abl");

// class ShoppingListController {
//   create(ucEnv) {
//       return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
//     };
//   }

  // remove(ucEnv) {
  //   let dtoIn = ucEnv.getDtoIn();

  //   return {
  //     shoppingList: dtoIn.shoppingList,
  //     uuAppErrorMap: {}
  //   };
  // }

  // list(ucEnv) {
  //   return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  // }

  // get(ucEnv) {
  //   let dtoIn = ucEnv.getDtoIn();

  //   return {
  //     shoppingList: dtoIn.shoppingList,
  //     uuAppErrorMap: {}
  //   };
  // }

  // update(ucEnv) {
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
