import { getInputData } from '../../lib.js';

const inputData = await getInputData(import.meta.url);

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

export const PASSPORT_FIELDS = Object.freeze({
    byr: 'byr',
    iyr: 'iyr',
    eyr: 'eyr',
    hgt: 'hgt',
    hcl: 'hcl',
    ecl: 'ecl',
    pid: 'pid',
    cid: 'cid'
});

const REQUIRED_FIELDS = Object.keys(PASSPORT_FIELDS).filter(field => field !== 'cid');

export const validator = (passport) => {
    const passportFields = new Set(Object.keys(passport))
    const hasRequiredFields = new Set(REQUIRED_FIELDS.filter(field => !passportFields.has(field))).size === 0;
    return hasRequiredFields;
};

export const getValidPassportCount = (passports = [], runPassportValidation = () => { }) => {
    return passports.reduce((count, passport) => {
        const isValidPassport = runPassportValidation(passport);
        if (isValidPassport) {
            count++;
        }
        return count;
    }, 0);
}

export const passports = parseInput();

const validPassports = getValidPassportCount(passports, validator) + 1; // plus your own lol
console.log(validPassports);