
        <template>
            <div id="addParkingAreaModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加信息</h3>
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
                                <label class="col-sm-2 col-form-label">停车场编号</label>
                                <div class="col-sm-10">
                                    <input v-model="addParkingAreaInfo.num" type="text" placeholder="必填，请填写停车场编号"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">停车场类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addParkingAreaInfo.typeCd">
                                        <option selected disabled value="">必填，请选择停车场类型</option>
                                        <option value="1001">地上停车场</option>
                                        <option value="2001">地下停车场</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10">
                                    <input v-model="addParkingAreaInfo.remark" type="text" placeholder="可选，请填写备注"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveParkingAreaInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    
                },
                data () {
                    return {"addParkingAreaInfo":{"paId":"","num":"","typeCd":"","remark":""}}    
                },
                mounted() {
                (() => {

        })()
(() => {
            this.$vc.on('addParkingArea', 'openAddParkingAreaModal',
            () => {
                $('#addParkingAreaModel').modal('show');
            });
        })()   
                },
                methods: {
                    addParkingAreaValidate() {
                return this.$vc.validate.validate({
                    addParkingAreaInfo: this.addParkingAreaInfo
                },
                {
                    'addParkingAreaInfo.num': [{
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
                    'addParkingAreaInfo.typeCd': [{
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
                    'addParkingAreaInfo.remark': [
                    {
                        limit: "maxLength",
                        param: "4000",
                        errInfo: "备注太长"
                    },
                    ],

                });
            },saveParkingAreaInfo:function() {
                if (!this.addParkingAreaValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addParkingAreaInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addParkingAreaInfo);
                    $('#addParkingAreaModel').modal('hide');
                    return;
                }

                this.$vc.http.post('addParkingArea', 'save', JSON.stringify(this.addParkingAreaInfo), {
                    emulateJSON: true
                },
                (json, res) => {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#addParkingAreaModel').modal('hide');
                        this.clearAddParkingAreaInfo();
                        this.$vc.emit('parkingAreaManage', 'listParkingArea', {});

                        return;
                    }
                    this.$vc.message(json);

                },
                (errInfo, error) => {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);

                });
            },clearAddParkingAreaInfo:function() {
                this.addParkingAreaInfo = {
                    num: '',
                    typeCd: '',
                    remark: '',
                };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    