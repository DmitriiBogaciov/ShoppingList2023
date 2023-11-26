const Errors = require("../errors/item-error.js");

const Warnings = {
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
  },
  Remove: {
    UnsupportedKeys: {
      code: `${Errors.Remove.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;