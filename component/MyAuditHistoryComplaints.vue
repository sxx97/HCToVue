
        <template>
            <div class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>投诉历史单</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <!--<th class="text-center">投诉ID</th>-->
                            <th class="text-center">投诉时间</th>
                            <th class="text-center">投诉类型</th>
                            <th class="text-center">企业/房间</th>
                            <th class="text-center">投诉人</th>
                            <th class="text-center">投诉电话</th>
                            <th class="text-center">投诉内容</th>
                            <th class="text-center">相关照片</th>
                            <th class="text-center">投诉状态</th>
                            <th class="text-center">结果</th>
                           <!-- <th class="text-center">操作</th>-->
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="complaint in myAuditHistoryComplaintsInfo.complaints">
                            <!--<td class="text-center">{{complaint.complaintId}}</td>-->
                            <td class="text-center">{{complaint.createTime}}</td>
                            <td class="text-center">{{complaint.typeCdName}}</td>
                            <td class="text-center">
                                <template v-if="complaint.addressAlias">
                                    {{complaint.addressAlias}}
                                </template>
                                <template v-else>
                                    {{complaint.floorNum}}号楼{{complaint.unitNum}}单元{{complaint.roomNum}}室
                                </template>
                            </td>
                            <td class="text-center">{{complaint.complaintName}}</td>
                            <td class="text-center">{{complaint.tel}}</td>
                            <td class="text-center">{{complaint.context}}</td>
                            <td class="text-center">
                                <template v-if="complaint.photos">
                                    <img @click="showViewImageModal(complaint.photos)"
                                        style="max-width:150px;max-height: 150px;" :src="complaint.photos.split(',')[0]" alt="">
                                </template>
                                <template v-else>
                                    ---
                                </template>
                            </td>
                            <td class="text-center">{{complaint.stateName}}</td>
                            <td class="text-center">{{complaint.remark}}</td>
                            <!--<td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openAuditComplaintModel(complaint)">审核
                                    </button>
                                </div>
                            </td>-->

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
    <ViewImageModal name="viewImageModal"></ViewImageModal>
</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import ViewImageModal from './ViewImageModal.vue';
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
    