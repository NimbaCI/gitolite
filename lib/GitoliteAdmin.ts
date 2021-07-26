import Users from "./Users";

class GitoliteAdmin {
  private static instance: GitoliteAdmin;
  gitoliteAdminRepoPath: string;
  users = Users();

  private constructor(path: string) {
    this.gitoliteAdminRepoPath = path;
  }

  public static init(path: string) {
    if (!GitoliteAdmin.instance) {
      GitoliteAdmin.instance = new GitoliteAdmin(path);
    }

    return GitoliteAdmin.instance;
  }
}

export default GitoliteAdmin;
