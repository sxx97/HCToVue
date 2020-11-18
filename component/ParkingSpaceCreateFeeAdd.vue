
        <template>
            <div id="parkingSpaceCreateFeeAddModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                                    <select class="custom-select" v-model="parkingSpaceCreateFeeAddInfo.locationTypeCd" v-if="parkingSpaceCreateFeeAddInfo.isMore == true">
                                        <option selected disabled value="">必填，请选择收费范围</option>
                                        <option value="1000">写字楼</option>
                                        <option value="2000">停车场</option>
                                    </select>
                                    <input v-model="parkingSpaceCreateFeeAddInfo.locationTypeCdName" v-if="parkingSpaceCreateFeeAddInfo.isMore == false" disabled = "disabled" type="text" placeholder="必填，请填写收费范围"
                                           class="form-control">

                                </div>
                            </div>
                            <div class="form-group row" v-if="parkingSpaceCreateFeeAddInfo.locationTypeCd == '2000'">
                                <label class="col-sm-2 col-form-label">停车场</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="parkingSpaceCreateFeeAddInfo.locationObjId" >
                                        <option selected disabled value="">必填，请选择停车场</option>
                                        <option v-for="(item,index) in parkingSpaceCreateFeeAddInfo.parkingAreas" :key="index"
                                                v-bind:value="item.paId">{{item.num}}号停车场
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">费用类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="parkingSpaceCreateFeeAddInfo.feeTypeCd" @change="_changeFeeTypeCd(parkingSpaceCreateFeeAddInfo.feeTypeCd)">
                                        <option selected disabled value="">必填，请选择费用类型</option>
                                        <option v-for="(item,index) in parkingSpaceCreateFeeAddInfo.feeTypeCds" :key="index"
                                                v-bind:value="item.statusCd">{{item.name}}
                                        </option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">收费项目</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="parkingSpaceCreateFeeAddInfo.configId">
                                        <option selected disabled value="">必填，请选择收费项目</option>
                                        <option v-for="(item,index) in parkingSpaceCreateFeeAddInfo.feeConfigs" :key="index"
                                                v-bind:value="item.configId">{{item.feeName}}
                                        </option>
                                    </select></div>
                            </div>
                            <div class="form-group row" >
                                <label class="col-sm-2 col-form-label">出账类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="parkingSpaceCreateFeeAddInfo.billType">
                                        <option selected disabled value="">必填，请选择出账类型</option>
                                        <option  value="001">每年1月1日</option>
                                        <option  value="002">每月1日</option>
                                        <option  value="003">每日</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row" >
                                <label class="col-sm-2 col-form-label">车位状态</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="parkingSpaceCreateFeeAddInfo.parkingSpaceState">
                                        <option selected disabled value="">必填，请选择车位状态</option>
                                        <option  value="S">已售</option>
                                        <option  value="H">已出租</option>
                                        <option  value="F">空闲</option>
                                    </select>
                                </div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveParkingSpaceCreateFeeInfo()"><i class="fa fa-check"></i>&nbsp;提交
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
                return {"parkingSpaceCreateFeeAddInfo":"[object Object]"}    
            },
            mounted() {
             (function() {
            this.$vc.getDict('pay_fee_config',"fee_type_cd",function(_data){
                this.parkingSpaceCreateFeeAddInfo.feeTypeCds = _data;
            });

            this._loadParkingAreas();

        })()(function() {
            this.$vc.on('parkingSpaceCreateFeeAdd', 'openParkingSpaceCreateFeeAddModal',
            function(_parkingSpace) {
                this.parkingSpaceCreateFeeAddInfo.isMore =_parkingSpace.isMore;
                if(!_parkingSpace.isMore){
                    this.parkingSpaceCreateFeeAddInfo.locationTypeCd = '3000';
                    this.parkingSpaceCreateFeeAddInfo.locationObjId = _parkingSpace.parkingSpace.psId;
                    this.parkingSpaceCreateFeeAddInfo.psId = _parkingSpace.parkingSpace.psId;
                    var parkingSpace =  _parkingSpace.parkingSpace;
                    this.parkingSpaceCreateFeeAddInfo.locationTypeCdName = parkingSpace.areaNum +'号停车场'+parkingSpace.num+'号车位';
                }
                $('#parkingSpaceCreateFeeAddModel').modal('show');

            });
        })()   
            },
            methods: {
                parkingSpaceCreateFeeAddValidate() {
                return this.$vc.validate.validate({
                    parkingSpaceCreateFeeAddInfo: this.parkingSpaceCreateFeeAddInfo
                },
                {
                    'parkingSpaceCreateFeeAddInfo.locationTypeCd': [{
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
                    'parkingSpaceCreateFeeAddInfo.locationObjId': [{
                        limit: "required",
                        param: "",
                        errInfo: "收费对象不能为空"
                    }
                    ],
                    'parkingSpaceCreateFeeAddInfo.feeTypeCd': [{
                        limit: "required",
                        param: "",
                        errInfo: "费用类型不能为空"
                    }
                    ],
                    'parkingSpaceCreateFeeAddInfo.configId': [{
                        limit: "required",
                        param: "",
                        errInfo: "费用项目不能为空"
                    }
                    ],
                    'parkingSpaceCreateFeeAddInfo.billType': [{
                        limit: "required",
                        param: "",
                        errInfo: "出账类型不能为空"
                    }
                    ],
                     'parkingSpaceCreateFeeAddInfo.parkingSpaceState': [{
                         limit: "required",
                         param: "",
                         errInfo: "出账类型不能为空"
                     }
                     ]
                });
            },saveParkingSpaceCreateFeeInfo:function() {

                this.parkingSpaceCreateFeeAddInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.parkingSpaceCreateFeeAddInfo.locationTypeCd == '1000') { // 写字楼ID
                    this.parkingSpaceCreateFeeAddInfo.locationObjId = this.parkingSpaceCreateFeeAddInfo.communityId;
                } else if (this.parkingSpaceCreateFeeAddInfo.locationTypeCd == '2000') {
                } else if (this.parkingSpaceCreateFeeAddInfo.locationTypeCd == '3000') {
                    this.parkingSpaceCreateFeeAddInfo.locationObjId = this.parkingSpaceCreateFeeAddInfo.psId;
                } else {
                    this.$vc.toast("收费范围错误");
                    return;
                }

                if (!this.parkingSpaceCreateFeeAddValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.parkingSpaceCreateFeeAddInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                this.$vc.http.post('parkingSpaceCreateFeeAdd', 'save', JSON.stringify(this.parkingSpaceCreateFeeAddInfo), {
                    emulateJSON: true
                },
                function(json, res) {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        var _json = JSON.parse(json);
                        $('#parkingSpaceCreateFeeAddModel').modal('hide');
                        this.clearAddFeeConfigInfo();
                        this.$vc.toast("创建收费成功，总共["+_json.totalParkingSpace+"]车位，成功["+_json.successParkingSpace+"],失败["+_json.errorParkingSpace+"]",8000);
                        return;
                    }
                    this.$vc.message(json);

                },
                function(errInfo, error) {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);

                });
            },clearAddFeeConfigInfo:function() {
                var _feeTypeCds = this.parkingSpaceCreateFeeAddInfo.feeTypeCds;
                var _parkingAreas = this.parkingSpaceCreateFeeAddInfo.parkingAreas;
                this.parkingSpaceCreateFeeAddInfo = {
                     feeTypeCds:[],
                    feeConfigs:[],
                    parkingAreas:[],
                    locationTypeCd: '',
                    locationObjId: '',
                    psId: '',
                    feeTypeCd:'',
                    configId:'',
                    billType:'',
                    parkingSpaceState:'',
                    isMore:false,
                    locationTypeCdName:'',
                };

                this.parkingSpaceCreateFeeAddInfo.feeTypeCds = _feeTypeCds;
                this.parkingSpaceCreateFeeAddInfo.parkingAreas = _parkingAreas;
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
                this.$vc.http.get('parkingSpaceCreateFeeAdd', 'list', param,
                function(json, res) {
                    var _feeConfigManageInfo = JSON.parse(json);
                    this.parkingSpaceCreateFeeAddInfo.feeConfigs = _feeConfigManageInfo.feeConfigs;
                },
                function(errInfo, error) {
                    console.log('请求失败处理');
                });
            },_loadParkingAreas:function(_feeTypeCd){

                var param = {
                    params: {
                        page:1,
                        row:20,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                    }
                };

                //发送get请求
                this.$vc.http.get('parkingSpaceCreateFeeAdd', 'listParkingArea', param,
                function(json, res) {
                    if(res.status == 200){
                        var _parkingAreaInfo = JSON.parse(json);
                        this.parkingSpaceCreateFeeAddInfo.parkingAreas = _parkingAreaInfo.parkingAreas;
                    }
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
    