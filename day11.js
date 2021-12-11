// Part 1 pseudocode:
// maintain a queue for flashing
// loop through all energies
    // update each energy by 1   
    // if an energy > 9, add that to flashing queue
// after all flashing are added
// while queue is not empty
    // if already flashed and updated neighbors, don't update the neighbors again
    // otherise, update all its neighbors
        // if the neighbor already flashed, don't update that neighbor
        // otherwise, add 1 to the neighbor's energy
        // if neighbor's energy > 9, add neighbor to flashing queue
    // update the energy to 0 and add to already flashed

const fs = require('fs')
const energies = fs.readFileSync('day11.txt', 'UTF-8').split(/\r?\n/).map(data => data.split('').map(level => parseInt(level)))
const testenergies = fs.readFileSync('day11test.txt', 'UTF-8').split(/\r?\n/).map(data => data.split('').map(level => parseInt(level)))

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
        if (flashed.includes(currFlash)) {
            continue
        }
        for (let d of getDirections(data, i, j)) {
            const iMove = d.includes('u') ? -1 : (d.includes('d') ? 1 : 0)
            const jMove = d.includes('r') ? 1 : (d.includes('l') ? -1 : 0)
            if (flashed.includes(`${i+iMove},${j+jMove}`)) {
                continue
            }
            data[i + iMove][j + jMove] += 1
            if (data[i + iMove][j + jMove] > 9 && !flashing.includes(`${i+iMove},${j+jMove}`)) {
                flashing.push(`${i+iMove},${j+jMove}`)
            }
        }
        data[i][j] = 0
        flashed.push(currFlash)
    }
    return flashCount
}

const updateEnergy = (data, step) => {
    const flashing = []
    let flashCount = 0
    while (step > 0) {
        for (let i = 0; i < data.length; i += 1) {
            for (let j = 0; j < data[0].length; j += 1) {
                data[i][j] += 1
                if (data[i][j] > 9) {
                    flashing.push(`${i},${j}`)
                }
            }
        }
        flashCount += updateNeighbors(data, flashing)
        step -= 1
    }
    return flashCount
}
console.assert(updateEnergy(testenergies, 100) == 1656)
console.log(`part 1 answer: ${updateEnergy(energies, 100)}`)
