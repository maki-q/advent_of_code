import * as url from 'url'
import path from "path"
import { getInput } from '../api.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const day = __dirname.slice(__dirname.indexOf("day_") + 4, __dirname.length - 1)

getInput(2022, day, path.join(__dirname, 'input.txt'))