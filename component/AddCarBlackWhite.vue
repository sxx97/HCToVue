
        <template>
            <div id="addCarBlackWhiteModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加名单</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">名单类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addCarBlackWhiteInfo.blackWhite">
                                        <option selected disabled value="">必填，请选择名单类型</option>
                                        <option value="1111">黑名单</option>
                                        <option value="2222">白名单</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">车牌号</label>
                                <div class="col-sm-10">
                                    <input v-model="addCarBlackWhiteInfo.carNum" type="text" placeholder="必填，请填写车牌号"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">开始时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addCarBlackWhiteInfo.startTime" type="text" placeholder="必填，请填写开始时间"
                                           class="form-control addCarBlackWhiteStartTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">结束时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addCarBlackWhiteInfo.endTime" type="text" placeholder="必填，请填写结束时间"
                                           class="form-control addCarBlackWhiteEndTime">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveCarBlackWhiteInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
                    return {"addCarBlackWhiteInfo":{"bwId":"","blackWhite":"","carNum":"","startTime":"","endTime":""}}    
                },
                mounted() {
                (() => {
            this._initAddCarBlackWhiteDateInfo();

        })()
(() => {
            this.$vc.on('addCarBlackWhite', 'openAddCarBlackWhiteModal',
            () => {
                $('#addCarBlackWhiteModel').modal('show');
            });
        })()   
                },
                methods: {
                    _initAddCarBlackWhiteDateInfo:function () {
                this.addCarBlackWhiteInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.addCarBlackWhiteStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.addCarBlackWhiteStartTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addCarBlackWhiteStartTime").val();
                        this.addCarBlackWhiteInfo.startTime = value;
                    });
                $('.addCarBlackWhiteEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.addCarBlackWhiteEndTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addCarBlackWhiteEndTime").val();
                        this.addCarBlackWhiteInfo.endTime = value;
                    });
            },addCarBlackWhiteValidate() {
                return this.$vc.validate.validate({
                    addCarBlackWhiteInfo: this.addCarBlackWhiteInfo
                },
                {
                    'addCarBlackWhiteInfo.blackWhite': [{
                        limit: "required",
                        param: "",
                        errInfo: "名单类型不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "名单类型格式错误"
                    },
                    ],
                    'addCarBlackWhiteInfo.carNum': [{
                        limit: "required",
                        param: "",
                        errInfo: "车牌号不能为空"
                    },
                    {
                        limit: "maxin",
                        param: "1,12",
                        errInfo: "车牌号大于12位"
                    },
                    ],
                    'addCarBlackWhiteInfo.startTime': [{
                        limit: "required",
                        param: "",
                        errInfo: "开始时间不能为空"
                    },
                    {
                        limit: "dateTime",
                        param: "",
                        errInfo: "不是有效的时间格式"
                    },
                    ],
                    'addCarBlackWhiteInfo.endTime': [{
                        limit: "required",
                        param: "",
                        errInfo: "结束时间不能为空"
                    },
                    {
                        limit: "dateTime",
                        param: "",
                        errInfo: "不是有效的时间格式"
                    },
                    ],

                });
            },saveCarBlackWhiteInfo:function() {
                if (!this.addCarBlackWhiteValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addCarBlackWhiteInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addCarBlackWhiteInfo);
                    $('#addCarBlackWhiteModel').modal('hide');
                    return;
                }

                this.$vc.http.post('addCarBlackWhite', 'save', JSON.stringify(this.addCarBlackWhiteInfo), {
                    emulateJSON: true
                },
                (json, res) => {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#addCarBlackWhiteModel').modal('hide');
                        this.clearAddCarBlackWhiteInfo();
                        this.$vc.emit('carBlackWhiteManage', 'listCarBlackWhite', {});

                        return;
                    }
                    this.$vc.message(json);

                },
                (errInfo, error) => {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);

                });
            },clearAddCarBlackWhiteInfo:function() {
                this.addCarBlackWhiteInfo = {
                    blackWhite: '',
                    carNum: '',
                    startTime: '',
                    endTime: '',

                };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    