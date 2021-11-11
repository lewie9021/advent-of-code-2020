import os from "os";
import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { sum, unique } from "../helpers/arrays";

const parseInput = (input: string) => {
  return input.split(`${os.EOL}${os.EOL}`)
    .map((group) => {
      return group
        .split(os.EOL)
        .map((person) => person.split(""));
    });
}

export const calculatePartOne = (input: string) => {
  const counts = parseInput(input)
    .map((group) => unique(group.flat()).length);

  return sum(counts);
}

export const calculatePartTwo = (input: string) => {
  const counts = parseInput(input)
    .map((group) => {
      const [firstPerson, ...rest] = group;
      const matches = firstPerson.filter((question) => {
        return rest.every((person) => person.includes(question))
      });

      return unique(matches).length;
    });

  return sum(counts);
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
