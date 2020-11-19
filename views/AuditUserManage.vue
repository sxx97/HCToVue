
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
                            <div class="form-group">
                                <input type="text" placeholder="请输入审核ID"
                                       v-model="auditUserManageInfo.conditions.auditUserId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入审核人员"
                                       v-model="auditUserManageInfo.conditions.userName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="custom-select" v-model="auditUserManageInfo.conditions.auditLink">
                                <option selected value="">请选择审核环节</option>
                                <option value="809001">部门主管</option>
                                <option value="809002">财务主管</option>
                                <option value="809003">采购人员</option>
                            </select></div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryAuditUserMethod()">
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
                    <h5>审核人员信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddAuditUserModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">审核ID</th>
                            <th class="text-center">用户ID</th>
                            <th class="text-center">用户名称</th>
                            <th class="text-center">审核环节</th>
                            <th class="text-center">流程对象</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="auditUser in auditUserManageInfo.auditUsers">
                            <td class="text-center">{{auditUser.auditUserId}}</td>
                            <td class="text-center">{{auditUser.userId}}</td>
                            <td class="text-center">{{auditUser.userName}}</td>
                            <td class="text-center">{{auditUser.auditLinkName}}</td>
                            <td class="text-center">{{auditUser.objCodeName}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteAuditUserModel(auditUser)">删除
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


    <vc:create name="deleteAuditUser"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import DeleteAuditUser from '@/component/DeleteAuditUser.vue';



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
                    Pagination,DeleteAuditUser
                },
                data () {
                    return {"auditUserManageInfo":{"auditUsers":[],"total":0,"records":1,"moreCondition":false,"userName":"","conditions":{"auditUserId":"","userName":"","auditLink":""}}}    
                },
                mounted() {
                ( () => {
            this._listAuditUsers(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('auditUserManage', 'listAuditUser',  (_param) => {
                this._listAuditUsers(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listAuditUsers(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listAuditUsers:function (_page, _rows) {

                this.auditUserManageInfo.conditions.page = _page;
                this.auditUserManageInfo.conditions.row = _rows;
                var param = {
                    params: this.auditUserManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('auditUserManage',
                    'list',
                    param,
                     (json, res) => {
                        var _auditUserManageInfo = JSON.parse(json);
                        this.auditUserManageInfo.total = _auditUserManageInfo.total;
                        this.auditUserManageInfo.records = _auditUserManageInfo.records;
                        this.auditUserManageInfo.auditUsers = _auditUserManageInfo.auditUsers;
                        this.$vc.emit('pagination', 'init', {
                            total: this.auditUserManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddAuditUserModal:function () {
                this.$vc.jumpToPage("/flow/addAuditUserStepFlow")
            },_openDeleteAuditUserModel:function (_auditUser) {
                this.$vc.emit('deleteAuditUser', 'openDeleteAuditUserModal', _auditUser);
            },_queryAuditUserMethod:function () {
                this._listAuditUsers(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.auditUserManageInfo.moreCondition) {
                    this.auditUserManageInfo.moreCondition = false;
                } else {
                    this.auditUserManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    