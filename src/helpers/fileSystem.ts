import fs from "fs";
import os from "os";

export const readTextFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
}

export const readFileLines = (filePath: string) => {
  return readTextFile(filePath)
    .split(os.EOL);
}
