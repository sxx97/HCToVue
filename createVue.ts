import * as fs from "fs";
import {promisify} from 'util';
import { RouteView } from "./readDirs";

const writeFile = promisify(fs.writeFile);


const createPath = '/home/sxx97/code/workCode/HC/huanyou-client/src'

async function createVue(data: string, fileName: string, dirName: string = 'components') {
    await writeFile(createPath +'/' + dirName + '/' + fileName + '.vue', data);
}

async function createRoute(routes: RouteView[]) {
    let routers = [],
        importComponents = [],
        importComponentsUrl = [];
    for (const [key, val] of Object.entries(routes)) {
        const {routeName, viewComponent} = val;
        try {
            routers.push(`
                {
                    path: basePath + '/' + '${routeName}',
                    name: "${routeName}",
                    component: ${viewComponent},
                }
            `)
            if (!importComponents.includes(viewComponent)) {
                importComponents.push(viewComponent);
                importComponentsUrl.push(`import ${viewComponent} from '@/views/${viewComponent}.vue'`);
            }
        } catch(err) {
            throw err;
        }
    }


    const routeFile = `
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    ${importComponentsUrl.join(';\n\t')}


    Vue.use(VueRouter);

    const basePath = '/flow';

    const routes = [${routers.toString()}]

    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
        
    export default router
    
    `
    await writeFile(createPath+'/router/index.js', routeFile);

}

export {
    createVue,
    createRoute,
}