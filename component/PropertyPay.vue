
        <template>
            <div id = "propertyPayModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">缴费信息</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">缴费周期</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="propertyPayInfo.cycles">
                                        <option selected  disabled value="">必填，请选择缴费周期</option>
                                        <option value="1">1个月</option>
                                        <option value="2">2个月</option>
                                        <option value="3">3个月</option>
                                        <option value="4">4个月</option>
                                        <option value="5">5个月</option>
                                        <option value="6">6个月</option>
                                        <option value="12">一年</option>
                                        <option value="24">两年</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">应收金额</label>
                                <div class="col-sm-10"><input v-model="propertyPayInfo.receivableAmount" type="number" readonly class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">实收金额</label>
                                <div class="col-sm-10"><input v-model="propertyPayInfo.receivedAmount" type="number"  class="form-control"></div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="propertyPayInfo.remark" type="text" placeholder="请填写备注信息" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="payFee()" ><i class="fa fa-check"></i>&nbsp;提交</button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {"emitReloadFee":"false"},
            components: {
                
            },
            data () {
                return {"propertyPayInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('propertyPay','openPayModel',function(_params){
                this.refreshPropertyPayInfo();

                $('#propertyPayModel').modal('show');
                this.propertyPayInfo.feeId = _params.feeId;
                this.propertyPayInfo.configId = _params.configId;
                this.propertyPayInfo.builtUpArea = _params.builtUpArea;
                this.propertyPayInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                 this.loadPropertyConfigFee();
            });
        })()   
            },
            methods: {
                payFeeValidate:function(){
                        return this.$vc.validate.validate({
                            propertyPayInfo:this.propertyPayInfo
                        },{
                            'propertyPayInfo.feeId':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"费用ID不能为空"
                                }
                            ],
                            'propertyPayInfo.cycles':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"缴费周期不能为空"
                                }
                            ],
                            'propertyPayInfo.receivableAmount':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"应收金额不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"应收金额不是有效的金额"
                                }
                            ],
                            'propertyPayInfo.receivedAmount':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"实收金额不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"实收金额不是有效的金额"
                                }
                            ],

                            'propertyPayInfo.remark':[
                                {
                                    limit:"maxLength",
                                    param:"200",
                                    errInfo:"备注长度不能超过200位"
                                },
                            ]

                        });
             },payFee:function(){
                if(!this.payFeeValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                this.$vc.http.post(
                    'propertyPay',
                    'payFee',
                    JSON.stringify(this.propertyPayInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#propertyPayModel').modal('hide');
                            this.$vc.emit('propertyFee','listFeeDetail',this.propertyPayInfo);
                            this.$vc.emit(this.$vc._thisemitReloadFee,'reloadFee',this.propertyPayInfo);
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                     });
            },refreshPropertyPayInfo:function(){
                this.propertyPayInfo={
                                             cycles:'',
                                             receivableAmount:'0.00',
                                             receivedAmount:'0.00',
                                             remark:'',
                                             builtUpArea:'',
                                             feeId:'',
                                             configId:'',
                                             squarePrice:'',
                                             additionalAmount:'',
                                             communityId:''
                                         };


            },loadPropertyConfigFee:function(){
                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        configId:this.propertyPayInfo.configId,
                        page:1,
                        row:1
                    }
                };
                this.$vc.http.get(
                    'propertyPay',
                    'loadPropertyConfigData',
                     param,
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            var _feeConfig  = JSON.parse(json).feeConfigs[0];
                            this.$vc.copyObject(_feeConfig, this.propertyPayInfo);
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
                },
            },
        }
    
        </script>
        <style>
            
        </style>
    