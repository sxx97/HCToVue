import * as fs from "fs";
import {promisify} from 'util';
import { firstUpperCase } from "./readDirs";


const readFile = promisify(fs.readFile);


let parseHtmlCount = 0;

async function generateHtmlTemplate(path: string) {
    const data = await readFile(path, 'utf-8');
    parseHtmlCount++;
    const vcTag = parseVcTag(data);
    // console.log('解析的html数量', parseHtmlCount, data);
    return {
        template: replaceVcTag(data, vcTag),
        components: vcTag,
    };
}

/**
 * 解析vc标签
 * @param htmlStr 
 */
function parseVcTag(htmlStr: string): any[] {
    let vcTag  = [];
    
    const re = new RegExp(/(?<!\<!--\s*)<vc\:create\s+.*?(\s+.*?)*>(\s*.*?)<\/vc\:create>/, 'g');
    const propertyRe = new RegExp(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/, 'g');
    const vc = htmlStr.match(re);
    if (vc) {
        vc.forEach(tag => {
            let property: any = {};
            tag.match(propertyRe).forEach(val => {
                const valMap = val.split('=');
                property[valMap[0]] = valMap[1];
                if(valMap[0] == 'name') {
                    property.componentName = parseComponentName(valMap[1]);
                }
            })
            
            vcTag.push(property);
        })
    }
    return vcTag;
}


/**
 * 解析组件名
 * @param name 
 */
function parseComponentName(name: string): string {
    let componentName = name.replace(/"/g, '');
    if (name.includes('-')) {
        const nameArr = name.split('-');
        componentName = firstUpperCase(nameArr[0].replace(/"/g, '')) + firstUpperCase(nameArr[1].replace(/"/g, ''));
    }
    return firstUpperCase(componentName);
}


/**
 * 替换html中的vc标签
 * @param htmlStr 
 * @param vcTag 
 */
function replaceVcTag(htmlStr: string, vcTag: any[]): string {
    let replaceHtmlRes = htmlStr;
    for (const val of vcTag) {
        const componentName = val.componentName;
        let tag = `<${componentName}`;
        for (const [key, value] of Object.entries(val)) {
             tag += ` ${key}="${value.toString().replace(/"/g, '')}"`;
        }
        tag += `></${componentName}>`;
        
        // const re = new RegExp('(?<!\<!--\s*)<vc\:create\s*name="viewServiceInfo"(\s+.*?)*>(\s*.*?)<\/vc\:create>', 'g');  
        // replaceHtmlRes += replaceHtmlRes.replace(re, tag)+'\n'+tag+'\n'+JSON.stringify(val);
        // htmlStr = replaceHtmlRes;  
        htmlStr = htmlStr.replace(/(?<!\<!--\s*)<vc\:create\s+.*?(\s+.*?)*>(\s*.*?)<\/vc\:create>/, tag);
    }
    // vcTag.forEach(val => {
          
    // })

    return htmlStr;
}

export {
    generateHtmlTemplate,
    parseComponentName,
}