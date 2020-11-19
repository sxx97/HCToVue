
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row" v-show="orgManageInfo.showBelongCommunity == false">
        <div class="col-lg-3">
            <div id="orgTree" class="" style="background: #fff;"></div>
        </div>
        <div class="col-lg-9">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h5>查询条件</h5>
                            <div class="ibox-tools" style="top:10px;">
                                <!--<button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                        v-on:click="_moreCondition()">{{orgManageInfo.moreCondition == true?'隐藏':'更多'}}
                                </button>-->
                            </div>
                        </div>
                        <div class="ibox-content">
                            <div class="row">
                               <!-- <div class="col-sm-4">
                                    <div class="form-group">
                                        <input type="text" placeholder="请输入组织ID"
                                               v-model="orgManageInfo.conditions.orgId"
                                               class=" form-control">
                                    </div>
                                </div>-->

                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <input type="text" placeholder="请输入组织名称"
                                               v-model="orgManageInfo.conditions.orgName"
                                               class=" form-control">
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="form-group">
                                        <input type="text" placeholder="请选择写字楼"
                                               v-model="orgManageInfo.conditions.communityId"
                                               class=" form-control">
                                    </div>
                                </div>

                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryOrgMethod()">
                                        <i class="glyphicon glyphicon-search"></i>
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
                            <h5>组织信息</h5>
                            <div class="ibox-tools" style="top:10px;">
                                <button type="button" class="btn btn-primary btn-sm" @click="_openAddOrgModal">
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
                                    <!--<th class="text-center">组织ID</th>-->
                                    <th class="text-center">组织名称</th>
                                    <th class="text-center">组织级别</th>
                                    <th class="text-center">上级组织</th>
                                    <th class="text-right">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="org in orgManageInfo.orgs">
                                    <!--<td class="text-center">{{org.orgId}}</td>-->
                                    <td class="text-center">{{org.orgName}}</td>
                                    <td class="text-center">{{org.orgLevelName}}</td>
                                    <td class="text-center">{{org.orgLevel == 1 ? '无' : org.parentOrgName}}</td>
                                    <td class="text-right">
                                        <!--<div v-if="org.allowOperation == 'F' && org.belongCommunityId == '9999'">
                                            隶属所有管理区
                                        </div>-->
                                        <div class="btn-group" v-if="org.allowOperation == 'T'">
                                            <button class="btn-white btn btn-xs" v-on:click="_openEditOrgModel(org)">
                                                修改
                                            </button>
                                        </div>
                                        <div class="btn-group" v-if="org.allowOperation == 'T'">
                                            <button class="btn-white btn btn-xs" v-on:click="_openDeleteOrgModel(org)">
                                                删除
                                            </button>
                                        </div>
                                        <!--<div class="btn-group" v-if="org.orgLevel == 2 && org.allowOperation == 'T'">
                                            <button class="btn-white btn btn-xs" v-on:click="_openBeyondCommunity(org)">
                                                隶属管理区
                                            </button>
                                        </div>-->
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
    </div>

    <!--<div  v-if="orgManageInfo.showBelongCommunity == true">
        <vc:create name="orgCommunityManage"></vc:create>
    </div>-->

    <vc:create name="addOrg"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <vc:create name="editOrg"></vc:create>
    <vc:create name="deleteOrg"></vc:create>


</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import OrgCommunityManage from '@/component/OrgCommunityManage.vue';import AddOrg from '@/component/AddOrg.vue';import EditOrg from '@/component/EditOrg.vue';import DeleteOrg from '@/component/DeleteOrg.vue';



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
                    Pagination,OrgCommunityManage,AddOrg,EditOrg,DeleteOrg
                },
                data () {
                    return {"orgManageInfo":{"orgs":[],"total":0,"records":1,"currentSelectOrgId":"-1","moreCondition":false,"showBelongCommunity":false,"orgName":"","headOrg":[],"branchOrg":[],"orgTree":[],"currentBelongCommunityId":"","conditions":{"orgId":"","orgName":"","communityId":"","orgLevel":"","parentOrgId":""}}}    
                },
                mounted() {
                ( () => {
            //只查 查询总公司级组织
            this.orgManageInfo.orgTree = [];
            this._listOrgTrees(this.orgManageInfo.orgTree, '1', '',  () => {
                this._loadBranchOrgTrees();
            });
            this._getOrgsByOrgLevel(DEFAULT_PAGE, DEFAULT_ROWS, 1, '');


        })()
( () => {

            this.$vc.on('orgManage', 'listOrg',  (_param) => {
                //this.$vc.copyObject(_param, this.orgManageInfo.conditions);
                this._listOrgs(DEFAULT_PAGE, DEFAULT_ROWS);
                this.orgManageInfo.orgTree = [];
                this._listOrgTrees(this.orgManageInfo.orgTree, '1', '',  () => {
                    this._loadBranchOrgTrees();
                });
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listOrgs(_currentPage, DEFAULT_ROWS);
            });
            this.$vc.on('orgManage','onBack',(_param) =>{
                 this.orgManageInfo.showBelongCommunity = false;
            })

        })()   
                },
                methods: {
                    _refreshOrgTree:function () {
                $('#orgTree').treeview({
                    data: this.orgManageInfo.orgTree,
                    selectedBackColor: '#1ab394'
                });
                $('#orgTree').on('nodeSelected',  (event, data) => {
                    console.log(event,data);
                    this.orgManageInfo.currentSelectOrgId = data.orgId;
                    this.orgManageInfo.conditions.orgLevel = (parseInt(data.orgLevel) + 1);
                    this.orgManageInfo.conditions.parentOrgId = data.orgId;
                    this.orgManageInfo.currentBelongCommunityId = data.belongCommunityId;
                    this._listOrgs(DEFAULT_PAGE, DEFAULT_ROWS);
                });
//                if(this.orgManageInfo.currentSelectOrgId == '-1'){
//                    console.log('是否进入');
//                    $('#orgTree').treeview("selectNode", [0]);
//                }
            },_loadBranchOrgTrees:function () {
                //默认查询分公司组织信息
                this._listOrgTrees(this.orgManageInfo.orgTree[0].nodes,
                    '2',
                    this.orgManageInfo.orgTree[0].orgId,
                     (_tmpOrgs) => {
                        this._refreshOrgTree();
                    });
            },_listOrgTrees:function (_nodes, _orgLevel, _parentOrgId, _callback) {
                var param = {
                    params: {
                        page: DEFAULT_PAGE,
                        row: ALL_ROWS,
                        orgLevel: _orgLevel,
                        parentOrgId: _parentOrgId
                    }
                };
                //发送get请求
                this.$vc.http.get('orgManage',
                    'list',
                    param,
                     (json, res) => {
                        var _tmpOrgs = JSON.parse(json).orgs;
                        _tmpOrgs.forEach( (_item) => {
                            var _selected = false;
                            var _currentSelectOrgId = this.orgManageInfo.currentSelectOrgId;
                            if(_currentSelectOrgId == '-1' && _orgLevel == 1){
                                _selected = true;
                                this.orgManageInfo.currentSelectOrgId = _item.orgId;
                                this.orgManageInfo.conditions.orgLevel = (parseInt(_item.orgLevel) + 1);
                                this.orgManageInfo.conditions.parentOrgId = _item.orgId;
                                this.orgManageInfo.currentBelongCommunityId = _item.belongCommunityId;
                                this._listOrgs(DEFAULT_PAGE, DEFAULT_ROWS);
                            }else if(_item.orgId == this.orgManageInfo.currentSelectOrgId){
                                _selected = true;
                            }
                            _nodes.push({
                                orgId: _item.orgId,
                                orgLevel: _orgLevel,
                                text: _item.orgLevelName + '|' + _item.orgName,
                                belongCommunityId:_item.belongCommunityId,
                                href: function (_item) {
                                },
                                state:{
                                    selected:_selected
                                },
                                tags: [0],
                                nodes: []
                            });
                            _callback();
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_listOrgs:function (_page, _rows) {

                this.orgManageInfo.conditions.page = _page;
                this.orgManageInfo.conditions.row = _rows;
                var param = {
                    params: this.orgManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('orgManage',
                    'list',
                    param,
                     (json, res) => {
                        var _orgManageInfo = JSON.parse(json);
                        this.orgManageInfo.total = _orgManageInfo.total;
                        this.orgManageInfo.records = _orgManageInfo.records;
                        this.orgManageInfo.orgs = _orgManageInfo.orgs;
                        this.$vc.emit('pagination', 'init', {
                            total: this.orgManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddOrgModal:function () {
                this.$vc.emit('addOrg', 'openAddOrgModal', {
                    parentOrgId: this.orgManageInfo.conditions.parentOrgId,
                    orgLevel: this.orgManageInfo.conditions.orgLevel,
                    belongCommunityId: this.orgManageInfo.currentBelongCommunityId
                });
            },_openEditOrgModel:function (_org) {
                this.$vc.emit('editOrg', 'openEditOrgModal', _org);
            },_openDeleteOrgModel:function (_org) {
                this.$vc.emit('deleteOrg', 'openDeleteOrgModal', _org);
            },_openBeyondCommunity:function(_org){
                this.orgManageInfo.showBelongCommunity = true;
                this.$vc.emit('orgCommunityManageInfo', 'openOrgCommunity',_org);
            },_queryOrgMethod:function () {
                this._listOrgs(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.orgManageInfo.moreCondition) {
                    this.orgManageInfo.moreCondition = false;
                } else {
                    this.orgManageInfo.moreCondition = true;
                }
            },_getOrgsByOrgLevel:function (_page, _rows, _orgLevel, _parentOrgId) {

                var param = {
                    params: {
                        page: _page,
                        row: _rows,
                        orgLevel: _orgLevel,
                        parentOrgId: _parentOrgId
                    }
                };

                //发送get请求
                this.$vc.http.get('orgManage',
                    'list',
                    param,
                     (json, res) => {
                        var _orgManageInfo = JSON.parse(json);
                        if (_orgLevel == 1) {
                            this.orgManageInfo.headOrg = _orgManageInfo.orgs;
                        } else {
                            this.orgManageInfo.branchOrg = _orgManageInfo.orgs;
                        }
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    