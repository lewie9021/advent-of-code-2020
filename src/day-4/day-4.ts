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

const between = (value: number, min: number, max: number) => {
  return value >= min && value <= max;
};

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
      const match = pairs.find((x) => x.field === field);

      return Boolean(match);
    });
  }).length;
}

export const calculatePartTwo = (input: string) => {
  const passports = parseInput(input);
  const validation = [
    {
      field: "byr", // Birth Year
      validate: (value: string) => {
        return between(parseInt(value), 1920, 2002);
      }
    },
    {
      field: "iyr", // Issue Year
      validate: (value: string) => {
        return between(parseInt(value), 2010, 2020);
      }
    },
    {
      field: "eyr", // Expiration Year
      validate: (value: string) => {
        return between(parseInt(value), 2020, 2030);
      }
    },
    {
      field: "hgt", // Height
      validate: (value: string) => {
        const match = value.match(/^(\d+)(cm|in)$/);

        if (!match) {
          return false;
        }

        const height = parseInt(match[1]);
        const measurement = match[2];

        switch (measurement) {
          case "cm": return between(height, 150, 193);
          case "in": return between(height, 59, 76);
          default: return false;
        }
      }
    },
    {
      field: "hcl", // Hair Color
      validate: (value: string) => {
        return /^#[a-f|0-9]{6}$/.test(value);
      }
    },
    {
      field: "ecl", // Eye Color
      validate: (value: string) => {
        return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
      }
    },
    {
      field: "pid", // Passport ID
      validate: (value: string) => {
        return /^[0-9]{9}$/.test(value);
      }
    }
  ];

  return passports.filter((pairs) => {
    return validation.every(({ field, validate }) => {
      const match = pairs.find((x) => x.field === field && validate(x.value));

      return Boolean(match);
    });
  }).length;
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
