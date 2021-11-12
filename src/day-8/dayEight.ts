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

const executeInstruction = (
  instruction: Instruction,
  state: ProgramState
): ProgramState => {
  switch (instruction.operation) {
    case "acc":
      return {
        ...state,
        index: state.index + 1,
        accumulator: state.accumulator + instruction.value,
        executed: [...state.executed, state.index],
      };
    case "jmp":
      return {
        ...state,
        index: state.index + instruction.value,
        executed: [...state.executed, state.index],
      };
    case "nop":
      return {
        ...state,
        index: state.index + 1,
        executed: [...state.executed, state.index],
      };
  }
}

interface ProgramState {
  index: number;
  accumulator: number;
  executed: Array<number>;
  modified: boolean;
}

const runProgram = (
  instructions: Array<Instruction>,
  state: ProgramState = {
    index: 0,
    accumulator: 0,
    executed: [],
    modified: false
  }
): number | null => {
  if (state.executed.includes(state.index)) {
    return state.accumulator;
  }

  const instruction = instructions[state.index];

  return runProgram(instructions, executeInstruction(instruction, state));
}

const getInstructionVariations = (instruction: Instruction) => {
  let variations = [instruction];

  if (instruction.operation === "jmp") {
    variations.push({ operation: "nop", value: instruction.value });
  }

  if (instruction.operation === "nop") {
    variations.push({ operation: "jmp", value: instruction.value });
  }

  return variations;
}

const runProgramV2 = (
  instructions: Array<Instruction>,
  state: ProgramState = {
    index: 0,
    accumulator: 0,
    executed: [],
    modified: false
  }
): number | null => {
  // Detected an infinite loop.
  if (state.executed.includes(state.index)) {
    return null;
  }

  // Detected EOF.
  if (state.index + 1 > instructions.length) {
    return state.accumulator;
  }

  const instruction = instructions[state.index];
  const variations = state.modified
    ? [instruction]
    : getInstructionVariations(instruction);

  for (let i = 0; i < variations.length; i += 1) {
    const variation = variations[i];
    const modified = instruction.operation !== variation.operation;
    const nextInstructions = modified
      ? [
        ...instructions.slice(0, state.index),
        variation,
        ...instructions.slice(state.index + 1),
      ]
      : instructions;

    const nextState = executeInstruction(variation, state);
    const accumulator = runProgramV2(nextInstructions, {
      ...nextState,
      modified: nextState.modified || modified
    });

    if (accumulator !== null) {
      return accumulator;
    }
  }

  return null;
}

export const calculatePartOne = (input: string) => {
  const instructions = parseInput(input);

  return runProgram(instructions);
}

export const calculatePartTwo = (input: string) => {
  const instructions = parseInput(input);

  return runProgramV2(instructions);
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
