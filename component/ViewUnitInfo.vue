
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>单元信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewUnitInfo.index != 2 && viewUnitInfo.floorId !='' && viewUnitInfo.floorId !='-1'"
                            class="btn btn-primary btn-sm" style="margin-right:10px;"
                            v-on:click="_openSelectUnitInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择单元
                    </button>

                    <button type="button" v-if="viewUnitInfo.index != 2" class="btn btn-primary btn-sm"
                            v-on:click="_openAddUnitInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加单元
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">单元ID：</label>
                            <label class="">{{viewUnitInfo.unitId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">单元编号：</label>
                            <label class="">{{viewUnitInfo.unitNum}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">总层数：</label>
                            <label class="">{{viewUnitInfo.layerCount}}</label>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">电梯：</label>
                            <label class="">{{viewUnitInfo.lift}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">备注：</label>
                            <label class="">{{viewUnitInfo.remark}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="addUnit"
               callBackListener="viewUnitInfo"
               callBackFunction="chooseUnit"
    ></vc:create>


    <vc:create name="chooseUnit"
               emitChooseUnit="viewUnitInfo"
               emitLoadData="viewUnitInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddUnit from '@/component/AddUnit.vue';import ChooseUnit from '@/component/ChooseUnit.vue';



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
                props: {"callBackListener":"chooseStaff","callBackFunction":"chooseStaff"},
                components: {
                    AddUnit,ChooseUnit
                },
                data () {
                    return {"viewUnitInfo":{"index":0,"flowComponent":"viewUnitInfo","unitId":"","unitNum":"","layerCount":"","lift":"","remark":"","floorId":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadUnitInfoData();
        })()
(() =>{
            this.$vc.on('viewUnitInfo','chooseUnit',(_app) =>{
                this.$vc.copyObject(_app, this.viewUnitInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewUnitInfo);
            });

            this.$vc.on('viewUnitInfo', 'onIndex', (_index) =>{
                this.viewUnitInfo.index = _index;
            });

            this.$vc.on('viewUnitInfo','onFloorInfo',(_param) =>{
                this.viewUnitInfo.floorId = _param.floorId;
            });

        })()   
                },
                methods: {
                    _openSelectUnitInfoModel(){
                this.$vc.emit('chooseUnit','openChooseUnitModel',{});
            },_openAddUnitInfoModel(){
                var _tmpFloorId = this.$vc.notNull(this.viewUnitInfo.floorId)?this.viewUnitInfo.floorId:"-1";
                this.$vc.emit('addUnit','openAddUnitModal',{
                    "floorId":_tmpFloorId
                });
            },_loadUnitInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    