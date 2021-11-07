import os from "os";

export const getInputLines = (input: string) => {
  return input.split(os.EOL);
};