import fs from "fs";
import { checkIfFilesExists } from "../utils/checkIfFilesExists";

describe("checkIfFilesExists", () => {
  const EXISTING_FOLDER_PATH = "./test-folder";
  const NONEXISTING_FILE_PATH = "./test-file";

  beforeAll(() => {
    fs.mkdirSync(EXISTING_FOLDER_PATH);
  });

  afterAll(() => {
    fs.rmdirSync(EXISTING_FOLDER_PATH);
  });

  test("throws an error if one file does not exist", () => {
    const PATHS = [EXISTING_FOLDER_PATH, NONEXISTING_FILE_PATH];

    expect(() => {
      checkIfFilesExists(PATHS);
    }).toThrowError("Some of the files input do not exist");
  });

  test("does not throw any error if all files exist", () => {
    const PATHS = [EXISTING_FOLDER_PATH];

    expect(() => {
      checkIfFilesExists(PATHS);
    }).not.toThrow();
  });
});
