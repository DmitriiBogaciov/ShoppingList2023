"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppingListMongo extends UuObjectDao {
  // constructor(...args) {
  //   super(...args);
  // }

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1 });
  }

  async create(list) {
    return await super.insertOne(list);
  }

  async list(awid) {
    let filter = { awid };
    return await super.find(filter);
  }

  async get(awid, dtoIn) {
    let filter = { awid, _id: dtoIn };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
}

module.exports = ShoppingListMongo;
