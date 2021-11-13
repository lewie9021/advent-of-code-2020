import os from "os";
import { calculatePartOne, calculatePartTwo } from "../day-1";

describe("Part 1", () => {
  it("returns 514579 given the example expense report", () => {
    const input = ["1721", "979", "366", "299", "675", "1456"].join(os.EOL);

    expect(calculatePartOne(input)).toEqual(514579);
  });
});

describe("Part 2", () => {
  it("returns 241861950 given the example expense report", () => {
    const input = ["1721", "979", "366", "299", "675", "1456"].join(os.EOL);

    expect(calculatePartTwo(input)).toEqual(241861950);
  });
});
