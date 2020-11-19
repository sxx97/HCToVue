
        <template>
            <div class="form-group row" component="validate-code">
    <div class="col-sm-8 ">
        <input type="text" class="form-control" v-model="validateCode" placeholder="请输入验证码" required="" @keyup.enter="enterToLogin"/>
    </div>
    <div class="col-sm-4 ">
        <img v-bind:src="codeImage" border="0"
             style="cursor:pointer;width:100%;height: 100%;" alt="点击刷新验证码"
             class="form-control no_padding" v-on:click="generateCode()"/>
    </div>
</div>
        </template>
        <script>
            
            



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
                    
                },
                data () {
                    return {"validateCode":"","codeImage":""}    
                },
                mounted() {
                (() =>{
                console.log("validate-code function 方法调用");
                 this.generateCode();

            })()
(() =>{

            })()   
                },
                methods: {
                    generateCode:function(){
                    var param = {
                        params:{
                            _uId:'123'
                        }
                    };
                    console.log("validate-code generateCode",param);
                    this.$vc.http.get('validate-code','generateValidateCode',
                                 param,
                                 (json,res) =>{
                                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                                    if(res.status == 200){
                                        this.codeImage = json;
                                        return ;
                                    }
                                    this.$emit('errorInfoEvent',json);
                                 },(errInfo,error) =>{
                                    console.log('请求失败处理',errInfo,error);
                                    this.$emit('errorInfoEvent',errInfo);
                                 });

                },enterToLogin:function(){
                    this.$vc.emit('login','doLogin',{});
                },
                },
            }
    
        </script>
        <style>
            
        </style>
    