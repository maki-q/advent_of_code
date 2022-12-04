const fs = require('fs/promises');
const path = require('path')

async function solution() {
    let calorieData, currentCalories = 0;
    const top3 = [0, 0, 0];

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

    try {
        const data = await fs.readFile(path.join(__dirname, "/input.txt"), { encoding: 'utf8' });
        calorieData = data.split('\n')
      } catch (err) {
        console.error("There was an issue parsing the file:", err);
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