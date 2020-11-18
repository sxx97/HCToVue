
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"validateParam":"[object Object]","buttonInfo":"验证码"}    
            },
            mounted() {
             (function(){
                console.log("validate-tel _initMethod 方法调用");
                 //this.generateCode();

            })()(function(){

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
                                 function(json,res){
                                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);

                                    if(res.status == 200){
                                        this.registerInfo.validateInfo = json;
                                        return ;
                                    }
                                    this.$emit('errorInfoEvent',json);
                                 },function(errInfo,error){
                                    console.log('请求失败处理',errInfo,error);
                                    this.$emit('errorInfoEvent',errInfo);
                                 });

                },messageCodeTimer(){
                      var num = 60;

                    var _timer = this.$vc.createTimer(function(){
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
    