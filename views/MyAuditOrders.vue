
        <template>
            <div class="wrapper wrapper-content animated fadeInRight ecommerce">
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
                            <div class="form-group">
                                <input type="text" placeholder="请输入审核ID"
                                       v-model="myAuditOrdersInfo.conditions.AuditOrdersId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入审核人员"
                                       v-model="myAuditOrdersInfo.conditions.userName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="custom-select" v-model="myAuditOrdersInfo.conditions.auditLink">
                                <option selected value="">请选择审核环节</option>
                                <option value="809001">部门主管</option>
                                <option value="809002">财务主管</option>
                                <option value="809003">采购人员</option>
                            </select></div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryAuditOrdersMethod()">
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
                    <h5>审核单信息</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">订单号</th>
                            <th class="text-center">订单类型</th>
                            <th class="text-center">订单状态</th>
                            <th class="text-center">创建时间</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="auditOrder in myAuditOrdersInfo.auditOrders">
                            <td class="text-center">{{auditOrder.resOrderId}}</td>
                            <td class="text-center">{{auditOrder.resOrderType}}</td>
                            <td class="text-center">{{auditOrder.state}}</td>
                            <td class="text-center">{{auditOrder.createTime}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openAuditOrderModel(auditOrder)">审批
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
                    <vc:create name="pagination"></vc:create>
                </div>
            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';



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
                props: {},
                components: {
                    Pagination
                },
                data () {
                    return {"myAuditOrdersInfo":{"auditOrders":[],"total":0,"records":1,"moreCondition":false,"userName":"","conditions":{"AuditOrdersId":"","userName":"","auditLink":""}}}    
                },
                mounted() {
                ( () => {
            this._listAuditOrders(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('myAuditOrders', 'listAuditOrders',  (_param) => {
                this._listAuditOrders(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listAuditOrders(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listAuditOrders:function (_page, _rows) {

                this.myAuditOrdersInfo.conditions.page = _page;
                this.myAuditOrdersInfo.conditions.row = _rows;
                var param = {
                    params: this.myAuditOrdersInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('myAuditOrders',
                    'list',
                    param,
                     (json, res) => {
                        var _myAuditOrdersInfo = JSON.parse(json);
                        this.myAuditOrdersInfo.total = _myAuditOrdersInfo.total;
                        this.myAuditOrdersInfo.records = _myAuditOrdersInfo.records;
                        this.myAuditOrdersInfo.AuditOrders = _myAuditOrdersInfo.AuditOrders;
                        this.$vc.emit('pagination', 'init', {
                            total: this.myAuditOrdersInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAuditOrderModel:function () {
                this.$vc.jumpToPage("/flow/addAuditOrderstepFlow")
            },_queryAuditOrdersMethod:function () {
                this._listAuditOrders(DEFAULT_PAGE, DEFAULT_ROWS);
            },_moreCondition:function () {
                if (this.AuditOrdersManageInfo.moreCondition) {
                    this.AuditOrdersManageInfo.moreCondition = false;
                } else {
                    this.AuditOrdersManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    