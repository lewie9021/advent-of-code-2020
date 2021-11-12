import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";

const parseInput = (input: string) => {
  return getInputLines(input)
    .map((line) => {
      const match = line.match(/^(\w+) ([\+|\-]\d+)$/);

      return {
        operation: match[1],
        value: parseInt(match[2])
      };
    });
}

interface Instruction {
  operation: string;
  value: number;
}

const executeInstructions = (
  instructions: Array<Instruction>,
  index = 0,
  accumulator = 0,
  executed = []
) => {
  if (executed.includes(index)) {
    return accumulator;
  }

  const instruction = instructions[index];

  switch (instruction.operation) {
    case "acc":
      return executeInstructions(
        instructions,
        index + 1,
        accumulator + instruction.value,
        [...executed, index]
      );
    case "jmp":
      return executeInstructions(
        instructions,
        index + instruction.value,
        accumulator,
        [...executed, index]
      );
    case "nop":
      return executeInstructions(
      instructions,
      index + 1,
      accumulator,
      [...executed, index]
    );
  }
};

export const calculatePartOne = (input: string) => {
  const instructions = parseInput(input);

  return executeInstructions(instructions);
}

export const calculatePartTwo = (input: string) => {
  return parseInput(input)
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
