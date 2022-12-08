import * as url from "url";
import { parseData, submitAnswer } from "../utils.js";

type Check = { seeEdge: boolean; endCoord: number };

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const data = parseData(__dirname).split("\n");
const forest = data.map((treeRow) => {
  return treeRow.split("").map((tree) => Number(tree));
});

function checkLeft(x: number, y: number, checkingHeight: number): Check {
  if (x === 0) return { seeEdge: true, endCoord: 0 };
  for (let i = x - 1; i >= 0; i--) {
    if (forest[y][i] >= checkingHeight) {
      return { seeEdge: false, endCoord: x - i };
    }
  }

  return { seeEdge: true, endCoord: x };
}
function checkRight(x: number, y: number, checkingHeight: number): Check {
  if (x === forest[y].length - 1) return { seeEdge: true, endCoord: 0 };
  for (let i = x + 1; i < forest[y].length; i++) {
    if (forest[y][i] >= checkingHeight) {
      return { seeEdge: false, endCoord: i - x };
    }
  }

  return { seeEdge: true, endCoord: forest[y].length - 1 - x };
}

function checkUp(x: number, y: number, checkingHeight: number): Check {
  if (y === 0) return { seeEdge: true, endCoord: 0 };
  for (let i = y - 1; i >= 0; i--) {
    if (forest[i][x] >= checkingHeight) {
      return { seeEdge: false, endCoord: y - i };
    }
  }

  return { seeEdge: true, endCoord: y };
}
function checkDown(x: number, y: number, checkingHeight: number): Check {
  if (y === forest.length - 1) return { seeEdge: true, endCoord: 0 };
  for (let i = y + 1; i < forest.length; i++) {
    if (forest[i][x] >= checkingHeight) {
      return { seeEdge: false, endCoord: i - y };
    }
  }

  return { seeEdge: true, endCoord: forest.length - 1 - y };
}

function canSeeView(x: number, y: number): boolean {
  const currentHeight = forest[y][x];
  return (
    checkUp(x, y, currentHeight).seeEdge ||
    checkLeft(x, y, currentHeight).seeEdge ||
    checkDown(x, y, currentHeight).seeEdge ||
    checkRight(x, y, currentHeight).seeEdge
  );
}

function calculateArea(x: number, y: number): number {
  const currentHeight = forest[y][x];

  return (
    checkUp(x, y, currentHeight).endCoord *
    checkLeft(x, y, currentHeight).endCoord *
    checkDown(x, y, currentHeight).endCoord *
    checkRight(x, y, currentHeight).endCoord
  );
}

function solutionA() {
  let totalWithView = 0;

  for (let i = 0; i < forest.length; i++) {
    for (let j = 0; j < forest[i].length; j++) {
      if (canSeeView(j, i)) {
        totalWithView++;
      }
    }
  }
  submitAnswer(__dirname, 1, totalWithView);
}

function solutionB() {
  let scenicScore = 0;
  let currentArea;

  for (let i = 0; i < forest.length; i++) {
    for (let j = 0; j < forest[i].length; j++) {
      currentArea = calculateArea(j, i);
      if (currentArea > scenicScore) {
        scenicScore = currentArea;
      }
    }
  }

  submitAnswer(__dirname, 2, scenicScore);
}

solutionA();
solutionB();
