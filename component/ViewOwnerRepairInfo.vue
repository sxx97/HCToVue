
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>业主报修信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewOwnerRepairInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectOwnerRepairInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择业主报修</button>

                    <button type="button" v-if="viewOwnerRepairInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddOwnerRepairInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加业主报修</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >报修类型：</label>
                            <label class="">{{viewOwnerRepairInfo.repairType}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >报修人：</label>
                            <label class="">{{viewOwnerRepairInfo.repairName}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >联系方式：</label>
                            <label class="">{{viewOwnerRepairInfo.tel}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >房间ID：</label>
                            <label class="">{{viewOwnerRepairInfo.roomId}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >预约时间：</label>
                            <label class="">{{viewOwnerRepairInfo.appointmentTime}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >报修内容：</label>
                            <label class="">{{viewOwnerRepairInfo.context}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addOwnerRepair"
               callBackListener="viewOwnerRepairInfo"
               callBackFunction="chooseOwnerRepair"
    ></vc:create>


    <vc:create name="chooseOwnerRepair"
               emitChooseOwnerRepair="viewOwnerRepairInfo"
               emitLoadData="viewOwnerRepairInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddOwnerRepair from '@/component/AddOwnerRepair.vue';import ChooseOwnerRepair from '@/component/ChooseOwnerRepair.vue';



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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    AddOwnerRepair,ChooseOwnerRepair
                },
                data () {
                    return {"viewOwnerRepairInfo":{"index":0,"flowComponent":"viewOwnerRepairInfo","repairType":"","repairName":"","tel":"","roomId":"","appointmentTime":"","context":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadOwnerRepairInfoData();
        })()
(() =>{
            this.$vc.on('viewOwnerRepairInfo','chooseOwnerRepair',(_app) =>{
                this.$vc.copyObject(_app, this.viewOwnerRepairInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewOwnerRepairInfo);
            });

            this.$vc.on('viewOwnerRepairInfo', 'onIndex', (_index) =>{
                this.viewOwnerRepairInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectOwnerRepairInfoModel(){
                this.$vc.emit('chooseOwnerRepair','openChooseOwnerRepairModel',{});
            },_openAddOwnerRepairInfoModel(){
                this.$vc.emit('addOwnerRepair','openAddOwnerRepairModal',{});
            },_loadOwnerRepairInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    