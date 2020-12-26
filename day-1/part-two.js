import { getInputData }  from '../lib.js';

const inputData = await getInputData(import.meta.url);
const entries = inputData.split('\n').map(parseFloat);

const addends = {};

for (let x = 0; x < entries.length; x++) {
    const difference = 2020 - entries[x];
    for (let y = x + 1; y < entries.length; y++) {
        const entry = entries[y];
        if (addends[entry]){
            console.log(entries[x], entry, addends[entry]);
            console.log(entries[x] * entry * addends[entry]);
            x = y = entries.length;
        }
        addends[difference - entry] = entry;
    }
}