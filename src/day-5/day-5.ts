import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";

const parseInput = (input: string) => {
  return getInputLines(input)
    .map((line) => {
      const row = line
        .substr(0, 7)
        .split("")
        .reduce((res, char) => {
          const diff = res[1] - res[0];

          switch (char) {
            case "B": return [res[0] + Math.round(diff / 2), res[1]];
            case "F": return [res[0], res[1] - Math.round(diff / 2)];
          }
        }, [0, 127])[0];
      const column = line.substr(7)
        .split("")
        .reduce((res, char) => {
          const diff = res[1] - res[0];

          switch (char) {
            case "R": return [res[0] + Math.round(diff / 2), res[1]];
            case "L": return [res[0], res[1] - Math.round(diff / 2)];
          }
        }, [0, 7])[0];

      return {
        id: row * 8 + column,
        row,
        column
      };
    });
}

export const calculatePartOne = (input: string) => {
  const passes = parseInput(input);

  return passes.reduce((res, pass) => Math.max(res, pass.id), 0);
}

export const calculatePartTwo = (input: string) => {
  const { missingId } = parseInput(input)
    .sort((a, b) => {
      if (a.id < b.id) {
        return  -1;
      }

      if (a.id > b.id) {
        return  1;
      }

      return 0;
    })
    .reduce((res, pass) => {
      if (res.missingId) {
        return res;
      }

      // Skipped a seat ID.
      if (res.lastId && pass.id === res.lastId + 2) {
        return { ...res, missingId: res.lastId + 1 };
      }

      return { ...res, lastId: pass.id };
    }, { lastId: null, missingId: null });

  return missingId;
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
