import { getInputData } from '../../lib.js';

const inputData = await getInputData(import.meta.url);

export const getTreeCount = (moveRight = 0, moveDown = 0) => {
    const entries = inputData.split('\n');
    const height = entries.length;
    const position = { x: 0, y: 0 };
    let count = 0;
    while (position.y < height) {
        const currentPosition = entries[position.y].charAt(position.x);
        if (currentPosition === '#') {
            count++;
        }
        position.x += moveRight;
        position.y += moveDown;
        if (position.x >= entries[0].length) {
            entries.forEach((entry, index, entries) => {
                entries[index] = entry.concat(entry);
            });
        }
    }
    return count;
};

const treeCount = getTreeCount(3, 1);

console.log(treeCount);

