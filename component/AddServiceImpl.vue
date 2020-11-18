
        <template>
            <div id="addServiceImplModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加服务实现</h3>
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
                                <label class="col-sm-2 col-form-label">业务类型</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceImplInfo.businessTypeCd" type="text" placeholder="必填，请填写业务类型" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">业务名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceImplInfo.name" type="text" placeholder="必填，请填写业务名称" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">调用类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addServiceImplInfo.invokeType">
                                        <option selected disabled value="">必填，请选择调用类型</option>
                                        <option value="1">微服务POST方式</option>
                                        <option value="2">webservice方式</option>
                                        <option value="3">http post方式</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">调用地址</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceImplInfo.url" type="text" placeholder="必填，请填写调用地址" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">kafka主题</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceImplInfo.messageTopic" type="text" placeholder="选填，请填写kafka主题" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">超时时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceImplInfo.timeout" type="text" placeholder="必填，请填写超时时间" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">重试次数</label>
                                <div class="col-sm-10">
                                    <input v-model="addServiceImplInfo.retryCount" type="text" placeholder="必填，请填写重试次数" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control" v-model="addServiceImplInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveServiceImplInfo()"><i class="fa fa-check"></i>&nbsp;保存</button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" data-dismiss="modal">取消</button>
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
                return {"addServiceImplInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('addServiceImpl', 'openAddServiceImplModal', function () {
                $('#addServiceImplModel').modal('show');
            });
        })()   
            },
            methods: {
                addServiceImplValidate() {
                return this.$vc.validate.validate({
                    addServiceImplInfo: this.addServiceImplInfo
                }, {

                    'addServiceImplInfo.businessTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "业务类型不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "业务类型必须在2至50字符之间"
                        },
                    ],
                    'addServiceImplInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "业务名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "业务类型必须在2至50字符之间"
                        },
                    ],
                    'addServiceImplInfo.invokeType': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "调用类型不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,4",
                            errInfo: "调用类型错误"
                        },
                    ],
                    'addServiceImplInfo.url': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "调用地址不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "调用地址超过200位"
                        },
                    ],
                    'addServiceImplInfo.messageTopic': [
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "kafka主题不能超过50"
                        },
                    ],
                    'addServiceImplInfo.timeout': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "超时时间不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "超时时间必须为数字"
                        },
                    ],
                    'addServiceImplInfo.retryCount': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "重试次数不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "重试次数必须为数字"
                        },
                    ],
                    'addServiceImplInfo.description': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],


                });
            },saveServiceImplInfo:function () {
                if (!this.addServiceImplValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addServiceImplInfo);
                    $('#addServiceImplModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addServiceImpl',
                    'save',
                    JSON.stringify(this.addServiceImplInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addServiceImplModel').modal('hide');
                            this.clearAddServiceImplInfo();
                            this.$vc.emit('serviceImplManage', 'listServiceImpl', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddServiceImplInfo:function () {
                this.addServiceImplInfo = {
                    serviceBusinessId: '',
                    businessTypeCd: '',
                    name: '',
                    invokeType: '',
                    url: '1000',
                    messageTopic: '',
                    timeout: '60',
                    retryCount: '3',
                    description: '',

                };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    