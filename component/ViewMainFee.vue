
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>费用信息</h5>
                <div class="ibox-tools" style="top:10px;">
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
                            <label class="">{{mainFeeInfo.feeId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用标识：</label>
                            <label class="">{{mainFeeInfo.feeFlagName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">费用类型：</label>
                            <label class="">{{mainFeeInfo.feeTypeCdName}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用项ID：</label>
                            <label class="">{{mainFeeInfo.configId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用项：</label>
                            <label class="">{{mainFeeInfo.feeName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">费用状态：</label>
                            <label class="">{{mainFeeInfo.stateName}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用开始时间：</label>
                            <label class="">{{mainFeeInfo.startTime}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用到期时间：</label>
                            <label class="">{{mainFeeInfo.endTime}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group" v-if="mainFeeInfo.amount != '-1.00'">
                            <label class="col-form-label">费用金额：</label>
                            <label class="">{{mainFeeInfo.amount}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--<vc:create name="searchRoom"
               emitChooseRoom="viewMainFee"
               emitLoadData="propertyFee"
               roomFlag="1"
    ></vc:create>-->
<!--    <vc:create name="propertyPay"-->
<!--               emitReloadFee="viewMainFee"-->
<!--    ></vc:create>-->
</div>
        </template>
        <script>
            
        export default {
            props: {"feeName":"false","feeTypeCd":"false","payName":"false"},
            components: {
                
            },
            data () {
                return {"mainFeeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
             //加载 业主信息
            var _feeId = this.$vc.getParam('feeId')

            if(this.$vc.notNull(_feeId)){
                this.loadMainFeeInfo({
                    feeId:_feeId
                });
            }

        })()(function(){
            this.$vc.on('viewMainFee','chooseRoom',function(_room){
                  this.loadMainFeeInfo(_room);
            });

            this.$vc.on('viewMainFee','reloadFee',function(_room){
                if(this.mainFeeInfo.roomId != ''){
                      this.loadMainFeeInfo({
                            roomId:this.mainFeeInfo.roomId
                      });

                }
            });
        })()   
            },
            methods: {
                openSearchRoomModel:function(){
                this.$vc.emit('searchRoom','openSearchRoomModel',{});
            },openPayModel:function(){
                this.$vc.emit(this.$vc._thispayName,'openPayModel',{
                    feeId:this.mainFeeInfo.feeId,
                    configId:this.mainFeeInfo.configId,
                    builtUpArea:this.mainFeeInfo.builtUpArea
                });
            },loadMainFeeInfo:function(_fee){
                //this.$vc.copyObject(_fee,this.mainFeeInfo);
                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        feeId:_fee.feeId,
                        row:1,
                        page:1
                    }
                };

                //发送get请求
               this.$vc.http.get('viewMainFee',
                            'getFee',
                             param,
                             function(json,res){
                               var _fee =JSON.parse(json).fees[0];
                               this.$vc.copyObject(_fee,this.mainFeeInfo);
                               this.$vc.emit('propertyFee','listFeeDetail',{
                                    feeId:_fee.feeId
                               });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openCallBackOwner:function(){
                this.$vc.getBack();
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    