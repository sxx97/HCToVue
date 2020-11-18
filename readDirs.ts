import * as fs from 'fs';
import {promisify} from 'util';
import * as path from 'path';
import {FileSuffix} from './index';
import {generateScriptTemplate} from './parseJs'
import {generateCssTemplate} from './parseCss'
import {generateHtmlTemplate} from './parseHtml'
import { createVue } from './createVue';


const readDir = promisify(fs.readdir);
const fsStats = promisify(fs.stat);


let dirCount = 0,
    vueCount = 0,
    errCount = 0,
    parseErr: any = {};

async function readDirs(path: string) {
    let dirs = await readDir(path);
    
    let files = dirs.filter(async val => {
        const dirInfo = await fsStats(path+'/'+val);    
        return dirInfo.isFile();
    })
    await readFiles(path, files);

    dirs.forEach(async val => {
        const dirInfo = await fsStats(path+'/'+val);
        if(dirInfo.isDirectory()) {
            dirCount++;
            console.log('处理目录', dirCount, val);
            readDirs(path + '/' + val);
        }
    })
}



/**
 * 阅读文件
 * @param path 文件路径
 * @param files 文件名称数组
 */
async function readFiles(filePath: string, files: string[]) {
    let fileCount = 0,
        fileName = '';
    let htmlTemplate = '',
        cssTemplate = '',
        jsTemplate = '',
        componentImport = '';  // 依赖的vue组件导入语句
    errCount++;
    for(let i=0; i< files.length; i++) {
        const val = files[i];
        fileCount++;
        const currentFile = filePath+'/'+val;
        parseErr[filePath] = {
            js: null,
            css: null,
            html: null,
        }
        
        switch(path.extname(val)) {
            case FileSuffix.HTML:
                fileName = path.basename(val, FileSuffix.HTML);
                try {
                    await generateHtmlTemplate(currentFile)
                        .then(res => {
                            htmlTemplate = res.template;
                            res.components.forEach(val => {
                                const componentName = firstUpperCase(val.name.replace(/"/g, ''));
                                componentImport += `import ${componentName} from './${componentName}.vue';`;
                            })
                        });
                } catch(err) {
                    parseErr[filePath].html = err; 
                }
                break;
            case FileSuffix.JS:
                try {
                    await generateScriptTemplate(currentFile).then(res => {
                        parseErr[filePath].js = res.parseErr;            
                        jsTemplate = res.scriptTemplate;
                        if(res.vueTemplate.length > 0) {
                            res.vueTemplate.forEach(val => {
                                vueCount++;
                                if (res.scriptTemplate === '') {
                                    vueCount--;
                                }
                                createVue(val.template, val.componentName);
                            })
                        }
                    });
                } catch(err) {
                    
                }
                break;
            case FileSuffix.CSS:
                try {
                    await generateCssTemplate(currentFile).then(res => cssTemplate = res);
                } catch(err) {
                    parseErr[filePath].css = err; 
                }
                break;
        }
    }
    
    const notErr =  Object.values(parseErr[filePath]).every(val => {
        return val == null;
    })
    if (notErr) {
        errCount--;
        vueCount++;
        delete parseErr[filePath];
    }
    // console.log(errCount, '解析的报错信息========', parseErr);
    // console.log('生成的vue文件数量', vueCount);
    createVue(mergeFile(htmlTemplate, componentImport + jsTemplate, cssTemplate), firstUpperCase(fileName));
}

/**
 * 首字母大写
 * @param str 
 */
function firstUpperCase(str: string) {
    return str.replace(/^\S/, s => s.toUpperCase());
}


/**
 * 合并html，css，js
 * @param template 
 * @param script 
 * @param style 
 */
function mergeFile(template: string, script: string, style: string) {
    return `
        <template>
            ${template}
        </template>
        <script>
            ${script}
        </script>
        <style>
            ${style}
        </style>
    `
}




async function readPageComponent(path: string) {
    let dirs = await readDir(path);
    let pageComponent = [];
    let files = dirs.filter(async val => {
        const dirInfo = await fsStats(path+'/'+val);    
        return dirInfo.isFile();
    })
    for(let file of files) {
        await generateHtmlTemplate(path + '/' + file).then(res => {
            pageComponent.push(res.components);
        });
    }
}


export {
    readDirs,
    firstUpperCase,
}
