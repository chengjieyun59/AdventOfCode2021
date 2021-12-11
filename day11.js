const fs = require('fs')
const energies = fs.readFileSync('day11.txt', 'UTF-8').split(/\r?\n/).map(data => data.split('').map(level => parseInt(level)))
const testenergies = fs.readFileSync('day11test.txt', 'UTF-8').split(/\r?\n/).map(data => data.split('').map(level => parseInt(level)))

const allFlashed = data => {
    return data.reduce((allFlashing, energies) => {
        return allFlashing = allFlashing && energies.filter(e => e != 0).length == 0
    }, true)
}

const getDirections = (data, i, j) => {
    let directions = ['u','d','l','r','ul','ur','dl','dr']
    if (i == 0) {
        directions = directions.filter(d => !d.includes('u'))
    } else if (i == data.length - 1) {
        directions = directions.filter(d => !d.includes('d'))
    } if (j == 0) {
        directions = directions.filter(d => !d.includes('l'))
    } else if (j == data[0].length - 1) {
        directions = directions.filter(d => !d.includes('r'))
    }
    return directions
}

const updateNeighbors = (data, flashing) => {
    let flashCount = 0
    const flashed = []
    while (flashing.length > 0) {
        const currFlash = flashing.pop()
        flashCount += 1
        const [i, j] = currFlash.split(',').map(energy => parseInt(energy))
        if (!flashed.includes(currFlash)) {
            for (let d of getDirections(data, i, j)) {
                const nI = i + (d.includes('u') ? -1 : (d.includes('d') ? 1 : 0))
                const nJ = j + (d.includes('r') ? 1 : (d.includes('l') ? -1 : 0))
                if (!flashed.includes(`${nI},${nJ}`)) {
                    data[nI][nJ] += 1
                    if (data[nI][nJ] > 9 && !flashing.includes(`${nI},${nJ}`)) {
                        flashing.push(`${nI},${nJ}`)
                    }
                }
            }
            data[i][j] = 0
            flashed.push(currFlash)
        }
    }
    return flashCount
}

const updateEnergy = (data, step = 1000) => {
    const flashing = []
    let flashCount = 0, syncStep = null
    for (let s = 0; s < step; s += 1) {
        for (let i = 0; i < data.length; i += 1) {
            for (let j = 0; j < data[0].length; j += 1) {
                data[i][j] += 1
                if (data[i][j] > 9) {
                    flashing.push(`${i},${j}`)
                }
            }
        }
        flashCount += updateNeighbors(data, flashing)
        if (allFlashed(data)) {
            syncStep = s + 1
            break
        }
    }
    return [flashCount, syncStep]
}

console.assert(updateEnergy(JSON.parse(JSON.stringify(testenergies)), 100)[0] == 1656)
console.assert(updateEnergy(JSON.parse(JSON.stringify(testenergies)), 196)[1] == 195)
console.log(`part 1 answer: ${updateEnergy(JSON.parse(JSON.stringify(energies)), 100)[0]}`)
console.log(`part 2 answer ${updateEnergy(JSON.parse(JSON.stringify(energies)))[1]}`)

// Part 1 pseudocode:
// maintain a queue for flashing
// loop through all energies
//     update each energy by 1   
//     if an energy > 9, add that to flashing queue
// after all flashing are added
// while queue is not empty
//     only if it hasn't flashed and updated neighbors
//         update all its neighbors
//             if the neighbor hasn't already flashed
//                 add 1 to the neighbor's energy
//                 if neighbor's energy > 9, add neighbor to flashing queue
//         update the energy to 0 and add to already flashed
