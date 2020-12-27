import { getTreeCount } from './part-one.js';

const treeCounts = [
    getTreeCount(1, 1),
    getTreeCount(3, 1),
    getTreeCount(5, 1),
    getTreeCount(7, 1),
    getTreeCount(1, 2)
]

console.log(treeCounts)
console.log(treeCounts.reduce((prevCount, currCount) => prevCount * currCount, 1))