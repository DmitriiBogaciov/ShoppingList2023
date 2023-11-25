// "use strict";
// const { Validator } = require("uu_appg01_server").Validation;
// const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
// const { ValidationHelper } = require("uu_appg01_server").AppServer;
// const Errors = require("../../api/errors/list-main-error");
// const Schemas = require("../../api/validation_types/uu-list-types")

// class CreateAbl {
//   constructor() {
//     this.validator = Validator.load();
//     this.dao = DaoFactory.getDao(Schemas.listCreateDtoInType);
//   }

//   async create(awid, dtoIn, session, authorizationResult) {
//     let uuAppErrorMap = {};

//     const validationResult = this.validator.validate("listCreateDtoInType", dtoIn);
//     uuAppErrorMap = ValidationHelper.processValidationResult(
//       dtoIn,
//       validationResult,
//       uuAppErrorMap,
//       Errors.Create.InvalidDtoIn
//     );

//     const addedValues = {
//      uuIdentity: session.getIdentity().getUuIdentity(),
//      uuIdentityName: session.getIdentity().getName(),
//    }

//    const uuObject = {
//      ...dtoIn,
//      ...addedValues,
//    };

//    if ("name" in dtoIn && dtoIn.name.trim().length === 0) {
//     throw new Error("Invalid Name");
//   }

//   uuObject.awid = awid;
//     let list;

//     try {
//       list = await this.dao.create(uuObject);
//     } catch (e) {
//       // 6.1
//       if (e instanceof ObjectStoreError) {
//         throw new Error("Валидация не удалась. См. uuAppErrorMap для деталей.");
//       }
//       throw e;
//     }

//     const dtoOut = {
//       ...list,
//       uuAppErrorMap,
//     };

//     return dtoOut;
//   }
// }

// module.exports = new CreateAbl();