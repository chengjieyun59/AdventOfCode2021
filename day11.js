const fs = require('fs')
const energies = fs.readFileSync('day11.txt', 'UTF-8').split(/\r?\n/).map(data => data.split('').map(level => parseInt(level)))
const testenergies = fs.readFileSync('day11test.txt', 'UTF-8').split(/\r?\n/).map(data => data.split('').map(level => parseInt(level)))

const updateNeighbors = (data, i, j) => {
    let directions = ['u','d','l','r','ul','ur','dl','dr']
    if (i == 0) {
        directions = directions.filter(d => !d.includes('u'))
    } else if (i == data.length - 1) {
        directions = directions.filter(d => !d.includes('d'))
    }
    if (j == 0) {
        directions = directions.filter(d => !d.includes('l'))
    } else if (j == data[0].length - 1) {
        directions = directions.filter(d => !d.includes('r'))
    }
    for (let d of directions) {
        const iMove = d.includes('u') ? -1 : (d.includes('d') ? 1 : 0)
        const jMove = d.includes('r') ? 1 : (d.includes('l') ? -1 : 0)
        if (data[i + iMove][j + jMove] != 9) {
            data[i + iMove][j + jMove] += 1
        }
    }
}

const updateEnergy = (data, step) => {
    while (step > 0) {
        let noMoreFlash = true
        for (let i = 0; i < data.length; i += 1) {
            for (let j = 0; j < data[0].length; j += 1) {
                if (data[i][j] != 9) {
                    data[i][j] += 1
                } else {
                    updateNeighbors(data, i, j)
                    noMoreFlash = false
                }
            }
        }
        for (let i = 0; i < data.length; i += 1) {
            for (let j = 0; j < data[0].length; j += 1) {
                if (data[i][j] == 9) {
                    data[i][j] = 0
                }
            }
        }
        step -= 1
    }
    return data
}
console.log(updateEnergy(testenergies, 2))

for (let e of testenergies) {
    console.log(e.join(''))
}