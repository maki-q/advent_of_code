import * as url from "url";
import { parseData, submitAnswer } from "../utils.js";

function createPriorityMap() {
  const itemTypes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const itemMap: Map<string, number> = new Map();

  for (let i = 0; i < itemTypes.length; i++) {
    if (itemMap.get(itemTypes[i])) {
      itemMap.set(itemTypes[i], itemMap.get(itemTypes[i])! + 1);
    }
  }

  return itemMap;
}

function solution1() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname).split("\n");
  const priorityMap = createPriorityMap();
  let totalPriority = 0;

  data.forEach((rucksack) => {
    const firstHalf = rucksack.slice(0, rucksack.length / 2);
    const secondHalf = rucksack.slice(rucksack.length / 2);

    for (let i = 0; i < firstHalf.length; i++) {
      if (secondHalf.includes(firstHalf[i])) {
        totalPriority += priorityMap.get(firstHalf[i])!;
        break;
      }
    }
  });

  submitAnswer(__dirname, 1, totalPriority);
}

function solution2() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname).split("\n");
  const priorityMap = createPriorityMap();
  let totalPriority = 0;
  let elf1: string, elf2: string, elf3: string;

  data.forEach((rucksack, index) => {
    if (index % 3 === 0) elf1 = rucksack;
    if (index % 3 === 1) elf2 = rucksack;
    if (index % 3 === 2) {
      elf3 = rucksack;

      for (let i = 0; i < elf1.length; i++) {
        if (elf2.includes(elf1[i]) && elf3.includes(elf1[i])) {
          totalPriority += priorityMap.get(elf1[i])!;
          break;
        }
      }
    }
  });

  submitAnswer(__dirname, 2, totalPriority);
}

solution2();
