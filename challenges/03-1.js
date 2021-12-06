import {getInput} from "../getInput.js"

const parseInputArray = (data) => {
  let arr = data.split(/\r?\n/)
  arr.pop()
  return arr
}

getInput(3)
.then(result => {
  return parseInputArray(result).map(i => {
    return i.split("")
  })
})
.then(result => {
  let gammaRate = ""
  let epsilonRate = ""
  result[0].forEach((bit, index) => {
    const bitCount = result.reduce((p, c) => {
      if (c[index] === "0") {
        p[0]++
      } else {
        p[1]++
      }
      return p
    }, [0, 0])
    
    if (bitCount[0] > bitCount[1]) {
      gammaRate += "0"
      epsilonRate += "1"
    } else {
      gammaRate += "1"
      epsilonRate += "0"
    }
  })
  const powerConsumption = parseInt(epsilonRate, 2) * parseInt(gammaRate, 2)
  console.log("power consumption: ", powerConsumption)
})