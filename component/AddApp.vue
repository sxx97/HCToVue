
        <template>
            <div id="addAppModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加应用</h3>
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
                                <label class="col-sm-2 col-form-label">应用名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addAppInfo.name" type="text" placeholder="必填，请填写应用名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">秘钥</label>
                                <div class="col-sm-10">
                                    <input v-model="addAppInfo.securityCode" type="text" placeholder="选填，请填写秘钥"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">白名单</label>
                                <div class="col-sm-10">
                                    <input v-model="addAppInfo.whileListIp" type="text" placeholder="选填，请填写白名单"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">黑名单</label>
                                <div class="col-sm-10">
                                    <input v-model="addAppInfo.blackListIp" type="text" placeholder="选填，请填写黑名单"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写备注" class="form-control"
                                              v-model="addAppInfo.remark"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveAppInfo()"><i
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
            props: {"callBackListener":"string","callBackFunction":"string"},
            components: {
                
            },
            data () {
                return {"addAppInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('addApp', 'openAddAppModal', function () {
                $('#addAppModel').modal('show');
            });
        })()   
            },
            methods: {
                addAppValidate() {
                return this.$vc.validate.validate({
                    addAppInfo: this.addAppInfo
                }, {
                    'addAppInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "应用名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "应用名称必须在2至50字符之间"
                        },
                    ],
                    'addAppInfo.securityCode': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "秘钥太长超过64位"
                        },
                    ],
                    'addAppInfo.whileListIp': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "白名单内容不能超过200"
                        },
                    ],
                    'addAppInfo.blackListIp': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "黑名单内容不能超过200"
                        },
                    ],
                    'addAppInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],


                });
            },saveAppInfo:function () {
                if (!this.addAppValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                //this.addAppInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addAppInfo);
                    $('#addAppModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addApp',
                    'save',
                    JSON.stringify(this.addAppInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addAppModel').modal('hide');
                            this.clearAddAppInfo();
                            this.$vc.emit('appManage', 'listApp', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddAppInfo:function () {
                this.addAppInfo = {
                    name: '',
                    securityCode: '',
                    whileListIp: '',
                    blackListIp: '',
                    remark: '',

                };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    