import {getInput} from "../getInput.js"

let coords = {
  horizontal: 0,
  depth: 0
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
    console.log(i)
    switch(i[0]) {
      case "forward":
        coords.horizontal = coords.horizontal + i[1]
        break
      case "up":
        coords.depth = coords.depth - i[1]
        break
      case "down":
        coords.depth = coords.depth + i[1]
        break
      default:
        console.log("bad input")
    }
  })
  console.log(coords)
  console.log(coords.horizontal * coords.depth)
})