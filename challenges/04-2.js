import {getInput} from "../getInput.js"

const parseInputArray = (data) => {
  let arr = data.split(/\r?\n/)
  arr = arr.filter((str) => {
    if (str === "") {
      return false
    } else {
      return true
    }
  })

  let draws = arr.shift().split(",")

  arr = arr.map(i => {
    return i.split(" ").filter(s => {
      return s !== " " && s !== ""
    })
  })

  let matrix = []
  for (let i = 0; i < arr.length; i += 5) {
    matrix.push({
      boardArray: arr.slice(i, i+5),
      boardWon: false
    })
  }

  return {
    draws: draws,
    matrix: matrix
  }
}

getInput(4)
.then(result => {
  return parseInputArray(result)
})
.then(result => {
  let {draws, matrix} = result
  let winner
  let lastDraw

  draws.forEach(draw => {
    matrix.forEach((board, boardIndex) => {
      if (!board.boardWon) {
        let markedInEachColumn = [0, 0, 0, 0, 0]        
        board.boardArray.forEach((row, rowIndex) => {
          let markedInRow = 0
          row.forEach((square, squareIndex) => {
            if (square === draw && !matrix[boardIndex].boardWon) {
              matrix[boardIndex].boardArray[rowIndex][squareIndex] = "marked"
            }
  
            if (matrix[boardIndex].boardArray[rowIndex][squareIndex] === "marked") {
              markedInRow++
              markedInEachColumn[squareIndex]++
            }
  
            if (markedInRow === 5 || markedInEachColumn[squareIndex] === 5) {
              matrix[boardIndex].boardWon = true
              winner = board
              lastDraw = draw
            }
          })
        })
      }
    })
  }) 

  winner = winner.boardArray.map(row => {
    return row.filter(square => {
      return square !== "marked"
    }).reduce((p, c) => {
      return p + parseInt(c)
    }, 0)
  }).reduce((p, c) => {
    return p + c
  })
  console.log(winner * lastDraw)
})
