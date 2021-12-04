const fs = require('fs')
const data = fs.readFileSync('day4.txt', 'UTF-8').split(/\r?\n/)

const numsDrawn = data[0].split(',')
const bingodata = data.slice(2).filter(line => line != '')
const bingoBoards = []
for (let i = 0; i < bingodata.length; i += 5) {
  bingoBoards.push(bingodata.slice(i, i + 5).map(el => el.split(/\s+/).filter(el => el != '')))
}

const hasBoardWon = board => {
  for (let row of board) {
    if (row.filter(el => el == '*').length == 5) {
      return true
    }
  }
  for (let col = 0; col < 5; col += 1) {
    if (board.map(row => row[col]).filter(el => el === '*').length == 5) {
      return true
    }
  }
  return false
}

const play = (boards, winXthPlace) => {
  const biThatWon = []
  for (let num of numsDrawn) {
    for (let bi = 0; bi < boards.length; bi += 1) {
      if (!biThatWon.includes(bi)) {
        for (let row of boards[bi]) {
          for (let col = 0; col < row.length; col += 1) {
            if (num == row[col]) {
              row[col] = '*'
            }
            if (hasBoardWon(boards[bi]) && !biThatWon.includes(bi)) {
              biThatWon.push(bi)
            }
            if (biThatWon.length > winXthPlace - 1) {
              return { lastNumCalled: num, winner: boards[biThatWon[biThatWon.length - 1]] }
            }
          }
        }
      }
    }
  }
}

const calculateScore = (board, lastNumCalled) => {
  const sumUnmarked = board.reduce((sumB, row) => sumB + row.filter(el => el != '*').reduce((sumR, el) => sumR += parseInt(el), 0), 0)
  return sumUnmarked * lastNumCalled
}

const playAndScore = (boards, winXthPlace) => {
  const { lastNumCalled, winner } = play(boards, winXthPlace)
  return calculateScore(winner, lastNumCalled)
}

console.log(`part 1 answer: ${playAndScore(bingoBoards, 1)}`)
console.log(`part 2 answer: ${playAndScore(bingoBoards, bingoBoards.length)}`)
