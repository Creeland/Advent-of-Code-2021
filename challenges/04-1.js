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
    matrix.push(arr.slice(i, i+5))
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
  let gameWon = false
  let winner
  let lastDraw

  draws.forEach(draw => {
    if (!gameWon) {
      matrix.forEach((board, boardIndex) => {
        let markedInEachColumn = [0, 0, 0, 0, 0]        
        board.forEach((row, rowIndex) => {
          let markedInRow = 0
          row.forEach((square, squareIndex) => {
            if (square === draw && !gameWon) {
              matrix[boardIndex][rowIndex][squareIndex] = "marked"
            }

            if (matrix[boardIndex][rowIndex][squareIndex] === "marked") {
              markedInRow++
              markedInEachColumn[squareIndex]++
            }

            if (markedInRow === 5 || markedInEachColumn[squareIndex] === 5) {
              gameWon = true
              winner = board
              lastDraw = draw
            }
          })
        })
      })
    }
  }) 

  winner = winner.map(row => {
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
