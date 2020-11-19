
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row" v-if="applicationKeyManageInfo.showComponent == 'applicationKeyManage'">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{applicationKeyManageInfo.moreCondition ==
                            true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入名称"
                                       v-model="applicationKeyManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="applicationKeyManageInfo.conditions.typeCd">
                                <option selected value="">请选择用户类型</option>
                                <option value="10001">保洁</option>
                                <option value="10002">保安</option>
                                <option value="10003">其他人员</option>
                            </select></div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入用户手机"
                                       v-model="applicationKeyManageInfo.conditions.tel" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryApplicationKeyMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="applicationKeyManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入身份证号"
                                       v-model="applicationKeyManageInfo.conditions.idCard" class=" form-control">
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="applicationKeyManageInfo.showComponent == 'applicationKeyManage'">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>申请钥匙</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddApplicationKeyModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            申请
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">钥匙申请ID</th>
                            <th class="text-center">姓名</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">钥匙类型</th>
                            <!-- <th class="text-center">性别</th>
                             <th class="text-center">年龄</th>-->
                            <th class="text-center">密码</th>
                            <th class="text-center">身份证号</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="applicationKey in applicationKeyManageInfo.applicationKeys">
                            <td class="text-center">{{applicationKey.applicationKeyId}}</td>
                            <td class="text-center">{{applicationKey.name}}</td>
                            <td class="text-center">{{applicationKey.tel}}</td>
                            <td class="text-center">{{applicationKey.typeFlagName}}</td>
                            <!--<td class="text-center">{{applicationKey.sex}}</td>
                            <td class="text-center">{{applicationKey.age}}</td>-->
                            <td class="text-center">{{applicationKey.pwd}}</td>
                            <td class="text-center">{{applicationKey.idCard}}</td>
                            <td class="text-center">{{applicationKey.startTime}}</td>
                            <td class="text-center">{{applicationKey.endTime}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditApplicationKeyModel(applicationKey)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteApplicationKeyModel(applicationKey)">删除
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

    <div v-show="applicationKeyManageInfo.showComponent == 'addApplicationKey'">
        <vc:create name="addApplicationKey"
                   callBackListener=""
                   callBackFunction=""
        ></vc:create>
    </div>
    <div v-show="applicationKeyManageInfo.showComponent == 'editApplicationKey'">
        <vc:create name="editApplicationKey"></vc:create>
    </div>
    <vc:create name="deleteApplicationKey"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddApplicationKey from '@/component/AddApplicationKey.vue';import EditApplicationKey from '@/component/EditApplicationKey.vue';import DeleteApplicationKey from '@/component/DeleteApplicationKey.vue';



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
                    Pagination,AddApplicationKey,EditApplicationKey,DeleteApplicationKey
                },
                data () {
                    return {"applicationKeyManageInfo":{"applicationKeys":[],"total":0,"records":1,"moreCondition":false,"showComponent":"applicationKeyManage","name":"","conditions":{"name":"","typeCd":"","tel":"","idCard":""}}}    
                },
                mounted() {
                ( () => {
            this._listApplicationKeys(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('applicationKeyManage', 'listApplicationKey',  (_param) => {
                this._listApplicationKeys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listApplicationKeys(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listApplicationKeys:function (_page, _rows) {
                this.applicationKeyManageInfo.showComponent = 'applicationKeyManage';
                this.applicationKeyManageInfo.conditions.page = _page;
                this.applicationKeyManageInfo.conditions.row = _rows;
                this.applicationKeyManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.applicationKeyManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('applicationKeyManage',
                    'list',
                    param,
                     (json, res) => {
                        var _applicationKeyManageInfo = JSON.parse(json);
                        this.applicationKeyManageInfo.total = _applicationKeyManageInfo.total;
                        this.applicationKeyManageInfo.records = _applicationKeyManageInfo.records;
                        this.applicationKeyManageInfo.applicationKeys = _applicationKeyManageInfo.applicationKeys;
                        this.$vc.emit('pagination', 'init', {
                            total: this.applicationKeyManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddApplicationKeyModal:function () {
                //this.$vc.emit('addApplicationKey', 'openAddApplicationKeyModal', {});
                this.applicationKeyManageInfo.showComponent = 'addApplicationKey';
                this.$vc.emit('addApplicationKey', "_initAddApplicationKeyData", {});
            },_openEditApplicationKeyModel:function (_applicationKey) {
                this.$vc.emit('editApplicationKey', 'openEditApplicationKeyModal', _applicationKey);
                this.applicationKeyManageInfo.showComponent = 'editApplicationKey';
                this.$vc.emit('editApplicationKey', "_initEditApplicationKeyData", {});
            },_openDeleteApplicationKeyModel:function (_applicationKey) {
                this.$vc.emit('deleteApplicationKey', 'openDeleteApplicationKeyModal', _applicationKey);
            },_queryApplicationKeyMethod:function () {
                this._listApplicationKeys(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.applicationKeyManageInfo.moreCondition) {
                    this.applicationKeyManageInfo.moreCondition = false;
                } else {
                    this.applicationKeyManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    