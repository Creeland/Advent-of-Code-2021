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
  
  arr.forEach((v, i) => {
    if (arr[i+4] === undefined) {
      return
    }
    

    const currentSlice = arr.slice(i, i+3).reduce((p, c) => {
      return p + c
    })
    const nextSlice = arr.slice(i+1, i+4).reduce((p, c) => {
      return p + c
    })

    if (nextSlice > currentSlice) increaseCount++
  })
  
  return increaseCount
}

getInput().then(result => {
  console.log(countIncreases(result))
}).catch(err => console.error("uh oh", err))