const { TestHelper } = require("uu_appg01_server-test");

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

describe("List shopping list test", () => {
    test("shoppingList/list", async () => {
        const result = await TestHelper.executeGetCommand("shoppingList/list");
      
        expect(Array.isArray(result.data.itemList)).toBe(true);
        
        result.data.itemList.forEach(item => {
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('owner');
            expect(item).toHaveProperty('awid');
            expect(item).toHaveProperty('members');
            expect(item).toHaveProperty('items');
            expect(item).toHaveProperty('done');
            expect(item).toHaveProperty('sys');
            expect(item).toHaveProperty('id');
            
            expect(item.owner).toHaveProperty('id');
            expect(item.owner).toHaveProperty('name');
            
            expect(item.sys).toHaveProperty('cts');
            expect(item.sys).toHaveProperty('mts');
            expect(item.sys).toHaveProperty('rev');
        });
        expect(result.data.uuAppErrorMap).toEqual({});
    });
});