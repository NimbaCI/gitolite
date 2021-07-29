import fs from "fs";

export const checkIfFilesExists = (listOfFilesPaths: string[]) => {
  listOfFilesPaths.forEach(path => {
    if (!fs.existsSync(path)) {
      throw new Error("Some of the files input do not exist");
    }
  });
};
