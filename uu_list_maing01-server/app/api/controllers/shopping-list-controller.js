"use strict";

class ShoppingListController {
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  delete() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  list() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  get() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  update() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  addMember() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  addItem() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  deleteItem() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  markAsDone() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  updateItem() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }
  markItemAsDone() {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession()

    return {
      awid,
      shoppingList: dtoIn.shoppingList,
      uuAppErrorMap: {}
    };
  }



}

module.exports = new ShoppingListController();
