import {getInput, parseInputArray} from "../getInput.js"

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

getInput(1)
.then(result => {
  return parseInputArray(result)
})
.then(result => {
  console.log(countIncreases(result))
}).catch(err => console.error("uh oh", err))