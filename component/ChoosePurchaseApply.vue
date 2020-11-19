
        <template>
            <div id = "choosePurchaseApplyModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="choosePurchaseApplyModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="choosePurchaseApplyModelLabel">选择采购申请</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入采购申请名称" type="text" v-model="choosePurchaseApplyInfo._currentPurchaseApplyName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryPurchaseApplys()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">订单号</th>
                            <th class="text-center">订单状态</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="purchaseApply in choosePurchaseApplyInfo.purchaseApplys">
                                                                        <td class="text-center">{{purchaseApply.applyOrderId}}</td>
                            <td class="text-center">{{purchaseApply.state}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="choosePurchaseApply(purchaseApply)">选择</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                props: {"emitChoosePurchaseApply":"false","emitLoadData":"false"},
                components: {
                    
                },
                data () {
                    return {"choosePurchaseApplyInfo":{"purchaseApplys":[],"_currentPurchaseApplyName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('choosePurchaseApply','openChoosePurchaseApplyModel',(_param) =>{
                $('#choosePurchaseApplyModel').modal('show');
                this._refreshChoosePurchaseApplyInfo();
                this._loadAllPurchaseApplyInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllPurchaseApplyInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('choosePurchaseApply',
                            'list',
                             param,
                             (json) =>{
                                var _purchaseApplyInfo = JSON.parse(json);
                                this.choosePurchaseApplyInfo.purchaseApplys = _purchaseApplyInfo.purchaseApplys;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },choosePurchaseApply:function(_purchaseApply){
                if(_purchaseApply.hasOwnProperty('name')){
                     _purchaseApply.purchaseApplyName = _purchaseApply.name;
                }
                this.$vc.emit(this.$vc._thisemitChoosePurchaseApply,'choosePurchaseApply',_purchaseApply);
                this.$vc.emit(this.$vc._thisemitLoadData,'listPurchaseApplyData',{
                    purchaseApplyId:_purchaseApply.purchaseApplyId
                });
                $('#choosePurchaseApplyModel').modal('hide');
            },queryPurchaseApplys:function(){
                this._loadAllPurchaseApplyInfo(1,10,this.choosePurchaseApplyInfo._currentPurchaseApplyName);
            },_refreshChoosePurchaseApplyInfo:function(){
                this.choosePurchaseApplyInfo._currentPurchaseApplyName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    