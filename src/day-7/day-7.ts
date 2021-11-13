import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";

const parseInput = (input: string) => {
  return getInputLines(input)
    .reduce((res, line) => {
      const [type, contents] = line.replace(/\.$/, "").split(" bags contain ");

      if (contents === "no other bags") {
        res[type] = [];

        return res;
      }

      const items = contents
        .split(", ")
        .map((item) => {
          const match = item.match(/(\d+) (\w+ \w+)/);

          return {
            type: match[2],
            count: parseInt(match[1]),
          }
        });

      res[type] = items;

      return res;
    }, {});
}

interface ItemCount {
  type: string;
  count: number;
}

const findBagItem = (
  type: string,
  counts: Array<ItemCount>,
  lookup: Record<string, Array<ItemCount>>
) => {
  if (!counts.length) {
    return false;
  }

  const match = counts.find((item) => {
    if (item.type === type) {
      return true;
    }

    return findBagItem(type, lookup[item.type], lookup);
  });

  return Boolean(match);
}

export const calculatePartOne = (input: string) => {
  const lookup = parseInput(input);
  let result = 0;

  for (let type in lookup) {
    const found = findBagItem("shiny gold", lookup[type], lookup);

    if (found) {
      result += 1;
    }
  }

  return result;
}

const getTotalBagCounts = (
  type: string,
  lookup: Record<string, Array<ItemCount>>,
) => {
  return lookup[type].reduce((res, item) => {
    return res + item.count + item.count * getTotalBagCounts(item.type, lookup);
  }, 0);
}

export const calculatePartTwo = (input: string) => {
  const lookup = parseInput(input);

  return getTotalBagCounts("shiny gold", lookup);
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
