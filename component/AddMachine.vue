
        <template>
            <div id="addMachineModel" class="modal fade"  role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加设备门禁</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备编码</label>
                                <div class="col-sm-10">
                                    <input v-model="addMachineInfo.machineCode" type="text" placeholder="必填，请填写设备编码"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">版本号</label>
                                <div class="col-sm-10">
                                    <input v-model="addMachineInfo.machineVersion" type="text" placeholder="必填，请填写版本号"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addMachineInfo.machineName" type="text" placeholder="必填，请填写设备名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addMachineInfo.machineTypeCd">
                                        <option selected disabled value="">必填，请选择设备类型</option>
<!--                                        <option value="992019111002270001">锐目门禁</option>-->
                                        <option value="9998">大楼闸机</option>
                                        <option value="9996">车辆道闸</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备方向</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addMachineInfo.direction">
                                        <option selected disabled value="">必填，请选择设备方向</option>
                                        <option value="3306">进场</option>
                                        <option value="3307">出场</option>
                                        <option value="3308">进出场</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">鉴权编码</label>
                                <div class="col-sm-10">
                                    <input v-model="addMachineInfo.authCode" type="text" placeholder="必填，请填写鉴权编码"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备位置</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addMachineInfo.locationTypeCd">
                                        <option selected disabled value="">必填，请选择设备位置</option>
                                        <option value="1000">东大门</option>
                                        <option value="1001">西大门</option>
                                        <option value="1002">北大门</option>
                                        <option value="1003">南大门</option>
                                        <!--<option value="2000">单元门</option>
                                        <option value="3000">房间门</option>-->
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="addMachineInfo.locationTypeCd == '2000' || addMachineInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属楼栋</label>
                            <div class="col-sm-10">
                                <vc:create name="floorSelect2"
                                           parentModal="addMachineModel"
                                           namespace="addMachine"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="addMachineInfo.locationTypeCd == '2000' || addMachineInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属单元</label>
                            <div class="col-sm-10">
                                <vc:create name="unitSelect2"
                                           parentModal="addMachineModel"
                                           callBackListener="addMachine"
                                           callBackFunction="notify"
                                           namespace="addMachine"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="addMachineInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属房间</label>
                            <div class="col-sm-10">
                                <vc:create name="roomSelect2"
                                           parentModal="addMachineModel"
                                           callBackListener="addMachine"
                                           callBackFunction="notify"
                                           namespace="addMachine"
                                ></vc:create>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">设备IP</label>
                            <div class="col-sm-10">
                                <input v-model="addMachineInfo.machineIp" type="text" placeholder="选填，请填写设备IP"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">设备MAC</label>
                            <div class="col-sm-10">
                                <input v-model="addMachineInfo.machineMac" type="text" placeholder="选填，请填写设备MAC"
                                       class="form-control">
                            </div>
                        </div>

                        <template v-if="addMachineInfo.machineTypeCd == 9998">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">通行方式</label>
                                <div class="col-sm-10 row">
                                    <div class="checkbox col-sm-2">
                                        <label>
                                            <input type="checkbox" value="1" v-model="addMachineInfo.passageWayHumanFaceEnable">
                                            人脸
                                        </label>
                                    </div>
                                    <div class="checkbox col-sm-2">
                                        <label>
                                            <input type="checkbox" value="1" v-model="addMachineInfo.passageWayRfidCardEnable">
                                            RFID卡
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </template>


                        <div class="ibox-content">
                            <button class="btn btn-primary float-right" type="button"
                                    v-on:click="saveMachineInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
            
            import FloorSelect2 from '@/component/FloorSelect2.vue';import UnitSelect2 from '@/component/UnitSelect2.vue';import RoomSelect2 from '@/component/RoomSelect2.vue';



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
                    FloorSelect2,UnitSelect2,RoomSelect2
                },
                data () {
                    return {"addMachineInfo":{"machineId":"","machineCode":"","machineVersion":"","machineName":"","machineTypeCd":"","authCode":"","machineIp":"","machineMac":"","floorId":"","floorNum":"","floorName":"","unitId":"","unitName":"","roomId":"","locationTypeCd":"","locationObjId":"","roomName":"","direction":"","passageWayHumanFaceEnable":"1","passageWayRfidCardEnable":"1"}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('addMachine', 'openAddMachineModal',  () => {
                $('#addMachineModel').modal('show');
            });

            this.$vc.on("addMachine", "notify",  (_param) => {
                if (_param.hasOwnProperty("floorId")) {
                    this.addMachineInfo.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.addMachineInfo.unitId = _param.unitId;
                }

                if(_param.hasOwnProperty("roomId")){
                    this.addMachineInfo.roomId = _param.roomId;
                }
            });
        })()   
                },
                methods: {
                    addMachineValidate:function () {
                return this.$vc.validate.validate({
                    addMachineInfo: this.addMachineInfo
                }, {
                    'addMachineInfo.machineCode': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "设备编码不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,30",
                            errInfo: "设备编码不能超过30位"
                        },
                    ],
                    'addMachineInfo.machineVersion': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "版本号不能为空"
                        }],
                    'addMachineInfo.machineName':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "设备名称不能为空"
                            }],
                    'addMachineInfo.machineTypeCd':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "设备类型不能为空"
                            },
                            {
                                limit: "num",
                                param: "",
                                errInfo: "设备类型格式错误"
                            },
                        ],
                        'addMachineInfo.direction':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "设备方向不能为空"
                            },
                            {
                                limit: "num",
                                param: "",
                                errInfo: "设备方向格式错误"
                            },
                        ],
                    'addMachineInfo.authCode':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "鉴权编码不能为空"
                            },
                            {
                                limit: "maxLength",
                                param: "64",
                                errInfo: "鉴权编码不能大于64位"
                            },
                        ],
                    'addMachineInfo.machineIp':
                        [
                            {
                                limit: "maxLength",
                                param: "64",
                                errInfo: "设备IP格式错误"
                            },
                        ],
                    'addMachineInfo.machineMac':
                        [
                            {
                                limit: "maxLength",
                                param: "64",
                                errInfo: "设备MAC 格式错误"
                            }
                        ],
                    'addMachineInfo.locationTypeCd':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "请选择设备位置"
                            }
                        ],
                    'addMachineInfo.locationObjId':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "请选择位置"
                            }
                        ]
                });
            },saveMachineInfo:function () {
                this.addMachineInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.addMachineInfo.locationTypeCd != '2000' && this.addMachineInfo.locationTypeCd != '3000') { //大门时直接写 写字楼ID
                    this.addMachineInfo.locationObjId = this.addMachineInfo.communityId;
                } else if (this.addMachineInfo.locationTypeCd == '2000') {
                    this.addMachineInfo.locationObjId = this.addMachineInfo.unitId;
                } else if (this.addMachineInfo.locationTypeCd == '3000') {
                    this.addMachineInfo.locationObjId = this.addMachineInfo.roomId;
                } else {
                    this.$vc.toast("设备位置值错误");
                    return;
                }

                this.addMachineInfo.passageWayHumanFaceEnable = Number(this.addMachineInfo.passageWayHumanFaceEnable);
                this.addMachineInfo.passageWayRfidCardEnable = Number(this.addMachineInfo.passageWayRfidCardEnable);
                // 不选择闸机的通行方式将删除设置通行方式参数
                if (this.addMachineInfo.machineTypeCd != 9998) {
                    delete this.addMachineInfo.passageWayHumanFaceEnable;
                    delete this.addMachineInfo.passageWayRfidCardEnable;
                }
                if (!this.addMachineValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }


                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addMachineInfo);
                    $('#addMachineModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addMachine',
                    'save',
                    JSON.stringify(this.addMachineInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addMachineModel').modal('hide');
                            this.clearAddMachineInfo();
                            this.$vc.emit('machineManage', 'listMachine', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddMachineInfo:function () {
                this.addMachineInfo = {
                    machineCode: '',
                    machineVersion: '',
                    machineName: '',
                    machineTypeCd: '',
                    authCode: '',
                    machineIp: '',
                    machineMac: '',
                    direction:''
                };
            },_initAddMachineData:function () {
                $('.floorSelector').select2({
                    placeholder: '必填，请选择楼栋',
                    ajax: {
                        url: "sdata.json",
                        dataType: 'json',
                        delay: 250,
                        data: function (params) {
                            return {
                                floorNum: this.addMachineInfo.floorNum,
                                /* page:*/
                            };
                        },
                        processResults: function (data) {
                            return {
                                results: data
                            };
                        },
                        cache: true
                    },
                    minimumInputLength: 2
                });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    