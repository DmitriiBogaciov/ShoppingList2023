"use strict";
const List2023MainAbl = require("../../abl/list2023-main-abl.js");

class List2023MainController {
  init(ucEnv) {
    return List2023MainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return List2023MainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return List2023MainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new List2023MainController();
