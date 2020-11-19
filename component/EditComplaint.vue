
        <template>
            <div id="editComplaintModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     @click="showSearchAddressAliasPanel = false;"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">{{isEditModal ? '编辑' : '添加'}}投诉</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">投诉类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editComplaintInfo.typeCd">
                                        <option selected disabled value="">必填，请选择投诉类型</option>
                                        <option value="809003">清洁卫生</option>
                                        <option value="809004">维修</option>
                                        <option value="809005">保安</option>
                                        <option value="809006">设施设备</option>
                                        <option value="809007">物业人员</option>
                                        <option value="809008">其它</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">投诉人</label>
                                <div class="col-sm-10">
                                    <input v-model="editComplaintInfo.complaintName" type="text"
                                       placeholder="必填，请填写投诉人" class="form-control">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">投诉电话</label>
                                <div class="col-sm-10">
                                    <input v-model="editComplaintInfo.tel" type="text" placeholder="必填，请填写投诉电话"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">投诉内容</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="必填，请填写投诉内容" class="form-control"
                                              v-model="editComplaintInfo.context"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editComplaint()">
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
                    return {"isEditModal":false,"isRoom":false,"editComplaintInfo":{"complaintId":"","typeCd":"","complaintName":"","tel":"","context":"","submitterType":2}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('editComplaint', 'openEditComplaintModal',  (_params) => {
                console.log(_params, '传递到这的参数');
                $('#editComplaintModel').modal('show');
                this.refreshEditComplaintInfo();
                this.editComplaintInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (_params != null) {
                    this.isEditModal = true;
                    this.$vc.copyObject(_params, this.editComplaintInfo);
                }
            });
        })()   
                },
                methods: {
                    editComplaintValidate:function () {
                let rule = {

                    'editComplaintInfo.typeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉类型不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "投诉类型格式错误"
                        },
                    ],

                    'editComplaintInfo.complaintName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉人不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "投诉人不能大于200位"
                        },
                    ],
                    'editComplaintInfo.tel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉电话不能为空"
                        },
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "投诉电话格式错误"
                        },
                    ],
                    'editComplaintInfo.context': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉内容不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "4000",
                            errInfo: "投诉状态超过4000位"
                        },
                    ],

                };
                if (this.isEditModal) {
                    rule['editComplaintInfo.complaintId'] = [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投诉ID不能为空"
                        }];
                }
                return this.$vc.validate.validate(
                    {
                        editComplaintInfo: this.editComplaintInfo
                    },
                    rule);
            },editComplaint:function () {
                if (!this.editComplaintValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }
                let requestAllOptions = {
                    edit: {
                        component: 'editComplaint',
                        method: 'update',
                    },
                    add: {
                        component: 'addComplaintStepBinding',
                        method: 'binding',
                    }
                },
                requestUrl = requestAllOptions.edit,
                requestParams = this.editComplaintInfo;
                if (!this.isEditModal) {
                    requestUrl = requestAllOptions.add;
                    delete requestParams.complaintId;
                }
                this.$vc.http.post(
                    requestUrl.component,
                    requestUrl.method,
                    JSON.stringify(this.editComplaintInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editComplaintModel').modal('hide');
                            this.$vc.emit('complaintManage', 'listComplaint', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditComplaintInfo:function () {
                this.editComplaintInfo = {
                    complaintId: '',
                    typeCd: '',
                    complaintName: '',
                    tel: '',
                    context: '',
                    submitterType: 2,
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    