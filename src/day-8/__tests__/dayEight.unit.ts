import os from "os";
import { calculatePartOne, calculatePartTwo } from "../dayEight";

describe("Part 1", () => {
  it("returns 5 given the example input", () => {
    const input = [
      "nop +0",
      "acc +1",
      "jmp +4",
      "acc +3",
      "jmp -3",
      "acc -99",
      "acc +1",
      "jmp -4",
      "acc +6"
    ].join(os.EOL);

    expect(calculatePartOne(input)).toEqual(5);
  });
});

describe("Part 2", () => {
  it("returns 8 given the example input", () => {
    const input = [
      "nop +0",
      "acc +1",
      "jmp +4",
      "acc +3",
      "jmp -3",
      "acc -99",
      "acc +1",
      "jmp -4",
      "acc +6"
    ].join(os.EOL);

    expect(calculatePartTwo(input)).toEqual(8);
  });
});