import GitoliteAdmin from "../GitoliteAdmin";

describe("GitoliteAdmin", () => {
  test("is initialized", () => {
    const PATH = "/path/to/folder";

    const instance = GitoliteAdmin.init(PATH);

    expect(instance).toBeDefined();
  });

  test("is initialized with the right path", () => {
    const PATH = "/path/to/folder";

    const instance = GitoliteAdmin.init(PATH);

    expect(instance.gitoliteAdminRepoPath).toEqual(PATH);
  });
});
