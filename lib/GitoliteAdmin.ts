import Users from "./Users";

type UsersObject = {
  add: (username: string, sshKey: string) => void;
  remove: (username: string) => void;
};

class GitoliteAdmin {
  private static instance: GitoliteAdmin;
  gitoliteAdminRepoPath: string;
  users: UsersObject;

  private constructor(path: string) {
    this.gitoliteAdminRepoPath = path;
    this.users = Users(path);
  }

  public static init(path: string) {
    if (!GitoliteAdmin.instance) {
      GitoliteAdmin.instance = new GitoliteAdmin(path);
    }

    return GitoliteAdmin.instance;
  }
}

export default GitoliteAdmin;
