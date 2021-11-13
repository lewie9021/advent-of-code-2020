import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";

interface LineFragments {
  range: [number, number];
  letter: string;
  password: string;
}

const parseInput = (input: string): Array<LineFragments> => {
  return getInputLines(input)
    .map((line) => {
      const groups = line.match(/(\d+\-\d+)\s(\w)\:\s(\w+)/);

      const [min, max] = groups[1]
        .split("-")
        .map((x) => parseInt(x));

      return {
        range: [min, max],
        letter: groups[2],
        password: groups[3],
      };
    });
}

export const calculatePartOne = (input: string) => {
  const validPasswords = parseInput(input)
    .filter(({ range, letter, password }) => {
      const [minOccurrences, maxOccurrences] = range;

      const matches = password.match(new RegExp(letter, "g"));
      const count = matches?.length || 0;

      return count >= minOccurrences && count <= maxOccurrences;
    });

  return validPasswords.length;
}

export const calculatePartTwo = (input: string) => {
  const validPasswords = parseInput(input)
    .filter(({ range, letter, password }) => {
      const matches = range
        .map((position) => password[position - 1])
        .filter((x) => x === letter);

      return matches.length === 1;
    });

  return validPasswords.length;
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
