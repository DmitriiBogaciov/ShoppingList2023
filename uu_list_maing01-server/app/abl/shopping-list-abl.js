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
      owner: {
        id: identity.getUuIdentity(),
        name: identity.getName(),
      },
      awid: awid,
      members: [],
      items: [],
      done: false
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
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Warnings.List.UnsupportedKeys.code, Errors.List.invalidDtoIn);

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

  async listForUser(awid, dtoIn, identity) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListListForUserDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Warnings.ListForUser.UnsupportedKeys.code, Errors.ListForUser.invalidDtoIn);

    try {
      const lists = await this.dao.listForUser(awid, identity.getUuIdentity());
      const dtoOut = {
        ...lists,
        uuAppErrorMap,
      };
      return dtoOut;
    } catch (e) {
      throw new Error("Error calling dao.listForUser: " + e.message);
    }
  }

  async get(awid, dtoIn, authorizationResult) {
    let uuAppErrorMap = {};

    let validationResult = this.validator.validate("shoppingListGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Errors.Get.invalidDtoIn);

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

    let validationResult = this.validator.validate("shoppingListUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.invalidDtoIn
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
    if (uuIdentity !== existingList.owner.id && !isAuthorities) {
      throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
    }

    const updatedList = {
      ...dtoIn
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

    const dtoOut = { ...newList, uuAppErrorMap };

    return dtoOut;
  }

  async remove(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListRemoveDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Remove.UnsupportedKeys.code,
      Errors.Remove.invalidDtoIn
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

    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
    if (uuIdentity !== existingList.owner && !isAuthorities) {
      throw new Errors.Remove.UserNotAuthorized({ uuAppErrorMap });
    }

    await this.dao.remove(awid, dtoIn.id);

    return {
      message: "Shopping list successfully removed.",
      uuAppErrorMap
    };
  }
}

module.exports = new ShoppingListAbl();
