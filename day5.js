const fs = require('fs')
const data = fs.readFileSync('day5.txt', 'UTF-8').split(/\r?\n/)
const vents = data.map(line => line.split(' -> '))

const updateRow = (diagram, r, c) => {
    const row = diagram[r]
    const insert = `${parseInt(row[c]) + 1}`
    return row.substring(0,c) + insert + row.substring(c+1)
}

const getVentDiagram = (vents, size, countDiagonal) => {
    const stringOfDots = new Array(size + 1).join('0')
    const diagram = new Array(size).fill(stringOfDots)

    for (let vent of vents) {
        const [x1, y1] = vent[0].split(',').map(el => parseInt(el))
        const [x2, y2] = vent[1].split(',').map(el => parseInt(el))
        if (x1 == x2) { // vertical
            const [rMin, rMax] = [y1,y2].sort((a,b) => a - b)
            for (let row = rMin; row <= rMax; row += 1) {
                diagram[row] = updateRow(diagram, row, x1)
            }
        } else if (y1 == y2) { // horizontal
            const [cMin, cMax] = [x1, x2].sort((a,b) => a - b)
            for (let col = cMin; col <= cMax; col += 1) {
                diagram[y1] = updateRow(diagram, y1, col)
            }
        } else if (countDiagonal && Math.abs(x1-x2) == Math.abs(y1-y2)) { // diagonal
            const [rIncrease, cIncrease] = [y1 < y2 ? 1 : -1, x1 < x2 ? 1 : -1]
            for (let r = y1, c = x1; Math.abs(x1 - x2) != Math.abs(c - x1) - 1; r += rIncrease, c += cIncrease) {
                diagram[r] = updateRow(diagram, r, c)
            }
        }
    }
    return diagram
}

const intersectionCount = diagram =>
    diagram.reduce((sum, row) => sum += row.split('').filter(el => parseInt(el) >= 2).length, 0)

const diagram = getVentDiagram(vents, 1000, false)
console.log(`part 1 answer: ${intersectionCount(diagram)}`)
const diagramWithDiagonal = getVentDiagram(vents, 1000, true)
console.log(`part 2 answer: ${intersectionCount(diagramWithDiagonal)}`)

const testVents = [['0,9', '5,9'], ['8,0', '0,8'], ['9,4', '3,4'], ['2,2', '2,1'], ['7,0', '7,4'], ['6,4', '2,0'], ['0,9', '2,9'], ['3,4', '1,4'], ['0,0', '8,8'], ['5,5', '8,2']]
const testDiagram = getVentDiagram(testVents, 10, true)
console.assert(intersectionCount(testDiagram) == 12)
const expectedDiagram = `1010000110
0111000200
0020101110
0001020200
0112313211
0001020000
0010001000
0100000100
1000000010
2221110000`.split('\n')
console.assert(testDiagram.every((el, row) => el == expectedDiagram[row]))

