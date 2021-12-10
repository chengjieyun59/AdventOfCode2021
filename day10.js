const fs = require('fs')
const data = fs.readFileSync('day10.txt', 'UTF-8').split(/\r?\n/).map(data => data.split(''))
const testdata = fs.readFileSync('day10test.txt', 'UTF-8').split(/\r?\n/).map(data => data.split(''))
const match = { '(': ')', '[': ']', '{': '}', '<': '>' }

const checkLine = line => {
     const stack = [], illegalChar = []
     for (let char of line) {
          if (Object.keys(match).includes(char)) {
               stack.push(char)
          } else if (match[stack.pop()] != char) {
               illegalChar.push(char)
          }
     }
     return [illegalChar, stack]
}

const calculateAuto = (close) => {
     const auto = { ')': 1 , ']': 2, '}': 3, '>': 4 }
     return close.reduce((score, char) => score * 5 + auto[char], 0)
}

const calculateScores = data => {
     const error = { ')': 3, ']': 57, '}': 1197, '>': 25137 }
     let errorScore = 0
     const autoScores = []
     for (let line of data) {
          const [illegalChars, stack] = checkLine(line)
          if (illegalChars.length == 0) {
               const addToComplete = stack.reverse().map(open => match[open])
               autoScores.push(calculateAuto(addToComplete))
          } else {
               illegalChars.forEach(illegal => errorScore += error[illegal])
          }
     }
     autoScores.sort((a, b) => a - b)
     return [errorScore, autoScores[(autoScores.length - 1) / 2]]
}

console.assert(calculateScores(testdata).toString() == '26397,288957')
const [errorScore, autoScore] = calculateScores(data)
console.log(`part 1 answer: ${errorScore}\npart 2 answer ${autoScore}`)
