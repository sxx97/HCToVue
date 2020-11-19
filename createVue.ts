import * as fs from "fs";
import {promisify} from 'util';
import { RouteView } from "./readDirs";

const writeFile = promisify(fs.writeFile);


async function createVue(data: string, fileName: string, dirName: string = 'component') {
    await writeFile(__dirname +'/' + dirName + '/' + fileName + '.vue', data);
}

async function createRoute(routes: RouteView[]) {
    const basePath = '/flow';
    let routers = [],
        importComponents = [];
    for (const [key, val] of Object.entries(routes)) {
        const {routeName, viewComponent} = val;
        routers.push({
            path: basePath + '/' + routeName,
            name: 'Login',
            component: viewComponent,
        })
        importComponents.push(`import ${viewComponent} from '@views/${viewComponent}.vue'`);
    }


    const routeFile = `
        import Vue from 'vue'
        import VueRouter from 'vue-router'
        ${importComponents.join(';')}


        Vue.use(VueRouter);

        const basePath = '/flow';

        const routes = ${JSON.stringify(routers)}

        const router = new VueRouter({
            mode: 'history',
            base: process.env.BASE_URL,
            routes
        })
          
        export default router
    
    `
    await writeFile(__dirname+'/router/index.js', routeFile);

}

export {
    createVue,
    createRoute,
}