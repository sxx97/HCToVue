
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
                                <input type="text" placeholder="请输入权限名称" v-model="basePrivilegeManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入权限编码" v-model="basePrivilegeManageInfo.conditions.pId" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-3">
                            <select class="custom-select" v-model="basePrivilegeManageInfo.conditions.domain">
                                <option selected value="">请选择商户类型</option>
                                <option value="800900000001">运营团队</option>
                                <option value="800900000002">代理商</option>
                                <option value="800900000003">物业</option>
                                <option value="800900000000">开发团队</option>
                            </select></div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryBasePrivilegeMethod()">
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
                    <h5>权限信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddBasePrivilegeModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加权限
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">权限ID</th>
                            <th class="text-center">权限名称</th>
                            <th class="text-center">资源路径</th>
                            <th class="text-center">商户类型</th>
                            <th class="text-center">创建时间</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="basePrivilege in basePrivilegeManageInfo.basePrivileges">
                            <td class="text-center">{{basePrivilege.pId}}</td>
                            <td class="text-center">{{basePrivilege.name}}</td>
                            <td class="text-center">{{basePrivilege.resource}}</td>
                            <td class="text-center">{{basePrivilege.domain}}</td>
                            <td class="text-center">{{basePrivilege.createTime}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditBasePrivilegeModel(basePrivilege)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteBasePrivilegeModel(basePrivilege)">删除</button>
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


    <vc:create name="addBasePrivilege"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <vc:create name="editBasePrivilege"></vc:create>
    <vc:create name="deleteBasePrivilege"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddBasePrivilege from '@/component/AddBasePrivilege.vue';import EditBasePrivilege from '@/component/EditBasePrivilege.vue';import DeleteBasePrivilege from '@/component/DeleteBasePrivilege.vue';



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
                    Pagination,AddBasePrivilege,EditBasePrivilege,DeleteBasePrivilege
                },
                data () {
                    return {"basePrivilegeManageInfo":{"basePrivileges":[],"total":0,"records":1,"moreCondition":false,"name":"","conditions":{"name":"","pId":"","domain":""}}}    
                },
                mounted() {
                ( () => {
            this._listBasePrivileges(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('basePrivilegeManage', 'listBasePrivilege',  (_param) => {
                this._listBasePrivileges(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listBasePrivileges(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listBasePrivileges:function (_page, _rows) {

                this.basePrivilegeManageInfo.conditions.page = _page;
                this.basePrivilegeManageInfo.conditions.row = _rows;
                var param = {
                    params: this.basePrivilegeManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('basePrivilegeManage',
                    'list',
                    param,
                     (json, res) => {
                        var _basePrivilegeManageInfo = JSON.parse(json);
                        this.basePrivilegeManageInfo.total = _basePrivilegeManageInfo.total;
                        this.basePrivilegeManageInfo.records = _basePrivilegeManageInfo.records;
                        this.basePrivilegeManageInfo.basePrivileges = _basePrivilegeManageInfo.basePrivileges;
                        this.$vc.emit('pagination', 'init', {
                            total: this.basePrivilegeManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddBasePrivilegeModal:function () {
                this.$vc.emit('addBasePrivilege', 'openAddBasePrivilegeModal', {});
            },_openEditBasePrivilegeModel:function (_basePrivilege) {
                this.$vc.emit('editBasePrivilege', 'openEditBasePrivilegeModal', _basePrivilege);
            },_openDeleteBasePrivilegeModel:function (_basePrivilege) {
                this.$vc.emit('deleteBasePrivilege', 'openDeleteBasePrivilegeModal', _basePrivilege);
            },_queryBasePrivilegeMethod:function () {
                this._listBasePrivileges(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.basePrivilegeManageInfo.moreCondition) {
                    this.basePrivilegeManageInfo.moreCondition = false;
                } else {
                    this.basePrivilegeManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    