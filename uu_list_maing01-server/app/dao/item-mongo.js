"use strict";
const { ObjectId } = require("bson");
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ItemMongo extends UuObjectDao {
  // constructor(...args) {
  //   super(...args);
  // }

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1 });
  }

  async create(item) {
    return await super.insertOne(item);
  }

  async list(awid) {
    let filter = { awid };
    return await super.find(filter);
  }

  async listByIds(awid, idlist) {
    if (!Array.isArray(idlist)) {
      idlist = [];
    }
  
    // Теперь можно безопасно использовать map
    let filter = { 
      awid, 
      _id: { 
        $in: idlist.map((id) => new ObjectId(id)),
      },
    };
  
    console.log(`listByIds filter = `, filter);
  
    return await super.find(filter);
  }

  async get(awid, dtoIn) {
    let filter = { awid, _id: dtoIn };
    console.log(`Get fiter`, filter)
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async remove(awid, id) {
    await super.deleteOne({ awid, id });
  }
}

module.exports = ItemMongo;