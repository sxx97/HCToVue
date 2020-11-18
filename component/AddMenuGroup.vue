
        <template>
            <div id="addMenuGroupModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加菜单组</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼名称</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.name" type="text" placeholder="必填，请填写名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">楼编号</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.floorNum" type="email" placeholder="必填，请填写编号" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addFloorInfo.remark" type="tel" placeholder="可填，请填写备注" class="form-control"></div>
                            </div>-->

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">组名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addMenuGroupInfo.name" type="text" placeholder="必填，请填写组名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">icon</label>
                                <div class="col-sm-10">
                                    <input v-model="addMenuGroupInfo.icon" type="text" placeholder="必填，请填写icon"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">标签</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addMenuGroupInfo.label">
                                        <option selected disabled value="">选填，请选择标签</option>
                                        <option value="">无</option>
                                        <option value="HOT">HOT</option>
                                        <option value="TOP">TOP</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">序列</label>
                                <div class="col-sm-10">
                                    <input v-model="addMenuGroupInfo.seq" type="text" placeholder="必填，请填写序列"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="addMenuGroupInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveMenuGroupInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"addMenuGroupInfo":"[object Object]"}    
            },
            mounted() {
             (function() {

})()(function() {
            this.$vc.on('addMenuGroup', 'openAddMenuGroupModal',
            function() {
                $('#addMenuGroupModel').modal('show');
            });
        })()   
            },
            methods: {
                addMenuGroupValidate() {
                return this.$vc.validate.validate({
                    addMenuGroupInfo: this.addMenuGroupInfo
                },
                {
                    'addMenuGroupInfo.name': [{
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
                    'addMenuGroupInfo.icon': [{
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
                    'addMenuGroupInfo.label': [,
                    {
                        limit: "maxLength",
                        param: "20",
                        errInfo: "标签错误"
                    },
                    ],
                    'addMenuGroupInfo.seq': [{
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
                    'addMenuGroupInfo.description': [{
                        limit: "maxLength",
                        param: "200",
                        errInfo: "备注内容不能超过200"
                    },
                    ],

                });
            },saveMenuGroupInfo:function() {
                if (!this.addMenuGroupValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                //this.addMenuGroupInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addMenuGroupInfo);
                    $('#addMenuGroupModel').modal('hide');
                    return;
                }

                this.$vc.http.post('addMenuGroup', 'save', JSON.stringify(this.addMenuGroupInfo), {
                    emulateJSON: true
                },
                function(json, res) {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#addMenuGroupModel').modal('hide');
                        this.clearAddMenuGroupInfo();
                        this.$vc.emit('menuGroupManage', 'listMenuGroup', {});

                        return;
                    }
                    this.$vc.message(json);

                },
                function(errInfo, error) {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);

                });
            },clearAddMenuGroupInfo:function() {
                this.addMenuGroupInfo = {
                    name: '',
                    icon: '',
                    label: '',
                    seq: '',
                    description: '',

                };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    