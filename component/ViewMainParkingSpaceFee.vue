
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>{{mainParkingSpaceFeeInfo.feeName}}信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <!--<button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchParkingSpaceModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择停车位</button>-->
                    <button type="button" class="btn btn-primary btn-sm"
                            v-if="mainParkingSpaceFeeInfo.feeId != null && mainParkingSpaceFeeInfo.feeId != '' &&  mainParkingSpaceFeeInfo.amount == '-1.00'"
                             v-on:click="openPayModel()">
                        <i class="glyphicon glyphicon-plus" ></i> 缴费</button>

                    <button type="button" class="btn btn-primary btn-sm"
                            style="margin-left:10px" v-on:click="_openCallBackOwner()">
                        返回</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用ID：</label>
                            <label class="">{{mainParkingSpaceFeeInfo.feeId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">停车位编号：</label>
                            <label class="">{{mainParkingSpaceFeeInfo.num}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >车牌号：</label>
                            <label class="">{{mainParkingSpaceFeeInfo.carNum}}</label>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用开始时间：</label>
                            <label class="">{{mainParkingSpaceFeeInfo.startTime}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用到期时间：</label>
                            <label class="">{{mainParkingSpaceFeeInfo.endTime}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group" v-if="mainParkingSpaceFeeInfo.amount != '-1.00'">
                            <label class="col-form-label">费用金额：</label>
                            <label class="">{{mainParkingSpaceFeeInfo.amount}} 元</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
   <!-- <vc:create name="searchParkingSpace"
               emitChooseParkingSpace="viewMainParkingSpaceFee"
               emitLoadData="propertyFee"
               parkingSpaceFlag="SH"
    ></vc:create>-->
    <vc:create name="propertyPay"
               emitReloadFee="viewMainParkingSpaceFee">

    </vc:create>
</div>
        </template>
        <script>
            
            import PropertyPay from '@/component/PropertyPay.vue';



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
                props: {"feeName":"true","payName":"true"},
                components: {
                    PropertyPay
                },
                data () {
                    return {"mainParkingSpaceFeeInfo":{"feeId":"","feeTypeCd":"","psId":"","num":"","typeCd":"","carNum":"","carBrand":"","carType":"","startTime":"","endTime":"","amount":"-1.00"}}    
                },
                mounted() {
                (() =>{
             //加载 业主信息
            var _ownerId = this.$vc.getParam('ownerId')
            var _psId = this.$vc.getParam('psId')

            if(this.$vc.notNull(_psId)){
                this.loadMainParkingSpaceFeeInfo({
                    psId:_psId,
                    ownerId:_ownerId,
                });
            }

        })()
(() =>{
            this.$vc.on('viewMainParkingSpaceFee','chooseParkingSpace',(_parkingSPace) =>{
                  this.loadMainParkingSpaceFeeInfo(_parkingSPace);
            });

            this.$vc.on('viewMainParkingSpaceFee','reloadFee',(_parkingSpace) =>{
                if(this.mainParkingSpaceFeeInfo.psId != ''){
                      this.loadMainParkingSpaceFeeInfo({
                            psId:this.mainParkingSpaceFeeInfo.psId
                      });

                }
            });
        })()   
                },
                methods: {
                    openSearchParkingSpaceModel:function(){
                this.$vc.emit('searchParkingSpace','openSearchParkingSpaceModel',{});
            },openPayModel:function(){
                this.$vc.emit(this.$vc._thispayName,'openPayModel',{
                    feeId:this.mainParkingSpaceFeeInfo.feeId,
                    feeTypeCd:this.mainParkingSpaceFeeInfo.feeTypeCd,
                    builtUpArea:"0.00"
                });
            },loadMainParkingSpaceFeeInfo:function(_parkingSPace){
                //this.$vc.copyObject(_fee,this.mainParkingSpaceFeeInfo);
                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        psId:_parkingSPace.psId,
                    }
                };

                //发送get请求
               this.$vc.http.get('viewMainParkingSpaceFee',
                            'getFee',
                             param,
                             (json,res) =>{
                               var _fee =JSON.parse(json);
                               this.$vc.copyObject(_fee,this.mainParkingSpaceFeeInfo);
                               this.$vc.emit('propertyFee','listFeeDetail',this.mainParkingSpaceFeeInfo);
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openCallBackOwner:function(){
                  this.$vc.jumpToPage("/flow/ownerFlow");
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    