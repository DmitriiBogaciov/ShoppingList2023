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

describe("Update shopping list test/ Alternative", () => {
    test("shoppingList/update", async () => {

        let dtoIn = {
            id: listId,
            name: 'NewName'
        };

        const result = await TestHelper.executePostCommand("shoppingList/update", dtoIn);
        console.log(`Updated list`, result);

        expect(result.data).toHaveProperty('name', 'NewName');
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