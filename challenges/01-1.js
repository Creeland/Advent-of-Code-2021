import {getInput, parseInputArray} from "../getInput.js"

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

getInput(1)
.then(result => {
  return parseInputArray(result)
})
.then(result => {
  console.log(countIncreases(result))
}).catch(err => console.error("uh oh", err))