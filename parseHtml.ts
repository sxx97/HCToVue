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
    const re = new RegExp(/<vc\:create (.*?)>(.*?)<\/vc\:create>/, 'g');
    const propertyRe = new RegExp(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/, 'g');
    const vc = htmlStr.match(re);
    if (vc) {
        vc.forEach(tag => {
            let property = {};
            tag.match(propertyRe).forEach(val => {
                const valMap = val.split('=');
                property[valMap[0]] = valMap[1];
            })
            vcTag.push(property);
        })
    }
    return vcTag;
}


/**
 * 替换html中的vc标签
 * @param htmlStr 
 * @param vcTag 
 */
function replaceVcTag(htmlStr: string, vcTag: any[]): string {
    vcTag.forEach(val => {
        const componentName = firstUpperCase(val.name.replace(/"/g, ''));
        let tag = `<${componentName}`;
        for (const [name, value] of Object.entries(val)) {
             tag += ` ${name}="${value.toString().replace(/"/g, '')}"`;
        }
        tag += `></${componentName}>`;
        const re = new RegExp('<vc\:create name="' + val.name.replace(/"/g, '') + '"(.*?)>(.*?)<\/vc\:create>', 'g');
        htmlStr = htmlStr.replace(re, tag);
        console.log(tag, '+++++++++++');
    })
    return htmlStr;
}

export {
    generateHtmlTemplate,
}