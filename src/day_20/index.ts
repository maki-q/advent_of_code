import * as url from "url";
import { parseData, submitAnswer } from "../utils.js";

function solutionA() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname).split("\n");

  console.log(data);
  //submitAnswer(__dirname, 1, data)
}

function solutionB() {
  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  const data = parseData(__dirname).split("\n");

  console.log(data);
  //submitAnswer(__dirname, 2, data)
}

solutionA();
