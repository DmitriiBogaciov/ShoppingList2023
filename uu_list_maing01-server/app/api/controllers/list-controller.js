"use strict";

class ListController {

  helloWorld() {
    return{
      text: "Hello World",
      uuAppErrorMap: {},
    }
  }

}

module.exports = new ListController();
