
        <template>
            <div id="editCarBlackWhiteModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改名单</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">名单类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editCarBlackWhiteInfo.blackWhite">
                                        <option selected disabled value="">必填，请选择名单类型</option>
                                        <option value="1111">黑名单</option>
                                        <option value="2222">白名单</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">车牌号</label>
                                <div class="col-sm-10">
                                    <input v-model="editCarBlackWhiteInfo.carNum" type="text" placeholder="必填，请填写车牌号"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">开始时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editCarBlackWhiteInfo.startTime" type="text"
                                           placeholder="必填，请填写开始时间" class="form-control editCarBlackWhiteStartTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">结束时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editCarBlackWhiteInfo.endTime" type="text" placeholder="必填，请填写结束时间"
                                           class="form-control editCarBlackWhiteEndTime">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="editCarBlackWhite()"><i class="fa fa-check"></i>&nbsp;保存
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
                    return {"editCarBlackWhiteInfo":{"bwId":"","blackWhite":"","carNum":"","startTime":"","endTime":""}}    
                },
                mounted() {
                (() => {
            this._initEditCarBlackWhiteDateInfo();
        })()
(() => {
            this.$vc.on('editCarBlackWhite', 'openEditCarBlackWhiteModal',
            (_params) => {
                this.refreshEditCarBlackWhiteInfo();
                $('#editCarBlackWhiteModel').modal('show');
                this.$vc.copyObject(_params, this.editCarBlackWhiteInfo);
                this.editCarBlackWhiteInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    _initEditCarBlackWhiteDateInfo:function () {
                this.editCarBlackWhiteInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.editCarBlackWhiteStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.editCarBlackWhiteStartTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".editCarBlackWhiteStartTime").val();
                        this.editCarBlackWhiteInfo.startTime = value;
                    });
                $('.editCarBlackWhiteEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editCarBlackWhiteEndTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".editCarBlackWhiteEndTime").val();
                        this.editCarBlackWhiteInfo.endTime = value;
                    });
            },editCarBlackWhiteValidate:function() {
                return this.$vc.validate.validate({
                    editCarBlackWhiteInfo: this.editCarBlackWhiteInfo
                },
                {
                    'editCarBlackWhiteInfo.blackWhite': [{
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
                    'editCarBlackWhiteInfo.carNum': [{
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
                    'editCarBlackWhiteInfo.startTime': [{
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
                    'editCarBlackWhiteInfo.endTime': [{
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
                    'editCarBlackWhiteInfo.bwId': [{
                        limit: "required",
                        param: "",
                        errInfo: "黑白名单ID不能为空"
                    }]

                });
            },editCarBlackWhite:function() {
                this.editCarBlackWhiteInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                if (!this.editCarBlackWhiteValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post('editCarBlackWhite', 'update', JSON.stringify(this.editCarBlackWhiteInfo), {
                    emulateJSON: true
                },
                (json, res) => {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#editCarBlackWhiteModel').modal('hide');
                        this.$vc.emit('carBlackWhiteManage', 'listCarBlackWhite', {});
                        return;
                    }
                    this.$vc.message(json);
                },
                (errInfo, error) => {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);
                });
            },refreshEditCarBlackWhiteInfo:function() {
                this.editCarBlackWhiteInfo = {
                    bwId: '',
                    blackWhite: '',
                    carNum: '',
                    startTime: '',
                    endTime: '',

                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    