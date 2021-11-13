import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";
import { max, min, sum, unique } from "../helpers/arrays";

const parseInput = (input: string) => {
  return getInputLines(input)
    .map((line) => parseInt(line));
}

const findPreamblePair = (target: number, preamble: Array<number>) => {
  for (let i = 0; i < preamble.length; i += 1) {
    const value = preamble[i];
    const remaining = target - value;
    const rest = preamble.slice(i + 1);

    if (rest.includes(remaining)) {
      return [value, remaining];
    }
  }
}

const findContiguousSet = (target: number, values: Array<number>) => {
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    const rest = values.slice(i + 1);

    for (let ii = 1; ii <= rest.length; ii += 1) {
      const set = [value, ...rest.slice(0, ii)];

      if (sum(set) === target) {
        return set;
      }
    }
  }
}

export const calculatePartOne = (input: string, preambleLength: number) => {
  const data = parseInput(input);
  const preamble = data.slice(0, preambleLength);
  const values = data.slice(preambleLength);

  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    const pair = findPreamblePair(value, unique(preamble));

    if (!pair) {
      return value;
    }

    preamble.shift();
    preamble.push(value);
  }
}

export const calculatePartTwo = (input: string, preambleLength: number) => {
  const target = calculatePartOne(input, preambleLength);
  const data = parseInput(input);
  const index = data.findIndex((x) => x === target);

  const set = findContiguousSet(target, data.slice(0, index));

  return min(set) + max(set);
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input, 25));
  console.log("Part 2:", calculatePartTwo(input, 25));
});
