
        <template>
            <div id="addOrgModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加组织</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <template v-if="addOrgInfo.orgLevel == 2">
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">组织名称</label>
                                    <div class="col-sm-10">
                                        <input v-model="addOrgInfo.orgName" type="text" placeholder="必填，请填写组织名称"
                                               class="form-control">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">组织级别</label>
                                    <div class="col-sm-10">
                                        <select class="custom-select" v-model="addOrgInfo.orgLevel" disabled>
                                            <option selected disabled value="">必填，请选择部门</option>
                                            <option value="2">分公司级</option>
                                            <option value="3">部门级</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">选择管理区</label>
                                    <div class="col-sm-10">
                                        <select class="custom-select" v-model="checkedCommunity">
                                            <option selected disabled value="">必填，请选择管理区</option>
                                            <option v-for="community in communityList"
                                                :value="community">{{community.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">选择部门</label>
                                    <div class="col-sm-10">
                                        <select class="custom-select" v-model="addOrgInfo.department"
                                            @change="changeDepartmentForAddOrgComponent">
                                            <option selected disabled value="">必填，请选择组织级别</option>
                                            <option v-for="item in departmentList"
                                                :value="item.id">{{item.name}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </template>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">上级组织</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addOrgInfo.parentOrgId" disabled>
                                        <option selected disabled value="">必填，请选择上级组织</option>
                                        <option v-for="parentOrg in addOrgInfo.parentOrg" :value="parentOrg.orgId">{{parentOrg.orgName}}</option>
                                    </select></div>
                            </div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">隶属写字楼</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addOrgInfo.belongCommunityId" v-bind:disabled="addOrgInfo.orgLevel == 3">
                                        <option selected disabled value="">必填，请选择隶属写字楼</option>
                                        <option  value="9999">入驻所有写字楼</option>
                                        <option v-for="belongCommunity in addOrgInfo.belongCommunitys" :value="belongCommunity.communityId">
                                            {{belongCommunity.name}}
                                        </option>
                                    </select></div>
                            </div>-->
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="必填，请填写描述" class="form-control"
                                              v-model="addOrgInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveOrgInfo()"><i
                                        class="fa fa-check"></i>&nbsp;保存
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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"communityList":[],"checkedCommunity":{},"departmentList":[],"addOrgInfo":{"orgId":"","orgName":"","orgLevel":"","parentOrgId":"","description":"","belongCommunityId":"","parentOrg":[],"belongCommunitys":[],"department":null}}    
                },
                mounted() {
                ( () => {
            this.getCommunityList();
        })()
( () => {
            this.$vc.on('addOrg', 'openAddOrgModal',  (_param) => {
                if (_param.hasOwnProperty('parentOrgId')) {
                    this.addOrgInfo.parentOrgId = _param.parentOrgId;
                    this.addOrgInfo.orgLevel = _param.orgLevel;
                    if(_param.orgLevel == 3){ // 部门是不能改写字楼的，是依赖分公司的写字楼信息
                        this.addOrgInfo.belongCommunityId = _param.belongCommunityId;
                    }
                }
                //查询入驻的写字楼
                this._loadAddEnterCommunitys();
                this.getDepartmentList();
                $('#addOrgModel').modal('show');
            });
        })()   
                },
                methods: {
                    getDepartmentList() {
                this.$vc.http.get(
                    'departmentComponent',
                    'list',
                    {params: {}},
                     (json, res) => {
                        if (res.status === 200) {
                            this.departmentList = res.body;
                        }

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });
            },getCommunityList() {
                this.communityList = this.$vc.getCommunitys();
            },changeDepartmentForAddOrgComponent(e) {
                this.departmentList.forEach(val => {
                    if (this.addOrgInfo.department == val.id) {
                        this.addOrgInfo.orgName = val.name;
                    }
                })
            },addOrgValidate() {
                let rule = {
                    'addOrgInfo.orgLevel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "组织级别不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "组织级别错误"
                        },
                    ],
                    'addOrgInfo.parentOrgId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "上级ID不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "上级ID不正确"
                        },
                    ],
                    'addOrgInfo.description': [

                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "描述不能为空"
                        },
                    ],
                    'addOrgInfo.orgName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "组织名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "组织名称长度为2至50"
                        },
                    ]
                };
                if (this.addOrgInfo.orgLevel == 3) {
                    if (this.addOrgInfo.department == null) {
                        rule['addOrgInfo.department'] = [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "请选择部门"
                            },
                        ]
                    }
                }
                return this.$vc.validate.validate({
                    addOrgInfo: this.addOrgInfo
                }, rule);
            },saveOrgInfo:function () {
                if (!this.addOrgValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                if (this.addOrgInfo.orgLevel == 2) {
                    this.addOrgInfo.communityId = this.checkedCommunity.communityId;
                    this.addOrgInfo.communityName = this.checkedCommunity.name;
                }



                //this.addOrgInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addOrgInfo);
                    $('#addOrgModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addOrg',
                    'save',
                    JSON.stringify(this.addOrgInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addOrgModel').modal('hide');
                            this.clearAddOrgInfo();
                            this.$vc.emit('orgManage', 'listOrg', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddOrgInfo:function () {
                this.addOrgInfo = {
                    orgName: '',
                    orgLevel: '',
                    parentOrgId: '',
                    description: '',
                    parentOrg: [],
                    belongCommunityId: '',
                    communityId: '',
                    department: null,
                };
            },_addOrgListParentOrgInfo:function () {


                var _tmpOrgLevel = this.addOrgInfo.orgLevel;

                if (_tmpOrgLevel > 1) {
                    _tmpOrgLevel = _tmpOrgLevel - 1;
                }

                var param = {
                    params: {
                        orgLevel: _tmpOrgLevel,
                        page: 1,
                        row: 30,
                    }
                };

                //发送get请求
                this.$vc.http.get('addOrg',
                    'list',
                    param,
                     (json, res) => {
                        var _orgManageInfo = JSON.parse(json);
                        this.addOrgInfo.parentOrg = _orgManageInfo.orgs;
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_loadAddEnterCommunitys:function () {
                //belongCommunitys
                var param = {
                    params:{
                        _uid:'mmmllnnjhhjjh'
                    }
                }

                //发送get请求
                this.$vc.http.get('addOrg',
                    'listEnterCommunitys',
                    param,
                     (json, res) => {
                        var _enterCommunitys = JSON.parse(json);
                        this.addOrgInfo.belongCommunitys = _enterCommunitys;
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
    