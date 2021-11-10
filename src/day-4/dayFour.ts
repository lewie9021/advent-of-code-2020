import os from "os";
import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";

const parseInput = (input: string) => {
  return input
    .split(`${os.EOL}${os.EOL}`)
    .map((chunk) => {
      return chunk.replace(new RegExp(os.EOL, "g"), " ").split(" ")
        .map((pair) => {
          const [field, value] = pair.split(":");

          return {
            field,
            value
          };
        });
    });
}

export const calculatePartOne = (input: string) => {
  const passports = parseInput(input);
  const requiredFields = [
    "byr", // Birth Year
    "iyr", // Issue Year
    "eyr", // Expiration Year
    "hgt", // Height
    "hcl", // Hair Color
    "ecl", // Eye Color
    "pid", // Passport ID
  ];

  return passports.filter((pairs) => {
    return requiredFields.every((field) => {
      return Boolean(pairs.find((x) => x.field === field));
    });
  }).length;
}

export const calculatePartTwo = (input: string) => {
  return parseInput(input)
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
