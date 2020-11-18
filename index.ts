
import {readDirs} from './readDirs'
const filePath = '/home/sxx97/code/workCode/HC/hc-web/resources/';


enum FileSuffix {
    HTML = '.html',
    CSS = '.css',
    JS = '.js'
}

interface VueOptions {
    el?: string;
    props: any;
    data: Function;
    methods: any,
    template: string;
    mounted?: Function;
}



readDirs(filePath + 'components');









export {
    VueOptions,
    FileSuffix,
}
