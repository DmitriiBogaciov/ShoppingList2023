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

describe("Get shopping list test", () => {
    test("shoppingList/get", async () => {
        
        let dtoIn = {
            id: listId,
        };

        const result = await TestHelper.executeGetCommand(`shoppingList/get`, dtoIn);

        expect(result.data).toHaveProperty('name', 'TestList');
        expect(result.data).toHaveProperty('owner');
        expect(result.data.owner).toHaveProperty('id', null);
        expect(result.data.owner).toHaveProperty('name', null);
        expect(result.data).toHaveProperty('awid', '22222222222222222222222222222222');
        expect(result.data).toHaveProperty('members', []);
        expect(result.data).toHaveProperty('items', []);
        expect(result.data).toHaveProperty('done', false);
        expect(result.data).toHaveProperty('sys');
        expect(result.data.sys).toHaveProperty('cts');
        expect(result.data.sys).toHaveProperty('mts');
        expect(result.data.sys).toHaveProperty('rev');
        expect(result.data).toHaveProperty('id');
        expect(result.data).toHaveProperty('uuAppErrorMap', {});
    });
});