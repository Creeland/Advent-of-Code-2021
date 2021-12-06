import {getInput} from "../getInput.js"

const parseInputArray = (data) => {
  let arr = data.split(/\r?\n/)
  console.log(arr.pop())
  return arr
}

getInput(3)
.then(result => {
  return parseInputArray(result).map(i => {
    return i.split("")
  })
})
.then(result => {
  let gammaRate = result
  let epsilonRate = result

  // We take the filtered array
  // and we found out how common a single bit at the index is
  // filter based on conditions
  // then take the new filtered array. And filter the next index based on conditions
  // stop when one item remains

  result[0].forEach((_, index) => {
    if (gammaRate.length > 1) {
      const counts = gammaRate.reduce((counts, currentBitArray) => {
        if (currentBitArray[index] === "0") counts[0] += 1
        if (currentBitArray[index] === "1") counts[1] += 1
        return counts
      }, [0, 0])
      console.log(counts)
      if (counts[0] > counts[1]) {
        gammaRate = gammaRate.filter((bitArray) => {
          return bitArray[index] === "0"
        })
        console.log(gammaRate.length)
      } else {
        gammaRate = gammaRate.filter((bitArray) => {
          return bitArray[index] === "1"
        })
      }
    }
  })
  console.log(gammaRate)
  
  result[0].forEach((_, index) => {
    if (epsilonRate.length > 1) {
      const counts = epsilonRate.reduce((counts, currentBitArray) => {
        if (currentBitArray[index] === "0") counts[0] += 1
        if (currentBitArray[index] === "1") counts[1] += 1
        return counts
      }, [0, 0])
      if (counts[0] > counts[1]) {
        epsilonRate = epsilonRate.filter((bitArray) => {
          return bitArray[index] === "1"
        })
      } else {
        epsilonRate = epsilonRate.filter((bitArray) => {
          return bitArray[index] === "0"
        })
      }
    }
  })
  console.log(parseInt(epsilonRate[0].join(""), 2))
  console.log(parseInt(gammaRate[0].join(""), 2))
  console.log(parseInt(gammaRate[0].join(""), 2) * parseInt(epsilonRate[0].join(""), 2))
})