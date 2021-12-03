const fs = require('fs')
const data = fs.readFileSync('day3.txt', 'UTF-8')
let numbers = data.split(/\r?\n/)

const getBit = (numbers, index, defaultBit, otherBit) => {
  const numberOfOnes = numbers.filter(number => number[index] == '1').length
  return (numberOfOnes >= numbers.length / 2) ? defaultBit : otherBit
}

const calculateRate = (numbers, defaultBit, otherBit) => {
  let rate = ''
  for (let i = 0; i < numbers[0].length; i += 1) {
    rate += getBit(numbers, i, defaultBit, otherBit)
  }
  return rate
}

let gammaRate = calculateRate(numbers, '1', '0')
let epsilonRate = calculateRate(numbers, '0', '1')
console.log(`part 1 answer: ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`)

const calculateRating = (numbers, defaultBit, otherBit) => {
  for (let i = 0; numbers.length > 1 && i < numbers[0].length; i += 1) {
    const matchBit = getBit(numbers, i, defaultBit, otherBit)
    numbers = numbers.filter(number => number[i] == matchBit)
  }
  return numbers[0]
}

const oxygenRating = calculateRating(numbers, '1', '0')
const carbonDioxideRating = calculateRating(numbers, '0', '1')
console.log(`part 2 answer: ${parseInt(oxygenRating, 2) * parseInt(carbonDioxideRating, 2)}`)
