"use strict";
const ItemAbl = require("../../abl/item-abl");

class ItemController {
  create(ucEnv) {
    return ItemAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession().getIdentity());
  };

  list(ucEnv) {
    return ItemAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  };

  get(ucEnv) {
    return ItemAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return ItemAbl.update(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getSession().getIdentity(), ucEnv.getAuthorizationResult());
  }

  remove(ucEnv) {
    return ItemAbl.remove(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }

  listByIds(ucEnv) {
    return ItemAbl.listByIds(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  };
}

module.exports = new ItemController();