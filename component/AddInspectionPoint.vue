
        <template>
            <div id="addInspectionPointModel" class="modal fade" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加巡检点</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">巡检点</label>
                                <div class="col-sm-10">
                                    <input v-model="addInspectionPointInfo.name" type="text"
                                           placeholder="必填，请填写巡检点名称" class="form-control">
                                </div>
                            </div>
                            <template v-if="!addInspectionPointInfo.pointId">
                                <div class="form-group row">
                                    <label class="col-sm-2 col-form-label">楼宇</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="addInspectionPointInfo.buildingId">
                                            <option value="" disabled>请选择</option>
                                            <option v-for="floor in floors" :value="floor.floorId">{{floor.floorName}}</option>
                                        </select>
                                    </div>
                                </div>
                                <!--<div class="form-group row">
                                    <label class="col-sm-2 col-form-label">部门</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="addInspectionPointInfo.checkPointOrgId">
                                            <option value="" disabled>请选择</option>
                                            <option v-for="org in orgs" :value="org.orgId">{{org.orgName}}</option>
                                        </select>
                                    </div>
                                </div>-->
                            </template>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">iBbeacon UUID</label>
                                <div class="col-sm-10">
                                    <input v-model="addInspectionPointInfo.beaconId" type="text" placeholder="请输入，非必填"
                                           @focus="createUUID"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveInspectionPointInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
                return {"floors":"","orgs":"","addInspectionPointInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this.getBuildings();
            // this.getOrgs();
        })()(function () {
            this.$vc.on('addInspectionPoint', 'openAddInspectionPointModal', function (params) {
                $('#addInspectionPointModel').modal('show');
                if (params) {
                    this.addInspectionPointInfo.beaconId = params.beaconId;
                    this.addInspectionPointInfo.name = params.name;
                    this.addInspectionPointInfo.pointId = params.id;
                    this.addInspectionPointInfo.buildingId = params.buildingId;
                    delete this.addInspectionPointInfo.buildingId;
                }
            });
            this.$vc.on("addInspectionPointInfo", "notify", function (_param) {
                if (_param.hasOwnProperty("machineId")) {
                    this.addInspectionPointInfo.machineId = _param.machineId;
                }
            });
        })()   
            },
            methods: {
                createUUID() {
                if (this.addInspectionPointInfo.beaconId === "" || this.addInspectionPointInfo.beaconId == null) {
                    this.addInspectionPointInfo.beaconId = this.uuid();
                }
            },uuid() {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid;

            },getBuildings() {
                this.$vc.http.get('listFloor', 'list', {
                    params: {
                        floorId: '',
                        floorNum: '',
                        floorName: '',
                        page: 1,
                        row: 50,
                        communityId: this.$vc.getCurrentCommunity().communityId,
                    }
                },
                (json, res) => {
                    var listFloorData = JSON.parse(json);
                    this.floors = listFloorData.apiFloorDataVoList;

                },
                (errText, err) => {

                })
            },getOrgs() {
                this.$vc.http.get('orgManage', 'belongingList', {
                        params: {
                            floorId: '',
                            floorNum: '',
                            floorName: '',
                            page: 1,
                            row: 50,
                            communityId: this.$vc.getCurrentCommunity().communityId,
                        }
                    },
                    (json, res) => {
                        const orgsData = JSON.parse(json);
                        this.orgs = orgsData.orgs;

                    },
                    (errText, err) => {

                    })
            },addInspectionPointValidate() {
                return this.$vc.validate.validate({
                    addInspectionPointInfo: this.addInspectionPointInfo
                }, {
                    'addInspectionPointInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "巡检点名称不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "100",
                            errInfo: "巡检点名称不能超过100位"
                        },
                    ],
                });
            },saveInspectionPointInfo:function () {
                if (!this.addInspectionPointValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.addInspectionPointInfo.regionId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, {...this.addInspectionPointInfo});
                    $('#addInspectionPointModel').modal('hide');
                    this.clearAddInspectionPointInfo();
                    return;
                }
            },clearAddInspectionPointInfo:function () {
                this.addInspectionPointInfo = {
                    regionId: this.$vc.getCurrentCommunity().communityId,
                    buildingId: '',
                    beaconId: '',
                    name: ''
                };
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    