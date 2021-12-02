const fs = require('fs')

const data = fs.readFileSync('day2.txt', 'UTF-8')
const moves = data.split(/\r?\n/)

const calculateFinalPosition = (callback) => {
  let horizontal = 0, depth = 0, aim = 0
  for (let move of moves) {
    direction = move.split(' ')[0]
    step = parseInt(move.split(' ')[1])
    if (direction == 'forward') {
      horizontal += step
    }
    ({ depth, aim } = callback(direction, step, depth, aim));
  }
  return horizontal * depth
}

const calculateDepth = (direction, step, depth) => {
  if (direction == 'up') {
    depth -= step
  } else if (direction == 'down') {
    depth += step
  }
  return { depth }
}

const calculateDepthByAim = (direction, step, depth, aim) => {
  if (direction == 'forward') {
    depth += aim * step
  } else if (direction == 'up') {
    aim -= step
  } else if (direction == 'down') {
    aim += step
  }
  return { depth, aim }
}

console.log('part 1 answer: ', calculateFinalPosition(calculateDepth))
console.log('part 2 answer: ', calculateFinalPosition(calculateDepthByAim))
