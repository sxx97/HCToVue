
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>巡检计划信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewInspectionPlanInfo.index != 2" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectInspectionPlanInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择巡检计划
                    </button>

                    <button type="button" v-if="viewInspectionPlanInfo.index != 2" class="btn btn-primary btn-sm"
                            v-on:click="_openAddInspectionPlanInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加巡检计划
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">计划名称：</label>
                            <label class="">{{viewInspectionPlanInfo.inspectionPlanName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">巡检路线：</label>
                            <label class="">{{viewInspectionPlanInfo.inspectionRouteId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">执行周期：</label>
                            <label class="">{{viewInspectionPlanInfo.inspectionPlanPeriod}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">执行人员：</label>
                            <label class="">{{viewInspectionPlanInfo.staffId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">开始时间：</label>
                            <label class="">{{viewInspectionPlanInfo.startTime}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">结束时间：</label>
                            <label class="">{{viewInspectionPlanInfo.endTime}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">签到方式：</label>
                            <label class="">{{viewInspectionPlanInfo.signType}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">状态：</label>
                            <label class="">{{viewInspectionPlanInfo.state}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">备注：</label>
                            <label class="">{{viewInspectionPlanInfo.remark}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="addInspectionPlan"
               callBackListener="viewInspectionPlanInfo"
               callBackFunction="chooseInspectionPlan"
    ></vc:create>


    <vc:create name="chooseInspectionPlan"
               emitChooseInspectionPlan="viewInspectionPlanInfo"
               emitLoadData="viewInspectionPlanInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddInspectionPlan from '@/component/AddInspectionPlan.vue';import ChooseInspectionPlan from '@/component/ChooseInspectionPlan.vue';



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
                    AddInspectionPlan,ChooseInspectionPlan
                },
                data () {
                    return {"viewInspectionPlanInfo":{"index":0,"flowComponent":"viewInspectionPlanInfo","inspectionPlanName":"","inspectionRouteId":"","inspectionPlanPeriod":"","staffId":"","startTime":"","endTime":"","signType":"","state":"","remark":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadInspectionPlanInfoData();
        })()
(() =>{
            this.$vc.on('viewInspectionPlanInfo','chooseInspectionPlan',(_app) =>{
                this.$vc.copyObject(_app, this.viewInspectionPlanInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewInspectionPlanInfo);
            });

            this.$vc.on('viewInspectionPlanInfo', 'onIndex', (_index) =>{
                this.viewInspectionPlanInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectInspectionPlanInfoModel(){
                this.$vc.emit('chooseInspectionPlan','openChooseInspectionPlanModel',{});
            },_openAddInspectionPlanInfoModel(){
                this.$vc.emit('addInspectionPlan','openAddInspectionPlanModal',{});
            },_loadInspectionPlanInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    