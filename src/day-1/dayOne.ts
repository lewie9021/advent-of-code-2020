import path from "path";

import { readFileLines } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { multiply } from "../helpers/arrays";

const parseExpenseReport = (filePath: string) => {
  return readFileLines(filePath)
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

export const calculatePartOne = (target: number, report: Array<number>) => {
  return multiply(findEntries(2, target, report));
}

export const calculatePartTwo = (target: number, report: Array<number>) => {
  return multiply(findEntries(3, target, report))
}

runWhenUsingCommandLine(() => {
  const report = parseExpenseReport(path.join(__dirname, "input.txt"))

  console.log("Part 1:", calculatePartOne(2020, report));
  console.log("Part 2:", calculatePartTwo(2020, report));
});
