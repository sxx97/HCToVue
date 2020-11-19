
        <template>
            <div id="editParkingAreaModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改信息</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">停车场编号</label>
                                <div class="col-sm-10">
                                    <input v-model="editParkingAreaInfo.num" type="text" placeholder="必填，请填写停车场编号"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">停车场类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editParkingAreaInfo.typeCd">
                                        <option selected disabled value="">必填，请选择停车场类型</option>
                                        <option value="1001">地上停车场</option>
                                        <option value="2001">地下停车场</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10">
                                    <input v-model="editParkingAreaInfo.remark" type="text" placeholder="可填，请填写备注"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="editParkingArea()"><i class="fa fa-check"></i>&nbsp;保存
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
                    return {"editParkingAreaInfo":{"paId":"","num":"","typeCd":"","remark":""}}    
                },
                mounted() {
                (() => {

})()
(() => {
            this.$vc.on('editParkingArea', 'openEditParkingAreaModal',
            (_params) => {
                this.refreshEditParkingAreaInfo();
                $('#editParkingAreaModel').modal('show');
                this.$vc.copyObject(_params, this.editParkingAreaInfo);
                this.editParkingAreaInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    editParkingAreaValidate:function() {
                return this.$vc.validate.validate({
                    editParkingAreaInfo: this.editParkingAreaInfo
                },
                {
                    'editParkingAreaInfo.num': [{
                        limit: "required",
                        param: "",
                        errInfo: "停车场编号不能为空"
                    },
                    {
                        limit: "maxin",
                        param: "1,12",
                        errInfo: "停车场编号不能超过12位"
                    },
                    ],
                    'editParkingAreaInfo.typeCd': [{
                        limit: "required",
                        param: "",
                        errInfo: "停车场类型不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "停车场类型格式错误"
                    },
                    ],
                    'editParkingAreaInfo.remark': [
                    {
                        limit: "maxLength",
                        param: "4000",
                        errInfo: "备注太长"
                    },
                    ],
                    'editParkingAreaInfo.paId': [{
                        limit: "required",
                        param: "",
                        errInfo: "停车场ID不能为空"
                    }]

                });
            },editParkingArea:function() {
                this.editParkingAreaInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                if (!this.editParkingAreaValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post('editParkingArea', 'update', JSON.stringify(this.editParkingAreaInfo), {
                    emulateJSON: true
                },
                (json, res) => {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#editParkingAreaModel').modal('hide');
                        this.$vc.emit('parkingAreaManage', 'listParkingArea', {});
                        return;
                    }
                    this.$vc.message(json);
                },
                (errInfo, error) => {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);
                });
            },refreshEditParkingAreaInfo:function() {
                this.editParkingAreaInfo = {
                    paId: '',
                    num: '',
                    typeCd: '',
                    remark: '',

                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    