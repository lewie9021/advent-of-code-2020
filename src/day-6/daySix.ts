import os from "os";
import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { sum, unique } from "../helpers/arrays";

const parseInput = (input: string) => {
  return input.split(`${os.EOL}${os.EOL}`)
    .map((group) => {
      return group
        .replace(new RegExp(os.EOL, "g"), "")
        .split("");
    });
}

export const calculatePartOne = (input: string) => {
  const counts = parseInput(input)
    .map((group) => unique(group).length);

  return sum(counts);
}

export const calculatePartTwo = (input: string) => {
  return parseInput(input)
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
