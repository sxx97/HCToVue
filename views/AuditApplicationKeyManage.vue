
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{auditApplicationKeyManageInfo.moreCondition ==
                            true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入姓名"
                                       v-model="auditApplicationKeyManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入手机号码"
                                       v-model="auditApplicationKeyManageInfo.conditions.tel" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <select class="custom-select" v-model="auditApplicationKeyManageInfo.conditions.state">
                                    <option selected value="">请选择审核状态</option>
                                    <option value="10001">审核完成</option>
                                    <option value="10002">未审核</option>
                                    <option value="10003">审核拒绝</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryApplicationKeyMethod()"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>

                    </div>
                    <div class="row" v-if="auditApplicationKeyManageInfo.moreCondition == true">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <select class="custom-select" v-model="auditApplicationKeyManageInfo.conditions.typeCd">
                                    <option selected value="">请选择用户类型</option>
                                    <option value="10001">保洁</option>
                                    <option value="10002">保安</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入身份证号"
                                       v-model="auditApplicationKeyManageInfo.conditions.idCard" class=" form-control">
                            </div>
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
                    <h5>审核钥匙</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>姓名</th>
                            <th>手机号码</th>
                            <th>用户类型</th>
                            <th>身份证号</th>
                            <th>位置</th>
                            <th>申请时间</th>
                            <th>结束时间</th>
                            <th>状态</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="applicationKey in auditApplicationKeyManageInfo.applicationKeys">
                            <td>{{applicationKey.name}}</td>
                            <td>{{applicationKey.tel}}</td>
                            <td>{{applicationKey.typeCd}}</td>
                            <td>{{applicationKey.idCard}}</td>
                            <td>{{applicationKey.locationObjName}}</td>
                            <td>{{applicationKey.startTime}}</td>
                            <td>{{applicationKey.endTime}}</td>
                            <td>{{applicationKey.stateName}}</td>
                            <td>
                                <div class="btn-group" v-if="applicationKey.state == '10002'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openAuditApplicationKeyModal(applicationKey)">审核
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
               callBackListener="auditApplicationKeyManage"
               callBackFunction="notifyAuditInfo"
    ></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import Audit from '@/component/Audit.vue';



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
                    Pagination,Audit
                },
                data () {
                    return {"auditApplicationKeyManageInfo":{"applicationKeys":[],"total":0,"records":1,"currentApplicationKeyId":"","moreCondition":false,"conditions":{"name":"","tel":"","typeCd":"","idCard":"","state":"10002"}}}    
                },
                mounted() {
                ( () => {
            this._listAuditApplicationKeys(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {
            this.$vc.on('auditApplicationKeyManage', 'listApplicationKey',  (_param) => {
                this._listAuditApplicationKeys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('auditApplicationKeyManage', 'notifyAuditInfo',  (_auditInfo) => {
                this._auditApplicationKeyState(_auditInfo);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listAuditApplicationKeys(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listAuditApplicationKeys:function (_page, _rows) {

                this.auditApplicationKeyManageInfo.conditions.page = _page;
                this.auditApplicationKeyManageInfo.conditions.row = _rows;
                this.auditApplicationKeyManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.auditApplicationKeyManageInfo.conditions
                };
                //发送get请求
                this.$vc.http.get('auditApplicationKeyManage',
                    'list',
                    param,
                     (json, res) => {
                        var _auditApplicationKeyManageInfo = JSON.parse(json);
                        this.auditApplicationKeyManageInfo.total = _auditApplicationKeyManageInfo.total;
                        this.auditApplicationKeyManageInfo.records = _auditApplicationKeyManageInfo.records;
                        this.auditApplicationKeyManageInfo.applicationKeys = _auditApplicationKeyManageInfo.applicationKeys;
                        this.$vc.emit('pagination', 'init', {
                            total: this.auditApplicationKeyManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAuditApplicationKeyModal:function (_applicationKey) {
                this.auditApplicationKeyManageInfo.currentApplicationKeyId = _applicationKey.applicationKeyId;
                this.$vc.emit('audit', 'openAuditModal', {});
            },_auditApplicationKeyState:function (_auditInfo) {
                _auditInfo.applicationKeyId = this.auditApplicationKeyManageInfo.currentApplicationKeyId;
                _auditInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'auditApplicationKeyManage',
                    'audit',
                    JSON.stringify(_auditInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            this._listAuditApplicationKeys(DEFAULT_PAGE, DEFAULT_ROWS);
                            return;
                        }
                        this.$vc.message(json);
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });
            },_queryApplicationKeyMethod:function () {
                this._listAuditApplicationKeys(DEFAULT_PAGE, DEFAULT_ROWS);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    