
        <template>
            <nav class="navbar-default navbar-static-side" role="navigation" id="menu-nav">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header" v-on:click="_gotoIndex()">
                <div class="dropdown profile-element">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="/">
                        <span class="block m-t-xs font-bold">寰佑物管系统</span>
                    </a>
                </div>
                <div class="logo-element">
                    寰佑
                </div>
            </li>

            <li v-for="(menu, index)  in menus" v-bind:class="{ active: menu.active }"  :key="menu.id">
                <a v-if="menu.childs != undefined && menu.childs.length >0" href="#" v-on:click="switchMenu(menu.id)">
                    <i class="fa " v-bind:class="menu.icon"></i>
                    <span class="nav-label" style="position:relative;">
                        {{menu.name}}
                        <span v-if="menu.tips" :style="badgeCircle"></span>
                    </span>
                    <span v-if="menu.label != undefined && menu.label != ''" class="float-right label label-primary">{{menu.label}}</span>
                    <span v-if="menu.label == undefined || menu.label == ''" class="fa arrow"></span>
                </a>
                <ul v-if="menu.childs != undefined && menu.childs.length >0" class="nav nav-second-level collapse" v-bind:class="{in: menu.active}">
                    <li v-for="(subMenu, subIndex)  in menu.childs" v-if="subMenu.isShow == 'Y'">
                        <a @click="navigationListener(menu, subMenu, index, subIndex)">
                            <span style="position:relative;">
                                {{subMenu.name}}
                                <span v-if="subMenu.tips" :style="badgeCircle"></span>
                            </span>
                        </a>

                    </li>
                </ul>
                <a v-if="menu.childs == undefined || menu.childs.length ==0" v-bind:href="menu.href">
                    <i class="fa " v-bind:class="menu.icon"></i>
                    <span class="nav-label">{{menu.name}}</span>
                </a>
            </li>
        </ul>

    </div>
</nav>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"loginInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this.clearCacheData();
            this._loadSysInfo();
        })()(function () {
            this.$on('errorInfoEvent', function (_errorInfo) {
                this.loginInfo.errorInfo = _errorInfo;
                console.log('errorInfoEvent 事件被监听', _errorInfo)
            });

            this.$on('validate_code_component_param_change_event', function (params) {
                for (var tmpAttr in params) {
                    this.loginInfo[tmpAttr] = params[tmpAttr];
                }
                console.log('errorInfoEvent 事件被监听', params)
            });
            this.$vc.on('login', 'doLogin', function () {
                this.doLogin();
            })
        })()   
            },
            methods: {
                clearCacheData:function () {
                this.$vc.clearCacheData();
            },_loadSysInfo:function () {
                var param = {
                    params: {
                        sys: 'HC'
                    }
                }
                this.$vc.http.get(
                    'login',
                    'getSysInfo',
                    param,
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status != 200) {
                            console.log("加载系统信息失败");
                            this.$vc.saveData("_sysInfo", {logo: 'HC'});
                            this.$vc.copyObject(json, this.loginInfo);
                            return;
                        }
                        this.$vc.copyObject(JSON.parse(json), this.loginInfo);
                        //保存到浏览器
                        this.$vc.saveData("_sysInfo", JSON.parse(json));
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.saveData("_sysInfo", {logo: 'HC'});
                        this.$vc.copyObject(json, this.loginInfo);
                        this.loginInfo.errorInfo = errInfo;
                    });
            },doLogin:function () {
                if (!this.$vc.notNull(this.loginInfo.username)) {
                    this.$vc.toast('用户名不能为空');
                    return;
                }
                if (!this.$vc.notNull(this.loginInfo.passwd)) {
                    this.$vc.toast('密码不能为空');
                    return;
                }
                if (!this.$vc.notNull(this.loginInfo.validateCode)) {
                    this.$vc.toast('验证码不能为空');
                    return;
                }
                this.$vc.http.post(
                    'login',
                    'doLogin',
                    JSON.stringify(this.loginInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            this.$vc.emit('initData', 'loadCommunityInfo',{
                                url: '/flow/index'
                            });
                            return ;
                        }
                        this.loginInfo.errorInfo = json;
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.loginInfo.errorInfo = errInfo;
                    });

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    