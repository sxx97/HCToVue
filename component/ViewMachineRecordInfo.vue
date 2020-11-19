
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>开门记录信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewMachineRecordInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectMachineRecordInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择开门记录</button>

                    <button type="button" v-if="viewMachineRecordInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddMachineRecordInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加开门记录</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备编码：</label>
                            <label class="">{{viewMachineRecordInfo.machineCode}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备ID：</label>
                            <label class="">{{viewMachineRecordInfo.machineId}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >用户名称：</label>
                            <label class="">{{viewMachineRecordInfo.name}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >开门方式：</label>
                            <label class="">{{viewMachineRecordInfo.openTypeCd}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >用户手机号：</label>
                            <label class="">{{viewMachineRecordInfo.tel}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >身份证：</label>
                            <label class="">{{viewMachineRecordInfo.idCard}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addMachineRecord"
               callBackListener="viewMachineRecordInfo"
               callBackFunction="chooseMachineRecord"
    ></vc:create>


    <vc:create name="chooseMachineRecord"
               emitChooseMachineRecord="viewMachineRecordInfo"
               emitLoadData="viewMachineRecordInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddMachineRecord from '@/component/AddMachineRecord.vue';import ChooseMachineRecord from '@/component/ChooseMachineRecord.vue';



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
                    AddMachineRecord,ChooseMachineRecord
                },
                data () {
                    return {"viewMachineRecordInfo":{"index":0,"flowComponent":"viewMachineRecordInfo","machineCode":"","machineId":"","name":"","openTypeCd":"","tel":"","idCard":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadMachineRecordInfoData();
        })()
(() =>{
            this.$vc.on('viewMachineRecordInfo','chooseMachineRecord',(_app) =>{
                this.$vc.copyObject(_app, this.viewMachineRecordInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewMachineRecordInfo);
            });

            this.$vc.on('viewMachineRecordInfo', 'onIndex', (_index) =>{
                this.viewMachineRecordInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectMachineRecordInfoModel(){
                this.$vc.emit('chooseMachineRecord','openChooseMachineRecordModel',{});
            },_openAddMachineRecordInfoModel(){
                this.$vc.emit('addMachineRecord','openAddMachineRecordModal',{});
            },_loadMachineRecordInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    