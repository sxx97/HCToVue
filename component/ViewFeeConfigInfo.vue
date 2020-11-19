
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>费用项信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewFeeConfigInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectFeeConfigInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择费用项</button>

                    <button type="button" v-if="viewFeeConfigInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddFeeConfigInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加费用项</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用类型：</label>
                            <label class="">{{viewFeeConfigInfo.feeTypeCd}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >收费项目：</label>
                            <label class="">{{viewFeeConfigInfo.feeName}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >费用标识：</label>
                            <label class="">{{viewFeeConfigInfo.feeFlag}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >计费起始时间：</label>
                            <label class="">{{viewFeeConfigInfo.startTime}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >计费终止时间：</label>
                            <label class="">{{viewFeeConfigInfo.endTime}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >计算公式：</label>
                            <label class="">{{viewFeeConfigInfo.computingFormula}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >计费单价：</label>
                            <label class="">{{viewFeeConfigInfo.squarePrice}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >附加费用：</label>
                            <label class="">{{viewFeeConfigInfo.additionalAmount}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addFeeConfig"
               callBackListener="viewFeeConfigInfo"
               callBackFunction="chooseFeeConfig"
    ></vc:create>


    <vc:create name="chooseFeeConfig"
               emitChooseFeeConfig="viewFeeConfigInfo"
               emitLoadData="viewFeeConfigInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddFeeConfig from '@/component/AddFeeConfig.vue';import ChooseFeeConfig from '@/component/ChooseFeeConfig.vue';



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
                    AddFeeConfig,ChooseFeeConfig
                },
                data () {
                    return {"viewFeeConfigInfo":{"index":0,"flowComponent":"viewFeeConfigInfo","feeTypeCd":"","feeName":"","feeFlag":"","startTime":"","endTime":"","computingFormula":"","squarePrice":"","additionalAmount":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadFeeConfigInfoData();
        })()
(() =>{
            this.$vc.on('viewFeeConfigInfo','chooseFeeConfig',(_app) =>{
                this.$vc.copyObject(_app, this.viewFeeConfigInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewFeeConfigInfo);
            });

            this.$vc.on('viewFeeConfigInfo', 'onIndex', (_index) =>{
                this.viewFeeConfigInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectFeeConfigInfoModel(){
                this.$vc.emit('chooseFeeConfig','openChooseFeeConfigModel',{});
            },_openAddFeeConfigInfoModel(){
                this.$vc.emit('addFeeConfig','openAddFeeConfigModal',{});
            },_loadFeeConfigInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    