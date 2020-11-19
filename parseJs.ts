import * as fs from "fs";
import {VueOptions} from './index';
import {promisify} from 'util';
import {vc} from './common/vcCore';
import $ from "jquery";
import { firstUpperCase } from "./readDirs";

const readFile = promisify(fs.readFile);

interface VueTemplate {
    componentName: string;
    template: string;
}

let parseJsCount = 0;
let scriptTemplate = '',
    vueTemplate: VueTemplate[] = [];
let imports = [];

// 页面中常用的js常量
const OWNER_TYPE = {
    OWNER: '1001',
    TENANT: '1003'
};
// 考核类型
const ASSESSMENT_TYPE = {
    BUSINESS: 2,
    COMMON: 1,
    SYSTEM: 3,
};

// 删除时的类型
const DELETE_TYPE = {
    TABLE: 1, // 删除通用考核表
    BUSINESS_ITEM: 2,  // 删除业务考核项
    COMMON_ITEM: 3, // 删除通用考核项
}
// 考核人员
const ASSESSMENT_OBJECT_TYPE = {
    STAFF: 1,
    SUPERVISOR: 2,
    MANAGER: 3,
}

const AUTO_ASSESSMENT_TYPE = {
    INSPECTION: 1,
    WORK_ORDER: 2,
    ATTENDANCE: 3,
}

// 考核项目
const ASSESSMENT_ITEM_TYPE = {
    COMMON_ITEM: 1,
    BUSINESS_ITEM: 2,
}

const DEFAULT_PAGE = 1;
const DEFAULT_ROWS = 10;

function dayjs(...params) {}

const localStorage = {
    setItem(...params) {

    },
    getItem(...params) {
        return JSON.stringify({
            communityId: '',
        })
    }
}


// 用来解析VC内容
let window = {
    location: {
        href: '',
    },
    localStorage,
    vc: {
        ...vc,
        extends(options) {
            let methods = '',
                mounted = '',
                props = {},
                dataObj = {};                
            mounted += anonymousToArrow(`(${replaceVcContent(String(options._initMethod).replace('_initMethod', 'function'))})()`)+'\n';
            mounted += anonymousToArrow(`(${replaceVcContent(String(options._initEvent).replace('_initEvent', 'function'))})()`);
            
            if(options.propTypes) {
                for(const [key, value] of Object.entries(options.propTypes)) {
                    props[key] = replaceVcContent(value);
                }
            }

            if (options.methods) {
                for(const [key, value] of Object.entries(options.methods)) {                
                    if (value.toString().includes(key) && value.toString().indexOf(key) < 10) {
                        methods += replaceVcContent(anonymousToArrow(value.toString()))+','
                    } else {
                        methods += key+':'+replaceVcContent(anonymousToArrow(value.toString()))+','
                    }
                    
                }
            }
            
            for(const [key, value] of Object.entries(options.data)) {
                if(key == 'callBackListener' || value == null) {
                    dataObj[key] = replaceVcContent(value)
                } else {
                    dataObj[key] = JSON.parse(replaceVcContent(JSON.stringify(value)));
                }
            }

            // console.log(options, '传入参数');
            scriptTemplate = jsTemplate(JSON.stringify(dataObj), methods, mounted, JSON.stringify(props));
            // console.log(scriptTemplate, '转变过后');
        }
    }
};

//  解析自定义的Vue组件
class Vue {
    data;

    constructor(options: VueOptions) {
        for(const [functionName, functionHandler] of Object.entries(options.methods)) {
            this[functionName] = functionHandler;
        }
        this.data = options.data;
        Vue.component(firstUpperCase(options.el.replace('#', '')), options);
        return this;
    }


    $on(...params) {

    }

    $emit(...params) {

    }

    static component(tagName: string, options: VueOptions) {
        let {methods, data, mounted, template, props} = options;
        if (tagName.includes('-')) {
            const name = tagName.split('-');
            tagName = '';
            name.forEach(val => {
                tagName += firstUpperCase(val);
            })
        }
        vueTemplate.push({
            componentName: tagName,
            template: `
                <template>
                    ${template}
                </template>
                <script>
                    export default {
                        name: ${tagName},
                        ${props},
                        ${data},
                        ${mounted},
                        ${methods},
                    }
                </script>
            `
        })
    }
}


/**
 * 匿名函数转换箭头函数
 * @param jsStr 
 */
function anonymousToArrow(jsStr: string) {
    const re = new RegExp(/(,|\()\s*(?<!:\s*)function\s*\(\s*.*\)\s*{/, 'g');
    const matchRes = jsStr.match(re);
    if (matchRes) {
        matchRes.forEach(val => {
            jsStr = jsStr.replace(val, val.replace('function', '').replace(')', ') =>'));
        })
    }
    return jsStr;
}


/**
 * 阅读文件并返回js模板
 * @param path 文件路径
 * @param componentImport 导入的组件
 */
async function generateScriptTemplate(path: string, componentImport: string[]) {
    let parseErr: any | null = null;
    const data = await readFile(path, 'utf-8');
    imports = componentImport;
    // console.log(path, '/n/n/n/n==============================================/n/n/n/n')
    // console.log('==============================================');
    // console.log('==============================================');
    // console.log('==============================================');
    // console.log('==============================================');
    // console.log('==============================================');
    // console.log('==============================================');
    // console.log('==============================================');
    // console.log('==============================================');
    
    try {
        eval(data.replace(/\$props\./g, 'vc._this'));
        parseJsCount++;
    }catch(err) {
        parseJsCount--;
        parseErr = {
            err: err,
            // file: data.replace(/\$props\./g, 'vc._this')
        };
    }
    
    // console.log('所有的js转化失败错误信息', parseErr);
    // console.log('解析的js数量', parseJsCount);
    return {
        scriptTemplate,
        parseErr,
        vueTemplate,
    };
}





/**
 * 将vc开头的内容替换掉
 * @param str 
 */
function replaceVcContent(str: any) {
    return String(str).replace(/vc\.this/g, 'this')
        .replace(/vc/g, 'this.$vc')
        .replace(/vc.component.emit/g, 'vc.emit')
        .replace(/vc.component.on/g, 'vc.on')
        .replace(/this.\$vc.component/g,'this');
        
}

/**
 * 生成vue中的js内容
 * @param data data部门
 * @param methods methods部分
 * @param mounted mounted部分
 */
function jsTemplate(data, methods, mounted, props) {
    let importStatement = '';
    imports.forEach(val => {
        importStatement += `import ${val} from '@/component/${val}.vue';`
    })
    return `
            ${importStatement}



            const OWNER_TYPE = {
                OWNER: '1001',
                TENANT: '1003'
            };
            // 考核类型
            const ASSESSMENT_TYPE = {
                BUSINESS: 2,
                COMMON: 1,
                SYSTEM: 3,
            };
            
            // 删除时的类型
            const DELETE_TYPE = {
                TABLE: 1, // 删除通用考核表
                BUSINESS_ITEM: 2,  // 删除业务考核项
                COMMON_ITEM: 3, // 删除通用考核项
            }
            // 考核人员
            const ASSESSMENT_OBJECT_TYPE = {
                STAFF: 1,
                SUPERVISOR: 2,
                MANAGER: 3,
            }
            
            const AUTO_ASSESSMENT_TYPE = {
                INSPECTION: 1,
                WORK_ORDER: 2,
                ATTENDANCE: 3,
            }
            
            // 考核项目
            const ASSESSMENT_ITEM_TYPE = {
                COMMON_ITEM: 1,
                BUSINESS_ITEM: 2,
            }
            
            const DEFAULT_PAGE = 1;
            const DEFAULT_ROWS = 10;

            
            export default {
                props: ${props},
                components: {
                    ${imports}
                },
                data () {
                    return ${data}    
                },
                mounted() {
                ${mounted}   
                },
                methods: {
                    ${methods}
                },
            }
    `
}


export {
    generateScriptTemplate
}