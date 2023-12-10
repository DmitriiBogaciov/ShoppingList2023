const { TestHelper } = require("uu_appg01_server-test");

beforeAll(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
    await TestHelper.initUuSubAppInstance();
    await TestHelper.createUuAppWorkspace();
    await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGALL" });
});

afterAll(async () => {
    await TestHelper.teardown();
});

describe("Create shopping list test", () => {
    test("shoppingList/create", async () => {
        let dtoIn = {
            name: "Albert",
        };

        const result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);

        expect(typeof result === 'object').toBe(true);

        expect(result).toHaveProperty('name', 'Albert');
        expect(result).toHaveProperty('owner');
        expect(result).toHaveProperty('awid');
        expect(result).toHaveProperty('members');
        expect(result).toHaveProperty('items');
        expect(result).toHaveProperty('done', false);
        expect(result).toHaveProperty('sys');
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('uuAppErrorMap', {});
        
        expect(result.sys).toHaveProperty('cts');
        expect(result.sys).toHaveProperty('mts');
        expect(result.sys).toHaveProperty('rev');

    });
});