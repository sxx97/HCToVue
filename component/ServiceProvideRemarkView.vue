
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>开发服务提供</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">描述</label>
                    <div class="col-sm-10">
                        <textarea rows="10" placeholder="选填，请填写描述" class="form-control"
                                  v-model="serviceProvideRemarkViewInfo.description"></textarea></div>
                </div>

            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"serviceProvideRemarkViewInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){

            this.$vc.on('serviceProvideRemarkViewInfo', 'onIndex', function(_index){
                this.serviceProvideRemarkViewInfo.index = _index;
            });
        })()   
            },
            methods: {
                serviceProvideRemarkValidate(){
                return this.$vc.validate.validate({
                    serviceProvideRemarkViewInfo:this.serviceProvideRemarkViewInfo
                },{
                    'serviceProvideRemarkViewInfo.remark':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"备注内容不能超过200"
                        },
                    ],

                });
            },saveServiceProvideRemarkInfo:function(){
                if(this.serviceProvideRemarkValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction, this.serviceProvideRemarkViewInfo);
                    return ;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    