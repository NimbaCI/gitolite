import GitoliteAdmin from "../GitoliteAdmin";

jest.mock("../utils/checkIfFilesExists");

describe("GitoliteAdmin", () => {
  test("is initialized", () => {
    const adminRepoPath = "/path/to/admin/repo";
    const permissionsConfigFilePath = "/path/to/config/file";

    const instance = GitoliteAdmin.init({
      adminRepoPath,
      permissionsConfigFilePath
    });

    expect(instance).toBeDefined();
  });
});
