import * as url from 'url';
import { parseData } from '../utils.js'


// Swap opbjects for part 1/part 2
/*
const responsePoints = {
  X: 1, //Rock
  Y: 2, //Paper
  Z: 3  //Scissors
}
*/

type PlayerChoices = "X" | "Y" | "Z";
type OpponentChoices = "A" | "B" | "C";

const responsePoints = {
  X: 0, //Loss
  Y: 3, //Draw
  Z: 6  //Win
}

/*
const matchupPoints = {
  X: {
    A: 3,
    B: 0,
    C: 6,
  },
  Y: {
    A: 6,
    B: 3,
    C: 0,
  },
  Z: {
    A: 0,
    B: 6,
    C: 3,
  },
}
*/

const matchupPoints = {
  X: {
    A: 3,
    B: 1,
    C: 2,
  },
  Y: {
    A: 1,
    B: 2,
    C: 3,
  },
  Z: {
    A: 2,
    B: 3,
    C: 1,
  },
}

function solution() {
    const data = parseData(url.fileURLToPath(new URL('.', import.meta.url))).split('\n')

    let totalPoints = 0;

    data.forEach((matchup: string) => {
      totalPoints += responsePoints[matchup[2] as PlayerChoices] +
                     matchupPoints[matchup[2] as PlayerChoices][matchup[0] as OpponentChoices]
    })

    console.log(totalPoints)
}

solution()