import { getInputData }  from '../lib.js';

const inputData = await getInputData(import.meta.url);
const entries = inputData.split('\n').map(parseFloat);

const addends = {};

entries.some(entry => {
    if (addends[entry]){
        console.log(addends[entry], entry);
        console.log(addends[entry] * entry);
        return true;
    }
    addends[2020 - entry] = entry;
    return false;
})