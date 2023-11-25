"use strict";
const { ObjectId } = require("bson");
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {
    constructor(...args) {
      super(...args);
    }

    async createSchema() {
        await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
        await super.createIndex({ awid: 1, categoryIdList: 1 });
        await super.createIndex({ awid: 1, name: 1 });
    }

    async create(uuObject) {
        return await super.insertOne(uuObject);
    }
}

module.exports = JokeMongo;