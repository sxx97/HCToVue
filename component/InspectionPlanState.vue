
        <template>
            <div class="modal fade" id="inspectionPlanStateModel" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定{{stateName}}巡检计划</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="_closeInspectionPlanStateModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="_changeInspectionPlanState()">确认</button>
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"inspectionPlanStateInfo":{},"stateName":""}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('inspectionPlanState', 'openInspectionPlanStateModal',  (params) => {
                let scheduleConfig = {
                    startTime: params.startTime,
                    endTime: params.endTime
                }
                if (params.scheduleType == 5) {
                    scheduleConfig.dates= params.scheduleDates;
                }
                if (params.scheduleType == 2) {
                    scheduleConfig.days= params.scheduleDates;
                }

                this.inspectionPlanStateInfo = {
                    id: params.id,
                    regionId: this.$vc.getCurrentCommunity().communityId,
                    orgId: params. orgId,
                    type: params.type,
                    name: params.name,
                    routeId: params.routeId,
                    scheduleType: params.scheduleType,
                    scheduleConfig:   JSON.stringify(scheduleConfig),
                    enable: params.enable,
                };
                this.stateName = params.stateName;
                $('#inspectionPlanStateModel').modal('show');

            });
        })()   
                },
                methods: {
                    _changeInspectionPlanState:function () {
                this.$vc.http.post(
                    'updateInspectionPlanState',
                    'update',
                    JSON.stringify(this.inspectionPlanStateInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            this.$vc.toast(res.body.code === 0 ? "操作成功！" : res.body.msg);
                            $('#inspectionPlanStateModel').modal('hide');
                            this.$vc.emit('inspectionPlanManage', 'listInspectionPlan', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');
                        this.$vc.message(json);

                    });
            },_closeInspectionPlanStateModel:function () {
                $('#inspectionPlanStateModel').modal('hide');
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    