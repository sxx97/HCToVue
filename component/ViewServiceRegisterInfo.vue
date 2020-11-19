
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>服务绑定信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewServiceRegisterInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectServiceRegisterInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择服务绑定</button>

                    <button type="button" v-if="viewServiceRegisterInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddServiceRegisterInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加服务绑定</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >应用ID：</label>
                            <label class="">{{viewServiceRegisterInfo.appId}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >服务ID：</label>
                            <label class="">{{viewServiceRegisterInfo.serviceId}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >订单类型：</label>
                            <label class="">{{viewServiceRegisterInfo.orderTypeCd}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >调用次数：</label>
                            <label class="">{{viewServiceRegisterInfo.invokeLimitTimes}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >调用方式：</label>
                            <label class="">{{viewServiceRegisterInfo.invokeModel}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addServiceRegister"
               callBackListener="viewServiceRegisterInfo"
               callBackFunction="chooseServiceRegister"
    ></vc:create>


    <vc:create name="chooseServiceRegister"
               emitChooseServiceRegister="viewServiceRegisterInfo"
               emitLoadData="viewServiceRegisterInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddServiceRegister from '@/component/AddServiceRegister.vue';import ChooseServiceRegister from '@/component/ChooseServiceRegister.vue';



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
                    AddServiceRegister,ChooseServiceRegister
                },
                data () {
                    return {"viewServiceRegisterInfo":{"index":0,"flowComponent":"viewServiceRegisterInfo","appId":"","serviceId":"","orderTypeCd":"","invokeLimitTimes":"","invokeModel":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadServiceRegisterInfoData();
        })()
(() =>{
            this.$vc.on('viewServiceRegisterInfo','chooseServiceRegister',(_app) =>{
                this.$vc.copyObject(_app, this.viewServiceRegisterInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewServiceRegisterInfo);
            });

            this.$vc.on('viewServiceRegisterInfo', 'onIndex', (_index) =>{
                this.viewServiceRegisterInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectServiceRegisterInfoModel(){
                this.$vc.emit('chooseServiceRegister','openChooseServiceRegisterModel',{});
            },_openAddServiceRegisterInfoModel(){
                this.$vc.emit('addServiceRegister','openAddServiceRegisterModal',{});
            },_loadServiceRegisterInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    