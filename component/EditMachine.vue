
        <template>
            <div id="editMachineModel" class="modal fade" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改设备门禁</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备编码</label>
                                <div class="col-sm-10">
                                    <input v-model="editMachineInfo.machineCode" type="text" placeholder="必填，请填写设备编码"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">版本号</label>
                                <div class="col-sm-10">
                                    <input v-model="editMachineInfo.machineVersion" type="text" placeholder="必填，请填写版本号"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备名称</label>
                                <div class="col-sm-10">
                                    <input v-model="editMachineInfo.machineName" type="text" placeholder="必填，请填写设备名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editMachineInfo.machineTypeCd">
                                        <option selected disabled value="">必填，请选择设备类型</option>
                                        <option value="992019111002270001">锐目门禁</option>
                                        <option value="9998">其他门禁</option>
                                        <option value="9996">车辆道闸</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备方向</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editMachineInfo.direction">
                                        <option selected disabled value="">必填，请选择设备方向</option>
                                        <option value="3306">进场</option>
                                        <option value="3307">出场</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">鉴权编码</label>
                                <div class="col-sm-10">
                                    <input v-model="editMachineInfo.authCode" type="text" placeholder="必填，请填写鉴权编码"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">设备位置</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editMachineInfo.locationTypeCd">
                                        <option selected disabled value="">必填，请选择设备位置</option>
                                        <option value="1000">东大门</option>
                                        <option value="1001">西大门</option>
                                        <option value="1002">北大门</option>
                                        <option value="1003">南大门</option>
                                        <option value="2000">单元门</option>
                                        <option value="3000">房间门</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="editMachineInfo.locationTypeCd == '2000' || editMachineInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属楼栋</label>
                            <div class="col-sm-10">
                                <vc:create name="floorSelect2"
                                           parentModal="editMachineModel"
                                           namespace="editMachine"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="editMachineInfo.locationTypeCd == '2000' || editMachineInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属单元</label>
                            <div class="col-sm-10">
                                <vc:create name="unitSelect2"
                                           parentModal="editMachineModel"
                                           callBackListener="editMachine"
                                           callBackFunction="notify"
                                           namespace="editMachine"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="editMachineInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属房间</label>
                            <div class="col-sm-10">
                                <vc:create name="roomSelect2"
                                           parentModal="editMachineModel"
                                           callBackListener="editMachine"
                                           callBackFunction="notify"
                                           namespace="editMachine"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">设备IP</label>
                            <div class="col-sm-10">
                                <input v-model="editMachineInfo.machineIp" type="text" placeholder="选填，请填写设备IP"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">设备MAC</label>
                            <div class="col-sm-10">
                                <input v-model="editMachineInfo.machineMac" type="text" placeholder="选填，请填写设备MAC"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">设备访问url</label>
                            <div class="col-sm-10">
                                <input v-model="editMachineInfo.machineUrl" readonly type="text" placeholder="选填，请填写设备MAC"
                                       class="form-control">
                            </div>
                        </div>

                        <div class="ibox-content">
                            <button class="btn btn-primary float-right" type="button" v-on:click="editMachine()"><i
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"editMachineInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('editMachine', 'openEditMachineModal', function (_params) {
                this.refreshEditMachineInfo();
                $('#editMachineModel').modal('show');
                this.$vc.copyObject(_params, this.editMachineInfo);
                this._initMachineUrl();
                //根据位置类型 传输数据
                if (this.editMachineInfo.locationTypeCd == '2000') {
                    this.$vc.emit('editMachine', 'floorSelect2', 'setFloor', {
                        floorId: this.editMachineInfo.floorId,
                        floorNum: this.editMachineInfo.floorNum
                    });
                    this.$vc.emit('editMachine', 'unitSelect2', 'setUnit', {
                        floorId: this.editMachineInfo.floorId,
                        floorNum: this.editMachineInfo.floorNum,
                        unitId: this.editMachineInfo.unitId,
                        unitNum: this.editMachineInfo.unitNum,
                    });
                } else if (this.editMachineInfo.locationTypeCd == '3000') {
                    this.$vc.emit('editMachine', 'floorSelect2', 'setFloor', {
                        floorId: this.editMachineInfo.floorId,
                        floorNum: this.editMachineInfo.floorNum
                    });
                    this.$vc.emit('editMachine', 'unitSelect2', 'setUnit', {
                        floorId: this.editMachineInfo.floorId,
                        floorNum: this.editMachineInfo.floorNum,
                        unitId: this.editMachineInfo.unitId,
                        unitNum: this.editMachineInfo.unitNum,
                    });
                    this.$vc.emit('editMachine', 'roomSelect2', 'setRoom', {
                        floorId: this.editMachineInfo.floorId,
                        floorNum: this.editMachineInfo.floorNum,
                        unitId: this.editMachineInfo.unitId,
                        unitNum: this.editMachineInfo.unitNum,
                        roomId: this.editMachineInfo.roomId,
                        roomNum: this.editMachineInfo.roomNum,
                    });
                }
                this.editMachineInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });

            this.$vc.on("editMachine", "notify", function (_param) {
                if (_param.hasOwnProperty("floorId")) {
                    this.editMachineInfo.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.editMachineInfo.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.editMachineInfo.roomId = _param.roomId;
                }
            });
        })()   
            },
            methods: {
                _initMachineUrl:function () {
                var sysInfo = this.$vc.getData("_sysInfo");
                if (sysInfo == null) {
                    return;
                }

                var apiUrl = sysInfo.apiUrl + "/api/machineTranslate.machineHeartbeart?communityId="
                    + this.$vc.getCurrentCommunity().communityId + "&transaction_id=-1&req_time=20181113225612&user_id=-1"
                    + "&app_id=" + this.editMachineInfo.machineTypeCd;
                this.editMachineInfo.machineUrl = apiUrl;


            },editMachineValidate:function () {
                return this.$vc.validate.validate({
                    editMachineInfo: this.editMachineInfo
                }, {
                    'editMachineInfo.machineCode': [
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
                    'editMachineInfo.machineVersion': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "版本号不能为空"
                        }],
                    'editMachineInfo.machineName':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "设备名称不能为空"
                            }],
                    'editMachineInfo.machineTypeCd':
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
                    'editMachineInfo.direction':
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
                    'editMachineInfo.authCode':
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
                    'editMachineInfo.machineIp':
                        [
                            {
                                limit: "maxLength",
                                param: "64",
                                errInfo: "设备IP格式错误"
                            },
                        ],
                    'editMachineInfo.machineMac':
                        [
                            {
                                limit: "maxLength",
                                param: "64",
                                errInfo: "设备MAC 格式错误"
                            },
                        ],
                    'editMachineInfo.machineId':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "设备ID不能为空"
                            }],
                    'editMachineInfo.locationTypeCd':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "请选择设备位置"
                            }
                        ],
                    'editMachineInfo.locationObjId':
                        [
                            {
                                limit: "required",
                                param: "",
                                errInfo: "请选择位置"
                            }
                        ]

                })
                    ;
            },editMachine:function () {
                this.editMachineInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.editMachineInfo.locationTypeCd != '2000' && this.editMachineInfo.locationTypeCd != '3000') { //大门时直接写 写字楼ID
                    this.editMachineInfo.locationObjId = this.editMachineInfo.communityId;
                } else if (this.editMachineInfo.locationTypeCd == '2000') {
                    this.editMachineInfo.locationObjId = this.editMachineInfo.unitId;
                } else if (this.editMachineInfo.locationTypeCd == '3000') {
                    this.editMachineInfo.locationObjId = this.editMachineInfo.roomId;
                } else {
                    this.$vc.toast("设备位置值错误");
                    return;
                }
                if (!this.editMachineValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post(
                    'editMachine',
                    'update',
                    JSON.stringify(this.editMachineInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editMachineModel').modal('hide');
                            this.$vc.emit('machineManage', 'listMachine', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditMachineInfo:function () {
                this.editMachineInfo = {
                    machineId: '',
                    machineCode: '',
                    machineVersion: '',
                    machineName: '',
                    machineTypeCd: '',
                    authCode: '',
                    machineIp: '',
                    machineMac: '',
                    floorId: '',
                    floorNum: '',
                    floorName: '',
                    unitId: '',
                    unitNum: '',
                    roomId: '',
                    locationTypeCd: '',
                    locationObjId: '',
                    roomNum: '',
                    machineUrl: '',
                     direction:''

                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    