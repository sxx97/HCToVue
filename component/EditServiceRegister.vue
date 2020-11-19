
        <template>
            <div id="editServiceRegisterModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改服务绑定</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">应用ID</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceRegisterInfo.appId" readonly type="text" placeholder="必填，请填写应用ID"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">服务ID</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceRegisterInfo.serviceId" readonly type="text"
                                           placeholder="必填，请填写服务ID" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">订单类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editServiceRegisterInfo.orderTypeCd">
                                        <option selected disabled value="">必填，请选择订单类型</option>
                                        <option value="Q">查询</option>
                                        <option value="D">业务受理</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">调用次数</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceRegisterInfo.invokeLimitTimes" type="text"
                                           placeholder="必填，请填写调用次数" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">调用方式</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editServiceRegisterInfo.invokeModel">
                                        <option selected disabled value="">必填，请选择调用方式</option>
                                        <option value="S">同步方式</option>
                                        <option value="A">异步方式</option>
                                    </select></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="editServiceRegister()"><i class="fa fa-check"></i>&nbsp;保存
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"editServiceRegisterInfo":{"id":"","appId":"","serviceId":"","orderTypeCd":"","invokeLimitTimes":"1000","invokeModel":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('editServiceRegister', 'openEditServiceRegisterModal',  (_params) => {
                this.refreshEditServiceRegisterInfo();
                $('#editServiceRegisterModel').modal('show');
                this.$vc.copyObject(_params, this.editServiceRegisterInfo);
                this.editServiceRegisterInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    editServiceRegisterValidate:function () {
                return this.$vc.validate.validate({
                    editServiceRegisterInfo: this.editServiceRegisterInfo
                }, {
                    'editServiceRegisterInfo.appId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "应用ID不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "应用ID不能超过50位"
                        },
                    ],
                    'editServiceRegisterInfo.serviceId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "服务ID不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "服务ID不能超过50位"
                        },
                    ],
                    'editServiceRegisterInfo.orderTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "订单类型不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,4",
                            errInfo: "订单类型错误"
                        },
                    ],
                    'editServiceRegisterInfo.invokeLimitTimes': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "调用次数不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "调用次数错误"
                        },
                    ],
                    'editServiceRegisterInfo.invokeModel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "调用方式不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "消息队列不能超过50"
                        },
                    ],
                    'editServiceRegisterInfo.id': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "绑定ID不能为空"
                        }]

                });
            },editServiceRegister:function () {
                if (!this.editServiceRegisterValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post(
                    'editServiceRegister',
                    'update',
                    JSON.stringify(this.editServiceRegisterInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editServiceRegisterModel').modal('hide');
                            this.$vc.emit('serviceRegisterManage', 'listServiceRegister', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditServiceRegisterInfo:function () {
                this.editServiceRegisterInfo = {
                    id: '',
                    appId: '',
                    serviceId: '',
                    orderTypeCd: '',
                    invokeLimitTimes: '1000',
                    invokeModel: '',

                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    