
        <template>
            <div id="auditModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">{{callBackListener == 'myAuditComplaints' ? '处理' : '审核信息'}}</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">{{callBackListener == 'myAuditComplaints' ? '处理' : '审核状态'}}</label>
                                <div class="col-sm-10">
                                    <template v-if="callBackListener == 'myAuditComplaints'">
                                        <select class="custom-select" v-model="auditInfo.state">
                                            <option selected disabled value="">请处理</option>
                                            <option value="10002">已处理</option>
                                            <option value="10003">无效</option>
                                        </select>
                                    </template>
                                    <template v-else>
                                        <select class="custom-select" v-model="auditInfo.state">
                                            <option selected disabled value="">请审核</option>
                                            <option value="1100">同意</option>
                                            <option value="1200">拒绝</option>
                                        </select>
                                    </template>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">{{callBackListener == 'myAuditComplaints' ? '结果' : '原因'}}</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写原因" class="form-control"
                                              v-model="auditInfo.remark"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="_auditSubmit()"><i class="fa fa-check"></i>&nbsp;提交
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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    
                },
                data () {
                    return {"auditInfo":{"state":"","remark":""},"callBackListener":"undefined"}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('audit', 'openAuditModal',  () => {
                $('#auditModel').modal('show');
            });
        })()   
                },
                methods: {
                    auditValidate() {
                return this.$vc.validate.validate({
                    auditInfo: this.auditInfo
                }, {
                    'auditInfo.state': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "审核状态不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "审核状态错误"
                        },
                    ],
                    'auditInfo.remark': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "原因内容不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "原因内容不能超过200"
                        },
                    ]
                });
            },_auditSubmit:function () {
                if (!this.auditValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.auditInfo);
                    $('#auditModel').modal('hide');

                    this.clearAddBasePrivilegeInfo();
                    return;
                }


            },clearAddBasePrivilegeInfo:function () {
                this.auditInfo = {
                    state: '',
                    remark: ''
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    