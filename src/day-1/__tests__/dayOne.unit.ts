import { calculatePartOne } from "../dayOne";

it("returns 514579 given the example expense report", () => {
  const report = [1721, 979, 366, 299, 675, 1456];

  expect(calculatePartOne(2020, report)).toEqual(514579);
});
