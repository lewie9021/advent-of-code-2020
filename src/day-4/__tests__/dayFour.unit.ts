import os from "os";
import { calculatePartOne, calculatePartTwo } from "../dayFour";

describe("Part 1", () => {
  it("returns 2 given the example input", () => {
    const input = [
      "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd",
      "byr:1937 iyr:2017 cid:147 hgt:183cm",
      "",
      "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884",
      "hcl:#cfa07d byr:1929",
      "",
      "hcl:#ae17e1 iyr:2013",
      "eyr:2024",
      "ecl:brn pid:760753108 byr:1931",
      "hgt:179cm",
      "",
      "hcl:#cfa07d eyr:2025 pid:166559648",
      "iyr:2011 ecl:brn hgt:59in",
    ].join(os.EOL);

    expect(calculatePartOne(input)).toEqual(2);
  });
});

describe("Part 2", () => {
  it("returns X given the example input", () => {
    const input = [].join(os.EOL);

    expect(calculatePartTwo(input)).toEqual(null);
  });
});