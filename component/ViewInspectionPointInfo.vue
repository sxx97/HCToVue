
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>巡检点信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewInspectionPointInfo.index != 2" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectInspectionPointInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择巡检点
                    </button>

                    <button type="button" v-if="viewInspectionPointInfo.index != 2" class="btn btn-primary btn-sm"
                            v-on:click="_openAddInspectionPointInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加巡检点
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">巡检点名称：</label>
                            <label class="">{{viewInspectionPointInfo.inspection_name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">备注：</label>
                            <label class="">{{viewInspectionPointInfo.remark}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="addInspectionPoint"
               callBackListener="viewInspectionPointInfo"
               callBackFunction="chooseInspectionPoint"
    ></vc:create>


    <vc:create name="chooseInspectionPoint"
               emitChooseInspectionPoint="viewInspectionPointInfo"
               emitLoadData="viewInspectionPointInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddInspectionPoint from '@/component/AddInspectionPoint.vue';import ChooseInspectionPoint from '@/component/ChooseInspectionPoint.vue';



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
                    AddInspectionPoint,ChooseInspectionPoint
                },
                data () {
                    return {"viewInspectionPointInfo":{"index":0,"flowComponent":"viewInspectionPointInfo","inspection_name":"","remark":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadInspectionPointInfoData();
        })()
(() =>{
            this.$vc.on('viewInspectionPointInfo','chooseInspectionPoint',(_app) =>{
                this.$vc.copyObject(_app, this.viewInspectionPointInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewInspectionPointInfo);
            });

            this.$vc.on('viewInspectionPointInfo', 'onIndex', (_index) =>{
                this.viewInspectionPointInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectInspectionPointInfoModel(){
                this.$vc.emit('chooseInspectionPoint','openChooseInspectionPointModel',{});
            },_openAddInspectionPointInfoModel(){
                this.$vc.emit('addInspectionPoint','openAddInspectionPointModal',{});
            },_loadInspectionPointInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    