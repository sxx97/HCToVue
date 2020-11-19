
        <template>
            <div id="editServiceProvideModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改服务提供</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">服务名称</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceProvideInfo.name" type="text" placeholder="必填，请填写服务名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">服务编码</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceProvideInfo.serviceCode" type="text"
                                           placeholder="必填，请填写服务编码" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">参数</label>
                                <div class="col-sm-10">
                                    <input v-model="editServiceProvideInfo.params" type="text" placeholder="必填，请填写参数"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">实现方式</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editServiceProvideInfo.queryModel">
                                        <option selected disabled value="">必填，请选择实现方式</option>
                                        <option value="1">sql方式</option>
                                        <option value="3">java方式</option>
                                        <option value="2">存储过程方式</option>
                                    </select></div>
                            </div>
                            <div class="form-group row" v-if="editServiceProvideInfo.queryModel==1">
                                <label class="col-sm-2 col-form-label">sql</label>
                                <div class="col-sm-10">
                                    <textarea rows="10" placeholder="选填，请填写sql" class="form-control"
                                              v-model="editServiceProvideInfo.sql"></textarea></div>
                            </div>
                            <div class="form-group row" v-if="editServiceProvideInfo.queryModel==1">
                                <label class="col-sm-2 col-form-label">输出模板</label>
                                <div class="col-sm-10">
                                    <textarea rows="10" placeholder="选填，请填写输出模板" class="form-control"
                                              v-model="editServiceProvideInfo.template"></textarea></div>
                            </div>
                            <div class="form-group row" v-if="editServiceProvideInfo.queryModel==2">
                                <label class="col-sm-2 col-form-label">存储过程</label>
                                <div class="col-sm-10">
                                    <textarea rows="10" placeholder="选填，请填写存储过程" class="form-control"
                                              v-model="editServiceProvideInfo.proc"></textarea></div>
                            </div>
                            <div class="form-group row" v-if="editServiceProvideInfo.queryModel==3">
                                <label class="col-sm-2 col-form-label">java</label>
                                <div class="col-sm-10">
                                    <textarea rows="10" placeholder="选填，请填写java" class="form-control"
                                              v-model="editServiceProvideInfo.javaScript"></textarea></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="editServiceProvideInfo.remark"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="editServiceProvide()"><i class="fa fa-check"></i>&nbsp;保存
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
                    return {"editServiceProvideInfo":{"id":"","name":"","serviceCode":"","params":"","queryModel":"","sql":"","template":"","proc":"","javaScript":"","remark":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('editServiceProvide', 'openEditServiceProvideModal',  (_params) => {
                this.refreshEditServiceProvideInfo();
                $('#editServiceProvideModel').modal('show');
                this.$vc.copyObject(_params, this.editServiceProvideInfo);
                //this.editServiceProvideInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    editServiceProvideValidate:function () {
                return this.$vc.validate.validate({
                    editServiceProvideInfo: this.editServiceProvideInfo
                }, {
                    'editServiceProvideInfo.name': [
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
                    'editServiceProvideInfo.serviceCode': [
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
                    'editServiceProvideInfo.params': [
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
                    'editServiceProvideInfo.queryModel': [
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
                    'editServiceProvideInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ],
                    'editServiceProvideInfo.id': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "提供ID不能为空"
                        }]

                });
            },editServiceProvide:function () {
                if (!this.editServiceProvideValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post(
                    'editServiceProvide',
                    'update',
                    JSON.stringify(this.editServiceProvideInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editServiceProvideModel').modal('hide');
                            this.$vc.emit('serviceProvideManage', 'listServiceProvide', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditServiceProvideInfo:function () {
                this.editServiceProvideInfo = {
                    id: '',
                    name: '',
                    serviceCode: '',
                    params: '',
                    queryModel: '',
                    sql: '',
                    template: '',
                    proc: '',
                    javaScript: '',
                    remark: '',

                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    