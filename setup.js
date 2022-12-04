import fs from 'fs-extra';
import path from 'path';
import * as url from 'url';

function setupFileStructure() {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

  const sourceFolder = "day_template"
  const outputFolder = "day_"

  for(let i = 1; i < 32; i++) {
    fs.copySync(path.join(__dirname, sourceFolder), path.join(__dirname, outputFolder + i), { overwrite: false})
  }

}

setupFileStructure()