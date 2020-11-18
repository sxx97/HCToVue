import * as fs from "fs";
import {promisify} from 'util';

const writeFile = promisify(fs.writeFile);


async function createVue(data: string, fileName: string) {
    await writeFile(__dirname+'/component/'+ fileName + '.vue', data);
}

export {
    createVue,
}