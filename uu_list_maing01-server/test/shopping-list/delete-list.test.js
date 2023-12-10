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
            id: listId,
        };

        const result = await TestHelper.executePostCommand(`shoppingList/remove`, dtoIn);

        expect(result.data.message).toBe("Shopping list successfully removed.");

        expect(result.data.uuAppErrorMap).toEqual({});

        expect(result.status).toBe(200);

    });
});