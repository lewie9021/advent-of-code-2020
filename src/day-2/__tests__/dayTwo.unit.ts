import os from "os";
import { calculatePartOne, parseInput } from "../dayTwo";

describe("Part 1", () => {
  it("returns 2 given the example input", () => {
    const database = parseInput([
      "1-3 a: abcde",
      "1-3 b: cdefg",
      "2-9 c: ccccccccc"
    ].join(os.EOL));

    expect(calculatePartOne(database)).toEqual(2);
  });
});

