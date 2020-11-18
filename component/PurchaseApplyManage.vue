
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="purchaseApplyManageInfo.conditions.state">
                                <option selected value="">请选择订单状态</option>
                                <option value="1003006">未审核</option>
                                <option value="2006012">已审核</option>
                            </select></div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入订单号"
                                       v-model="purchaseApplyManageInfo.conditions.applyOrderId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryInspectionPlanMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>采购申请信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddPurchaseApplyModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加采购申请
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">审批状态</th>
                            <th class="text-center">使用人</th>
                            <th class="text-center">申请时间</th>
                            <th class="text-center">物品名称</th>
                            <th class="text-center">总计价格</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="purchaseApply in purchaseApplyManageInfo.purchaseApplys">
                            <td class="text-center">{{purchaseApply.state}}</td>
                            <td class="text-center">{{purchaseApply.userName}}</td>
                            <td class="text-center">{{purchaseApply.createTime}}</td>
                            <td class="text-center">{{purchaseApply.resourceNames}}</td>
                            <td class="text-center">{{purchaseApply.totalPrice}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditPurchaseApplyModel(purchaseApply)">查看
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditPurchaseApplyModel(purchaseApply)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeletePurchaseApplyModel(purchaseApply)">删除
                                    </button>
                                </div>
                            </td>

                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="7">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <!-- 分页 -->
                    <Pagination name="pagination"></Pagination>
                </div>
            </div>
        </div>
    </div>


    <vc:create name="addPurchaseApply"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <EditPurchaseApply name="editPurchaseApply"></EditPurchaseApply>
    <DeletePurchaseApply name="deletePurchaseApply"></DeletePurchaseApply>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditPurchaseApply from './EditPurchaseApply.vue';import DeletePurchaseApply from './DeletePurchaseApply.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"purchaseApplyManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listPurchaseApplys(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            
            this.$vc.on('purchaseApplyManage','listPurchaseApply',function(_param){
                  this._listPurchaseApplys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listPurchaseApplys(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listPurchaseApplys:function(_page, _rows){

                this.purchaseApplyManageInfo.conditions.page = _page;
                this.purchaseApplyManageInfo.conditions.row = _rows;
                var param = {
                    params:this.purchaseApplyManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('purchaseApplyManage',
                            'list',
                             param,
                             function(json,res){
                                var _purchaseApplyManageInfo=JSON.parse(json);
                                this.purchaseApplyManageInfo.total = _purchaseApplyManageInfo.total;
                                this.purchaseApplyManageInfo.records = _purchaseApplyManageInfo.records;
                                this.purchaseApplyManageInfo.purchaseApplys = _purchaseApplyManageInfo.purchaseApplys;
                                this.$vc.emit('pagination','init',{
                                     total:this.purchaseApplyManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAddPurchaseApplyModal:function(){
                this.$vc.emit('addPurchaseApply','openAddPurchaseApplyModal',{});
            },_openEditPurchaseApplyModel:function(_purchaseApply){
                this.$vc.emit('editPurchaseApply','openEditPurchaseApplyModal',_purchaseApply);
            },_openDeletePurchaseApplyModel:function(_purchaseApply){
                this.$vc.emit('deletePurchaseApply','openDeletePurchaseApplyModal',_purchaseApply);
            },_queryPurchaseApplyMethod:function(){
                this._listPurchaseApplys(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function(){
                if(this.purchaseApplyManageInfo.moreCondition){
                    this.purchaseApplyManageInfo.moreCondition = false;
                }else{
                    this.purchaseApplyManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    