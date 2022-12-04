import * as url from 'url';
import { parseData } from '../inputReader.js'

async function solution() {
    const data = parseData(url.fileURLToPath(new URL('.', import.meta.url))).split('\n')

    console.log(data)
}

solution()