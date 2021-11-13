import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";

const parseInput = (input: string) => {
  return null;
}

export const calculatePartOne = (input: string) => {
  return parseInput(input)
}

export const calculatePartTwo = (input: string) => {
  return parseInput(input)
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
