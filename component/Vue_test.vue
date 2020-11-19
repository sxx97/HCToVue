
        <template>
            <div id="vueTest">
    <span>
        {{message}}
        {{version}}
    </span>

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
                    return {"addFeeConfigInfo":{"configId":"","feeTypeCd":"","feeName":"","feeFlag":"","startTime":"","endTime":"","computingFormula":"","squarePrice":"","additionalAmount":"","feeTypeCds":[],"computingFormulas":[]}}    
                },
                mounted() {
                (() => {
            this._initAddFeeConfigDateInfo();
            this.$vc.getDict('pay_fee_config',"fee_type_cd",(_data) =>{
                this.addFeeConfigInfo.feeTypeCds = _data;
            });
            this.$vc.getDict('pay_fee_config',"computing_formula",(_data) =>{
                this.addFeeConfigInfo.computingFormulas = _data;
            });
        })()
(() => {
            this.$vc.on('addFeeConfig', 'openAddFeeConfigModal',
            () => {
                $('#addFeeConfigModel').modal('show');
            });
        })()   
                },
                methods: {
                    _initAddFeeConfigDateInfo:function () {
                this.addFeeConfigInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.addFeeConfigStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.addFeeConfigStartTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addFeeConfigStartTime").val();
                        this.addFeeConfigInfo.startTime = value;
                    });
                $('.addFeeConfigEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.addFeeConfigEndTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addFeeConfigEndTime").val();
                        this.addFeeConfigInfo.endTime = value;
                    });
            },addFeeConfigValidate() {
                return this.$vc.validate.validate({
                    addFeeConfigInfo: this.addFeeConfigInfo
                },
                {
                    'addFeeConfigInfo.feeTypeCd': [{
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
                    'addFeeConfigInfo.feeName': [{
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
                    'addFeeConfigInfo.feeFlag': [{
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
                    'addFeeConfigInfo.startTime': [{
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
                    'addFeeConfigInfo.endTime': [{
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
                    'addFeeConfigInfo.computingFormula': [{
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
                    'addFeeConfigInfo.squarePrice': [{
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
                    'addFeeConfigInfo.additionalAmount': [{
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

                });
            },saveFeeConfigInfo:function() {
                //固定费用
                if(this.addFeeConfigInfo.computingFormula == '2002'){
                   this.addFeeConfigInfo.squarePrice = "0.00";
                }
                if (!this.addFeeConfigValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addFeeConfigInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addFeeConfigInfo);
                    $('#addFeeConfigModel').modal('hide');
                    return;
                }

                this.$vc.http.post('addFeeConfig', 'save', JSON.stringify(this.addFeeConfigInfo), {
                    emulateJSON: true
                },
                (json, res) => {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#addFeeConfigModel').modal('hide');
                        this.clearAddFeeConfigInfo();
                        this.$vc.emit('feeConfigManage', 'listFeeConfig', {});

                        return;
                    }
                    this.$vc.message(json);

                },
                (errInfo, error) => {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);

                });
            },clearAddFeeConfigInfo:function() {
                var _feeTypeCds =  this.addFeeConfigInfo.feeTypeCds;
                var _computingFormulas = this.addFeeConfigInfo.computingFormulas;
                this.addFeeConfigInfo = {
                    feeTypeCd: '',
                    feeName: '',
                    feeFlag: '',
                    startTime: '',
                    endTime: '',
                    computingFormula: '',
                    squarePrice: '',
                    additionalAmount: '',
                    feeTypeCds:_feeTypeCds,
                    computingFormulas:_computingFormulas

                };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    