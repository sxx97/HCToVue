
        <template>
            <div component="validate-tel">
    <div class="form-group">
        <input  name="tel" v-model="validateParam.tel" type="text" class="form-control" placeholder="请输入手机号码" required="">
    </div>
    <div class="form-group row" >
        <div class="col-sm-7 ">
            <input type="text" class="form-control" v-model="validateParam.messageCode" placeholder="请输入验证码" required=""/>
        </div>
        <div class="col-sm-5 ">
            <button type="button" v-bind:disabled="buttonInfo !='验证码'"  class="btn btn-primary form-control" v-on:click="sendTelMessageCode()">{{buttonInfo}}</button>
        </div>
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
                    return {"validateParam":{"tel":"","messageCode":""},"buttonInfo":"验证码"}    
                },
                mounted() {
                (() =>{
                console.log("validate-tel function 方法调用");
                 //this.generateCode();

            })()
(() =>{

            })()   
                },
                methods: {
                    sendTelMessageCode(){
                    if(!this.$vc.validate.phone(this.validateParam.tel)){
                          this.$emit('errorInfoEvent',"手机号码为空或不正确，不能发送验证码");
                        return;
                    }
                    // 开启定时
                    this.messageCodeTimer();

                    var param = {
                            tel:this.validateParam.tel,
                    };
                    console.log("validate-tel sendTelMessageCode",JSON.stringify(param));
                    this.$vc.http.post('validate-tel','sendTelMessageCode',
                                 JSON.stringify(param),
                                 {
                                     emulateJSON:true
                                  },
                                 (json,res) =>{
                                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);

                                    if(res.status == 200){
                                        this.registerInfo.validateInfo = json;
                                        return ;
                                    }
                                    this.$emit('errorInfoEvent',json);
                                 },(errInfo,error) =>{
                                    console.log('请求失败处理',errInfo,error);
                                    this.$emit('errorInfoEvent',errInfo);
                                 });

                },messageCodeTimer(){
                      var num = 60;

                    var _timer = this.$vc.createTimer(() =>{
                        num --;
                        this.buttonInfo = num +" 秒后重试";
                        if(num === 1){
                            this.$vc.clearTimer(_timer);
                            this.buttonInfo = "验证码";
                        }
                    },1000);
                },
                },
            }
    
        </script>
        <style>
            
        </style>
    