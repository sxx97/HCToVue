
        <template>
            <div id="addFeeConfigModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加费用项</h3>
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
                                <label class="col-sm-2 col-form-label">费用类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addFeeConfigInfo.feeTypeCd">
                                        <option selected disabled value="">必填，请选择费用类型</option>
                                        <option v-for="(item,index) in addFeeConfigInfo.feeTypeCds" :key="index"
                                                v-bind:value="item.statusCd">{{item.name}}
                                        </option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">收费项目</label>
                                <div class="col-sm-10">
                                    <input v-model="addFeeConfigInfo.feeName" type="text" placeholder="必填，请填写收费项目"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">费用标识</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addFeeConfigInfo.feeFlag">
                                        <option selected disabled value="">必填，请选择费用标识</option>
                                        <option value="1003006">周期性费用</option>
                                        <option value="2006012">一次性费用</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">计费起始时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addFeeConfigInfo.startTime" type="text" placeholder="必填，请填写计费起始时间"
                                           class="form-control addFeeConfigStartTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">计费终止时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addFeeConfigInfo.endTime" type="text" placeholder="必填，请填写计费终止时间"
                                           class="form-control addFeeConfigEndTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">计算公式</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addFeeConfigInfo.computingFormula">
                                        <option selected disabled value="">必填，请选择计算公式</option>
                                        <option v-for="(item,index) in addFeeConfigInfo.computingFormulas" :key="index"
                                                v-bind:value="item.statusCd">{{item.name}}
                                        </option>
                                    </select></div>
                            </div>
                            <div class="form-group row" v-if="addFeeConfigInfo.computingFormula != '2002'">
                                <label class="col-sm-2 col-form-label">计费单价</label>
                                <div class="col-sm-10">
                                    <input v-model="addFeeConfigInfo.squarePrice" type="text" placeholder="必填，请填写计费单价"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">{{addFeeConfigInfo.computingFormula == '1001' ?'附加费用':'固定费用'}}</label>
                                <div class="col-sm-10">
                                    <input v-model="addFeeConfigInfo.additionalAmount" type="text"
                                           placeholder="必填，请填写附加费用" class="form-control">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveFeeConfigInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"addFeeConfigInfo":"[object Object]"}    
            },
            mounted() {
             (function() {
            this._initAddFeeConfigDateInfo();
            this.$vc.getDict('pay_fee_config',"fee_type_cd",function(_data){
                this.addFeeConfigInfo.feeTypeCds = _data;
            });
            this.$vc.getDict('pay_fee_config',"computing_formula",function(_data){
                this.addFeeConfigInfo.computingFormulas = _data;
            });
        })()(function() {
            this.$vc.on('addFeeConfig', 'openAddFeeConfigModal',
            function() {
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
                    .on('changeDate', function (ev) {
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
                    .on('changeDate', function (ev) {
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
                function(json, res) {
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
                function(errInfo, error) {
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
    