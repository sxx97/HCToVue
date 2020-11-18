
        <template>
            <div class="row" id="component">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>{{feeConfigUpHireInfo.feeName}}信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openConfigParkingSpaceFeeModel(feeConfigUpHireInfo)">
                        <i class="glyphicon glyphicon-plus"></i> 编辑</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label" >地上停车费配置ID：</label>
                            <label class="">{{feeConfigUpHireInfo.configId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label" >每月费用：</label>
                            <label class="">{{feeConfigUpHireInfo.additionalAmount}} 元</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>{{feeConfigDownHireInfo.feeName}}信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openConfigParkingSpaceFeeModel(feeConfigDownHireInfo)">
                        <i class="glyphicon glyphicon-plus"></i> 编辑</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label" >地下停车费配置ID：</label>
                            <label class="">{{feeConfigDownHireInfo.configId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label" >每月费用：</label>
                            <label class="">{{feeConfigDownHireInfo.additionalAmount}} 元</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>{{feeConfigUpSellInfo.feeName}}信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openConfigParkingSpaceFeeModel(feeConfigUpSellInfo)">
                        <i class="glyphicon glyphicon-plus"></i> 编辑</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label" >地上停车费配置ID：</label>
                            <label class="">{{feeConfigUpSellInfo.configId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label" >每月费用：</label>
                            <label class="">{{feeConfigUpSellInfo.additionalAmount}} 元</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>{{feeConfigDownSellInfo.feeName}}信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openConfigParkingSpaceFeeModel(feeConfigDownSellInfo)">
                        <i class="glyphicon glyphicon-plus"></i> 编辑</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label" >地下停车费配置ID：</label>
                            <label class="">{{feeConfigDownSellInfo.configId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-form-label" >每月费用：</label>
                            <label class="">{{feeConfigDownSellInfo.additionalAmount}} 元</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!------- 临时停车费 --------->
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>{{feeConfigDownTempInfo.feeName}}信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openConfigParkingSpaceTempFeeModel(feeConfigDownTempInfo)">
                        <i class="glyphicon glyphicon-plus"></i> 编辑</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >地下临时配置ID：</label>
                            <label class="">{{feeConfigDownTempInfo.configId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">每小时单价：</label>
                            <label class="">{{feeConfigDownTempInfo.squarePrice}} 元</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >首两个小时：</label>
                            <label class="">{{feeConfigDownTempInfo.additionalAmount}} 元</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <ConfigParkingSpaceFee name="configParkingSpaceFee"></ConfigParkingSpaceFee>
    <ConfigParkingSpaceTempFee name="configParkingSpaceTempFee"></ConfigParkingSpaceTempFee>
</div>
        </template>
        <script>
            import ConfigParkingSpaceFee from './ConfigParkingSpaceFee.vue';import ConfigParkingSpaceTempFee from './ConfigParkingSpaceTempFee.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"feeConfigUpHireInfo":"[object Object]","feeConfigDownHireInfo":"[object Object]","feeConfigUpSellInfo":"[object Object]","feeConfigDownSellInfo":"[object Object]","feeConfigDownTempInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
                this.loadParkingSpaceConfigFee(this.feeConfigUpHireInfo);
                this.loadParkingSpaceConfigFee(this.feeConfigDownHireInfo);
                this.loadParkingSpaceConfigFee(this.feeConfigUpSellInfo);
                this.loadParkingSpaceConfigFee(this.feeConfigDownSellInfo);
                this.loadParkingSpaceConfigFee(this.feeConfigDownTempInfo);
        })()(function(){
            this.$vc.on('viewParkingSpaceFeeConfig','loadParkingSpaceConfigFee',function(_param){
                this.loadParkingSpaceConfigFee(_param);
            });

        })()   
            },
            methods: {
                openConfigParkingSpaceFeeModel:function(_feeInfo){
                this.$vc.emit('configParkingSpaceFee','openConfigParkingSpaceFeeModel',_feeInfo);
            },openConfigParkingSpaceTempFeeModel:function(_feeInfo){
                this.$vc.emit('configFeeTempConfigInfo','openConfigParkingSpaceFeeModel',_feeInfo);
            },loadParkingSpaceConfigFee:function(_feeInfo){
                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        configId:_feeInfo.configId,
                        feeTypeCd:_feeInfo.feeTypeCd
                    }
                };
                this.$vc.http.get(
                    'viewParkingSpaceFeeConfig',
                    'loadData',
                     param,
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            if(_feeInfo.feeTypeCd == this.feeConfigUpHireInfo.feeTypeCd){
                                   this.$vc.copyObject(JSON.parse(json), this.feeConfigUpHireInfo);
                            }else if(_feeInfo.feeTypeCd == this.feeConfigDownHireInfo.feeTypeCd){
                                   this.$vc.copyObject(JSON.parse(json), this.feeConfigDownHireInfo);
                            }else if(_feeInfo.feeTypeCd == this.feeConfigUpSellInfo.feeTypeCd){
                                   this.$vc.copyObject(JSON.parse(json), this.feeConfigUpSellInfo);
                           }else if(_feeInfo.feeTypeCd == this.feeConfigDownTempInfo.feeTypeCd){
                                   this.$vc.copyObject(JSON.parse(json), this.feeConfigDownTempInfo);
                            }else{
                                   this.$vc.copyObject(JSON.parse(json), this.feeConfigDownSellInfo);
                            }
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    