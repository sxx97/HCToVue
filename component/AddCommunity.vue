
        <template>
            <div id="addCommunityModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加管理区</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">管理区名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addCommunityInfo.name" type="text" placeholder="必填，请填写管理区名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">管理区地区</label>
                                <div class="col-sm-10">
                                    <select id="pro" class="form-control form-control-sm"
                                            style="width: 10vw;display: inline;"
                                            v-model="selectProv"
                                            @change="getProv(selectProv)">
                                        <option value='' disabled selected style='display:none;'>请选择省</option>
                                        <option v-for="item in provs"
                                                :label="item.areaName"
                                                :value="item.areaCode">{{item.areaName}}
                                        </option>

                                    </select>

                                    <select id="city" class="form-control form-control-sm"
                                            style="width: 10vw;display: inline;"
                                            v-if="selectProv!=''"
                                            v-model="selectCity"
                                            @change="getCity(selectCity)">
                                        <option value='' disabled selected style='display:none;'>请选择城市</option>
                                        <option v-for="item in citys"
                                                :label="item.areaName"
                                                :value="item.areaCode">{{item.areaName}}
                                        </option>
                                    </select>

                                    <select id="area" class="form-control form-control-sm"
                                            style="width: 10vw;display: inline;"
                                            v-if="selectCity!=''"
                                            v-model="selectArea"
                                            @change="getArea(selectArea)">
                                        <option value='' disabled selected style='display:none;'>请选择区县</option>
                                        <option v-for="item in areas"
                                                :label="item.areaName"
                                                :value="item.areaCode">{{item.areaName}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">管理区地址</label>
                                <div class="col-sm-10">
                                    <input v-model="addCommunityInfo.address" type="text" placeholder="必填，请填写管理区地址"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">附近地标</label>
                                <div class="col-sm-10">
                                    <input v-model="addCommunityInfo.nearbyLandmarks" type="text"
                                           placeholder="必填，请填写附近地标" class="form-control">
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveCommunityInfo()"><i class="fa fa-check"></i>&nbsp;保存
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
                return {"addCommunityInfo":"[object Object]","areas":"","provs":"","citys":"","selectProv":"","selectCity":"","selectArea":"","allCity":""}    
            },
            mounted() {
             (function () {
            this._initArea('101', '0');
        })()(function () {
            this.$vc.on('addCommunity', 'openAddCommunityModal', function () {
                $('#addCommunityModel').modal('show');
            });
        })()   
            },
            methods: {
                addCommunityValidate() {
                return this.$vc.validate.validate({
                    addCommunityInfo: this.addCommunityInfo
                }, {
                    'addCommunityInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "写字楼名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "4,20",
                            errInfo: "写字楼名称必须在10至20字符之间"
                        },
                    ],
                    'addCommunityInfo.address': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "写字楼地址不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "写字楼地址不能大于200个字符"
                        },
                    ],
                    'addCommunityInfo.nearbyLandmarks': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "附近地标不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "写字楼附近地标不能大于50个字符"
                        },
                    ],
                    'addCommunityInfo.cityCode': [
                        {
                            limit: "maxLength",
                            param: "12",
                            errInfo: "写字楼城市编码不能大于4个字符"
                        },
                    ],
                    'addCommunityInfo.mapX': [
                        {
                            limit: "maxLength",
                            param: "20",
                            errInfo: "写字楼城市编码不能大于4个字符"
                        },
                    ],
                    'addCommunityInfo.mapY': [
                        {
                            limit: "maxLength",
                            param: "20",
                            errInfo: "写字楼城市编码不能大于4个字符"
                        },
                    ],


                });
            },saveCommunityInfo:function () {
                if (!this.addCommunityValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                //this.addCommunityInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                this.addCommunityInfo.address = this.addCommunityInfo.areaAddress+ this.addCommunityInfo.address;


                this.$vc.http.post(
                    'addCommunity',
                    'save',
                    JSON.stringify(this.addCommunityInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addCommunityModel').modal('hide');
                            this.clearAddCommunityInfo();
                            this.$vc.emit('communityManage', 'listCommunity', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddCommunityInfo:function () {
                this.addCommunityInfo = {
                    name: '',
                    address: '',
                    nearbyLandmarks: '',
                    cityCode: '0971',
                    mapX: '101.33',
                    mapY: '101.33',

                };
            },getProv:function (_prov) {
                this._initArea('202', _prov);
            },getCity:function (_city) {
                this._initArea('303',_city);
            },getArea:function(_area){
              this.addCommunityInfo.cityCode = _area;

                this.addCommunityInfo.areaAddress = '';
                if (this.provs == null || this.provs == undefined) {
                    return;
                }
                this.provs.forEach(function (_param) {
                    if (_param.areaCode == this.selectProv) {
                        this.addCommunityInfo.areaAddress = _param.areaName;
                    }
                });

                this.citys.forEach(function (_param) {
                    if (_param.areaCode == this.selectCity) {
                        this.addCommunityInfo.areaAddress += _param.areaName;
                    }
                });

                this.areas.forEach(function (_param) {
                    if (_param.areaCode == this.selectArea) {
                        this.addCommunityInfo.areaAddress += _param.areaName;
                    }
                });
            },_initArea:function (_areaLevel, _parentAreaCode) { //加载区域
                var _param = {
                    params: {
                        areaLevel: _areaLevel,
                        parentAreaCode: _parentAreaCode
                    }
                };
                this.$vc.http.get('addCommunity', 'getAreas',
                    _param,
                    function (json, res) {
                        if (res.status == 200) {
                            var _tmpAreas = JSON.parse(json);
                            if (_areaLevel == '101') {
                                this.provs = _tmpAreas;
                            } else if (_areaLevel == '202') {
                                this.citys = _tmpAreas;
                            } else {
                                this.areas = _tmpAreas;
                            }
                            return;
                        }
                        //this.$emit('errorInfoEvent',json);
                    }, function (errInfo, error) {
                        console.log('请求失败处理', errInfo, error);
                        this.$vc.toast("查询地区失败");
                    });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    