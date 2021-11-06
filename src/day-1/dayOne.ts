import path from "path";

import { Tuple, multiply } from "../helpers/tuple";
import { readFileLines } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";

const parseExpenseReport = (filePath: string) => {
  return readFileLines(filePath)
    .map((x) => parseInt(x));
};

const findEntries = (target: number, report: Array<number>) => {
  const entries = report.reduce<Tuple<number> | null>((result, expense, index) => {
    if (result) {
      return result;
    }

    const pairingExpense = target - expense;

    if (report.includes(pairingExpense, index + 1)) {
      return [expense, pairingExpense];
    }

    return result;
  }, null);

  if (!entries) {
    throw new Error("Failed to find a pairing");
  }

  return entries;
}

export const calculatePartOne = (target: number, report: Array<number>) => {
  return multiply(findEntries(target, report));
}

runWhenUsingCommandLine(() => {
  const report = parseExpenseReport(path.join(__dirname, "expenseReport.txt"))

  console.log("Part 1:", calculatePartOne(2020, report));
});
