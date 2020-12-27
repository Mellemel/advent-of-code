import { getInputData } from '../../lib.js';

const inputData = await getInputData(import.meta.url);
export const entries = inputData.split('\n');

const parseRule = (string = '') => {
    const [boundaries, letter] = string.split(' ');
    const [min, max] = boundaries.split('-').map(parseFloat);
    return { min, max, letter };
};

export const parseData = (string = '') => {
    const [rule, password] = string.split(':');
    return {
        password: password.trim(),
        ...parseRule(rule)
    };
};

const isValidPassword = ({ min = 0, max = 1, letter = '', password = ''}) => {
    const count = password.split('').reduce((currentCount, currentLetter) => {
        return currentLetter === letter ? currentCount + 1 : currentCount;
    }, 0);
    return count >= min && count <= max;
};

const validPasswords = entries.reduce((count, entry) => {
    const { min, max, letter, password } = parseData(entry);
    return isValidPassword({ min, max, letter, password }) ? count + 1 : count;
}, 0);

console.log(validPasswords);