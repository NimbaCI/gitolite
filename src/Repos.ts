import shell from "shelljs";
import fs from "fs";

const removeRepoFromLineAt = (
  lines: string[],
  linesIndexToRemoveFrom: number
) => {
  // eslint-disable-next-line immutable/no-let
  let isRemovingDone = false;

  return lines.filter((line, index) => {
    if (isRemovingDone) {
      return true;
    }

    // Just in case...
    if (index === linesIndexToRemoveFrom - 2 && line.trim() === "") {
      return false;
    }

    if (index === linesIndexToRemoveFrom - 1 && line.trim() === "") {
      return false;
    }

    if (index === linesIndexToRemoveFrom) {
      return false;
    }

    if (index > linesIndexToRemoveFrom) {
      if (line.includes("repo")) {
        isRemovingDone = true;

        return true;
      }

      return false;
    }

    return true;
  });
};

const Repos = (
  configFilePath: string,
  pathToGitoliteAdmin: string,
  isLocal: boolean
) => {
  const add = (repoName: string, username: string) => {
    shell.cd(pathToGitoliteAdmin);

    fs.appendFileSync(configFilePath, "\n\n");
    fs.appendFileSync(configFilePath, `repo ${username}/${repoName}\n`);
    fs.appendFileSync(configFilePath, `    RW+     =   ${username}`);

    // Save changes
    shell.exec("git add -A");
    shell.exec(`git commit -am "add repo ${username}/${repoName}"`);

    if (isLocal) {
      shell.exec("$HOME/bin/gitolite push");
    } else {
      shell.exec("git push");
    }
  };

  const remove = (repoName: string, username: string) => {
    shell.cd(pathToGitoliteAdmin);

    const fileContent = fs.readFileSync(configFilePath, {
      encoding: "utf8"
    });
    const linesArray = fileContent.split("\n");

    const startingIndex = linesArray.findIndex(line =>
      line.includes(`repo ${username}/${repoName}`)
    );

    const filteredLines = removeRepoFromLineAt(linesArray, startingIndex);

    fs.writeFileSync(configFilePath, filteredLines.join("\n"));

    // Save changes
    shell.exec("git add -A");
    shell.exec(`git commit -am "add repo ${username}/${repoName}"`);

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

export default Repos;
