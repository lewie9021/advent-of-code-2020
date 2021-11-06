import { calculatePartOne, calculatePartTwo } from "../dayOne";

describe("Part 1", () => {
  it("returns 514579 given the example expense report", () => {
    const report = [1721, 979, 366, 299, 675, 1456];

    expect(calculatePartOne(2020, report)).toEqual(514579);
  });
});

describe("Part 2", () => {
  it("returns 241861950 given the example expense report", () => {
    const report = [1721, 979, 366, 299, 675, 1456];

    expect(calculatePartTwo(2020, report)).toEqual(241861950);
  });
});
