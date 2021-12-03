import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const getInput = async () => {
  const data = await axios({
    url: "https://adventofcode.com/2021/day/1/input",
    method: "get",
    headers: {
      cookie: `ru=${process.env.SESSION_KEY}; session=${process.env.SESSION_KEY}`
    }
  })
  .then(result => result.data)
  .catch(err => console.error("Possibly need to update the session token found in cookies", err))

  const dataArray = data.split(/\r?\n/)
  return dataArray.map(s => parseInt(s))
}

const countIncreases = arr => {
  let increaseCount = 0
  arr.reduce((p, c) => {
    if (p < c) {
      increaseCount++
    }
    return c
  })
  
  return increaseCount
}

getInput().then(result => {
  console.log(countIncreases(result))
}).catch(err => console.error("uh oh", err))