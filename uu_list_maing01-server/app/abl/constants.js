//@@viewOn:constants
const Constants = {
    Schemas: {
        SHOPPING_LIST: "shoppingList",
        ITEM: "item"
    },

    ShoppingList: {
        States: {
            INIT: "init",
            ACTIVE: "active",
            UNDER_CONSTRUCTION: "underConstruction",
            CLOSED: "closed",
        },
        get NonFinalStates() {
          return new Set([this.States.ACTIVE, this.States.UNDER_CONSTRUCTION]);
        },
    },

    Item: {
        States: {
            INIT: "init",
            ACTIVE: "active",
            UNDER_CONSTRUCTION: "underConstruction",
            CLOSED: "closed",
        },
        get NonFinalStates() {
          return new Set([this.States.ACTIVE, this.States.UNDER_CONSTRUCTION]);
        },
    },

    Profiles: {
        AUTHORITIES: "Authorities",
        EXECUTIVES: "Executives",
        READERS: "Readers",
      },
};

module.exports = Constants;