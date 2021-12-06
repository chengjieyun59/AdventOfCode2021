const fs = require('fs')
const data = fs.readFileSync('day6.txt', 'UTF-8').split(/\r?\n/)
const timers = data[0].split(',').map(t => parseInt(t))
timers.sort((a, b) => a - b)

const numOfFish = (timers, day) => {
    const fishWithTime = new Array(9).fill(0).map((count, time) => timers.filter(t => t == time).length)
    while (day > 0) {
        fishWithT0 = fishWithTime[0]
        for (let i = 0; i < fishWithTime.length - 1; i += 1) {
            fishWithTime[i] = fishWithTime[i + 1]
        }
        fishWithTime[8] = fishWithT0
        fishWithTime[6] += fishWithT0
        day -= 1
    }
    return fishWithTime.reduce((sum, fish) => sum + fish, 0)
}

console.assert(numOfFish([3,4,3,1,2], 18) == 26)
console.assert(numOfFish([3,4,3,1,2], 80) == 5934)
console.assert(numOfFish([3,4,3,1,2], 256) == 26984457539)
console.assert(numOfFish(timers, 80) == 390923)
console.assert(numOfFish(timers, 256) == 1749945484935)
