import os from "os";
import { calculatePartOne, calculatePartTwo } from "../dayFive";

describe("Part 1", () => {
  it("returns 820 given the example input", () => {
    const input = [
      "BFFFBBFRRR",
      "FFFBBBFRRR",
      "BBFFBBFRLL"
    ].join(os.EOL);

    expect(calculatePartOne(input)).toEqual(820);
  });
});

describe("Part 2", () => {
  it("returns X given the example input", () => {
    const input = [].join(os.EOL);

    expect(calculatePartTwo(input)).toEqual(null);
  });
});