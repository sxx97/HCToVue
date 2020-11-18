
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
        <Validate-code name="validate-code"></Validate-code>
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

    <InitData name="initData"></InitData>

</div>
        </template>
        <script>
            import Validate-code from './Validate-code.vue';import InitData from './InitData.vue';
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
    