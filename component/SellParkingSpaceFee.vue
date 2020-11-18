
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
                            <label class="col-sm-2 col-form-label">应收费用</label>
                            <div class="col-sm-10">
                                <input v-model="sellParkingSpaceFeeInfo.receivableAmount" type="text" disabled class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">实收费用</label>
                            <div class="col-sm-10">
                                <input v-model="sellParkingSpaceFeeInfo.receivedAmount" type="text" placeholder="必填，请填写实际收取费用" class="form-control">
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
            props: {"callBackComponent":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"sellParkingSpaceFeeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('sellParkingSpaceFee', 'onIndex', function(_index){
                this.sellParkingSpaceFeeInfo.index = _index;
            });

            this.$vc.on('sellParkingSpaceFee', 'flowComponentShow', function(_flowComponentShow){
                this.sellParkingSpaceFeeInfo.flowComponentShow = _flowComponentShow;
            });

            this.$vc.on('sellParkingSpaceFee', 'callBackParkingSpaceInfo', function(_info){
                this.saveSellParkingSpaceFee();
            });

            this.$vc.on('sellParkingSpaceFee', 'parkingSpaceInfo',function(_parkingSpaceInfo){
                this.sellParkingSpaceFeeInfo.typeCd = _parkingSpaceInfo.typeCd;
                this._loadFireParkingSpaceFee();
            });

        })()   
            },
            methods: {
                sellParkingSpaceFeeValidate:function(){
                    return this.$vc.validate.validate({
                            sellParkingSpaceFeeInfo:this.sellParkingSpaceFeeInfo
                        },{
                            'sellParkingSpaceFeeInfo.receivedAmount':[
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
            },saveSellParkingSpaceFee:function(){
                if(this.sellParkingSpaceFeeValidate() && this.sellParkingSpaceFeeInfo.flowComponentShow){
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackComponent,this.$vc._thiscallBackFunction, this.sellParkingSpaceFeeInfo);
                    return ;
                }
            },_loadFireParkingSpaceFee:function(){
                //
                var param = {
                        params:{
                            communityId:this.$vc.getCurrentCommunity().communityId,
                            typeCd:this.sellParkingSpaceFeeInfo.typeCd,
                            isDefault:'T',
                            page:1,
                            row:1
                        }
                    };
                    this.$vc.http.get(
                        'sellParkingSpaceFee',
                        'loadSellParkingSpaceConfigData',
                         param,
                         function(json,res){
                            //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                            if(res.status == 200){
                                //关闭model
                                var configFee = JSON.parse(json);
                                this.sellParkingSpaceFeeInfo.receivableAmount = configFee.additionalAmount;
                                this.sellParkingSpaceFeeInfo.additionalAmount = configFee.additionalAmount;
                                this.sellParkingSpaceFeeInfo.receivedAmount = configFee.additionalAmount;

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
    