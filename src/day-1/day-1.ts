import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { multiply } from "../helpers/arrays";
import { getInputLines } from "../helpers/input";

const parseInput = (input: string) => {
  return getInputLines(input)
    .map((x) => parseInt(x));
};

const findEntries = (numOfEntries: number, target: number, report: Array<number>) => {
  if (numOfEntries < 1) {
    throw new Error("'numOfEntries' must be at least 1");
  }

  if (numOfEntries === 1) {
    return report.includes(target) ? [target] : [];
  }

  return report.reduce<Array<number>>((result, expense, index) => {
    if (result.length) {
      return result;
    }

    const remainingEntries = findEntries(
      numOfEntries - 1,
      target - expense,
      report.slice(index + 1)
    );

    if (!remainingEntries.length) {
      return result;
    }

    return [expense, ...remainingEntries];
  }, []);
}

export const calculatePartOne = (input: string) => {
  return multiply(findEntries(2, 2020, parseInput(input)));
}

export const calculatePartTwo = (input: string) => {
  return multiply(findEntries(3, 2020, parseInput(input)));
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
