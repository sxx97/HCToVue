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
        mainRouters = [],
        importComponents = [],
        importComponentsUrl = [];
    for (const [key, val] of Object.entries(routes)) {
        const {routeName, viewComponent} = val;
        try {
            if (['login', 'register'].includes(routeName)) {
                routers.push(
                `{
                    path: basePath + '/${routeName}',
                    name: "${routeName}",
                    component: ${viewComponent},
                }\n\t\t\t\t`);
            } else {
                mainRouters.push(
                `{
                    path: '${routeName}',
                    name: "${routeName}",
                    component: ${viewComponent},
                }\n\t\t\t\t`)
            }
            
            if (!importComponents.includes(viewComponent)) {
                importComponents.push(viewComponent);
                importComponentsUrl.push(`import ${viewComponent} from '@/views/${viewComponent}.vue'`);
            }
        } catch(err) {
            throw err;
        }
    }

    if (mainRouters.length > 0) {
        routers.push(`{
            path: basePath,
            component: MainPage,
            children: [
                ${mainRouters}
            ]
        }`)
    }


    const routeFile = `
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import MainPage from '@/views/MainPage.vue';
    ${importComponentsUrl.join(';\n\t')}


    Vue.use(VueRouter);

    const basePath = '/flow';

    const routes = [
        ${routers}
    ]

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