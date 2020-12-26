// import fetch from 'node-fetch';

// const baseUrl = 'https://adventofcode.com'

// const getInput = async (day) => {
//     const url = [baseUrl, '2020', 'day', day, 'input'].join('/');
//     const response = await fetch(url);
//     console.log(response);
// };

// const login = async () => {
//     const url = [baseUrl, 'auth', 'github'].join('/');
//     const response = await fetch(url);
//     console.log(await response.text())
//     console.log(response.headers)
// };
import fs from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const { url } = import.meta;
export const getInputData = async (filePath) => {
    const __dirname = dirname(fileURLToPath(filePath));
    return fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf-8');
} 
