
        <template>
            <div component="login">
    <h3>请注册</h3>
    <p style="color: #0e9aef;">{{registerInfo.validateInfo}}</p>
    <p style="color: red;">{{registerInfo.errorInfo}}</p>
    <div class="m-t" role="form">
        <div class="form-group">
            <input type="text" v-model="registerInfo.username" class="form-control" placeholder="用户名" required="" @focus="test('username')" />
        </div>
        <div class="form-group">
            <input type="password" v-model="registerInfo.passwd" class="form-control" placeholder="密码" required="" @focus="test('passwd')" />
        </div>
        <div class="form-group">
            <input  name="repasswd" v-model="registerInfo.repasswd" type="password" class="form-control" placeholder="确认密码" required="" @focus="test('passwd')" />
        </div>
        <vc:create name="validate-tel"></vc:create>
        <button type="submit" v-on:click="doRegister()" class="btn btn-primary block full-width m-b">注册</button>

        <p class="text-muted text-center"><small>已有账户?</small></p>
        <a class="btn btn-sm btn-white btn-block" href="/flow/login">登录</a>
    </div>

</div>
        </template>
        <script>
            
            import Validate-tel from '@/component/Validate-tel.vue';



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
                    Validate-tel
                },
                data () {
                    return {"registerInfo":{"username":"","passwd":"","repasswd":"","errorInfo":"","validateInfo":"","logo":""}}    
                },
                mounted() {
                (() =>{
            //this.validate();
            this._initSysInfo();
        })()
(() =>{
             this.$on('errorInfoEvent',(_errorInfo) =>{
                    this.registerInfo.errorInfo = _errorInfo;
                    console.log('errorInfoEvent 事件被监听',_errorInfo)
                });

             this.$on('validate_tel_change_event',(params) =>{
                         for(var tmpAttr in params){
                             this.registerInfo[tmpAttr] = params[tmpAttr];
                         }
                         console.log('validate_tel_component_param_change_event 事件被监听',params)
                     });
        })()   
                },
                methods: {
                    _initSysInfo:function () {
                var sysInfo = this.$vc.getData("_sysInfo");
                if (sysInfo == null) {
                    //this.logo = "HC";
                    this._loadSysInfo();
                    return;
                }
                this.logo = sysInfo.logo;
            },_loadSysInfo:function () {
                var param = {
                    params: {
                        sys: 'HC'
                    }
                }
                this.$vc.http.get(
                    'register',
                    'getSysInfo',
                    param,
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status != 200) {
                            console.log("加载系统信息失败");
                            this.$vc.saveData("_sysInfo", {logo: 'HC'});
                            this.$vc.copyObject(json, this.registerInfo);
                            return;
                        }
                        this.$vc.copyObject(JSON.parse(json), this.registerInfo);
                        //保存到浏览器
                        this.$vc.saveData("_sysInfo", JSON.parse(json));
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');
                        this.$vc.saveData("_sysInfo", {logo: 'HC'});
                        this.$vc.copyObject(json, this.registerInfo);
                        this.loginInfo.errorInfo = errInfo;
                    });
            },validate:function(){
                return this.$vc.validate.validate({
                    registerInfo:this.registerInfo
                },{
                    'registerInfo.username':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"用户名不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"4,12",
                            errInfo:"用户名长度必须在4位至6位"
                        },
                    ],
                    'registerInfo.passwd':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"密码不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"6,12",
                            errInfo:"密码长度必须在6位至12位"
                        },
                    ],
                    'registerInfo.tel':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"手机号不能为空"
                        },
                        {
                            limit:"phone",
                            param:"",
                            errInfo:"不是有效的手机号"
                        }
                    ],
                    'registerInfo.messageCode':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"验证码不能为空"
                        },
                        {
                            limit:"num",
                            param:"",
                            errInfo:"验证码必须是数字"
                        }
                    ],

                });
            },doRegister:function(){

                if(!this.validate()){
                    this.registerInfo.errorInfo = this.$vc.validate.errInfo;
                    return ;
                }
                this.$vc.http.post(
                            'register',
                            'doRegister',
                            JSON.stringify(this.registerInfo),
                            {
                                emulateJSON:true
                             },
                             (json,res) =>{
                                //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                                if(res.status == 200){
                                    this.$vc.jumpToPage("/flow/login");
                                    return ;
                                }
                                this.registerInfo.errorInfo = json;
                             },
                             (errInfo,error) =>{
                                console.log('请求失败处理');

                                this.registerInfo.errorInfo = errInfo;
                             });

            },test:function(val){
                if('username' == val){
                    this.$vc.messageTips("*用户名长度必须在4位至6位");

                }else if('passwd' == val){
                    this.$vc.messageTips("*密码长度必须在6位至12位");

                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    