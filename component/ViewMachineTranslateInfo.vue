
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>设备同步信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewMachineTranslateInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectMachineTranslateInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择设备同步</button>

                    <button type="button" v-if="viewMachineTranslateInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddMachineTranslateInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加设备同步</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备编码：</label>
                            <label class="">{{viewMachineTranslateInfo.machineCode}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备ID：</label>
                            <label class="">{{viewMachineTranslateInfo.machineId}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >对象类型：</label>
                            <label class="">{{viewMachineTranslateInfo.typeCd}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >对象名称：</label>
                            <label class="">{{viewMachineTranslateInfo.objName}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >对象Id：</label>
                            <label class="">{{viewMachineTranslateInfo.objId}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >状态：</label>
                            <label class="">{{viewMachineTranslateInfo.state}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addMachineTranslate"
               callBackListener="viewMachineTranslateInfo"
               callBackFunction="chooseMachineTranslate"
    ></vc:create>


    <vc:create name="chooseMachineTranslate"
               emitChooseMachineTranslate="viewMachineTranslateInfo"
               emitLoadData="viewMachineTranslateInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddMachineTranslate from '@/component/AddMachineTranslate.vue';import ChooseMachineTranslate from '@/component/ChooseMachineTranslate.vue';



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
                    AddMachineTranslate,ChooseMachineTranslate
                },
                data () {
                    return {"viewMachineTranslateInfo":{"index":0,"flowComponent":"viewMachineTranslateInfo","machineCode":"","machineId":"","typeCd":"","objName":"","objId":"","state":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadMachineTranslateInfoData();
        })()
(() =>{
            this.$vc.on('viewMachineTranslateInfo','chooseMachineTranslate',(_app) =>{
                this.$vc.copyObject(_app, this.viewMachineTranslateInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewMachineTranslateInfo);
            });

            this.$vc.on('viewMachineTranslateInfo', 'onIndex', (_index) =>{
                this.viewMachineTranslateInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectMachineTranslateInfoModel(){
                this.$vc.emit('chooseMachineTranslate','openChooseMachineTranslateModel',{});
            },_openAddMachineTranslateInfoModel(){
                this.$vc.emit('addMachineTranslate','openAddMachineTranslateModal',{});
            },_loadMachineTranslateInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    