import fs from 'fs'
import path from 'path'
import { sendSolution } from './api.js'

export function parseData(directory) {
  try {
    return fs.readFileSync(path.join(directory, 'input.txt'), 'utf8');
  } catch (err) {
    console.error(err);
  }
}

export function getDay(directory) {
  return directory.slice(directory.indexOf("day_") + 4, directory.length - 1)
}

export function submitAnswer(directory, part, solution) {
  sendSolution(2022, getDay(directory), part, solution)
}