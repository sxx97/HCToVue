
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>开发服务</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">实现方式</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="devServiceProvideViewInfo.queryModel">
                            <option selected disabled value="">必填，请选择实现方式</option>
                            <option value="1">sql方式</option>
                            <option value="3">java方式</option>
                            <option value="2">存储过程方式</option>
                        </select></div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">参数</label>
                    <div class="col-sm-10">
                        <input v-model="devServiceProvideViewInfo.params" type="text" placeholder="必填，请填写参数"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row" v-if="devServiceProvideViewInfo.queryModel==1">
                    <label class="col-sm-2 col-form-label">sql</label>
                    <div class="col-sm-10">
                        <textarea rows="15" placeholder="选填，请填写sql" class="form-control"
                                  v-model="devServiceProvideViewInfo.sql"></textarea></div>
                </div>
                <div class="form-group row" v-if="devServiceProvideViewInfo.queryModel==1">
                    <label class="col-sm-2 col-form-label">输出模板</label>
                    <div class="col-sm-10">
                        <textarea cols="10" placeholder="选填，请填写输出模板" class="form-control"
                                  v-model="devServiceProvideViewInfo.template"></textarea></div>
                </div>
                <div class="form-group row" v-if="devServiceProvideViewInfo.queryModel==2">
                    <label class="col-sm-2 col-form-label">存储过程</label>
                    <div class="col-sm-10">
                        <textarea cols="5" placeholder="选填，请填写存储过程" class="form-control"
                                  v-model="devServiceProvideViewInfo.proc"></textarea></div>
                </div>
                <div class="form-group row" v-if="devServiceProvideViewInfo.queryModel==3">
                    <label class="col-sm-2 col-form-label">java</label>
                    <div class="col-sm-10">
                        <textarea rows="20" placeholder="选填，请填写java" class="form-control"
                                  v-model="devServiceProvideViewInfo.javaScript"></textarea></div>
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
                return {"devServiceProvideViewInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){

            this.$vc.on('devServiceProvideViewInfo', 'onIndex', function(_index){
                this.devServiceProvideViewInfo.index = _index;
            });
        })()   
            },
            methods: {
                devServiceProvideValidate(){
                return this.$vc.validate.validate({
                    devServiceProvideViewInfo:this.devServiceProvideViewInfo
                },{
                    'devServiceProvideViewInfo.queryModel':[
{
                            limit:"required",
                            param:"",
                            errInfo:"实现方式不能为空"
                        },
 {
                            limit:"maxin",
                            param:"1,12",
                            errInfo:"实现方式错误"
                        },
                    ],
'devServiceProvideViewInfo.params':[
{
                            limit:"required",
                            param:"",
                            errInfo:"参数不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"500",
                            errInfo:"参数内容不能超过200"
                        },
                    ],
'devServiceProvideViewInfo.sql':[
 {
                            limit:"maxLength",
                            param:"2000",
                            errInfo:"sql不能超过2000"
                        },
                    ],
'devServiceProvideViewInfo.template':[
 {
                            limit:"maxLength",
                            param:"2000",
                            errInfo:"输出模板不能超过2000"
                        },
                    ],
'devServiceProvideViewInfo.proc':[
 {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"存储过程不能超过200"
                        },
                    ],
'devServiceProvideViewInfo.javaScript':[
 {
                            limit:"maxLength",
                            param:"2000",
                            errInfo:"java不能超过2000"
                        },
                    ],

                });
            },saveDevServiceProvideInfo:function(){
                if(this.devServiceProvideValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction, this.devServiceProvideViewInfo);
                    return ;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    