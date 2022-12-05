import fs from 'fs'
import path from 'path'
import { sendSolution } from './api.js'

export function parseData(directory: string): string {
  try {
    return fs.readFileSync(path.join(directory, 'input.txt'), 'utf8');
  } catch (err: any) {
    throw new Error("Issues parsing the file:" + err.message)
  }
}

export function getDay(directory: string): number {
  return parseInt(directory.slice(directory.indexOf("day_") + 4, directory.length - 1))
}

export function submitAnswer(directory: string, part: 1 | 2, solution: any) {
  sendSolution(2022, getDay(directory), part, solution)
}