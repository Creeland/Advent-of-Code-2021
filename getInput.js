import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const getInput = async (day) => {
  const data = await axios({
    url: `https://adventofcode.com/2021/day/${day}/input`,
    method: "get",
    headers: {
      cookie: `ru=${process.env.SESSION_KEY}; session=${process.env.SESSION_KEY}`
    }
  })
  .then(result => result.data)
  .catch(err => console.error("Possibly need to update the session token found in cookies", err))

  return data
}

const parseInputArray = (data) => {
  const dataArray = data.split(/\r?\n/)
  return dataArray.map(s => parseInt(s))
}

export {
  getInput,
  parseInputArray
}