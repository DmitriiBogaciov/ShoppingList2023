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

    listId = createListResponse.data.id;
});

afterAll(async () => {
    await TestHelper.teardown();
});

describe("Removing shopping list test", () => {
    test("shoppingList/remove", async () => {

        let dtoIn = {
            id: "invalidId",
        };

        try {
            const result = await TestHelper.executePostCommand("shoppingList/remove", dtoIn);

            fail("DtoIn valid");

        } catch (error) {
            expect(error.status).toBe(400);

            expect(error.message).toBe("UuObject ShoppingList does not exist.");

            expect(error.paramMap).toEqual({
                "id": "invalidId"
            });
        }
    });
});