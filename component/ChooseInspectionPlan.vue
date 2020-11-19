
        <template>
            <div id = "chooseInspectionPlanModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseInspectionPlanModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseInspectionPlanModelLabel">选择巡检计划</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入巡检计划名称" type="text" v-model="chooseInspectionPlanInfo._currentInspectionPlanName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryInspectionPlans()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">巡检计划名称</th>
                            <th class="text-center">计划名称</th>
                            <th class="text-center">巡检路线</th>
                            <th class="text-center">执行周期</th>
                            <th class="text-center">执行人员</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">签到方式</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">备注</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="inspectionPlan in chooseInspectionPlanInfo.inspectionPlans">
                                                                        <td class="text-center">{{inspectionPlan.inspectionPlanId}}</td>
                            <td class="text-center">{{inspectionPlan.inspectionPlanName}}</td>
                            <td class="text-center">{{inspectionPlan.inspectionRouteId}}</td>
                            <td class="text-center">{{inspectionPlan.inspectionPlanPeriod}}</td>
                            <td class="text-center">{{inspectionPlan.staffId}}</td>
                            <td class="text-center">{{inspectionPlan.startTime}}</td>
                            <td class="text-center">{{inspectionPlan.endTime}}</td>
                            <td class="text-center">{{inspectionPlan.signType}}</td>
                            <td class="text-center">{{inspectionPlan.state}}</td>
                            <td class="text-center">{{inspectionPlan.remark}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseInspectionPlan(inspectionPlan)">选择</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
            



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
                props: {"emitChooseInspectionPlan":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseInspectionPlanInfo":{"inspectionPlans":[],"_currentInspectionPlanName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseInspectionPlan','openChooseInspectionPlanModel',(_param) =>{
                $('#chooseInspectionPlanModel').modal('show');
                this._refreshChooseInspectionPlanInfo();
                this._loadAllInspectionPlanInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllInspectionPlanInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseInspectionPlan',
                            'list',
                             param,
                             (json) =>{
                                var _inspectionPlanInfo = JSON.parse(json);
                                this.chooseInspectionPlanInfo.inspectionPlans = _inspectionPlanInfo.inspectionPlans;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseInspectionPlan:function(_inspectionPlan){
                if(_inspectionPlan.hasOwnProperty('name')){
                     _inspectionPlan.inspectionPlanName = _inspectionPlan.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseInspectionPlan,'chooseInspectionPlan',_inspectionPlan);
                this.$vc.emit(this.$vc._thisemitLoadData,'listInspectionPlanData',{
                    inspectionPlanId:_inspectionPlan.inspectionPlanId
                });
                $('#chooseInspectionPlanModel').modal('hide');
            },queryInspectionPlans:function(){
                this._loadAllInspectionPlanInfo(1,10,this.chooseInspectionPlanInfo._currentInspectionPlanName);
            },_refreshChooseInspectionPlanInfo:function(){
                this.chooseInspectionPlanInfo._currentInspectionPlanName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    