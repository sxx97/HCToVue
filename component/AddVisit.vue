
        <template>
            <div id="addNewVisitModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加访客</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                         

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">访客姓名</label>
                                <div class="col-sm-10">
                                    <input v-model="addVisitInfo.vName" type="text" placeholder="必填，请填写访客姓名"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">性别</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addVisitInfo.visitGender">
                                        <option selected  disabled value="">必填，请选择性别</option>
                                        <option value="0">男</option>
                                        <option value="1">女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">访客联系方式</label>
                                <div class="col-sm-10">
                                    <input v-model="addVisitInfo.phoneNumber" type="text" placeholder="必填，请填写访客联系方式"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">开始时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addVisitInfo.visitTime" readonly type="text" placeholder="必填，请填写开始时间"
                                           class="form-control addVisitTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">结束时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addVisitInfo.departureTime" readonly type="text" placeholder="必填，请填写结束时间"
                                           class="form-control addDepartureTime">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="_addNewVisitInfo()"><i
                                        class="fa fa-check"></i>&nbsp;保存
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
                props: {"callBackListener":"chooseStaff","callBackFunction":"chooseStaff"},
                components: {
                    
                },
                data () {
                    return {"addVisitInfo":{"vName":"","visitGender":"","phoneNumber":"","visitTime":"","departureTime":""}}    
                },
                mounted() {
                (() =>{
                this._initAddVisitInfo();
        })()
(() =>{
            this.$vc.on('addVisit','openAddVisitAppModal',(_app) =>{
                $("#addNewVisitModel").modal("show");
            });

            this.$vc.on('addVisit', 'onIndex', (_index) =>{
                // this.newVisitInfo.index = _index;
                this.$vc.emit('addVisitSpace', 'notify', _index);
            });

        })()   
                },
                methods: {
                    addAppValidate() {
                return this.$vc.validate.validate({
                    addVisitInfo: this.addVisitInfo
                }, {
                    'addVisitInfo.vName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客姓名不能为空"
                        }
                    ],
                    'addVisitInfo.visitGender': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客性别不能为空"
                        }
                    ],
                    'addVisitInfo.phoneNumber': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客手机号不能为空"
                        },
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "访客手机号不正确"
                        },
                    ],
                    'addVisitInfo.visitTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "访客时间格式错误"
                        },
                    ],
                    'addVisitInfo.departureTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "访客时间格式错误"
                        },
                    ]
                });
            },_addNewVisitInfo(){
                if (!this.addAppValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }
                this.addVisitInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.emit("viewVisitInfo", "addNewVisit", this.addVisitInfo);
                $('#addNewVisitModel').modal('hide');
            },_openAddAppInfoModel(){
                this.$vc.emit('addApp','openAddAppModal',{});
            },_loadAppInfoData:function(){

            },_initAddVisitInfo:function(){
                this.addVisitInfo.visitTime = this.$vc.dateFormat(new Date().getTime());
                 $('.addVisitTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.addVisitTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addVisitTime").val();
                        this.addVisitInfo.visitTime = value;
                    });
                $('.addDepartureTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.addDepartureTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addDepartureTime").val();
                        this.addVisitInfo.departureTime = value;
                    });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    