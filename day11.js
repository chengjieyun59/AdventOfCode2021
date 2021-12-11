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
    const flashed = []
    while (flashing.length > 0) {
        const currFlash = flashing.pop()
        const [i, j] = currFlash.split(',').map(energy => parseInt(energy))
        if (flashed.includes(currFlash)) {
            data[i][j] = 0
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
        flashed.push(currFlash)
        data[i][j] = 0
    }

}

const updateEnergy = (data, step) => {
    const flashing = []
    while (step > 0) {
        for (let i = 0; i < data.length; i += 1) {
            for (let j = 0; j < data[0].length; j += 1) {
                data[i][j] += 1
                if (data[i][j] > 9) {
                    flashing.push(`${i},${j}`)
                }
            }
        }
        updateNeighbors(data, flashing)
        step -= 1
    }
    return data
}
console.log(updateEnergy(testenergies, 100))

for (let e of testenergies) {
    console.log(e.join(''))
}

// update each energy by 1
// maintain a queue for flashing
// if an energy > 9, add that to flashing queue

// after all flashing are added
// while queue is not empty
    // if already flashed, update the energy to 0 and skip the for loop
    // update all flash's neighbors
        // if neighbor already flashed, skip
        // update each energy by 1
        // if an energy > 9, add that to flashing queue
    // update the enery to 0
    // add to already flashed