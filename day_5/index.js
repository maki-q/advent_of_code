import * as url from 'url';
import { parseData } from '../inputReader.js'
import { sendSolution } from '../api.js'

async function solution() {
    const data = parseData(url.fileURLToPath(new URL('.', import.meta.url))).split('\n')

    console.log(data)
}

solution()