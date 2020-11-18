
        <template>
            <div id="addServiceProvideModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加服务提供</h3>
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
                                <label class="col-sm-2 col-form-label">服务名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceProvideInfo.name" type="text" placeholder="必填，请填写服务名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">服务编码</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceProvideInfo.serviceCode" type="text"
                                           placeholder="必填，请填写服务编码" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">参数</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceProvideInfo.params" type="text" placeholder="必填，请填写参数"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">实现方式</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addServiceProvideInfo.queryModel">
                                        <option selected disabled value="">必填，请选择实现方式</option>
                                        <option value="1">sql方式</option>
                                        <option value="3">java方式</option>
                                        <option value="2">存储过程方式</option>
                                    </select></div>
                            </div>
                            <div class="form-group row" v-if="addServiceProvideInfo.queryModel==1">
                                <label class="col-sm-2 col-form-label">sql</label>
                                <div class="col-sm-10">
                                    <textarea rows="10" placeholder="选填，请填写sql" class="form-control"
                                              v-model="addServiceProvideInfo.sql"></textarea></div>
                            </div>
                            <div class="form-group row" v-if="addServiceProvideInfo.queryModel==1">
                                <label class="col-sm-2 col-form-label">输出模板</label>
                                <div class="col-sm-10">
                                    <textarea rows="10" placeholder="选填，请填写输出模板" class="form-control"
                                              v-model="addServiceProvideInfo.template"></textarea></div>
                            </div>
                            <div class="form-group row" v-if="addServiceProvideInfo.queryModel==2">
                                <label class="col-sm-2 col-form-label">存储过程</label>
                                <div class="col-sm-10">
                                    <textarea rows="10" placeholder="选填，请填写存储过程" class="form-control"
                                              v-model="addServiceProvideInfo.proc"></textarea></div>
                            </div>
                            <div class="form-group row" v-if="addServiceProvideInfo.queryModel==3">
                                <label class="col-sm-2 col-form-label">java</label>
                                <div class="col-sm-10">
                                    <textarea rows="10" placeholder="选填，请填写java" class="form-control"
                                              v-model="addServiceProvideInfo.javaScript"></textarea></div>
                            </div>
                            <div class="form-group row" >
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="addServiceProvideInfo.remark"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveServiceProvideInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
                return {"addServiceProvideInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('addServiceProvide', 'openAddServiceProvideModal', function () {
                $('#addServiceProvideModel').modal('show');
            });
        })()   
            },
            methods: {
                addServiceProvideValidate:function() {
                return this.$vc.validate.validate({
                    addServiceProvideInfo: this.addServiceProvideInfo
                }, {
                    'addServiceProvideInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "服务名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "服务名称必须在2至50字符之间"
                        },
                    ],
                    'addServiceProvideInfo.serviceCode': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "服务编码不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "服务编码必须在2至50字符之间"
                        },
                    ],
                    'addServiceProvideInfo.params': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "参数不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "500",
                            errInfo: "参数内容不能超过200"
                        },
                    ],
                    'addServiceProvideInfo.queryModel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "实现方式不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,12",
                            errInfo: "实现方式错误"
                        },
                    ],
                    'addServiceProvideInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],


                });
            },saveServiceProvideInfo:function () {
                if (!this.addServiceProvideValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                //this.addServiceProvideInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addServiceProvideInfo);
                    $('#addServiceProvideModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addServiceProvide',
                    'save',
                    JSON.stringify(this.addServiceProvideInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addServiceProvideModel').modal('hide');
                            this.clearAddServiceProvideInfo();
                            this.$vc.emit('serviceProvideManage', 'listServiceProvide', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddServiceProvideInfo:function () {
                this.addServiceProvideInfo = {
                    name: '',
                    serviceCode: '',
                    params: '',
                    queryModel: '',
                    sql: '',
                    template: '',
                    proc: '',
                    javaScript: '',
                    remark: '',

                };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    