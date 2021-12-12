const fs = require('fs')
const getLinkages = filename => {
    let linkages = fs.readFileSync(filename, 'UTF-8').split(/\r?\n/).map(linkage => linkage.split('-'))
    linkages.push(...linkages.map(link => [link[1], link[0]]))
    return linkages.filter(link => link[0] != 'end' && link[1] != 'start')
}
const linkages = getLinkages('day12.txt')
const testLinkages = getLinkages('day12test.txt')

const isSmallCave = caveName => caveName.split('').every(el => el == el.toLowerCase())

const canVisit = (path, currCave, rule) => {
    if (!isSmallCave(currCave)) {
        return true
    }
    if (rule == 'part1') {
        return !path.includes(currCave)
    }
    const visitedOtherSmallCave = path.filter((cave, index) => isSmallCave(cave) && path.indexOf(cave) !== index).length > 0
    return !(visitedOtherSmallCave && path.filter(c => c == currCave).length >= 1)
}

const getNewPaths = (paths, linkages, rule) => {
    const newPaths = []
    let appended = false
    for (let path of paths) {
        const currLastCave = path[path.length - 1]
        if (currLastCave == 'end') {
            newPaths.push(path)
        } else {
            const addLinks = linkages.filter(link => link[0] == currLastCave && canVisit(path, link[1], rule))
            addLinks.forEach(link => newPaths.push([...path, link[1]]))
            appended = appended || addLinks.length > 0
        } 
    }
    return [appended, newPaths]
}

const countPaths = (linkages, rule) => {
    let paths = linkages.filter(link => link[0] == 'start')
    let appended = true
    while (appended) {
        [appended, paths] = getNewPaths(paths, linkages, rule)
    }
    return paths.length
}

console.assert(countPaths(testLinkages, 'part1') == 226)
console.assert(countPaths(testLinkages, 'part2') == 3509)
console.log(`part 1 answer: ${countPaths(linkages, 'part1')}`)
console.log(`part 2 answer: ${countPaths(linkages, 'part2')}`)


