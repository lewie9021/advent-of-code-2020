import os from "os";
import { calculatePartOne, calculatePartTwo } from "../day-6";

describe("Part 1", () => {
  it("returns 11 given the example input", () => {
    const input = [
      "abc",
      "",
      "a",
      "b",
      "c",
      "",
      "ab",
      "ac",
      "",
      "a",
      "a",
      "a",
      "a",
      "",
      "b"
    ].join(os.EOL);

    expect(calculatePartOne(input)).toEqual(11);
  });
});

describe("Part 2", () => {
  it("returns X given the example input", () => {
    const input = [
      "abc",
      "",
      "a",
      "b",
      "c",
      "",
      "ab",
      "ac",
      "",
      "a",
      "a",
      "a",
      "a",
      "",
      "b"
    ].join(os.EOL);

    expect(calculatePartTwo(input)).toEqual(6);
  });
});