
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>采购申请信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewPurchaseApplyInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectPurchaseApplyInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择采购申请</button>

                    <button type="button" v-if="viewPurchaseApplyInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddPurchaseApplyInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加采购申请</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >订单状态：</label>
                            <label class="">{{viewPurchaseApplyInfo.state}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addPurchaseApply"
               callBackListener="viewPurchaseApplyInfo"
               callBackFunction="choosePurchaseApply"
    ></vc:create>


    <vc:create name="choosePurchaseApply"
               emitChoosePurchaseApply="viewPurchaseApplyInfo"
               emitLoadData="viewPurchaseApplyInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"false","callBackFunction":"false"},
            components: {
                
            },
            data () {
                return {"viewPurchaseApplyInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //根据请求参数查询 查询 业主信息
            this._loadPurchaseApplyInfoData();
        })()(function(){
            this.$vc.on('viewPurchaseApplyInfo','choosePurchaseApply',function(_app){
                this.$vc.copyObject(_app, this.viewPurchaseApplyInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewPurchaseApplyInfo);
            });

            this.$vc.on('viewPurchaseApplyInfo', 'onIndex', function(_index){
                this.viewPurchaseApplyInfo.index = _index;
            });

        })()   
            },
            methods: {
                _openSelectPurchaseApplyInfoModel(){
                this.$vc.emit('choosePurchaseApply','openChoosePurchaseApplyModel',{});
            },_openAddPurchaseApplyInfoModel(){
                this.$vc.emit('addPurchaseApply','openAddPurchaseApplyModal',{});
            },_loadPurchaseApplyInfoData:function(){

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    