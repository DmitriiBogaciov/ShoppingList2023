const { TestHelper } = require("uu_appg01_server-test");

let listId;

beforeAll(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
    await TestHelper.initUuSubAppInstance();
    await TestHelper.createUuAppWorkspace();
    await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });

    const createListResponse = await TestHelper.executePostCommand("shoppingList/create", {
        name: "TestList"
    });
});

afterAll(async () => {
    await TestHelper.teardown();
});

describe("Get shopping list test/ Alternative", () => {
    test("shoppingList/get", async () => {
        
        let dtoIn = {
            id: "invalidId",
        };

        try {
            const result = await TestHelper.executeGetCommand("shoppingList/get", dtoIn);

            fail("DtoIn valid");

        } catch (error) {
            expect(error.status).toBe(400);

            expect(error.message).toBe("UuObject ShoppingList does not exist.");

            expect(error.paramMap).toEqual({
                "id": {
                    "id": "invalidId"
                }
            });
        }

    
    });
});