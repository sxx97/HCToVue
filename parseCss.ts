import * as fs from "fs";
import {promisify} from 'util';

const readFile = promisify(fs.readFile);

let parseCssCount = 0;

async function generateCssTemplate(path: string) {
    const data = await readFile(path, 'utf-8');
    parseCssCount++;
    // console.log('解析的css数量', parseCssCount, data);
    return data;
}

export {
    generateCssTemplate,
}