
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
            
            import AddPurchaseApply from '@/component/AddPurchaseApply.vue';import ChoosePurchaseApply from '@/component/ChoosePurchaseApply.vue';



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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    AddPurchaseApply,ChoosePurchaseApply
                },
                data () {
                    return {"viewPurchaseApplyInfo":{"index":0,"flowComponent":"viewPurchaseApplyInfo","state":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadPurchaseApplyInfoData();
        })()
(() =>{
            this.$vc.on('viewPurchaseApplyInfo','choosePurchaseApply',(_app) =>{
                this.$vc.copyObject(_app, this.viewPurchaseApplyInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewPurchaseApplyInfo);
            });

            this.$vc.on('viewPurchaseApplyInfo', 'onIndex', (_index) =>{
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
    