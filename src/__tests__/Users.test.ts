import GitoliteAdmin from "../index";
import shelljs from "shelljs";

jest.mock("../utils/checkIfFilesExists");

jest.mock("shelljs", () => ({
  __esModule: true,
  default: {
    cd: jest.fn(),
    exec: jest.fn()
  }
}));

describe("GitoliteAdmin.Users", () => {
  const adminRepoPath = "/path/to/admin/repo";
  const permissionsConfigFilePath = "/path/to/config/file";

  const gitoliteAdmin = GitoliteAdmin.init({
    adminRepoPath,
    permissionsConfigFilePath
  });

  describe("add function", () => {
    test("adds a new user", () => {
      const USERNAME = "florian";
      const SSH_KEY = "sshKey";

      gitoliteAdmin.users.add(USERNAME, SSH_KEY);

      expect(shelljs.exec).toHaveBeenNthCalledWith(
        1,
        `echo "${SSH_KEY}" > keydir/${USERNAME}.pub`
      );
      expect(shelljs.exec).toHaveBeenNthCalledWith(2, "git add -A");
      expect(shelljs.exec).toHaveBeenNthCalledWith(
        3,
        `git commit -am "add user ${USERNAME}"`
      );
      expect(shelljs.exec).toHaveBeenNthCalledWith(4, "git push");
    });
  });
});
