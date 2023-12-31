"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/item-error.js");
const Warnings = require("../api/warnings/item-warnings.js");
const { Schemas, Profiles } = require("./constants.js");

class ItemAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao(Schemas.ITEM);
        this.listDao = DaoFactory.getDao(Schemas.SHOPPING_LIST);
    }

    async create(awid, dtoIn) {

        const addedValues = {
            awid: awid,
            done: false
          }

        let uuAppErrorMap = {};
        let validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);
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
                throw new Errors.Create.ItemDaoCreateFaild({ uuAppErrorMap }, e)
            }
    
            throw e;
        }
    
        dtoOut.uuAppErrorMap = uuAppErrorMap;
    
        return dtoOut;
    }

    async list(awid, dtoIn, authorizationResult) {
        let uuAppErrorMap = {};
    
        let validationResult = this.validator.validate("itemListDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Warnings.List.UnsupportedKeys.code,  Errors.List.invalidDtoIn);
    
        let item;
        try {
          item = await this.dao.list(awid);
        } catch (e) {
          throw new Error("Error calling dao.list: " + e.message);
        }
      
        const dtoOut = {
          ...item,
          uuAppErrorMap,
        };
    
        return dtoOut;
    }

    async listByIds(awid, dtoIn) {
      let uuAppErrorMap = {};
  
      let validationResult = this.validator.validate("itemListByIdsDtoInType", dtoIn);
      uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Warnings.ListByIds.UnsupportedKeys.code,  Errors.ListByIds.invalidDtoIn);
  
      try {
        const items = await this.dao.listByIds(awid, dtoIn.idList);
 
        return {
          items,
          uuAppErrorMap,
        };
      } catch (e) {
        throw new Error("Error calling dao.listByIds: " + e.message);
      }
  }

    async get(awid, dtoIn, authorizationResult) {
        let uuAppErrorMap = {};
    
        let validationResult = this.validator.validate("itemGetDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, uuAppErrorMap, Errors.Get.invalidDtoIn);
    
        let item;
        try {
            item = await this.dao.get(awid, dtoIn.id);
        } catch (e) {
          throw new Error("Error calling dao.get: " + e.message);
        }
    
        if (!item) {
          throw new Errors.Get.ItemDoesNotExist(uuAppErrorMap, { id: dtoIn });
        }
    
        const dtoOut = {
          ...item,
          uuAppErrorMap,
        };
    
        return dtoOut;
    }

    async update(awid, dtoIn) {
        let uuAppErrorMap = {};
    
        let validationResult = this.validator.validate("itemUpdateDtoInType", dtoIn);
        uuAppErrorMap = ValidationHelper.processValidationResult(
          dtoIn,
          validationResult,
          uuAppErrorMap,
          Warnings.Update.UnsupportedKeys.code,
          Errors.Update.invalidDtoIn
        );
        let existingItem;
        try {
            existingItem = await this.dao.get(awid, dtoIn.id);
        } catch (e) {
          throw new Error("Error calling dao.get: " + e.message);
        }
      
        if (!existingItem) {
          throw new Errors.Get.ItemDoesNotExist(uuAppErrorMap, { id: dtoIn.id });
        }

        const updatedItem = {
          ...dtoIn
        };
        updatedItem.awid = awid;
        let newItem;
        try {
            newItem = await this.dao.update(updatedItem);
        } catch (e) {
          if (e instanceof ObjectStoreError) {
            throw new Errors.Update.ShoppingListDaoUpdateFailed(uuAppErrorMap, e);
          }
          throw e;
        }
        
        const dtoOut = { ...newItem, uuAppErrorMap};
    
        return dtoOut;
    }

    async remove(awid, dtoIn, session, authorizationResult) {
        let uuAppErrorMap = {};
    
        const validationResult = this.validator.validate("itemRemoveDtoInType", dtoIn);
    
        uuAppErrorMap = ValidationHelper.processValidationResult(
          dtoIn,
          validationResult,
          uuAppErrorMap,
          Warnings.Remove.UnsupportedKeys.code,
          Errors.Remove.invalidDtoIn
        );
    
        let existingItem;
        try {
          existingItem = await this.dao.get(awid, dtoIn.id);
        } catch (e) {
          throw new Error("Error calling dao.get: " + e.message);
        }
      
        if (!existingItem) {
          throw new Errors.List.ItemDoesNotExist(uuAppErrorMap, { id: dtoIn.id });
        }
    
        // const uuIdentity = session.getIdentity().getUuIdentity();
        // const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
        // if (uuIdentity !== existingItem.owner && !isAuthorities) {
        //   throw new Errors.Remove.UserNotAuthorized({ uuAppErrorMap });
        // }
        let existingList;

        try {
          existingList = await this.listDao.get(awid, dtoIn.listId);
        } catch (e) {
          throw new Error("Error calling dao.get: " + e.message);
        }

        if (existingList) {
          existingList.items = existingList.items.filter((id) => id !== dtoIn.id);
          try {
            await this.listDao.update({ id: existingList.id, items: existingList.items, awid: existingList.awid });
          } catch (e) {
            throw new Error("Error calling dao.update: " + e.message);
          }
        }
    
        await this.dao.remove(awid, dtoIn.id);
    
        return {
          message: "Item successfully removed.",
          uuAppErrorMap
        };
    }
}

module.exports = new ItemAbl();