import * as url from "url";
import { parseData, submitAnswer } from "../utils.js";

const storage: string[][] = [[], [], [], [], [], [], [], [], []];

function customParseData() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname).split("\n");
  const storageChart = data.splice(0, 8).reverse();
  const regex = /[A-Z]/i;

  storageChart.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i].match(regex)) {
        storage[Math.floor(i / 4)].push(row[i]);
      }
    }
  });
  return data.slice(2);
}

function solutionA() {
  const data = customParseData();

  const reducedInstructions: number[][] = data.map((order) => {
    return order.split(" ").reduce((filtered: Array<number>, ordered) => {
      if (!isNaN(parseInt(ordered))) {
        filtered.push(parseInt(ordered));
      }

      return filtered;
    }, []);
  });

  reducedInstructions.forEach((instructions) => {
    const instr = [
      Number(instructions[0]),
      Number(instructions[1]) - 1,
      Number(instructions[2]) - 1,
    ];

    for (let i = 0; i < instr[0]; i++) {
      if (storage[instr[1]].length) {
        storage[instr[2]].push(storage[instr[1]].pop()!);
      }
    }
  });

  let finalConfig = "";
  storage.forEach((topElement) => (finalConfig += topElement.pop()));

  submitAnswer(__dirname, 1, finalConfig);
}

function solutionB() {
  const data = customParseData();

  const reducedInstructions: number[][] = data.map((order) => {
    return order.split(" ").reduce((filtered: Array<number>, ordered) => {
      if (!isNaN(parseInt(ordered))) {
        filtered.push(parseInt(ordered));
      }

      return filtered;
    }, []);
  });

  reducedInstructions.forEach((instructions) => {
    const instr = [
      Number(instructions[0]),
      Number(instructions[1]) - 1,
      Number(instructions[2]) - 1,
    ];

    const amountToTransfer =
      instr[0] > storage[instr[1]].length ? storage[instr[1]].length : instr[0];
    storage[instr[2]].push(
      ...storage[instr[1]].splice(storage[instr[1]].length - amountToTransfer)
    );
  });

  let finalConfig = "";
  storage.forEach((topElement) => (finalConfig += topElement.pop()));

  submitAnswer(__dirname, 2, finalConfig);
}

solutionB();
