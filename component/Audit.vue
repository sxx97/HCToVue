
        <template>
            <div id="auditModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">{{callBackListener == 'myAuditComplaints' ? '处理' : '审核信息'}}</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">{{callBackListener == 'myAuditComplaints' ? '处理' : '审核状态'}}</label>
                                <div class="col-sm-10">
                                    <template v-if="callBackListener == 'myAuditComplaints'">
                                        <select class="custom-select" v-model="auditInfo.state">
                                            <option selected disabled value="">请处理</option>
                                            <option value="10002">已处理</option>
                                            <option value="10003">无效</option>
                                        </select>
                                    </template>
                                    <template v-else>
                                        <select class="custom-select" v-model="auditInfo.state">
                                            <option selected disabled value="">请审核</option>
                                            <option value="1100">同意</option>
                                            <option value="1200">拒绝</option>
                                        </select>
                                    </template>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">{{callBackListener == 'myAuditComplaints' ? '结果' : '原因'}}</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写原因" class="form-control"
                                              v-model="auditInfo.remark"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="_auditSubmit()"><i class="fa fa-check"></i>&nbsp;提交
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                        data-dismiss="modal">取消
                                </button>
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
            props: {},
            components: {
                
            },
            data () {
                return {"myAuditHistoryComplaintsInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._listAuditOrders(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function () {
            this.$vc.on('myAuditComplaints', 'auditMessage', function (_auditInfo) {
                this._auditComplaintInfo(_auditInfo);
            });
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this._listAuditOrders(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                showViewImageModal(photos) {
                this.$vc.emit('viewImageModal', 'view', photos);
            },_listAuditOrders:function (_page, _rows) {

                this.myAuditHistoryComplaintsInfo.conditions.page = _page;
                this.myAuditHistoryComplaintsInfo.conditions.row = _rows;
                this.myAuditHistoryComplaintsInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.myAuditHistoryComplaintsInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('myAuditHistoryComplaints',
                    'list',
                    param,
                    function (json, res) {
                        var _myAuditHistoryComplaintsInfo = JSON.parse(json);
                        this.myAuditHistoryComplaintsInfo.total = _myAuditHistoryComplaintsInfo.total;
                        this.myAuditHistoryComplaintsInfo.records = _myAuditHistoryComplaintsInfo.records;
                        this.myAuditHistoryComplaintsInfo.complaints = _myAuditHistoryComplaintsInfo.complaints;
                        this.$vc.emit('pagination', 'init', {
                            total: this.myAuditHistoryComplaintsInfo.records,
                            currentPage: _page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
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
    