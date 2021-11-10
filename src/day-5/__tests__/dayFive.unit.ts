import os from "os";
import { calculatePartOne } from "../dayFive";

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