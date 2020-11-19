
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>添加审核人员</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">用户ID</label>
                    <div class="col-sm-10">
                        <input v-model="addAuditUserOtherViewInfo.userId" readonly type="text" placeholder="必填，请填写用户ID"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">用户名称</label>
                    <div class="col-sm-10">
                        <input v-model="addAuditUserOtherViewInfo.userName" readonly type="text" placeholder="必填，请填写用户名称"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">审核环节</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addAuditUserOtherViewInfo.auditLink">
                            <option selected disabled value="">必填，请选择审核环节</option>
                            <option value="809001">部门主管</option>
                            <option value="809002">财务主管</option>
                            <option value="809003">采购人员</option>
                            <option value="809004">投诉处理人员</option>
                        </select></div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">流程对象</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addAuditUserOtherViewInfo.objCode">
                            <option selected disabled value="">必填，请选择审核流程</option>
                            <option value="resourceEntry">采购流程</option>
                            <option value="resourceOut">出库流程</option>
                            <option value="complaint">投诉流程</option>
                        </select></div>
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
                    return {"addAuditUserOtherViewInfo":{"flowComponent":"addAuditUserOtherView","userId":"","userName":"","auditLink":"","objCode":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {

            this.$vc.on('addAuditUserOtherViewInfo', 'onIndex',  (_index) => {
                this.addAuditUserOtherViewInfo.index = _index;
            });

            this.$vc.on('addAuditUserOtherViewInfo', '_clear',  (_staffInfo) => {
                this.addAuditUserOtherViewInfo= {
                    flowComponent: 'addAuditUserOtherView',
                    userId: _staffInfo.userId,
                    userName: _staffInfo.name,
                    auditLink: '',
                    objCode: '',
                };
            });
        })()   
                },
                methods: {
                    addAuditUserOtherValidate() {
                return this.$vc.validate.validate({
                    addAuditUserOtherViewInfo: this.addAuditUserOtherViewInfo
                }, {
                    'addAuditUserOtherViewInfo.userId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "用户ID不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "用户ID必须为数字"
                        },
                    ],
                    'addAuditUserOtherViewInfo.userName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "用户名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "用户名称必须在2至50字符之间"
                        },
                    ],
                    'addAuditUserOtherViewInfo.auditLink': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "审核环节不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "审核环节格式错误"
                        },
                    ],
                    'addAuditUserOtherViewInfo.objCode': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "流程对象不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "物品库存不能大于64位"
                        },
                    ],

                });
            },saveAddAuditUserOtherInfo:function () {
                if (this.addAuditUserOtherValidate()) {
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addAuditUserOtherViewInfo);
                    return;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    