"use strict";

const ListMainUseCaseError = require("./list-main-use-case-error");

const Create = {
    UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/shopping-list/create`,
    invalidDtoIn: class extends ListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}invalidDtoIn`;
            this.message = `DtoIn is not valid`
        }
    },

    ShoppingListDaoCreateFaild: class extends ListMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}/shoppingListDaoCreateFaild`;
            this.message = `Create list by list Dao created failed`
        }
    }
}

const List = {
    UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/shopping-list/list`,
    invalidDtoIn: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },
    ShoppingListDoesNotExist: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}ShoppingListDoesNotExist`;
        this.message = "UuObject ShoppingList does not exist.";
      }
    },
    ShoppingListNotInCorrectState: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}ShoppingListNotInCorrectState`;
        this.message = "UuObject ShoppingList is not in correct state.";
      }
    },
  };

const Get = {
  UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/shopping-list/get`,
  invalidDtoIn: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },

    ShoppingListDoesNotExist: class extends ListMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}ShoppingListDoesNotExist`;
        this.message = "UuObject ShoppingList does not exist.";
      }
    },
}

const Update = {
  UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/shopping-list/update`,
  invalidDtoIn: class extends ListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ShoppingListDaoUpdateFailed: class extends ListMainUseCaseError {
     constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}ShoppingListDaoUpdateFailed`;
      this.message = "UuObject ShoppingList update failed.";
    }
  }, 
}

const Remove = {
  UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/shopping-list/remove`,
  invalidDtoIn: class extends ListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ShoppingListDoesNotExist: class extends ListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}ShoppingListDoesNotExist`;
      this.message = "UuObject ShoppingList does not exist.";
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

const ListForUser = {
  UC_CODE: `${ListMainUseCaseError.ERROR_PREFIX}/shopping-list/listForUser`,
  invalidDtoIn: class extends ListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
}

module.exports = {
    Create,
    List,
    Get,
    Update,
    Remove,
    ListForUser
}