import fs from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getInputData = async (filePath) => {
    const __dirname = dirname(fileURLToPath(filePath));
    return fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf-8');
} 
