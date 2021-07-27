import GitoliteAdmin from "../GitoliteAdmin";
import shelljs from "shelljs";

jest.mock("shelljs", () => ({
  __esModule: true,
  default: {
    cd: jest.fn(),
    exec: jest.fn()
  }
}));

describe("GitoliteAdmin.Users", () => {
  const PATH = "/path/to/gitolite/admin/repo";
  const gitoliteAdmin = GitoliteAdmin.init(PATH);

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
