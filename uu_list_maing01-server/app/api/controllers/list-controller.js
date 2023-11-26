"use strict";

class ListController {
  helloWorld(ucEnv) {
    const name = ucEnv.getSession().getIdentity().getName();
    const id = ucEnv.getSession().getIdentity()
    const awid = ucEnv.getUri().getAwid();
    const auth = ucEnv.getAuthorizationResult();
    return {
      greeting: `Hello ${name}`,
      id: `Id: ${id}`,
      awidInfo: `Awid: ${awid}`,
      authorization: `AuthRes: ${auth}`,
      uuAppErrorMap: {},
    };
  }
}

module.exports = new ListController();
