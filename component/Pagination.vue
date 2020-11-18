
        <template>
            <nav aria-label="Page navigation example" >
    <ul class="pagination justify-content-end">
        <template v-if="paginationInfo.isShowPageSelector">
            <li class="page-item" v-bind:class="{disabled:paginationInfo.currentPage == 1}">
                <a class="page-link" v-on:click="current(1)"> « </a>
            </li>
        </template>
        <li class="page-item" v-bind:class="{disabled:paginationInfo.currentPage == 1}">
            <a class="page-link" v-on:click="previous()"> ‹ </a>
        </li>
        <template v-if="paginationInfo.isShowPageSelector">
            <li class="page-item" v-for="pageInfo in paginationInfo.pageList" v-bind:class="{active:pageInfo.currentPage}">
                <a class="page-link" v-on:click="current(pageInfo.page)">{{pageInfo.pageView}}</a>
            </li>
        </template>
        <li class="page-item" v-bind:class="{disabled: paginationInfo.total > 0 && paginationInfo.currentPage == paginationInfo.total}">
            <a class="page-link" v-on:click="next()"> › </a>
        </li>
        <template v-if="paginationInfo.isShowPageSelector">
            <li class="page-item" v-bind:class="{disabled:paginationInfo.currentPage == paginationInfo.total}">
                <a class="page-link" v-on:click="current(paginationInfo.total)"> » </a>
            </li>
            <span class="total" style="line-height: 30px;margin-left: 10px;" v-if="paginationInfo.dataCount != 0">共 {{paginationInfo.dataCount}} 条</span>
        </template>
    </ul>
</nav>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"registerInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //this.validate();
            this._initSysInfo();
        })()(function(){
             this.$on('errorInfoEvent',function(_errorInfo){
                    this.registerInfo.errorInfo = _errorInfo;
                    console.log('errorInfoEvent 事件被监听',_errorInfo)
                });

             this.$on('validate_tel_change_event',function(params){
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
                    function (json, res) {
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
                    function (errInfo, error) {
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
                             function(json,res){
                                //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                                if(res.status == 200){
                                    this.$vc.jumpToPage("/flow/login");
                                    return ;
                                }
                                this.registerInfo.errorInfo = json;
                             },
                             function(errInfo,error){
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
    