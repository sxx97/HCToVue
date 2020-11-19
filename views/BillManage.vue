
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-content">
                    <div class="row">
                        <div class="form-group">
                            <input  type="text" placeholder="合同编号、租客、房间"
                                   class="custom-select month">
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <select class="custom-select">
                                    <option value="" selected disabled>请选择收款状态</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="form-group">
                                <select class="custom-select">
                                    <option value="" selected disabled>请选择账单状态</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary">
                                查询
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ibox-table-wrap">
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15">
                        <thead>
                            <tr>
                                <th class="text-center">账单生成时间</th>
                                <th class="text-center">账单状态</th>
                                <th class="text-center">合同编号</th>
                                <th class="text-center">租客</th>
                                <th class="text-center">房间</th>
                                <th class="text-center">实际应付金额</th>
                                <th class="text-center">已付金额</th>
                                <th class="text-center">未付金额</th>
                                <th class="text-center">备注</th>
                                <th class="text-center">支付渠道</th>
                                <th class="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">2019.08.01 09：00</td>
                                <td class="text-center">待续费</td>
                                <td class="text-center">165696</td>
                                <td class="text-center">
                                    <div>
                                        <p>海外总副国级</p>
                                        <p>李思思【136555555555】</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div>
                                        <p>楼名称</p>
                                        <p>房间名称</p>
                                    </div>
                                </td>
                                <td class="text-center">12100元</td>
                                <td class="text-center">2100元</td>
                                <td class="text-center">1000元</td>
                                <td class="text-center">查看</td>
                                <td class="text-center">
                                    <div>
                                        <p>支付宝</p>
                                        <p>137512xxxxxxxx</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-primary dropdown-toggle"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            操作
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a href="#">通知缴费</a></li>
                                            <li><a href="#">变更账单</a></li>
                                            <li><a href="#">线下付款</a></li>
                                        </ul>

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="12">
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
    <offline-pay-modal :modal-show-status="offlinePayModalStatus" @change-modal-status="changeOfflinePyModal"></offline-pay-modal>
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
                    return {"offlinePayModalStatus":false}    
                },
                mounted() {
                (() => {

        })()
(() => {

        })()   
                },
                methods: {
                    changeOfflinePyModal(isShow) {
                this.offlinePayModalStatus = isShow;
            },
                },
            }
    
        </script>
        <style>
            .offline-pay-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 904px;
    height: 700px;
    background: #FFFFFF;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .1);
    border-radius: 10px;
}

.offline-pay-modal-content {
    padding: 30px;
    font-size: 0;
}

.offline-pay-modal-content .form-item {
    margin-bottom: 30px;
}

.offline-pay-modal-content .form-item-label {
    width: 100px;
    margin-right: 20px;
    text-align: right;
    display: inline-block;
    font-size: 24px;
}

.offline-pay-modal-content .form-item-content {
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
}

.offline-pay-modal-content label:not(:last-of-type) {
    margin-right: 20px;
}

.offline-pay-modal-content label input, .offline-pay-modal-content label span{
    vertical-align: middle;
}

.form-item-content table {
    width: 452px;
    border-radius: 8px;
    border: 1px solid #00B694;
    font-size: 24px;
}

.form-item-content table th {
    background: #00B694;
    color: #fff;
    text-align: center;
    height: 53px;
}
.form-item-content table th:not(:last-of-type) {
    border-right: 1px solid #fff;
}

.form-item-content td {
    text-align: center;
    vertical-align: middle;
    padding: 12px 0;
}

.form-item-content table td:not(:last-of-type) {
    border-right: 1px solid #00B694;
}

.offline-pay-modal-footer {
    text-align: center;
    padding: 30px 0;
    border-top: 2px solid #f0f0f0;
}

.offline-pay-modal-footer .btn {
    font-size: 24px;
    text-align: center;
}

.offline-pay-modal-footer .btn-primary {
    margin-left: 60px;
    width: 80px;
    padding: 0;
    height: 40px;
    background: #00B694;
    box-shadow: 0 5px 10px 0 rgba(0, 182, 148, .3);
    border-radius: 6px;
}
        </style>
    