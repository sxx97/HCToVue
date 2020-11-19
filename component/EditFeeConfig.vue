
        <template>
            <div id="editFeeConfigModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改费用项</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">费用类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-bind:disabled = "editFeeConfigInfo.isDefault=='T'" v-model="editFeeConfigInfo.feeTypeCd">
                                        <option selected disabled value="">必填，请选择费用类型</option>
                                        <option v-for="(item,index) in editFeeConfigInfo.feeTypeCds" :key="index"
                                                v-bind:value="item.statusCd">{{item.name}}
                                        </option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">收费项目</label>
                                <div class="col-sm-10">
                                    <input v-model="editFeeConfigInfo.feeName" v-bind:disabled = "editFeeConfigInfo.isDefault=='T'" type="text" placeholder="必填，请填写收费项目"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">费用标识</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-bind:disabled = "editFeeConfigInfo.isDefault=='T'" v-model="editFeeConfigInfo.feeFlag">
                                        <option selected disabled value="">必填，请选择费用标识</option>
                                        <option value="1003006">周期性费用</option>
                                        <option value="2006012">一次性费用</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">计费起始时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editFeeConfigInfo.startTime" type="text" placeholder="必填，请填写计费起始时间"
                                           class="form-control editFeeConfigStartTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">计费终止时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editFeeConfigInfo.endTime" type="text" placeholder="必填，请填写计费终止时间"
                                           class="form-control editFeeConfigEndTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">计算公式</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-bind:disabled = "editFeeConfigInfo.isDefault=='T'" v-model="editFeeConfigInfo.computingFormula">
                                        <option selected disabled value="">必填，请选择计算公式</option>
                                        <option v-for="(item,index) in editFeeConfigInfo.computingFormulas" :key="index"
                                                v-bind:value="item.statusCd">{{item.name}}
                                        </option>
                                    </select></div>
                            </div>
                            <div class="form-group row" v-if="editFeeConfigInfo.computingFormula != '2002'">
                                <label class="col-sm-2 col-form-label">计费单价</label>
                                <div class="col-sm-10">
                                    <input v-model="editFeeConfigInfo.squarePrice" type="text" placeholder="必填，请填写计费单价"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">{{editFeeConfigInfo.computingFormula == '1001' ?'附加费用':'固定费用'}}</label>
                                <div class="col-sm-10">
                                    <input v-model="editFeeConfigInfo.additionalAmount" type="text"
                                           placeholder="必填，请填写附加费用" class="form-control">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editFeeConfig()">
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
                    return {"editFeeConfigInfo":{"configId":"","feeTypeCd":"","feeName":"","feeFlag":"","startTime":"","endTime":"","computingFormula":"","squarePrice":"","additionalAmount":"0.00","isDefault":"","feeTypeCds":[],"computingFormulas":[]}}    
                },
                mounted() {
                (() => {
            this._initEditFeeConfigDateInfo();
            this.$vc.getDict('pay_fee_config',"fee_type_cd",(_data) =>{
                this.editFeeConfigInfo.feeTypeCds = _data;
            });
            this.$vc.getDict('pay_fee_config',"computing_formula",(_data) =>{
                this.editFeeConfigInfo.computingFormulas = _data;
            });
        })()
(() => {
            this.$vc.on('editFeeConfig', 'openEditFeeConfigModal',
            (_params) => {
                this.refreshEditFeeConfigInfo();
                $('#editFeeConfigModel').modal('show');
                this.$vc.copyObject(_params, this.editFeeConfigInfo);
                this.editFeeConfigInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    _initEditFeeConfigDateInfo:function () {
                this.editFeeConfigInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.editFeeConfigStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.editFeeConfigStartTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".editFeeConfigStartTime").val();
                        this.editFeeConfigInfo.startTime = value;
                    });
                $('.editFeeConfigEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editFeeConfigEndTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".editFeeConfigEndTime").val();
                        this.editFeeConfigInfo.endTime = value;
                    });
            },editFeeConfigValidate:function() {
                return this.$vc.validate.validate({
                    editFeeConfigInfo: this.editFeeConfigInfo
                },
                {
                    'editFeeConfigInfo.feeTypeCd': [{
                        limit: "required",
                        param: "",
                        errInfo: "费用类型不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "费用类型格式错误"
                    },
                    ],
                    'editFeeConfigInfo.feeName': [{
                        limit: "required",
                        param: "",
                        errInfo: "收费项目不能为空"
                    },
                    {
                        limit: "maxin",
                        param: "1,100",
                        errInfo: "收费项目不能超过100位"
                    },
                    ],
                    'editFeeConfigInfo.feeFlag': [{
                        limit: "required",
                        param: "",
                        errInfo: "费用标识不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "费用类型格式错误"
                    },
                    ],
                    'editFeeConfigInfo.startTime': [{
                        limit: "required",
                        param: "",
                        errInfo: "计费起始时间不能为空"
                    },
                    {
                        limit: "dateTime",
                        param: "",
                        errInfo: "计费起始时间不是有效的时间格式"
                    },
                    ],
                    'editFeeConfigInfo.endTime': [{
                        limit: "required",
                        param: "",
                        errInfo: "计费终止时间不能为空"
                    },
                    {
                        limit: "dateTime",
                        param: "",
                        errInfo: "计费终止时间不是有效的时间格式"
                    },
                    ],
                    'editFeeConfigInfo.computingFormula': [{
                        limit: "required",
                        param: "",
                        errInfo: "计算公式不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "计算公式格式错误"
                    },
                    ],
                    'editFeeConfigInfo.squarePrice': [{
                        limit: "required",
                        param: "",
                        errInfo: "计费单价不能为空"
                    },
                    {
                        limit: "money",
                        param: "",
                        errInfo: "计费单价格式错误"
                    },
                    ],
                    'editFeeConfigInfo.additionalAmount': [{
                        limit: "required",
                        param: "",
                        errInfo: "附加费用不能为空"
                    },
                    {
                        limit: "money",
                        param: "",
                        errInfo: "附加费用格式错误"
                    },
                    ],
                    'editFeeConfigInfo.configId': [{
                        limit: "required",
                        param: "",
                        errInfo: "费用项ID不能为空"
                    }]

                });
            },editFeeConfig:function() {
            //固定费用
                if(this.editFeeConfigValidate.computingFormula == '2002'){
                   this.addFeeConfigInfo.squarePrice = "0.00";
                }
                if (!this.editFeeConfigValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post('editFeeConfig', 'update', JSON.stringify(this.editFeeConfigInfo), {
                    emulateJSON: true
                },
                (json, res) => {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#editFeeConfigModel').modal('hide');
                        this.$vc.emit('feeConfigManage', 'listFeeConfig', {});
                        return;
                    }
                    this.$vc.message(json);
                },
                (errInfo, error) => {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);
                });
            },refreshEditFeeConfigInfo:function() {
                var _feeTypeCds = this.editFeeConfigInfo.feeTypeCds;
                var _computingFormulas = this.editFeeConfigInfo.computingFormulas;
                this.editFeeConfigInfo = {
                    configId: '',
                    feeTypeCd: '',
                    feeName: '',
                    feeFlag: '',
                    startTime: '',
                    endTime: '',
                    computingFormula: '',
                    squarePrice: '',
                    additionalAmount: '',
                    isDefault:''
                };
                this.editFeeConfigInfo.feeTypeCds = _feeTypeCds;
                this.editFeeConfigInfo.computingFormulas = _computingFormulas;
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    