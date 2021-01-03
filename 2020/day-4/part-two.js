import {
    getValidPassportCount,
    passports,
    validator as hasRequiredFieldsValidation,
    PASSPORT_FIELDS
} from './part-one.js';

const EYE_COLORS = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])

const addValidation = (validations = [], subRoutine) => {
    validations.push(subRoutine);
}

const buildValidator = (validations = []) => {
    return {
        regex: (pattern) => {
            addValidation(validations, (value) => new RegExp(`^${pattern}$`).test(value.trim()));
            return buildValidator(validations);
        },
        gte: (num) => {
            addValidation(validations, (value) => value >= num);
            return buildValidator(validations);
        },
        lte: (num) => {
            addValidation(validations, (value) => value <= num);
            return buildValidator(validations);
        },
        addCustom: (func) => {
            addValidation(validations, func);
            return buildValidator(validations);
        },
        run: (value) => validations.every((validate) => validate(value))
    };
};

const isValidHeight = (height = '') => {
    const measurement = parseFloat(height.substr(0, height.length - 2));
    const measureType = height.substr(-2);
    if (measureType === 'cm') {
        return buildValidator().gte(150).lte(193).run(measurement);
    }
    if (measureType === 'in') {
        return buildValidator().gte(59).lte(76).run(measurement);
    }
    return false;
}

const isValidEyeColor = (color = '') => EYE_COLORS.has(color);

const PASSPORT_FIELD_VALIDATOR = {
    [PASSPORT_FIELDS.byr]: buildValidator().regex('\d{4}').gte(1920).lte(2002),
    [PASSPORT_FIELDS.iyr]: buildValidator().regex('\d{4}').gte(2010).lte(2020),
    [PASSPORT_FIELDS.eyr]: buildValidator().regex('\d{4}').gte(1920).lte(2002),
    [PASSPORT_FIELDS.hgt]: buildValidator().regex('\d+(cm|in){1}').addCustom(isValidHeight),
    [PASSPORT_FIELDS.hgt]: buildValidator().regex('#[0-9a-f]{6}'),
    [PASSPORT_FIELDS.ecl]: buildValidator().addCustom(isValidEyeColor), 
    [PASSPORT_FIELDS.pid]: buildValidator().regex('\d{9}'),
    [PASSPORT_FIELDS.cid]: buildValidator()
};

let count = 0;
const runFieldValidations = (passport) => {
    return Object.keys(PASSPORT_FIELDS).every(field => PASSPORT_FIELD_VALIDATOR[field].run(passport[field]))
};
const validator = (passport) => {
    const isEveryRequiredFieldPresent = hasRequiredFieldsValidation(passport);
    return isEveryRequiredFieldPresent ? runFieldValidations(passport) : false;
}

const validPassports = getValidPassportCount(passports, validator) + 1; // plus your own lol
console.log(count, validPassports);