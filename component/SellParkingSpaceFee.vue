
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
                props: {"callBackComponent":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"sellParkingSpaceFeeInfo":{"flowComponent":"sellParkingSpaceFee","receivableAmount":"0.00","receivedAmount":"0.00","additionalAmount":"0.00","sellOrHire":"S","typeCd":"","flowComponentShow":false}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('sellParkingSpaceFee', 'onIndex', (_index) =>{
                this.sellParkingSpaceFeeInfo.index = _index;
            });

            this.$vc.on('sellParkingSpaceFee', 'flowComponentShow', (_flowComponentShow) =>{
                this.sellParkingSpaceFeeInfo.flowComponentShow = _flowComponentShow;
            });

            this.$vc.on('sellParkingSpaceFee', 'callBackParkingSpaceInfo', (_info) =>{
                this.saveSellParkingSpaceFee();
            });

            this.$vc.on('sellParkingSpaceFee', 'parkingSpaceInfo',(_parkingSpaceInfo) =>{
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
                         (json,res) =>{
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
                         (errInfo,error) =>{
                            console.log('请求失败处理');

                            this.$vc.message(errInfo);
                         });

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    