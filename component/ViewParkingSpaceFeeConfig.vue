
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
    <vc:create name="configParkingSpaceFee"></vc:create>
    <vc:create name="configParkingSpaceTempFee"></vc:create>
</div>
        </template>
        <script>
            
            import ConfigParkingSpaceFee from '@/component/ConfigParkingSpaceFee.vue';import ConfigParkingSpaceTempFee from '@/component/ConfigParkingSpaceTempFee.vue';



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
                props: {},
                components: {
                    ConfigParkingSpaceFee,ConfigParkingSpaceTempFee
                },
                data () {
                    return {"feeConfigUpHireInfo":{"configId":"","additionalAmount":"","feeName":"出租地上停车费","feeTypeCd":"888800010004"},"feeConfigDownHireInfo":{"configId":"","additionalAmount":"","feeName":"出租地下停车费","feeTypeCd":"888800010005"},"feeConfigUpSellInfo":{"configId":"","additionalAmount":"","feeName":"出售地上停车费","feeTypeCd":"888800010002"},"feeConfigDownSellInfo":{"configId":"","additionalAmount":"","feeName":"出售地下停车费","feeTypeCd":"888800010003"},"feeConfigDownTempInfo":{"configId":"","additionalAmount":"","squarePrice":"","feeName":"临时停车费","feeTypeCd":"888800010007"}}    
                },
                mounted() {
                (() =>{
                this.loadParkingSpaceConfigFee(this.feeConfigUpHireInfo);
                this.loadParkingSpaceConfigFee(this.feeConfigDownHireInfo);
                this.loadParkingSpaceConfigFee(this.feeConfigUpSellInfo);
                this.loadParkingSpaceConfigFee(this.feeConfigDownSellInfo);
                this.loadParkingSpaceConfigFee(this.feeConfigDownTempInfo);
        })()
(() =>{
            this.$vc.on('viewParkingSpaceFeeConfig','loadParkingSpaceConfigFee',(_param) =>{
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
                     (json,res) =>{
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
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    