import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";
import { unique } from "../helpers/arrays";

const parseInput = (input: string, preambleLength: number) => {
  const data = getInputLines(input)
    .map((line) => parseInt(line));

  return {
    preamble: data.slice(0, preambleLength),
    values: data.slice(preambleLength)
  };
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

export const calculatePartOne = (input: string, preambleLength: number) => {
  const { preamble, values } = parseInput(input, preambleLength);

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
  return parseInput(input, preambleLength)
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input, 25));
  console.log("Part 2:", calculatePartTwo(input, 25));
});
