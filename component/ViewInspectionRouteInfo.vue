
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>巡检路线信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewInspectionRouteInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectInspectionRouteInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择巡检路线</button>

                    <button type="button" v-if="viewInspectionRouteInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddInspectionRouteInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加巡检路线</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >路线名称：</label>
                            <label class="">{{viewInspectionRouteInfo.routeName}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >巡检点：</label>
                            <label class="">{{viewInspectionRouteInfo.inspectionName}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >设备数量：</label>
                            <label class="">{{viewInspectionRouteInfo.machineQuantity}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >检查项数量：</label>
                            <label class="">{{viewInspectionRouteInfo.checkQuantity}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >备注：</label>
                            <label class="">{{viewInspectionRouteInfo.remark}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addInspectionRoute"
               callBackListener="viewInspectionRouteInfo"
               callBackFunction="chooseInspectionRoute"
    ></vc:create>


    <vc:create name="chooseInspectionRoute"
               emitChooseInspectionRoute="viewInspectionRouteInfo"
               emitLoadData="viewInspectionRouteInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddInspectionRoute from '@/component/AddInspectionRoute.vue';import ChooseInspectionRoute from '@/component/ChooseInspectionRoute.vue';



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
                    AddInspectionRoute,ChooseInspectionRoute
                },
                data () {
                    return {"viewInspectionRouteInfo":{"index":0,"flowComponent":"viewInspectionRouteInfo","routeName":"","inspectionName":"","machineQuantity":"","checkQuantity":"","remark":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadInspectionRouteInfoData();
        })()
(() =>{
            this.$vc.on('viewInspectionRouteInfo','chooseInspectionRoute',(_app) =>{
                this.$vc.copyObject(_app, this.viewInspectionRouteInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewInspectionRouteInfo);
            });

            this.$vc.on('viewInspectionRouteInfo', 'onIndex', (_index) =>{
                this.viewInspectionRouteInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectInspectionRouteInfoModel(){
                this.$vc.emit('chooseInspectionRoute','openChooseInspectionRouteModel',{});
            },_openAddInspectionRouteInfoModel(){
                this.$vc.emit('addInspectionRoute','openAddInspectionRouteModal',{});
            },_loadInspectionRouteInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    