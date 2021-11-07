import fs from "fs";

export const readTextFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
}
