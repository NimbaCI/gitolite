import shell from "shelljs";

const Users = (pathToGitoliteAdmin: string, isLocal: boolean) => {
  const add = (username: string, sshKey: string) => {
    shell.cd(pathToGitoliteAdmin);
    shell.exec(`echo "${sshKey}" > keydir/${username}.pub`);

    // Save changes
    shell.exec("git add -A");
    shell.exec(`git commit -am "add user ${username}"`);

    if (isLocal) {
      shell.exec("$HOME/bin/gitolite push");
    } else {
      shell.exec("git push");
    }
  };

  const remove = (username: string) => {
    shell.cd(pathToGitoliteAdmin);
    shell.exec(`git rm keydir/${username}.pub`);

    // Save changes
    shell.exec("git add -A");
    shell.exec(`git commit -am "remove user ${username}"`);

    if (isLocal) {
      shell.exec("$HOME/bin/gitolite push");
    } else {
      shell.exec("git push");
    }
  };

  return {
    add,
    remove
  };
};

export default Users;
