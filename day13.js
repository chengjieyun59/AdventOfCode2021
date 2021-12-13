const fs = require('fs')
const getData = filename => {
    const testdata = fs.readFileSync(filename, 'UTF-8').split(/\r?\n/)
    const testIndex = testdata.indexOf('')
    const marks = testdata.slice(0, testIndex).map(mark => mark.split(',').map(num => parseInt(num)))
    const instructions = testdata.slice(testIndex + 1).map(instruction => instruction.split(' ')[2])
    return [marks, instructions]
}
const [testMarks, testInstructions] = getData('day13test.txt')
const [marks, instructions] = getData('day13.txt')

const getDiagram = (marks, maxX, maxY) => {
    const diagram = Array.from(Array(maxY + 1), () => new Array(maxX + 1).fill('.'))
    for (let [x, y] of marks) {
        diagram[y][x] = '#'
    }
    return diagram
}

const foldPaper = (marks, instructions, rule) => {
    let maxX = Math.max(...marks.map(d => d[0]))
    let maxY = Math.max(...marks.map(d => d[1]))

    const fold = (instruction) => {
        const [axis, index] = instruction.split('=')
        for (let i = 0; i < marks.length; i += 1) {
            const [x, y] = marks[i]
            if (axis == 'y' && y > index) { // fold up
                marks[i][1] = index * 2 - y
                maxY = Math.max(maxY - index + 1, index - 1)
            } else if (axis == 'x' && x > index) { // fold left
                marks[i][0] = index * 2 - x
                maxX = Math.max(maxX - index + 1, index - 1)
            }
        }
    }

    if (rule == 'part1') {
        fold(instructions[0])
        return getDiagram(marks, maxX, maxY).reduce((count, line) => count + line.filter(el => el == '#').length, 0)
    } else {
        instructions.forEach(instruction => fold(instruction))
        return getDiagram(marks, maxX, maxY)
    }
}

console.assert(foldPaper(testMarks, testInstructions, 'part1') == 17)
foldPaper(testMarks, testInstructions, 'part2').forEach(line => console.log(line.join(''))) // visually look like a square
console.log(`part 1 answer: ${foldPaper(marks, instructions, 'part1')}`)
console.log(`part 2 answer:`)
foldPaper(marks, instructions, 'part2').forEach(line => console.log(line.join(''))) // visually identify the 8 capital letters
