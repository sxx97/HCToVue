
        <template>
            <div id="roomCreateFeeAddModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">创建费用</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">收费范围</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="roomCreateFeeAddInfo.locationTypeCd" v-if="roomCreateFeeAddInfo.isMore == true">
                                        <option selected disabled value="">必填，请选择收费范围</option>
                                        <option value="1000">写字楼</option>
                                        <option value="4000">楼栋</option>
                                        <option value="2000">单元</option>
                                        <option value="3000">房间</option>
                                    </select>
                                    <input v-model="roomCreateFeeAddInfo.locationTypeCdName" v-if="roomCreateFeeAddInfo.isMore == false" disabled = "disabled" type="text" placeholder="必填，请填写收费范围"
                                           class="form-control">

                                </div>
                            </div>
                            <div class="form-group row"
                                 v-show="roomCreateFeeAddInfo.locationTypeCd == '2000' || roomCreateFeeAddInfo.locationTypeCd == '3000' ||roomCreateFeeAddInfo.locationTypeCd == '4000' ">
                                <label class="col-sm-2 col-form-label">楼栋</label>
                                <div class="col-sm-10">
                                    <vc:create name="floorSelect2"
                                               parentModal="roomCreateFeeAddModel"
                                               namespace="roomCreateFeeAdd"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row"
                                 v-show="roomCreateFeeAddInfo.locationTypeCd == '2000' || roomCreateFeeAddInfo.locationTypeCd == '3000'  ">
                                <label class="col-sm-2 col-form-label">单元</label>
                                <div class="col-sm-10">
                                    <vc:create name="unitSelect2"
                                               parentModal="roomCreateFeeAddModel"
                                               callBackListener="roomCreateFeeAdd"
                                               callBackFunction="notify"
                                               namespace="roomCreateFeeAdd"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row"
                                 v-show="roomCreateFeeAddInfo.locationTypeCd == '3000' ">
                                <label class="col-sm-2 col-form-label">房间</label>
                                <div class="col-sm-10">
                                    <vc:create name="roomSelect2"
                                               parentModal="roomCreateFeeAddModel"
                                               callBackListener="roomCreateFeeAdd"
                                               callBackFunction="notify"
                                               namespace="roomCreateFeeAdd"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">费用类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="roomCreateFeeAddInfo.feeTypeCd" @change="_changeFeeTypeCd(roomCreateFeeAddInfo.feeTypeCd)">
                                        <option selected disabled value="">必填，请选择费用类型</option>
                                        <option v-for="(item,index) in roomCreateFeeAddInfo.feeTypeCds" :key="index"
                                                v-bind:value="item.statusCd">{{item.name}}
                                        </option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">收费项目</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="roomCreateFeeAddInfo.configId">
                                        <option selected disabled value="">必填，请选择收费项目</option>
                                        <option v-for="(item,index) in roomCreateFeeAddInfo.feeConfigs" :key="index"
                                                v-bind:value="item.configId">{{item.feeName}}
                                        </option>
                                    </select></div>
                            </div>
                            <div class="form-group row" >
                                <label class="col-sm-2 col-form-label">出账类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="roomCreateFeeAddInfo.billType">
                                        <option selected disabled value="">必填，请选择出账类型</option>
                                        <option  value="001">每年1月1日</option>
                                        <option  value="002">每月1日</option>
                                        <option  value="003">每日</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row" >
                                <label class="col-sm-2 col-form-label">房间状态</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="roomCreateFeeAddInfo.roomState">
                                        <option selected disabled value="">必填，请选择房间状态</option>
                                        <option  value="2001">已售房间</option>
                                        <option  value="0000">全部房间</option>
                                    </select>
                                </div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveRoomCreateFeeInfo()"><i class="fa fa-check"></i>&nbsp;提交
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
                return {"roomCreateFeeAddInfo":"[object Object]"}    
            },
            mounted() {
             (function() {
            this.$vc.getDict('pay_fee_config',"fee_type_cd",function(_data){
                this.roomCreateFeeAddInfo.feeTypeCds = _data;
            });

        })()(function() {
            this.$vc.on('roomCreateFeeAdd', 'openRoomCreateFeeAddModal',
            function(_room) {
                this.roomCreateFeeAddInfo.isMore =_room.isMore;
                if(!_room.isMore){
                    this.roomCreateFeeAddInfo.locationTypeCd = '5008';
                    this.roomCreateFeeAddInfo.locationObjId = _room.room.roomId;
                    var room =  _room.room;
                    this.roomCreateFeeAddInfo.locationTypeCdName = room.floorNum +'号楼'+room.unitNum+'单元'+room.roomNum+'室';
                }
                $('#roomCreateFeeAddModel').modal('show');

            });

            this.$vc.on("roomCreateFeeAdd", "notify", function (_param) {
                if (_param.hasOwnProperty("floorId")) {
                    this.roomCreateFeeAddInfo.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.roomCreateFeeAddInfo.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.roomCreateFeeAddInfo.roomId = _param.roomId;
                }
            });
        })()   
            },
            methods: {
                roomCreateFeeAddValidate() {
                return this.$vc.validate.validate({
                    roomCreateFeeAddInfo: this.roomCreateFeeAddInfo
                },
                {
                    'roomCreateFeeAddInfo.locationTypeCd': [{
                        limit: "required",
                        param: "",
                        errInfo: "收费范围不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "收费范围格式错误"
                    },
                    ],
                    'roomCreateFeeAddInfo.locationObjId': [{
                        limit: "required",
                        param: "",
                        errInfo: "收费对象不能为空"
                    }
                    ],
                    'roomCreateFeeAddInfo.feeTypeCd': [{
                        limit: "required",
                        param: "",
                        errInfo: "费用类型不能为空"
                    }
                    ],
                    'roomCreateFeeAddInfo.configId': [{
                        limit: "required",
                        param: "",
                        errInfo: "费用项目不能为空"
                    }
                    ],
                    'roomCreateFeeAddInfo.billType': [{
                        limit: "required",
                        param: "",
                        errInfo: "出账类型不能为空"
                    }
                    ],
                     'roomCreateFeeAddInfo.roomState': [{
                         limit: "required",
                         param: "",
                         errInfo: "出账类型不能为空"
                     }
                     ]
                });
            },saveRoomCreateFeeInfo:function() {

                this.roomCreateFeeAddInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.roomCreateFeeAddInfo.locationTypeCd == '1000') { //大门时直接写 写字楼ID
                    this.roomCreateFeeAddInfo.locationObjId = this.roomCreateFeeAddInfo.communityId;
                } else if (this.roomCreateFeeAddInfo.locationTypeCd == '2000') {
                    this.roomCreateFeeAddInfo.locationObjId = this.roomCreateFeeAddInfo.unitId;
                } else if (this.roomCreateFeeAddInfo.locationTypeCd == '3000') {
                    this.roomCreateFeeAddInfo.locationObjId = this.roomCreateFeeAddInfo.roomId;
                } else if (this.roomCreateFeeAddInfo.locationTypeCd == '4000') {
                    this.roomCreateFeeAddInfo.locationObjId = this.roomCreateFeeAddInfo.floorId;
                } else if (this.roomCreateFeeAddInfo.locationTypeCd == '5008') {
                }else {
                    this.$vc.toast("收费范围错误");
                    return;
                }

                if (!this.roomCreateFeeAddValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.roomCreateFeeAddInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                var _roomCreateFeeAddInfo = JSON.parse(JSON.stringify(this.roomCreateFeeAddInfo));
                if(_roomCreateFeeAddInfo.locationTypeCd == '5008'){
                    _roomCreateFeeAddInfo.locationTypeCd = '3000';
                }

                this.$vc.http.post('roomCreateFeeAdd', 'save', JSON.stringify(_roomCreateFeeAddInfo), {
                    emulateJSON: true
                },
                function(json, res) {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        var _json = JSON.parse(json);
                        $('#roomCreateFeeAddModel').modal('hide');
                        this.clearAddFeeConfigInfo();
                        this.$vc.toast("创建收费成功，总共["+_json.totalRoom+"]房间，成功["+_json.successRoom+"],失败["+_json.errorRoom+"]",8000);
                        return;
                    }
                    this.$vc.message(json);

                },
                function(errInfo, error) {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);

                });
            },clearAddFeeConfigInfo:function() {
                var _feeTypeCds = this.roomCreateFeeAddInfo.feeTypeCds;
                this.roomCreateFeeAddInfo = {
                    feeConfigs:[],
                    locationTypeCd: '',
                    locationObjId: '',
                    floorId: '',
                    floorNum: '',
                    floorName: '',
                    unitId: '',
                    unitName: '',
                    roomId: '',
                    feeTypeCd:'',
                    configId:'',
                    billType:'',
                    roomState:'',
                    isMore:false,
                    locationTypeCdName:'',
                };

                this.roomCreateFeeAddInfo.feeTypeCds = _feeTypeCds;
            },_changeFeeTypeCd:function(_feeTypeCd){

                var param = {
                    params: {
                        page:1,
                        row:20,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        feeTypeCd:_feeTypeCd,
                        isDefault:'F'
                    }
                };

                //发送get请求
                this.$vc.http.get('roomCreateFeeAdd', 'list', param,
                function(json, res) {
                    var _feeConfigManageInfo = JSON.parse(json);
                    this.roomCreateFeeAddInfo.feeConfigs = _feeConfigManageInfo.feeConfigs;
                },
                function(errInfo, error) {
                    console.log('请求失败处理');
                });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    