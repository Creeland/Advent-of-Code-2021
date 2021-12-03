import {getInput} from "../getInput.js"

let coords = {
  horizontal: 0,
  depth: 0,
  aim: 0
}

const parseInputArray = (data) => {
  let arr = data.split(/\r?\n/)
  arr.pop()
  return arr
}

getInput(2)
.then(result => {
  return parseInputArray(result).map(i => {
    let tuple = i.split(" ")
    tuple[1] = parseInt(tuple[1])
    return tuple
  })
})
.then(result => {
  result.forEach(i => {
    switch(i[0]) {
      case "down": 
        coords.aim += i[1]
        break
      case "up":
        coords.aim -= i[1]
        break
      case "forward":
        coords.horizontal += i[1]
        coords.depth += coords.aim * i[1]
        break
      default:
        console.log("oops")
    }
  })
  console.log(coords)
  console.log(coords.horizontal * coords.depth)
})