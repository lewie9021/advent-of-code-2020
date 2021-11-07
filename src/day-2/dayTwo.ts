import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";

interface PasswordPolicy {
  min: number;
  max: number;
  letter: string;
}

interface DatabaseEntry {
  password: string;
  policy: PasswordPolicy;
}

export const parseInput = (input: string): Array<DatabaseEntry> => {
  return getInputLines(input)
    .map((line) => {
      const groups = line.match(/(\d+\-\d+)\s(\w)\:\s(\w+)/);

      const [minOccurrences, maxOccurrences] = groups[1]
        .split("-")
        .map((x) => parseInt(x));

      return {
        password: groups[3],
        policy: {
          min: minOccurrences,
          max: maxOccurrences,
          letter: groups[2],
        }
      };
    });
};

const getValidPasswords = (database: Array<DatabaseEntry>) => {
  return database.filter(({ password, policy }) => {
    const matches = password.match(new RegExp(policy.letter, "g"));
    const count = matches?.length || 0;

    return count >= policy.min && count <= policy.max;
  });
}

export const calculatePartOne = (database: Array<DatabaseEntry>) => {
  return getValidPasswords(database).length;
}

export const calculatePartTwo = () => {
  return null;
}

runWhenUsingCommandLine(() => {
  const database = parseInput(readTextFile(path.join(__dirname, "input.txt")));

  console.log("Part 1:", calculatePartOne(database));
  console.log("Part 2:", calculatePartTwo());
});
