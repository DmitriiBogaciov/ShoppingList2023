//@@viewOn:imports
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Schemas } = require("./constants");
//@@viewOff:imports

//@@viewOn:components
class InstanceChecker {
  constructor() {
    this.dao = DaoFactory.getDao(Schemas.SHOPPING_LIST);
  }

  /**
   * Checks whether instance exists and is of proper state
   * @param {String} awid Used awid
   * @param {Set} states A map with allowed states
   * @param {Object} errors Object with error definitions
   * @param {Object} uuAppErrorMap Standard uuAppErrorMap
   * @returns {Promise<[]>} instance itself
   */
  async ensureInstanceAndState(awid, allowedStateRules, authorizationResult, errors, uuAppErrorMap = {}) {
    // HDS 1
    const shoppingLists = await this.ensureInstance(awid, errors, uuAppErrorMap);

    // HDS 2
    const authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    // note: the "biggest" profile is always in first position
    const allowedStates = allowedStateRules[authorizedProfiles[0]];

    // HDS 3
    if (!allowedStates.has(shoppingLists.state)) {
      throw new errors.ShoppingListNotInCorrectState(
        { uuAppErrorMap },
        {
          awid,
          state: shoppingLists.state,
          expectedState: Array.from(allowedStates),
        }
      );
    }

    return shoppingLists;
  }

  /**
   * Checks whether instance exists
   * @param {String} awid Used awid
   * @param {Object} errors Object with error definitions
   * @param {Object} uuAppErrorMap Standard uuAppErrorMap
   * @returns {Promise<[]>} instance itself
   */
  async ensureInstance(awid, errors, uuAppErrorMap) {
    // HDS 1
    let shoppingLists = await this.dao.getByAwid(awid);

    // HDS 2
    if (!shoppingLists) {
      // 2.1.A
      throw new errors.ShoppingListDoesNotExist({ uuAppErrorMap }, { awid });
    }

    return shoppingLists;
  }
}
//@@viewOff:components

//@@viewOn:exports
module.exports = new InstanceChecker();
//@@viewOff:exports