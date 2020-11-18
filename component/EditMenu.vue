
        <template>
            <div id="editMenuModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改菜单</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">菜单名称</label>
                                <div class="col-sm-10">
                                    <input v-model="editMenuInfo.name" type="text" placeholder="必填，请填写菜单名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">菜单地址</label>
                                <div class="col-sm-10">
                                    <input v-model="editMenuInfo.url" type="text" placeholder="必填，请填写菜单地址"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">序列</label>
                                <div class="col-sm-10">
                                    <input v-model="editMenuInfo.seq" type="text" placeholder="必填，请填写序列"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">菜单显示</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editMenuInfo.isShow">
                                        <option selected disabled value="">必填，请选择菜单显示</option>
                                        <option value="Y">显示菜单</option>
                                        <option value="N">不显示菜单</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="editMenuInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editMenu()"><i
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
                return {"editMenuInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('editMenu', 'openEditMenuModal', function (_params) {
                this.refreshEditMenuInfo();
                $('#editMenuModel').modal('show');
                this.$vc.copyObject(_params, this.editMenuInfo);

            });
        })()   
            },
            methods: {
                editMenuValidate:function () {
                return this.$vc.validate.validate({
                    editMenuInfo: this.editMenuInfo
                }, {
                    'editMenuInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "菜单名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,10",
                            errInfo: "菜单名称必须在2至10字符之间"
                        },
                    ],
                    'editMenuInfo.url': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "菜单地址不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "菜单地址不能超过200"
                        },
                    ],
                    'editMenuInfo.seq': [
                        {
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
                    'editMenuInfo.isShow': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "菜单显示不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,12",
                            errInfo: "菜单显示错误"
                        },
                    ],
                    'editMenuInfo.description': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],
                    'editMenuInfo.mId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "菜单ID不能为空"
                        }]

                });
            },editMenu:function () {
                if (!this.editMenuValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post(
                    'editMenu',
                    'update',
                    JSON.stringify(this.editMenuInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editMenuModel').modal('hide');
                            this.$vc.emit('menuManage', 'listMenu', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditMenuInfo:function () {
                this.editMenuInfo = {
                    mId: '',
                    name: '',
                    url: '',
                    seq: '',
                    isShow: '',
                    description: '',

                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    