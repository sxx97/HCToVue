
        <template>
            <div>
    <select id="pro" class="form-control form-control-sm"
            style="width: 10vw;display: inline;"
            v-model="this.areaSelectInfo.selectProv"
            @change="this.getProv(this.areaSelectInfo.selectProv)">
        <option value=''  selected >请选择省</option>
        <option v-for="item in this.areaSelectInfo.provs"
                :label="item.areaName"
                :value="item.areaCode">{{item.areaName}}
        </option>

    </select>

    <select id="city" class="form-control form-control-sm"
            style="width: 10vw;display: inline;"
            v-model="this.areaSelectInfo.selectCity"
            @change="this.getCity(this.areaSelectInfo.selectCity)">
        <option value=''  selected >请选择城市</option>
        <option v-for="item in this.areaSelectInfo.citys"
                :label="item.areaName"
                :value="item.areaCode">{{item.areaName}}
        </option>
    </select>

    <select id="area" class="form-control form-control-sm"
            style="width: 10vw;display: inline;"

            v-model="this.areaSelectInfo.selectArea"
            @change="this.getArea(this.areaSelectInfo.selectArea)">
        <option value=''  selected >请选择区县</option>
        <option v-for="item in this.areaSelectInfo.areas"
                :label="item.areaName"
                :value="item.areaCode">{{item.areaName}}
        </option>
    </select>
</div>

        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"areaSelectInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initArea('101', '0');
        })()(function () {

        })()   
            },
            methods: {
                getProv:function (_prov) {
                this._initArea('202', _prov);
            },getCity:function (_city) {
                this._initArea('303',_city);
            },getArea:function(_area){
              this.areaSelectInfo.cityCode = _area;

                this.areaSelectInfo.areaAddress = '';
                if (this.areaSelectInfo.provs == null || this.areaSelectInfo.provs == undefined) {
                    return;
                }
                this.areaSelectInfo.provs.forEach(function (_param) {
                    if (_param.areaCode == this.areaSelectInfo.selectProv) {
                        this.areaSelectInfo.selectProvName = _param.areaName;
                    }
                });

                this.areaSelectInfo.citys.forEach(function (_param) {
                    if (_param.areaCode == this.areaSelectInfo.selectCity) {
                        this.areaSelectInfo.selectCityName = _param.areaName;
                    }
                });

                this.areaSelectInfo.areas.forEach(function (_param) {
                    if (_param.areaCode == this.areaSelectInfo.selectArea) {
                        this.areaSelectInfo.selectAreaName = _param.areaName;
                    }
                });

                this.$vc.emit($namespace,this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,{
                    selectProv: this.areaSelectInfo.selectProv,
                    selectProvName: this.areaSelectInfo.selectProvName,
                    selectCity: this.areaSelectInfo.selectCity,
                    selectCityName: this.areaSelectInfo.selectCityName,
                    selectArea: this.areaSelectInfo.selectArea,
                    selectAreaName: this.areaSelectInfo.selectAreaName
                })
            },_initArea:function (_areaLevel, _parentAreaCode) { //加载区域
                var _param = {
                    params: {
                        areaLevel: _areaLevel,
                        parentAreaCode: _parentAreaCode
                    }
                };
                this.$vc.http.get('areaSelect', 'getAreas',
                    _param,
                    function (json, res) {
                        if (res.status == 200) {
                            var _tmpAreas = JSON.parse(json);
                            if (_areaLevel == '101') {
                                this.areaSelectInfo.provs = _tmpAreas;
                            } else if (_areaLevel == '202') {
                                this.areaSelectInfo.citys = _tmpAreas;
                            } else {
                                this.areaSelectInfo.areas = _tmpAreas;
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
    