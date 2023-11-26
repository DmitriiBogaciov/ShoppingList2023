"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/shopping-list-error");
const Warnings = require("../api/warnings/shopping-list-warnings");
const { Schemas, Profiles } = require("./constants");

class ShoppingListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.SHOPPING_LIST)
  }

  async create(awid, dtoIn, identity) {

    const addedValues = {
           owner: identity.getUuIdentity(),
           awid: awid,
           members: [],
           items: []
         }

    let uuAppErrorMap = {};
    let validationResult = this.validator.validate("shoppingListCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Warnings.Create.UnsupportedKeys.code, Errors.Create.invalidDtoIn);
    
    let dtoOut;
    const uuObject = {
      ...dtoIn,
      ...addedValues,
    };
    try {
        dtoOut = await this.dao.create(uuObject);
    } catch (e) {
        if (e instanceof ObjectStoreError) {
            throw new Errors.Create.ShoppingListDaoCreateFaild({ uuAppErrorMap }, e)
        }

        throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async list(awid, dtoIn, authorizationResult) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Errors.List.InvalidDtoIn);

    let list;
    try {
      list = await this.dao.list(awid);
    } catch (e) {
      throw new Error("Error calling dao.list: " + e.message);
    }
  
    const dtoOut = {
      ...list,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async get(awid, dtoIn, authorizationResult) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Errors.Get.InvalidDtoIn);

    let shoppingList;
    try {
      shoppingList = await this.dao.get(awid, dtoIn.id);
    } catch (e) {
      throw new Error("Error calling dao.get: " + e.message);
    }

    if (!shoppingList) {
      throw new Errors.Get.ShoppingListDoesNotExist(uuAppErrorMap, { id: dtoIn });
    }

    const dtoOut = {
      ...shoppingList,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async update(awid, dtoIn, identity, authorizationResult) {
    let uuAppErrorMap = {};

    console.log(`DATA TO UPDATE`, dtoIn);

    let validationResult = this.validator.validate("shoppingListUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
    let existingList;
    try {
      existingList = await this.dao.get(awid, dtoIn.id);
    } catch (e) {
      throw new Error("Error calling dao.get: " + e.message);
    }
  
    if (!existingList) {
      throw new Errors.List.ShoppingListDoesNotExist(uuAppErrorMap, { id: dtoIn.id });
    }

    const uuIdentity = identity.getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
    if (uuIdentity !== existingList.owner && !isAuthorities) {
      throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
    }
  
    const updatedList = {
      ...dtoIn,
      revision: existingList.sys.rev + 1, // Увеличиваем ревизию на 1
    };
    updatedList.awid = awid;
    let newList;
    try {
      newList = await this.dao.update(updatedList);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.ShoppingListDaoUpdateFailed(uuAppErrorMap, e);
      }
      throw e;
    }
    
    const dtoOut = { ...newList, uuAppErrorMap, name: updatedList.name };

    return dtoOut;
  }
}

module.exports = new ShoppingListAbl();
