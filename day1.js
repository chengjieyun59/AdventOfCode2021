const fs = require('fs')

try {
  const data = fs.readFileSync('day1.txt', 'UTF-8')
  const seaLevels = data.split(/\r?\n/)

  // A trick to part 2 is to not sum up 3 numbers, but to compare numbers at index i and i-3 , 
  // making the code from part 1 reusable. Because (a + b + c) < (b + c + d) is equivalent to a < d
  const calculateIncrease = indexOffset => 
    seaLevels.reduce((prevIncreased, currSeaLevel, index) => {
      increased = currSeaLevel > seaLevels[index - indexOffset] ? 1 : 0
      return prevIncreased + increased
    }, 0)

  console.log('part 1 answer: ', calculateIncrease(1))
  console.log('part 2 answer: ', calculateIncrease(3))
} catch (err) {
  console.error(err);
}
