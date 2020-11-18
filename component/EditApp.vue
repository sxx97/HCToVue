
        <template>
            <div id = "editAppModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改应用</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
         <label class="col-sm-2 col-form-label">应用名称</label>
         <div class="col-sm-10">
           <input v-model="editAppInfo.name"                   type="text" placeholder="必填，请填写应用名称" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">秘钥</label>
         <div class="col-sm-10">
           <input v-model="editAppInfo.securityCode"                   type="text" placeholder="选填，请填写秘钥" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">白名单</label>
         <div class="col-sm-10">
           <input v-model="editAppInfo.whileListIp"                   type="text" placeholder="选填，请填写白名单" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">黑名单</label>
         <div class="col-sm-10">
           <input v-model="editAppInfo.blackListIp"                   type="text" placeholder="选填，请填写黑名单" class="form-control">
         </div>
</div>
<div class="form-group row">
         <label class="col-sm-2 col-form-label">备注</label>
         <div class="col-sm-10">
<textarea  placeholder="选填，请填写备注" class="form-control" v-model="editAppInfo.remark"></textarea>         </div>
</div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editApp()" ><i class="fa fa-check"></i>&nbsp;保存</button>
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
            props: {},
            components: {
                
            },
            data () {
                return {"editAppInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('editApp', 'openEditAppModal', function (_params) {
                this.refreshEditAppInfo();
                $('#editAppModel').modal('show');
                this.editAppInfo = _params;
                //this.editAppInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
            },
            methods: {
                editAppValidate:function () {
                return this.$vc.validate.validate({
                    editAppInfo: this.editAppInfo
                }, {
                    'editAppInfo.name': [
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
                    'editAppInfo.securityCode': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "秘钥太长超过64位"
                        },
                    ],
                    'editAppInfo.whileListIp': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "白名单内容不能超过200"
                        },
                    ],
                    'editAppInfo.blackListIp': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "黑名单内容不能超过200"
                        },
                    ],
                    'editAppInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],
                    'editAppInfo.appId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "应用Id不能为空"
                        }]

                });
            },editApp:function () {
                if (!this.editAppValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post(
                    'editApp',
                    'update',
                    JSON.stringify(this.editAppInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editAppModel').modal('hide');
                            this.$vc.emit('appManage', 'listApp', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditAppInfo:function () {
                this.editAppInfo = {
                    appId: '',
                    name: '',
                    securityCode: '',
                    whileListIp: '',
                    blackListIp: '',
                    remark: '',

                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    