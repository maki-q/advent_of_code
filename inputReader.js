import fs from 'fs'
import path from 'path'

export function parseData(directory) {
  try {
    return fs.readFileSync(path.join(directory, 'input.txt'), 'utf8');
  } catch (err) {
    console.error(err);
  }
}