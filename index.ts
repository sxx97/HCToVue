
import { createRoute } from './createVue';
import {readComponentDirs, readPageComponent} from './readDirs'
const filePath = '';


enum FileSuffix {
    HTML = '.html',
    CSS = '.css',
    JS = '.js'
}

interface VueOptions {
    el?: string;
    props?: any;
    watch?: any;
    filter?: any;
    computed?: any;
    data: Function;
    methods: any;
    template?: string;
    mounted?: Function;
}


async function init() {
    const routeView = await readPageComponent(filePath + 'views');
    let pageComponent = [];
    await createRoute(routeView);

    for (const [key, val] of Object.entries(routeView)) {
        const {viewComponent} = val;
        pageComponent.push(viewComponent);
    }
    await readComponentDirs(filePath + 'components', pageComponent);
}

init();


export {
    VueOptions,
    FileSuffix,
}
