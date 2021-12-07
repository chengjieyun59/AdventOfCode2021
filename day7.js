const fs = require('fs')
const data = fs.readFileSync('day7.txt', 'UTF-8').split(/\r?\n/)
const pos = data[0].split(',').map(p => parseInt(p))

const needFuel = (diff, type) => type == 'constant' ? diff : (diff + 1) * diff / 2

const cost = (pos, align, type) => pos.reduce((sum, p) => sum + needFuel(Math.abs(p - align), type), 0)

const getBestPos = (pos, fuelType) => {
    let lowestCost = Infinity
    const [minP, maxP] = [Math.min(...pos), Math.max(...pos)]
    for (let p = minP; p < maxP; p += 1) {
        const currCost = cost(pos, p, fuelType)
        if (currCost < lowestCost) {
            lowestCost = currCost
        }
    }
    return lowestCost
}

console.assert(getBestPos([16,1,2,0,4,2,7,1,2,14], 'constant') == 37)
console.assert(getBestPos([16,1,2,0,4,2,7,1,2,14], 'increasing') == 168)
console.log(`part 1 answer: ${getBestPos(pos, 'constant')}`)
console.log(`part 2 answer: ${getBestPos(pos, 'increasing')}`)
