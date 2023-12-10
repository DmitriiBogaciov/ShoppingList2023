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

describe("Create shopping list test/ Alternative", () => {
    test("shoppingList/create", async () => {
        let dtoIn = {
            nazev: "Albert",
        };

        try {
            const result = await TestHelper.executePostCommand("shoppingList/create", dtoIn);
            fail("DtoIn valid");

        } catch (error) {
            expect(error.status).toBe(400);

            expect(error.message).toBe("DtoIn is not valid");

            const paramMap = error.paramMap;
            expect(paramMap).toHaveProperty("invalidValueKeyMap.$", {
                "shape.e002": "The content of shape must be valid."
            });
            expect(paramMap).toHaveProperty("unsupportedKeyList", ["$.nazev"]);
        }
    });
});

