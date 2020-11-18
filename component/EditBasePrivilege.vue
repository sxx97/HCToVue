
        <template>
            <div id="editBasePrivilegeModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改权限</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">权限名称</label>
                                <div class="col-sm-10">
                                    <input v-model="editBasePrivilegeInfo.name" type="text" placeholder="必填，请填写权限名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">资源路径</label>
                                <div class="col-sm-10">
                                    <input v-model="editBasePrivilegeInfo.resource" type="text" placeholder="必填，请填写资源路径"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">商户类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editBasePrivilegeInfo.domain">
                                        <option selected disabled value="">必填，请选择商户类型</option>
                                        <option value="800900000001">运营团队</option>
                                        <option value="800900000002">代理商</option>
                                        <option value="800900000003">物业</option>
                                        <option value="800900000000">开发团队</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="editBasePrivilegeInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="editBasePrivilege()"><i class="fa fa-check"></i>&nbsp;保存
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
                return {"editBasePrivilegeInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('editBasePrivilege', 'openEditBasePrivilegeModal', function (_params) {
                this.refreshEditBasePrivilegeInfo();
                $('#editBasePrivilegeModel').modal('show');
                this.$vc.copyObject(_params, this.editBasePrivilegeInfo);
                this.editBasePrivilegeInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
            },
            methods: {
                editBasePrivilegeValidate:function () {
                return this.$vc.validate.validate({
                    editBasePrivilegeInfo: this.editBasePrivilegeInfo
                }, {
                    'editBasePrivilegeInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "权限名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,10",
                            errInfo: "权限名称必须在2至10字符之间"
                        },
                    ],
                    'editBasePrivilegeInfo.resource': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "资源路径不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,200",
                            errInfo: "资源路径必须在2至200字符之间"
                        },
                    ],
                    'editBasePrivilegeInfo.domain': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "商户类型不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,12",
                            errInfo: "商户类型错误"
                        },
                    ],
                    'editBasePrivilegeInfo.description': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],
                    'editBasePrivilegeInfo.pId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "权限ID不能为空"
                        }]

                });
            },editBasePrivilege:function () {
                if (!this.editBasePrivilegeValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post(
                    'editBasePrivilege',
                    'update',
                    JSON.stringify(this.editBasePrivilegeInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editBasePrivilegeModel').modal('hide');
                            this.$vc.emit('basePrivilegeManage', 'listBasePrivilege', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditBasePrivilegeInfo:function () {
                this.editBasePrivilegeInfo = {
                    pId: '',
                    name: '',
                    domain: '',
                    description: '',
                    resource:''

                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    