
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{complaintManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <!--<div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入投诉ID"
                                       v-model="complaintManageInfo.conditions.complaintId" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="complaintManageInfo.conditions.typeCd">
                                <option selected value="">请选择投诉类型</option>
                                <option value="809003">清洁卫生</option>
                                <option value="809004">维修</option>
                                <option value="809005">保安</option>
                                <option value="809006">设施设备</option>
                                <option value="809007">物业人员</option>
                                <option value="809008">其它</option>
                            </select></div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入投诉人"
                                       v-model="complaintManageInfo.conditions.complaintName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryComplaintMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="complaintManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入联系电话" v-model="complaintManageInfo.conditions.tel"
                                       class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-4" v-if="complaintManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入房间编号" v-model="complaintManageInfo.conditions.roomId"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3" v-if="complaintManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="complaintManageInfo.conditions.state">
                                <option selected value="">请选择投诉状态</option>
                                <option value="1100">派单</option>
                                <option value="1200">结单</option>
                            </select></div>-->
                        <div class="col-sm-1">
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
                    <h5>投诉建议信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddComplaintModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            投诉
                        </button>
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
                            <th class="text-center">处理时间</th>
                            <th class="text-center">结果</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="complaint in complaintManageInfo.complaints">
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
                            <td class="text-center">{{complaint.handleTime || '--'}}</td>
                            <td class="text-center">{{complaint.remark}}</td>

                            <td class="text-center">
                                <template v-if="complaint.submitterType == 2">
                                    <div class="btn-group">
                                        <button class="btn-white btn btn-xs"
                                                v-on:click="_openEditComplaintModel(complaint)">修改
                                        </button>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn-white btn btn-xs"
                                                v-on:click="_openDeleteComplaintModel(complaint)">删除
                                        </button>
                                    </div>
                                </template>
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

    <vc:create name="editComplaint"></vc:create>
    <vc:create name="deleteComplaint"></vc:create>

    <vc:create name="viewImageModal"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import EditComplaint from '@/component/EditComplaint.vue';import DeleteComplaint from '@/component/DeleteComplaint.vue';import ViewImageModal from '@/component/ViewImageModal.vue';



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
                    Pagination,EditComplaint,DeleteComplaint,ViewImageModal
                },
                data () {
                    return {"complaintManageInfo":{"complaints":[],"total":0,"records":1,"moreCondition":false,"complaintName":"","conditions":{"complaintId":"","typeCd":"","complaintName":"","tel":"","roomId":"","state":""}}}    
                },
                mounted() {
                ( () => {
            this._listComplaints(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('complaintManage', 'listComplaint',  (_param) => {
                this._listComplaints(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listComplaints(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    showViewImageModal(photos) {
                this.$vc.emit('viewImageModal', 'view', photos);
            },_listComplaints:function (_page, _rows) {

                this.complaintManageInfo.conditions.page = _page;
                this.complaintManageInfo.conditions.row = _rows;
                this.complaintManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.complaintManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('complaintManage',
                    'list',
                    param,
                     (json, res) => {
                        var _complaintManageInfo = JSON.parse(json);
                        this.complaintManageInfo.total = _complaintManageInfo.total;
                        this.complaintManageInfo.records = _complaintManageInfo.records;
                        this.complaintManageInfo.complaints = _complaintManageInfo.complaints;
                        this.$vc.emit('pagination', 'init', {
                            total: this.complaintManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddComplaintModal:function () {
                //this.$vc.emit('addComplaint', 'openAddComplaintModal', {});
                this.$vc.emit('editComplaint', 'openEditComplaintModal', null);
            },_openEditComplaintModel:function (_complaint) {
                this.$vc.emit('editComplaint', 'openEditComplaintModal', _complaint);
            },_openDeleteComplaintModel:function (_complaint) {
                this.$vc.emit('deleteComplaint', 'openDeleteComplaintModal', _complaint);
            },_queryComplaintMethod:function () {
                this._listComplaints(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.complaintManageInfo.moreCondition) {
                    this.complaintManageInfo.moreCondition = false;
                } else {
                    this.complaintManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    