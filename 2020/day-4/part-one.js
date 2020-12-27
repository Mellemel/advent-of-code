import { getInputData } from '../../lib.js';

const inputData = await getInputData(import.meta.url);

const requiredFields = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'])

const parseRow = (row = '') => {
    return row
        .split(' ')
        .map(val => val.split(':'))
        .reduce((aggregate, value) => ({
            ...aggregate,
            [value[0]]: value[1]
        }), {})
}

const parseInput = () => {
    let currentPassport = {};
    return inputData.split('\n').reduce((newArr, currentVal) => {
        if (currentVal.trim() === '') {
            newArr.push(currentPassport);
            currentPassport = {};
        } else {
            currentPassport = {
                ...currentPassport,
                ...parseRow(currentVal.trim())
            };
        }
        return newArr;
    }, []);
}

const validatePassports = (passports = []) => {
    return passports.reduce((count, passport) => {
        const passportFields = new Set(Object.keys(passport));
        const a_difference_b = new Set([...requiredFields].filter(field => !passportFields.has(field)))
        if (a_difference_b.size === 0) {
            count++;
        }
        return count;
    }, 0);
}

const passports = parseInput();
const validPassports = validatePassports(passports) + 1; // plus your own lol
console.log(validPassports);