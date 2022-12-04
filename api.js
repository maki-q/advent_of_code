import fetch from "node-fetch"
import { JSDOM } from "jsdom"
import { writeFileSync, existsSync, statSync } from "fs"
import kleur from "kleur"

const strToNum = (time) => {
  const entries = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  }

  return entries[time] || NaN
}

let canSubmit = true
let delayStart = 0
let delayAmount = 0

const Status = {
  SOLVED: "SOLVED",
  WRONG: "WRONG",
  ERROR: "ERROR",
}

const timeToReadable = (d, h, m, s) => {
  return (
    (d !== 0 ? `${d}d ` : "") +
    (h !== 0 ? `${h}h ` : "") +
    (m !== 0 ? `${m}m ` : "") +
    (s !== 0 ? `${s}s ` : "")
  )
}

const msToReadable = (ms) => {
  const msSecond = 1000
  const msMinute = 60 * msSecond
  const msHour = 60 * msMinute
  const msDay = 24 * msHour

  const d = Math.floor(ms / msDay)
  const h = Math.floor((ms - msDay * d) / msHour)
  const m = Math.floor((ms - msDay * d - msHour * h) / msMinute)
  const s = Math.floor((ms - msDay * d - msHour * h - msMinute * m) / msSecond)

  return timeToReadable(d, h, m, s)
}

const handleErrors = (e) => {
  if (e.message === "400" || e.message === "500") {
    console.log(
      kleur.red("INVALID SESSION KEY\n\n") +
        "Please make sure that the session key in the .env file is correct.\n" +
        "You can find your session key in the 'session' cookie at:\n" +
        "https://adventofcode.com\n\n" +
        kleur.bold("Restart the script after changing the .env file.\n"),
    )
  } else if (e.message.startsWith("5")) {
    console.log(kleur.red("SERVER ERROR"))
  } else if (e.message === "404") {
    console.log(kleur.yellow("CHALLENGE NOT YET AVAILABLE"))
  } else {
    console.log(
      kleur.red(
        "UNEXPECTED ERROR\nPlease check your internet connection.\n\nIf you think it's a bug, create an issue on github.\nHere are some details to include:\n",
      ),
    )
    console.log(e)
  }

  return Status["ERROR"]
}

const getInput = async (year, day, path) => {
  const API_URL = process.env.AOC_API ?? "https://adventofcode.com"

  if (existsSync(path) && statSync(path).size > 0) {
    console.log(
      kleur.yellow(`INPUT FOR AOC ${year} DAY ${day} ALREADY FETCHED`),
    )
    return
  }

  fetch(`${API_URL}/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${process.env.SESSION_COOKIE}`,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(String(res.status))
      }

      return res.text()
    })
    .then((body) => {
      writeFileSync(path, body.replace(/\n$/, ""))
      console.log(kleur.green(`INPUT FOR AOC ${year} DAY ${day} SAVED!`))
    })
    .catch(handleErrors)
}

const sendSolution = (
  year,
  day,
  part,
  solution,
) => {
  const API_URL = process.env.AOC_API ?? "https://adventofcode.com"

  if (!canSubmit) {
    const now = Date.now()
    const remainingMs = delayAmount - (now - delayStart)

    if (remainingMs <= 0) {
      canSubmit = true
    } else {
      console.log(kleur.red(`You have to wait: ${msToReadable(remainingMs)}`))
      return Promise.resolve(Status["ERROR"])
    }
  }

  return fetch(`${API_URL}/${year}/day/${day}/answer`, {
    headers: {
      cookie: `session=${process.env.SESSION_COOKIE}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `level=${part}&answer=${solution}`,
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(String(res.status))
      }

      return res.text()
    })
    .then((body) => {
      const $main = new JSDOM(body).window.document.querySelector("main")

      let status = Status["ERROR"]

      const info =
        $main !== null
          ? ($main.textContent).replace(/\[.*\]/, "").trim()
          : "Can't find the main element"

      if (info.includes("That's the right answer")) {
        console.log(`Status`, kleur.green(`PART ${part} SOLVED!`))
        return Status["SOLVED"]
      } else if (info.includes("That's not the right answer")) {
        console.log("Status:", kleur.red("WRONG ANSWER"))
        console.log(`\n${info}\n`)
        status = Status["WRONG"]
      } else if (info.includes("You gave an answer too recently")) {
        console.log("Status:", kleur.yellow("TO SOON"))
      } else if (
        info.includes("You don't seem to be solving the right level")
      ) {
        console.log("Status:", kleur.yellow("ALREADY COMPLETED or LOCKED"))
      } else {
        console.log("Status:", kleur.red("UNKNOWN RESPONSE\n"))
        console.log(`\n${info}\n`)
      }

      const waitStr = info.match(
        /(one|two|three|four|five|six|seven|eight|nine|ten) (second|minute|hour|day)/,
      )
      const waitNum = info.match(/\d+\s*(s|m|h|d)/g)

      if (waitStr !== null || waitNum !== null) {
        const waitTime = {
          s: 0,
          m: 0,
          h: 0,
          d: 0,
        }

        if (waitStr !== null) {
          const [_, time, unit] = waitStr
          waitTime[unit[0]] = strToNum(time)
        } else if (waitNum !== null) {
          waitNum.forEach((x) => {
            waitTime[x.slice(-1)] = Number(x.slice(0, -1))
          })
        }

        canSubmit = false
        delayStart = Date.now()
        delayAmount =
          (waitTime.d * 24 * 60 * 60 +
            waitTime.h * 60 * 60 +
            waitTime.m * 60 +
            waitTime.s) *
          1000

        const delayStr = timeToReadable(
          waitTime.d,
          waitTime.h,
          waitTime.m,
          waitTime.s,
        )

        console.log(`Next request possible in: ${delayStr}`)
      }

      return status
    })
    .catch(handleErrors)
}

export { getInput, sendSolution, Status }