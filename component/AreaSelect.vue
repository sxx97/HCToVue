
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
                    
                },
                data () {
                    return {"areaSelectInfo":{"areas":[],"provs":[],"citys":[],"allCity":[],"selectProv":"","selectProvName":"","selectCity":"","selectCityName":"","selectArea":"","selectAreaName":""}}    
                },
                mounted() {
                ( () => {
            this._initArea('101', '0');
        })()
( () => {

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
                this.areaSelectInfo.provs.forEach( (_param) => {
                    if (_param.areaCode == this.areaSelectInfo.selectProv) {
                        this.areaSelectInfo.selectProvName = _param.areaName;
                    }
                });

                this.areaSelectInfo.citys.forEach( (_param) => {
                    if (_param.areaCode == this.areaSelectInfo.selectCity) {
                        this.areaSelectInfo.selectCityName = _param.areaName;
                    }
                });

                this.areaSelectInfo.areas.forEach( (_param) => {
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
                     (json, res) => {
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
                    },  (errInfo, error) => {
                        console.log('请求失败处理', errInfo, error);
                        this.$vc.toast("查询地区失败");
                    });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    