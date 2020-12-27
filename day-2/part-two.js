import { entries, parseData } from './part-one.js';

const isValidPassword = ({ positionOne = 0, positionTwo = 0, letter = '', password = '' }) => {
    return (
        password.charAt(positionOne - 1) === letter && password.charAt(positionTwo - 1) !== letter
        ) || (
        password.charAt(positionOne - 1) !== letter && password.charAt(positionTwo - 1) === letter
        );
}

const validPasswords = entries.reduce((count, entry) => {
    const { min: positionOne, max: positionTwo, letter, password } = parseData(entry);
    return isValidPassword({ positionOne, positionTwo, letter, password }) ? count + 1 : count;
}, 0);

console.log(validPasswords)