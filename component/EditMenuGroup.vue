
        <template>
            <div id="editMenuGroupModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改菜单组</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">组名称</label>
                                <div class="col-sm-10">
                                    <input v-model="editMenuGroupInfo.name" type="text" placeholder="必填，请填写组名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">icon</label>
                                <div class="col-sm-10">
                                    <input v-model="editMenuGroupInfo.icon" type="text" placeholder="必填，请填写icon"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">标签</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editMenuGroupInfo.label">
                                        <option selected disabled value="">可填，请选择标签</option>
                                        <option value="">无</option>
                                        <option value="HOT">HOT</option>
                                        <option value="TOP">TOP</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">序列</label>
                                <div class="col-sm-10">
                                    <input v-model="editMenuGroupInfo.seq" type="text" placeholder="必填，请填写序列"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="editMenuGroupInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editMenuGroup()">
                                    <i class="fa fa-check"></i>&nbsp;保存
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
                return {"editMenuGroupInfo":"[object Object]"}    
            },
            mounted() {
             (function() {

})()(function() {
            this.$vc.on('editMenuGroup', 'openEditMenuGroupModal',
            function(_params) {
                this.refreshEditMenuGroupInfo();
                $('#editMenuGroupModel').modal('show');
                this.$vc.copyObject(_params, this.editMenuGroupInfo);
                //this.editMenuGroupInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
            },
            methods: {
                editMenuGroupValidate:function() {
                return this.$vc.validate.validate({
                    editMenuGroupInfo: this.editMenuGroupInfo
                },
                {
                    'editMenuGroupInfo.name': [{
                        limit: "required",
                        param: "",
                        errInfo: "组名称不能为空"
                    },
                    {
                        limit: "maxin",
                        param: "2,10",
                        errInfo: "组名称必须在2至10字符之间"
                    },
                    ],
                    'editMenuGroupInfo.icon': [{
                        limit: "required",
                        param: "",
                        errInfo: "icon不能为空"
                    },
                    {
                        limit: "maxin",
                        param: "2,20",
                        errInfo: "icon必须在2至20字符之间"
                    },
                    ],
                    'editMenuGroupInfo.label': [
                    {
                        limit: "maxLength",
                        param: "20",
                        errInfo: "标签错误"
                    },
                    ],
                    'editMenuGroupInfo.seq': [{
                        limit: "required",
                        param: "",
                        errInfo: "序列不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "序列必须为整数"
                    },
                    ],
                    'editMenuGroupInfo.description': [{
                        limit: "maxLength",
                        param: "200",
                        errInfo: "备注内容不能超过200"
                    },
                    ],
                    'editMenuGroupInfo.gId': [{
                        limit: "required",
                        param: "",
                        errInfo: "组Id不能为空"
                    }]

                });
            },editMenuGroup:function() {
                if (!this.editMenuGroupValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post('editMenuGroup', 'update', JSON.stringify(this.editMenuGroupInfo), {
                    emulateJSON: true
                },
                function(json, res) {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#editMenuGroupModel').modal('hide');
                        this.$vc.emit('menuGroupManage', 'listMenuGroup', {});
                        return;
                    }
                    this.$vc.message(json);
                },
                function(errInfo, error) {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);
                });
            },refreshEditMenuGroupInfo:function() {
                this.editMenuGroupInfo = {
                    gId: '',
                    name: '',
                    icon: '',
                    label: '',
                    seq: '',
                    description: '',

                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    