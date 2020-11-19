
        <template>
            <div component="login">
    <h3>寰佑物管系统</h3>
    <p style="color: red;">{{loginInfo.errorInfo}}</p>
    <div class="login-component" role="form">
        <div class="form-group">
            <input type="text" v-model="loginInfo.username" class="form-control" placeholder="用户名" required="" @keyup.enter="doLogin"/>
        </div>
        <div class="form-group">
            <input type="password" v-model="loginInfo.passwd" class="form-control" placeholder="密码" required="" @keyup.enter="doLogin"/>
        </div>
        <vc:create name="validate-code"></vc:create>
        <div class="row">
            <div class="col-6">
                <button type="submit" v-on:click="doLogin()"
                    class="btn  btn-block btn-login">登录</button>
            </div>
            <div class="col-6">
                <a class="btn btn-sign-up btn-block" href="/flow/register">请注册</a>
            </div>
        </div>


<!--        <a href="#"><small>忘记密码?</small></a>-->
<!--        <p class="text-muted text-center"><small>Do not have an account?</small></p>-->

    </div>

    <vc:create name="initData"></vc:create>

</div>
        </template>
        <script>
            
            import Validate-code from '@/component/Validate-code.vue';import InitData from '@/component/InitData.vue';



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
                props: {},
                components: {
                    Validate-code,InitData
                },
                data () {
                    return {"loginInfo":{"logo":"","username":"","passwd":"","validateCode":"","errorInfo":""}}    
                },
                mounted() {
                ( () => {
            this.clearCacheData();
            this._loadSysInfo();
        })()
( () => {
            this.$on('errorInfoEvent',  (_errorInfo) => {
                this.loginInfo.errorInfo = _errorInfo;
                console.log('errorInfoEvent 事件被监听', _errorInfo)
            });

            this.$on('validate_code_component_param_change_event',  (params) => {
                for (var tmpAttr in params) {
                    this.loginInfo[tmpAttr] = params[tmpAttr];
                }
                console.log('errorInfoEvent 事件被监听', params)
            });
            this.$vc.on('login', 'doLogin',  () => {
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
                     (json, res) => {
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
                     (errInfo, error) => {
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
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            this.$vc.emit('initData', 'loadCommunityInfo',{
                                url: '/flow/index'
                            });
                            return ;
                        }
                        this.loginInfo.errorInfo = json;
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.loginInfo.errorInfo = errInfo;
                    });

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    