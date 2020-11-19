
        <template>
            <div id="editAppModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改访客</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">访客姓名</label>
                                <div class="col-sm-10">
                                    <input v-model="editVisitInfo.name" type="text" placeholder="必填，请填写访客姓名"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">访客性别</label>
                                <div class="col-sm-10">
<!--                                    <input v-model="editAppInfo.securityCode" type="text" placeholder="选填，请填访客性别"-->
<!--                                           class="form-control">-->
                                    <select v-model="editVisitInfo.visitGender" class="form-control" :value="editVisitInfo.visitGender">
                                        <option value="1">男</option>
                                        <option value="0">女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">访客联系方式</label>
                                <div class="col-sm-10">
                                    <input v-model="editVisitInfo.phoneNumber" type="text" placeholder="选填，请填写联系方式"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">访客来访时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editVisitInfo.visitTime" type="date" placeholder="选填，请填写来访时间"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">访客离开时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editVisitInfo.departureTime" type="date" placeholder="选填，请填写离开时间"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">访客来访事由</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写访客来访事由" class="form-control"
                                              v-model="editVisitInfo.visitCase"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editVisit()"><i
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"editVisitInfo":{}}    
                },
                mounted() {
                ( () => {
        })()
( () => {
            this.$vc.on('editVisit', 'openEditVisitModel',  (_params) => {
                this.refreshEditAppInfo();
                $('#editAppModel').modal('show');
                console.log(_params);
                this.editVisitInfo = _params;

            });
        })()   
                },
                methods: {
                    editAppValidate:function () {
                return this.$vc.validate.validate({
                    editVisitInfo: this.editVisitInfo
                }, {
                    'editVisitInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客姓名不能为空"
                        }
                    ],
                    'editVisitInfo.visitGender': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客性别不能为空"
                        },
                    ],
                    'editVisitInfo.phoneNumber': [
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "访客联系方式不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "访客联系方式必须是数字"
                        }
                    ],
                    'editVisitInfo.visitTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客到访时间不能为空"
                        },
                    ],
                    'editVisitInfo.departureTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客到访时间不能为空"
                        },
                    ],
                    'editVisitInfo.visitCase': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "访客到访原因不能为空"
                        },
                    ]


                });
            },editVisit:function () {
                if (!this.editAppValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post(
                    'editVisit',
                    'update',
                    JSON.stringify(this.editVisitInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editAppModel').modal('hide');
                            this.$vc.emit('appManage', 'listApp', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditAppInfo:function () {
                this.editAppInfo = {
                    name: '',
                    visitGender: '',
                    phoneNumber: '',
                    visitTime: '',
                    departureTime: '',
                    visitCase: '',

                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    