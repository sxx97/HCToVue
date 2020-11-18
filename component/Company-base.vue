
        <template>
            <fieldset role="tabpanel" aria-labelledby="component-h-0" class="body current" v-bind:class="{no_display:step!=1}"
          aria-hidden="false">
    <h2>公司基本信息</h2>
    <div class="row">
        <div class="col-lg-8">
            <div class="form-group">
                <label>公司名称</label> <span class="required">*</span>
                <input id="name" v-model="companyBaseInfo.name" type="text" class="form-control required"
                       aria-required="true"/>
            </div>
            <div class="dropdown form-group">
                <label>公司地址</label> <span class="required">*</span>

                <select id="pro" class="form-control form-control-sm" style="width: 10vw;display: inline;"
                        v-model="selectProv"
                        @change="getProv(selectProv)">
                    <option value='' disabled selected style='display:none;'>请选择省</option>
                    <option v-for="item in provs"
                            :label="item.areaName"
                            :value="item.areaCode">{{item.areaName}}
                    </option>

                </select>
                <select id="city" class="form-control form-control-sm" style="width: 10vw;display: inline;"
                        v-if="selectProv!=''"
                        v-model="selectCity"
                        @change="getCity(selectCity)">
                    <option value='' disabled selected style='display:none;'>请选择城市</option>
                    <option v-for="item in citys"
                            :label="item.areaName"
                            :value="item.areaCode">{{item.areaName}}
                    </option>
                </select>
                <input name="address" v-model="companyBaseInfo.address" type="text" class="form-control required"
                       aria-required="true"/>
            </div>
            <div class="form-group">
                <label>联系电话</label> <span class="required">*</span>
                <input name="tel" v-model="companyBaseInfo.tel" type="text" class="form-control required"
                       aria-required="true"/>
            </div>
            <div class="form-group">
                <label>公司业务</label> <span class="required">*</span>
                <select name="storeTypeCd" v-model="companyBaseInfo.storeTypeCd" class="form-control  required"
                        aria-required="true">
                    <option v-for="storeType in storeTypes" v-bind:value="storeType.storeTypeCd">{{storeType.name}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label>附近建筑</label> <span class="required">*</span>
                <input name="nearbyLandmarks" v-model="companyBaseInfo.nearbyLandmarks" type="text"
                       class="form-control required" aria-required="true"/>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="text-center">
                <div style="margin-top: 20px;">
                    <i class="fa fa-sign-in" style="font-size: 180px; color: rgb(229, 229, 229);"></i>
                </div>
            </div>
        </div>
    </div>
</fieldset>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"storeTypes":"","companyBaseInfo":"[object Object]","areas":"","provs":"","citys":"","selectProv":"","selectCity":"","allCity":""}    
            },
            mounted() {
             (function () {
            this.initStoreType();

            this._initArea('101', '0');
        })()(function () {
//              this.$on('errorInfoEvent',function(_errorInfo){
//                     this.registerInfo.errorInfo = _errorInfo;
//                     console.log('errorInfoEvent 事件被监听',_errorInfo)
//                 });

        })()   
            },
            methods: {
                getProv:function (_prov) {
                this._initArea('202', _prov);
            },getCity:function (_city) {
                //this._initArea('303',_city);
                this.companyBaseInfo.areaAddress = '';
                if (this.provs == null || this.provs == undefined) {
                    return;
                }
                this.provs.forEach(function (_param) {
                    if (_param.areaCode == this.selectProv) {
                        this.companyBaseInfo.areaAddress = _param.areaName;
                    }
                });

                this.citys.forEach(function (_param) {
                    if (_param.areaCode == this.selectCity) {
                        this.companyBaseInfo.areaAddress += _param.areaName;
                    }
                });

            },initStoreType:function () {
                var param = {
                    params: {
                        msg: "123"
                    }

                }
                this.$vc.http.get('company', 'getStoreType',
                    JSON.stringify(param),
                    function (json, res) {
                        if (res.status == 200) {
                            this.storeTypes = JSON.parse(json);
                            return;
                        }
                        //this.$emit('errorInfoEvent',json);
                    }, function (errInfo, error) {
                        console.log('请求失败处理', errInfo, error);
                        this.$emit('errorInfoEvent', errInfo);
                    });

            },_initArea:function (_areaLevel, _parentAreaCode) { //加载区域
                var _param = {
                    params: {
                        areaLevel: _areaLevel,
                        parentAreaCode: _parentAreaCode
                    }
                };
                this.$vc.http.get('company', 'getAreas',
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
            },validateBase:function () {
                return this.$vc.validate.validate({
                    companyBaseInfo: this.companyBaseInfo
                }, {
                    'companyBaseInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "公司名不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "100",
                            errInfo: "用户名长度必须在100位之内"
                        },
                    ],
                    'companyBaseInfo.areaAddress': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "请选择地址"
                        }
                    ],
                    'companyBaseInfo.address': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "地址不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "地址长度必须在200位之内"
                        },
                    ],
                    'companyBaseInfo.tel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "手机号不能为空"
                        },
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "不是有效的手机号"
                        }
                    ],
                    'companyBaseInfo.storeTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "商户类型不能为空"
                        }
                    ],
                    'companyBaseInfo.nearbyLandmarks': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "附近建筑不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "地址长度必须在200位之内"
                        }
                    ],

                });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    