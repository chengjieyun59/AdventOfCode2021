/**
 * Figure out signals for digits 1, 4, 7, 9 with unique number of segments.
 * Then, figure out how the encoded segments a-g map to the official decoded segments A-G,
 * based on how frequently a segment appears in the 10 signals. A is 7-1.
 * Since 4 is BCDF, once we know the encodings for BCF, we can find D.
 * The last encoding would be G.
 */
const fs = require('fs')
const lines = fs.readFileSync('day8.txt', 'UTF-8').split(/\r?\n/).map(line => line.split(' | '))
const linesTest1 = fs.readFileSync('day8test.txt', 'UTF-8').split(/\r?\n/).map(line => line.split(' | '))

const countAppear = (lines) => {
    return lines.reduce((appear, line) => appear + line[1].split(' ').filter(el => [2, 3, 4, 7].includes(el.length)).length, 0)
}

const decodeLine = tenSignals => {
    const digitSignal = new Array(10).fill('')
    const encodedSegment = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 }

    digitSignal[1] = tenSignals.find(signal => signal.length == 2).split('').sort().join('')
    digitSignal[4] = tenSignals.find(signal => signal.length == 4).split('').sort().join('')
    digitSignal[7] = tenSignals.find(signal => signal.length == 3).split('').sort().join('')
    digitSignal[8] = tenSignals.find(signal => signal.length == 7).split('').sort().join('')
    
    tenSignals.forEach(signal => [...signal].forEach(seg => encodedSegment[seg] += 1))
    encodedSegment[Object.entries(encodedSegment).find(encode => encode[1] == 4)[0]] = 'E'
    encodedSegment[Object.entries(encodedSegment).find(encode => encode[1] == 6)[0]] = 'B'
    encodedSegment[Object.entries(encodedSegment).find(encode => encode[1] == 9)[0]] = 'F'
    const segA = digitSignal[7].split('').filter(el => !digitSignal[1].includes(el))
    encodedSegment[Object.entries(encodedSegment).find(encode => encode[1] == 8 && encode[0] == segA)[0]] = 'A'
    encodedSegment[Object.entries(encodedSegment).find(encode => encode[1] == 8 && encode[0] != segA)[0]] = 'C'
    encodedSegment[digitSignal[4].split('').filter(lowS => typeof encodedSegment[lowS] == 'number')] = 'D'
    encodedSegment[Object.entries(encodedSegment).find(encode => typeof encode[1] == 'number')[0]] = 'G'

    const encodedSignalForDigit = new Array(10).fill('')
    const decodedSegToDigit = {
        'A': [0,2,3,5,6,7,8,9],
        'B': [0,4,5,6,8,9],
        'C': [0,1,2,3,4,7,8,9],
        'D': [2,3,4,5,6,8,9],
        'E': [0,2,6,8],
        'F': [0,1,3,4,5,6,7,8,9],
        'G': [0,2,3,5,6,8,9]
    }
    for (let [encode, decode] of Object.entries(encodedSegment)) {
        decodedSegToDigit[decode].forEach(digit => encodedSignalForDigit[digit] += encode)
    }
    return encodedSignalForDigit
}

const createFourDigit = (encodedSignalForDigit, fourSignals) => {
    let sum = 0
    for (let signal of fourSignals.split(' ')) {
        const digit = encodedSignalForDigit.indexOf(signal.split('').sort().join(''))
        sum = sum * 10 + digit
    }
    return sum
}

const sumAllFourDigits = lines => {
    let sum = 0
    for (let line of lines) {
        const encodedSignalForDigit = decodeLine(line[0].split(' '))
        sum += createFourDigit(encodedSignalForDigit, line[1])
    }
    return sum
}

console.assert(countAppear(linesTest1) == 26)
console.assert(sumAllFourDigits(linesTest1) == 61229)
console.log(`part 1 answer: ${countAppear(lines)}`)
console.log(`part 2 answer: ${sumAllFourDigits(lines)}`)
