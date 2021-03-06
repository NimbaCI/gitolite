import Repos from "./Repos";
import Users from "./Users";
import { checkIfFilesExists } from "./utils/checkIfFilesExists";

type UsersObject = {
  add: (username: string, sshKey: string) => void;
  remove: (username: string) => void;
};

type ReposObject = {
  add: (repoName: string, username: string, admin?: string) => void;
  remove: (repoName: string, username: string) => void;
};

type InitParams = {
  adminRepoPath: string;
  isLocal?: boolean;
  permissionsConfigFilePath: string;
  reposPath: string;
};

class GitoliteAdmin {
  private static instance: GitoliteAdmin;
  users: UsersObject;
  repos: ReposObject;

  private constructor(
    adminRepoPath: string,
    reposPath: string,
    configFilePath: string,
    isLocal: boolean
  ) {
    this.users = Users(adminRepoPath, isLocal);
    this.repos = Repos(configFilePath, adminRepoPath, reposPath, isLocal);
  }

  public static init({
    adminRepoPath,
    isLocal = false,
    permissionsConfigFilePath,
    reposPath
  }: InitParams) {
    checkIfFilesExists([adminRepoPath, permissionsConfigFilePath]);

    if (!GitoliteAdmin.instance) {
      GitoliteAdmin.instance = new GitoliteAdmin(
        adminRepoPath,
        reposPath,
        permissionsConfigFilePath,
        isLocal
      );
    }

    return GitoliteAdmin.instance;
  }
}

export default GitoliteAdmin;
