import os from "os";
import { calculatePartOne, calculatePartTwo } from "../dayTwo";

describe("Part 1", () => {
  it("returns 2 given the example input", () => {
    const input = [
      "1-3 a: abcde",
      "1-3 b: cdefg",
      "2-9 c: ccccccccc"
    ].join(os.EOL);

    expect(calculatePartOne(input)).toEqual(2);
  });
});

describe("Part 2", () => {
  it("returns 1 given the example input", () => {
    const input = [
      "1-3 a: abcde",
      "1-3 b: cdefg",
      "2-9 c: ccccccccc"
    ].join(os.EOL);

    expect(calculatePartTwo(input)).toEqual(1);
  });
});