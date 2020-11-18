
        <template>
            <div id="editOrgModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改组织</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <template v-if="editOrgInfo.orgLevel == 2 || editOrgInfo.orgLevel == 1">
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">组织名称</label>
                                    <div class="col-sm-10">
                                        <input v-model="editOrgInfo.orgName" type="text" placeholder="必填，请填写组织名称"
                                               class="form-control">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">组织级别</label>
                                    <div class="col-sm-10">
                                        <select class="custom-select" v-model="editOrgInfo.orgLevel" disabled>
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
                                        <select class="custom-select"
                                                v-model="editOrgInfo.department"
                                                @change="changeDepartment">
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
                                    <select class="custom-select" v-model="editOrgInfo.parentOrgId" disabled>
                                        <option selected disabled value="">必填，请选择上级组织</option>
                                        <option v-for="parentOrg in editOrgInfo.parentOrg" :value="parentOrg.orgId">{{parentOrg.orgName}}</option>
                                    </select></div>
                            </div>
                           <!-- <div class="form-group row">
                                <label class="col-sm-2 col-form-label">隶属写字楼</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editOrgInfo.belongCommunityId" v-bind:disabled="editOrgInfo.orgLevel == 3">
                                        <option selected disabled value="">必填，请选择隶属写字楼</option>
                                        <option  value="9999">入驻所有写字楼</option>
                                        <option v-for="belongCommunity in editOrgInfo.belongCommunitys" :value="belongCommunity.communityId">
                                            {{belongCommunity.name}}
                                        </option>
                                    </select></div>
                            </div>-->
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="必填，请填写描述" class="form-control"
                                              v-model="editOrgInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editOrg()"><i
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"communityList":"","checkedCommunity":"[object Object]","departmentList":"","editOrgInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._editOrgListParentOrgInfo();
            this.getCommunityList();
        })()(function () {
            this.$vc.on('editOrg', 'openEditOrgModal', function (_params) {
                this.refreshEditOrgInfo();
                this._loadEditEnterCommunitys();
                this.getDepartmentList();
                $('#editOrgModel').modal('show');
                console.log(_params, '查看传入的修改的组织信息');
                this.$vc.copyObject(_params, this.editOrgInfo);
                //this.editOrgInfo.communityId = this.editOrgInfo.belongCommunityId;
            });
        })()   
            },
            methods: {
                getDepartmentList() {
                this.$vc.http.get(
                    'departmentComponent',
                    'list',
                    {params: {}},
                    function (json, res) {
                        if (res.status === 200) {
                            this.departmentList = res.body;
                        }

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });
            },getCommunityList() {
                this.communityList = this.$vc.getCommunitys();
            },changeDepartment(e) {
                this.departmentList.forEach(val => {
                    if (this.editOrgInfo.department == val.id) {
                        this.editOrgInfo.orgName = val.name;
                    }
                })
            },editOrgValidate:function () {
                let rule = {
                    'editOrgInfo.orgName': [
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
                    ],
                    'editOrgInfo.orgLevel': [
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
                    'editOrgInfo.parentOrgId': [
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
                    'editOrgInfo.description': [

                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "描述不能为空"
                        },
                    ],
                    'editOrgInfo.belongCommunityId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "隶属写字楼不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "隶属写字楼不正确"
                        },
                    ],
                    'editOrgInfo.orgId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "组织ID不能为空"
                        }]

                };
                if (this.editOrgInfo.orgLevel == 3) {
                    if (this.editOrgInfo.department == null) {
                        rule['editOrgInfo.department'] = [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "请选择部门"
                            },
                        ]
                    }
                }
                return this.$vc.validate.validate({
                    editOrgInfo: this.editOrgInfo
                }, rule);
            },editOrg:function () {
                if (!this.editOrgValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }
                if (this.editOrgInfo.orgLevel == 2) {
                    this.editOrgInfo.communityId = this.checkedCommunity.communityId;
                    this.editOrgInfo.communityName = this.checkedCommunity.name;
                }

                this.$vc.http.post(
                    'editOrg',
                    'update',
                    JSON.stringify(this.editOrgInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editOrgModel').modal('hide');
                            this.$vc.emit('orgManage', 'listOrg', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });
            },refreshEditOrgInfo:function () {
                this.editOrgInfo = {
                    orgId: '',
                    orgName: '',
                    orgLevel: '',
                    parentOrgId: '',
                    description: '',
                    belongCommunityId: '',
                    communityId: '',
                    parentOrg: [],
                    belongCommunitys:[],
                    department: null,
                }
            },_editOrgListParentOrgInfo:function () {


                var _tmpOrgLevel = this.editOrgInfo.orgLevel;

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
                this.$vc.http.get('editOrg',
                    'list',
                    param,
                    function (json, res) {
                        var _orgManageInfo = JSON.parse(json);
                        this.editOrgInfo.parentOrg = _orgManageInfo.orgs;
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },_loadEditEnterCommunitys:function () {
                //belongCommunitys
                var param = {
                    params: {
                        _uid: 'mmmllnnjhhjjh'
                    }
                }

                //发送get请求
                this.$vc.http.get('editOrg',
                    'listEnterCommunitys',
                    param,
                    function (json, res) {
                        var _enterCommunitys = JSON.parse(json);
                        this.editOrgInfo.belongCommunitys = _enterCommunitys;
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    