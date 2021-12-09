const fs = require('fs')
const heights = fs.readFileSync('day9.txt', 'UTF-8').split(/\r?\n/).map(heights => heights.split(''))
const testheights = fs.readFileSync('day9test.txt', 'UTF-8').split(/\r?\n/).map(heights => heights.split(''))

const compare = (heights, r, c, rMove, cMove) => parseInt(heights[r][c]) < parseInt(heights[r+rMove][c+cMove])

const isLowest = (heights, r, c) => {
     return true
          && (r == 0 || compare(heights, r, c, -1, 0))
          && (r == heights.length - 1 || compare(heights, r, c, 1, 0))
          && (c == 0 || compare(heights, r, c, 0, -1))
          && (c == heights[0].length - 1 || compare(heights, r, c, 0, 1))
}

const getRisk = (heights) => {
     const lowPoints = []
     for (let r = 0; r < heights.length; r += 1) {
          for (let c = 0; c < heights[0].length; c += 1) {
               if (isLowest(heights, r, c)) {
                    lowPoints.push(heights[r][c])
               }
          }
     }
     return lowPoints.reduce((risk, point) => risk + parseInt(point) + 1, 0)
}

console.assert(getRisk(testheights) == 15)
console.log(`part 1 answer: ${getRisk(heights)}`)

const getSizes = (heights, r, c, size = 0) => {
     if (r < 0 || r >= heights.length || c < 0 || c >= heights[0].length || heights[r][c] == '9' || heights[r][c] == '*') {
          return size
     }
     heights[r][c] = '*'
     return 1 + getSizes(heights, r+1, c, size) 
          + getSizes(heights, r-1, c, size) 
          + getSizes(heights, r, c+1, size) 
          + getSizes(heights, r, c-1, size)
}

const threeLargestProduct = heights => {
     const sizes = []
     for (let r = 0; r < heights.length; r += 1) {
          for (let c = 0; c < heights[0].length; c += 1) {
               if (heights[r][c] != '9') {
                    const basinSize = getSizes(heights, r, c)
                    if (basinSize != 0) {
                         sizes.push(basinSize)
                    }
               }
          }
     }
     
     sizes.sort((a, b) => b - a)
     return sizes[0] * sizes[1] * sizes[2]
}

console.assert(threeLargestProduct(testheights) == 1134)
console.log(`part 2 answer: ${threeLargestProduct(heights)}`)
