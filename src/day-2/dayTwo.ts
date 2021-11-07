import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";

interface LineFragments {
  range: [number, number];
  letter: string;
  password: string;
}

const getLineFragments = (line: string): LineFragments => {
  const groups = line.match(/(\d+\-\d+)\s(\w)\:\s(\w+)/);

  const [min, max] = groups[1]
    .split("-")
    .map((x) => parseInt(x));

  return {
    range: [min, max],
    letter: groups[2],
    password: groups[3],
  };
}

export const calculatePartOne = (input: string) => {
  const validPasswords = getInputLines(input)
    .reduce((result, line) => {
      const { range, letter, password } = getLineFragments(line);
      const [minOccurrences, maxOccurrences] = range;

      const matches = password.match(new RegExp(letter, "g"));
      const count = matches?.length || 0;

      if (count >= minOccurrences && count <= maxOccurrences) {
        result.push(password);
      }

      return result;
    }, []);

  return validPasswords.length;
}

export const calculatePartTwo = (input: string) => {
  const validPasswords = getInputLines(input)
    .reduce((result, line) => {
      const { range, letter, password } = getLineFragments(line);

      const matches = range
        .map((position) => password[position - 1])
        .filter((x) => x === letter);

      if (matches.length === 1) {
        result.push(password);
      }

      return result;
    }, []);

  return validPasswords.length;
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
