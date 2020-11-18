
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"validateCode":"","codeImage":""}    
            },
            mounted() {
             (function(){
                console.log("validate-code _initMethod 方法调用");
                 this.generateCode();

            })()(function(){

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
                                 function(json,res){
                                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                                    if(res.status == 200){
                                        this.codeImage = json;
                                        return ;
                                    }
                                    this.$emit('errorInfoEvent',json);
                                 },function(errInfo,error){
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
    