import GitoliteAdmin from "../index";
import fs from "fs";

jest.mock("../utils/checkIfFilesExists");

jest.mock("shelljs", () => ({
  __esModule: true,
  default: {
    cd: jest.fn(),
    exec: jest.fn(),
    rm: jest.fn()
  }
}));

describe("GitoliteAdmin.Repos", () => {
  const adminRepoPath = "/path/to/admin/repo";
  const reposPath = "/path/to/repos";
  const permissionsConfigFilePath = "./adminconf.conf";

  const gitoliteAdmin = GitoliteAdmin.init({
    adminRepoPath,
    permissionsConfigFilePath,
    reposPath
  });

  beforeEach(() => {
    fs.writeFileSync(
      permissionsConfigFilePath,
      "repo test\n    RW+     =   testUser"
    );
  });

  afterEach(() => {
    fs.unlinkSync(permissionsConfigFilePath);
  });

  describe("add function", () => {
    test("adds the repo info to config file", () => {
      const repoName = "repoName";
      const username = "username";
      const EXPECTED_FILE_CONTENT = `repo test
    RW+     =   testUser

repo username/repoName
    RW+     =   username`;

      gitoliteAdmin.repos.add(repoName, username);
      const fileContent = fs.readFileSync(permissionsConfigFilePath, {
        encoding: "utf8"
      });

      expect(fileContent).toBe(EXPECTED_FILE_CONTENT);
    });

    test("adds the repo info to config file with admin", () => {
      const repoName = "repoName";
      const username = "username";
      const admin = "admin";
      const EXPECTED_FILE_CONTENT_WITH_ADMIN = `repo test
    RW+     =   testUser

repo username/repoName
    RW+     =   username
    R       =   admin`;

      gitoliteAdmin.repos.add(repoName, username, admin);
      const fileContent = fs.readFileSync(permissionsConfigFilePath, {
        encoding: "utf8"
      });

      expect(fileContent).toBe(EXPECTED_FILE_CONTENT_WITH_ADMIN);
    });
  });

  describe("remove function", () => {
    test("remove the repo info from config file", () => {
      const repoName = "repoName";
      const username = "username";
      const STARTING_FILE_CONTENT = `repo test
    RW+     =   testUser

repo username/repoName
    RW+     =   username`;
      const EXPECTED_FILE_CONTENT = `repo test
    RW+     =   testUser`;

      fs.writeFileSync(permissionsConfigFilePath, STARTING_FILE_CONTENT);

      gitoliteAdmin.repos.remove(repoName, username);

      const fileContent = fs.readFileSync(permissionsConfigFilePath, {
        encoding: "utf8"
      });

      expect(fileContent).toBe(EXPECTED_FILE_CONTENT);
    });
  });
});
