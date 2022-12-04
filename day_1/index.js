import * as url from 'url';
import { parseData } from '../inputReader.js'

async function solution() {
    const calorieData = parseData(url.fileURLToPath(new URL('.', import.meta.url))).split('\n')
    const top3 = [0, 0, 0];
    let currentCalories = 0;

    function calculateTop3(newContender) {
        if(newContender <= top3[2]) return;

        top3[2] = newContender;

        if(top3[2] > top3[1]) {
           [top3[1], top3[2]] = [top3[2], top3[1]];
        }

        if(top3[1] > top3[0]) {
            [top3[0], top3[1]] = [top3[1], top3[0]];
         }
    }

      calorieData.forEach((individualMeal) => {
        if(individualMeal) {
            currentCalories += Number(individualMeal);
        } else {
            calculateTop3(currentCalories);
            currentCalories = 0;
        }
      })

      calculateTop3(currentCalories)

      console.log(top3.reduce((total, winners) => winners + total, 0))
}

solution()