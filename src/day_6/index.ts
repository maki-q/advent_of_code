import * as url from "url";
import { parseData, submitAnswer } from "../utils.js";
import { sendSolution } from "../api.js";

enum Part {
  One,
  Two,
}

function uniqueString(part: Part, str: string): boolean {
  const marker = part === Part.One ? 4 : 14;
  if (str.length < marker) return false;
  const letters = str
    .split("")
    .sort((a: string, b: string) => a.localeCompare(b));
  for (let i = 1; i < letters.length; i++) {
    if (letters[i] === letters[i - 1]) {
      return false;
    }
  }
  return true;
}

function solutionA() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname);

  let buffer = "";

  for (let i = 0; i < data.length; i++) {
    buffer += data[i];

    if (uniqueString(Part.One, buffer.slice(buffer.length - 14))) {
      submitAnswer(__dirname, 1, i + 1);
      return;
    }
  }
}

function solutionB() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname);

  let buffer = "";

  for (let i = 0; i < data.length; i++) {
    buffer += data[i];

    if (uniqueString(Part.Two, buffer.slice(buffer.length - 14))) {
      submitAnswer(__dirname, 2, i + 1);
      return;
    }
  }
}

solutionB();
