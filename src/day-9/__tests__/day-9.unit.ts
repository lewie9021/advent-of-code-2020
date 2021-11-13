import os from "os";
import { calculatePartOne, calculatePartTwo } from "../day-9";

describe("Part 1", () => {
  it("returns 127 given the example input", () => {
    const input = [
      "35",
      "20",
      "15",
      "25",
      "47",
      "40",
      "62",
      "55",
      "65",
      "95",
      "102",
      "117",
      "150",
      "182",
      "127",
      "219",
      "299",
      "277",
      "309",
      "576"
    ].join(os.EOL);

    expect(calculatePartOne(input, 5)).toEqual(127);
  });
});

describe("Part 2", () => {
  it("returns 62 given the example input", () => {
    const input = [
      "35",
      "20",
      "15",
      "25",
      "47",
      "40",
      "62",
      "55",
      "65",
      "95",
      "102",
      "117",
      "150",
      "182",
      "127",
      "219",
      "299",
      "277",
      "309",
      "576"
    ].join(os.EOL);

    expect(calculatePartTwo(input, 5)).toEqual(62);
  });
});