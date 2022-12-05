import * as url from "url";
import path from "path";
import { getInput } from "../api.js";
import { getDay } from "../utils.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const day = getDay(__dirname);

void getInput(2022, day, path.join(__dirname, "input.txt"));
