import * as fs from 'fs';
import {promisify} from 'util';
import * as path from 'path';
import {FileSuffix} from './index';
import {generateScriptTemplate} from './parseJs'
import {generateCssTemplate} from './parseCss'
import {generateHtmlTemplate, parseComponentName} from './parseHtml'
import { createVue } from './createVue';

interface RouteView {
    routeName: string;
    viewComponent: string;
}

const readDir = promisify(fs.readdir);
const fsStats = promisify(fs.stat);


let dirCount = 0,
    vueCount = 0,
    errCount = 0,
    parseErr: any = {};

/**
 * 读取组件文件夹
 * @param path 
 * @param routeView 
 */
async function readComponentDirs(path: string, pageComponents: string[]) {
    let dirs = await readDir(path);
    
    let files = dirs.filter(async val => {
        const dirInfo = await fsStats(path+'/'+val);    
        return dirInfo.isFile();
    })
    await readFiles(path, files, pageComponents);

    dirs.forEach(async val => {
        const dirInfo = await fsStats(path+'/'+val);
        if(dirInfo.isDirectory()) {
            dirCount++;
            // console.log('处理目录', dirCount, val);
            readComponentDirs(path + '/' + val, pageComponents);
        }
    })
}



/**
 * 阅读文件
 * @param path 文件路径
 * @param files 文件名称数组
 * @param pageComponents
 */
async function readFiles(filePath: string, files: string[], pageComponents: string[]) {
    let fileCount = 0,
        fileName = '';
    let htmlTemplate = '',
        cssTemplate = '',
        jsTemplate = '',
        componentImport = [];  // 依赖的vue组件导入语句
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
                                // const componentName = .replace(/"/g, '');
                                componentImport.push(val.componentName);
                            })
                        });
                } catch(err) {
                    parseErr[filePath].html = err; 
                }
                break;
            case FileSuffix.JS:
                try {
                    await generateScriptTemplate(currentFile, componentImport).then(res => {
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
    console.log(errCount, '解析的报错信息========', parseErr);
    // console.log('生成的vue文件数量', vueCount);
    if (pageComponents.includes(firstUpperCase(fileName))) {
        createVue(mergeFile(htmlTemplate, jsTemplate, cssTemplate), parseComponentName(fileName), 'views');
    } else {
        createVue(mergeFile(htmlTemplate, jsTemplate, cssTemplate), parseComponentName(fileName));
    }
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
    <div>
        ${template}
    </div>
</template>
<script>
    ${script}
</script>
<style>
    ${style}
</style>
    `
}




async function readPageComponent(dirPath: string): Promise<Array<RouteView>> {
    let dirs = await readDir(dirPath);
    let pageComponent: RouteView[] = [];

    let files = dirs.filter(async val => {
        const dirInfo = await fsStats(dirPath+'/'+val);    
        return dirInfo.isFile();
    })
    for(let file of files) {
        const fileName = path.basename(file, '.html');
        let fileNameFirst = fileName.length -1;
        await generateHtmlTemplate(dirPath + '/' + file).then(res => {        
            for (const val of Object.values(res.components)) {
                const componentName = val.name.replace(/"/g, '');                    
                let componentFirst = componentName.length -1;
                if (firstUpperCase(fileName).match(/[A-Z]/g) && firstUpperCase(fileName).match(/[A-Z]/g).length >= 2) {
                    fileNameFirst = fileName.indexOf(firstUpperCase(fileName).match(/[A-Z]/g)[1]);
                }

                if (firstUpperCase(componentName).match(/[A-Z]/g) && firstUpperCase(componentName).match(/[A-Z]/g).length >= 2) {
                    componentFirst = componentName.indexOf(firstUpperCase(componentName).match(/[A-Z]/g)[1]);
                }

                if (componentName.slice(0, componentFirst).toUpperCase() === fileName.slice(0, componentFirst).toUpperCase()) {
                    pageComponent.push({
                        routeName: fileName,
                        viewComponent: firstUpperCase(componentName),
                    });
                }
            };
        });
    }
    // console.log(pageComponent, '页面组件', pageComponent.length, files.length);

    return pageComponent;
}


export {
    readComponentDirs,
    firstUpperCase,
    readPageComponent,
    RouteView,
}
