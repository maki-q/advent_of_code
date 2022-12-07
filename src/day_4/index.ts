import * as url from "url";
import { parseData, submitAnswer } from "../utils.js";

function solutionA() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname).split("\n");
  let engulfedPairs = 0;

  data.forEach((stringifiedPair) => {
    const [elf1, elf2] = stringifiedPair
      .split(",")
      .map((pair) => pair.split("-"));

    if (
      (Number(elf1[0]) <= Number(elf2[0]) &&
        Number(elf1[1]) >= Number(elf2[1])) ||
      (Number(elf2[0]) <= Number(elf1[0]) && Number(elf2[1]) >= Number(elf1[1]))
    ) {
      engulfedPairs += 1;
    }
  });

  submitAnswer(__dirname, 1, engulfedPairs);
}

function solutionB() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname).split("\n");
  let engulfedPairs = 0;

  data.forEach((stringifiedPair) => {
    const [elf1, elf2] = stringifiedPair
      .split(",")
      .map((pair) => pair.split("-"));

    if (
      (Number(elf1[0]) <= Number(elf2[0]) &&
        Number(elf1[1]) >= Number(elf2[0])) ||
      (Number(elf2[0]) <= Number(elf1[0]) && Number(elf2[1]) >= Number(elf1[0]))
    ) {
      engulfedPairs += 1;
    }
  });

  submitAnswer(__dirname, 2, engulfedPairs);
}

solutionB();
