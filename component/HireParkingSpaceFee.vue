
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>收费信息</h5>
            </div>
            <div class="ibox-content">
                <div>
                    <div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">缴费周期</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="hireParkingSpaceFeeInfo.cycles">
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
                            <label class="col-sm-2 col-form-label">应收费用</label>
                            <div class="col-sm-10">
                                <input v-model="hireParkingSpaceFeeInfo.receivableAmount" type="text" disabled class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">实收费用</label>
                            <div class="col-sm-10">
                                <input v-model="hireParkingSpaceFeeInfo.receivedAmount" type="text" placeholder="必填，请填写实际收取费用" class="form-control">
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
            props: {"callBackComponent":"false","callBackFunction":"false"},
            components: {
                
            },
            data () {
                return {"hireParkingSpaceFeeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('hireParkingSpaceFee', 'onIndex', function(_index){
                this.hireParkingSpaceFeeInfo.index = _index;
            });

            this.$vc.on('hireParkingSpaceFee', 'parkingSpaceInfo',function(_parkingSpaceInfo){
                this.hireParkingSpaceFeeInfo.typeCd = _parkingSpaceInfo.typeCd;
                this._loadFireParkingSpaceFee();
            });

        })()   
            },
            methods: {
                hireParkingSpaceFeeValidate:function(){
                    return this.$vc.validate.validate({
                            hireParkingSpaceFeeInfo:this.hireParkingSpaceFeeInfo
                        },{

                            'hireParkingSpaceFeeInfo.cycles':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"缴费周期不能为空"
                                }
                            ],
                            'hireParkingSpaceFeeInfo.receivedAmount':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"实收金额不能为空"
                                },
                                {
                                    limit:"money",
                                    param:"",
                                    errInfo:"实收金额格式错误，如3.00"
                                }
                            ]
                        });
            },saveHireParkingSpaceFee:function(){
                if(this.hireParkingSpaceFeeValidate()){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackComponent,this.$vc._thiscallBackFunction, this.hireParkingSpaceFeeInfo);
                    return ;
                }
            },_loadFireParkingSpaceFee:function(){
                //
                var param = {
                        params:{
                            communityId:this.$vc.getCurrentCommunity().communityId,
                            typeCd:this.hireParkingSpaceFeeInfo.typeCd,
                            page:1,
                            row:1
                        }
                    };
                    this.$vc.http.get(
                        'hireParkingSpaceFee',
                        'loadSellParkingSpaceConfigData',
                         param,
                         function(json,res){
                            //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                            if(res.status == 200){
                                //关闭model
                                var configFee = JSON.parse(json);
                                this.hireParkingSpaceFeeInfo.additionalAmount = configFee.additionalAmount;
                                //重新算费
                                this.computeReceivableAmount(this.hireParkingSpaceFeeInfo.cycles);
                                return ;
                            }
                            this.$vc.message(json);
                         },
                         function(errInfo,error){
                            console.log('请求失败处理');

                            this.$vc.message(errInfo);
                         });

            },computeReceivableAmount:function(_cycles){
                        if(_cycles == null || _cycles == "" || _cycles == undefined){
                            _cycles = "0.00";
                        }
                        this.hireParkingSpaceFeeInfo.receivableAmount = (parseFloat(this.hireParkingSpaceFeeInfo.additionalAmount) * parseFloat(_cycles)).toFixed(2);
                        this.hireParkingSpaceFeeInfo.receivedAmount = this.hireParkingSpaceFeeInfo.receivableAmount;
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    