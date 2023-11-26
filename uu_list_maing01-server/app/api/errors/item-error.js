"use strict";

const ListMainUseCaseError = require("./list-main-use-case-error");

const Create = {
    UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/item/create`,
    invalidDtoIn: class extends ListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}invalidDtoIn`;
            this.message = `DtoIn is not valid`
        }
    },

    ItemDaoCreateFaild: class extends ListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}/ItemDaoCreateFaild`;
            this.message = `Create imet by item Dao created failed`
        }
    }
}

const List = {
    UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/item/list`,
    invalidDtoIn: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },
    ItemDoesNotExist: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}ItemDoesNotExist`;
        this.message = "UuObject Item does not exist.";
      }
    },
    ItemNotInCorrectState: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}ItemNotInCorrectState`;
        this.message = "UuObject Item is not in correct state.";
      }
    },
  };

const Get = {
  UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/item/get`,
  invalidDtoIn: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },

    ItemDoesNotExist: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}ItemDoesNotExist`;
        this.message = "UuObject Item does not exist.";
      }
    },
}

const Update = {
  UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/item/update`,
  invalidDtoIn: class extends ListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ItemDaoUpdateFailed: class extends ListMainUseCaseError {
     constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}ItemDaoUpdateFailed`;
      this.message = "UuObject Item update failed.";
    }
  }, 
}

const Remove = {
  UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/item/remove`,
  invalidDtoIn: class extends ListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ItemDoesNotExist: class extends ListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}ItemDoesNotExist`;
      this.message = "UuObject Item does not exist.";
    }
  },
  UserNotAuthorized: class extends ListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
}

module.exports = {
    Create,
    List,
    Get,
    Update,
    Remove
}