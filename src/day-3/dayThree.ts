import path from "path";

import { readTextFile } from "../helpers/fileSystem";
import { runWhenUsingCommandLine } from "../helpers/execution";
import { getInputLines } from "../helpers/input";

const parseInput = (input: string) => {
  const grid = getInputLines(input)
    .map((line) => line.split(""));
  const width = grid[0].length;
  const height = grid.length;

  return {
    getDimensions: () => {
      return { width, height };
    },
    getCoordinate: (x: number, y: number) => {
      if (x < 0) {
        throw new Error("x coordinate is out of bounds");
      }

      if (y < 0 || y >= height) {
        throw new Error("y coordinate is out of bounds");
      }

      return grid[y][x % width];
    },
    isTree: (point: string) => {
      return point === "#";
    }
  }
}

export const calculatePartOne = (input: string) => {
  const grid = parseInput(input);
  const { height } = grid.getDimensions();
  let encounters = 0;

  for (let i = 0; i < height; i += 1) {
    const point = grid.getCoordinate(i * 3, i);

    if (grid.isTree(point)) {
      encounters += 1;
    }
  }

  return encounters;
}

export const calculatePartTwo = (input: string) => {
  return parseInput(input);
}

runWhenUsingCommandLine(() => {
  const input = readTextFile(path.join(__dirname, "input.txt"));

  console.log("Part 1:", calculatePartOne(input));
  console.log("Part 2:", calculatePartTwo(input));
});
