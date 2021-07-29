import Repos from "./Repos";
import Users from "./Users";
import { checkIfFilesExists } from "./utils/checkIfFilesExists";

type UsersObject = {
  add: (username: string, sshKey: string) => void;
  remove: (username: string) => void;
};

type ReposObject = {
  add: (repoName: string, username: string) => void;
  remove: (repoName: string, username: string) => void;
};

type InitParams = {
  adminRepoPath: string;
  permissionsConfigFilePath: string;
};

class GitoliteAdmin {
  private static instance: GitoliteAdmin;
  users: UsersObject;
  repos: ReposObject;

  private constructor(adminRepoPath: string, configFilePath: string) {
    this.users = Users(adminRepoPath);
    this.repos = Repos(configFilePath);
  }

  public static init({ adminRepoPath, permissionsConfigFilePath }: InitParams) {
    checkIfFilesExists([adminRepoPath, permissionsConfigFilePath]);

    if (!GitoliteAdmin.instance) {
      GitoliteAdmin.instance = new GitoliteAdmin(
        adminRepoPath,
        permissionsConfigFilePath
      );
    }

    return GitoliteAdmin.instance;
  }
}

export default GitoliteAdmin;
