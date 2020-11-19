
        <template>
            <div class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>投诉单信息</h5>
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
                            <th class="text-center">投诉人</th>
                            <th class="text-center">投诉电话</th>
                            <th class="text-center">投诉内容</th>
                            <th class="text-center">相关照片</th>
                            <th class="text-center">投诉状态</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="complaint in myAuditComplaintsInfo.complaints">
                            <!--<td class="text-center">{{complaint.complaintId}}</td>-->
                            <td class="text-center">{{complaint.createTime}}</td>
                            <td class="text-center">{{complaint.typeCdName}}</td>
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
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openAuditComplaintModel(complaint)">处理
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
    <vc:create name="audit"
       callBackListener="myAuditComplaints"
       callBackFunction="auditMessage">
    </vc:create>
    <vc:create name="viewImageModal"></vc:create>
</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import Audit from '@/component/Audit.vue';import ViewImageModal from '@/component/ViewImageModal.vue';



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
                    Pagination,Audit,ViewImageModal
                },
                data () {
                    return {"myAuditComplaintsInfo":{"complaints":[],"total":0,"records":1,"moreCondition":false,"currentTaskId":"","currentComplaintId":"","userName":"","conditions":{"AuditOrdersId":"","userName":"","auditLink":""}}}    
                },
                mounted() {
                ( () => {
            this._listAuditOrders(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {
            this.$vc.on('myAuditComplaints', 'auditMessage',  (_auditInfo) => {
                this._auditComplaintInfo(_auditInfo);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listAuditOrders(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    showViewImageModal(photos) {
                this.$vc.emit('viewImageModal', 'view', photos);
            },_listAuditOrders:function (_page, _rows) {

                this.myAuditComplaintsInfo.conditions.page = _page;
                this.myAuditComplaintsInfo.conditions.row = _rows;
                this.myAuditComplaintsInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.myAuditComplaintsInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('myAuditComplaints',
                    'list',
                    param,
                     (json, res) => {
                        var _myAuditComplaintsInfo = JSON.parse(json);
                        this.myAuditComplaintsInfo.total = _myAuditComplaintsInfo.total;
                        this.myAuditComplaintsInfo.records = _myAuditComplaintsInfo.records;
                        this.myAuditComplaintsInfo.complaints = _myAuditComplaintsInfo.complaints;
                        this.$vc.emit('pagination', 'init', {
                            total: this.myAuditComplaintsInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAuditComplaintModel:function (_complaintInfo) {
                //this.$vc.jumpToPage("/flow/addAuditOrderstepFlow")
                this.myAuditComplaintsInfo.currentTaskId = _complaintInfo.taskId;
                this.myAuditComplaintsInfo.currentComplaintId = _complaintInfo.complaintId;
                this.$vc.emit('audit', 'openAuditModal', {});
            },_queryAuditOrdersMethod:function () {
                this._listAuditOrders(DEFAULT_PAGE, DEFAULT_ROWS);
            },dateFormat(fmt) {
                let date = new Date();
                var o = {
                    "M+" : date.getMonth()+1,                 //月份
                    "d+" : date.getDate(),                    //日
                    "h+" : date.getHours(),                   //小时
                    "m+" : date.getMinutes(),                 //分
                    "s+" : date.getSeconds(),                 //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S"  : date.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt)) {
                    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                }
                for(var k in o) {
                    if(new RegExp("("+ k +")").test(fmt)){
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                    }
                }
                return fmt;
            },_auditComplaintInfo:function (_auditInfo) {
                _auditInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                _auditInfo.taskId = this.myAuditComplaintsInfo.currentTaskId;
                _auditInfo.complaintId = this.myAuditComplaintsInfo.currentComplaintId;
                _auditInfo.handleTime = this.dateFormat("yyyy-MM-dd hh:mm:ss");
                //发送get请求
                this.$vc.http.post('myAuditComplaints',
                    'audit',
                    JSON.stringify(_auditInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        this.$vc.message("处理成功");
                        this._listAuditOrders(DEFAULT_PAGE, DEFAULT_ROWS);
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                        this.$vc.message("处理失败：" + errInfo);
                    }
                );
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
    