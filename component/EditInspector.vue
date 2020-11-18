
        <template>
            <div  id="editInspectorModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加巡检计划</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                           <template v-if="inspectScheduleType == 0">
                               <div class="form-group row">
                                   <label class="col-sm-2 col-form-label">员工</label>
                                   <div class="col-sm-5">
                                       <div class="row" v-for="(inspector, index) in everyDayInspector">
                                           <div class="col-sm-8">
                                               <select v-model="checkedStaffIdList[index]" class="form-control">
                                                   <option value="" disabled>请选择</option>
                                                   <option v-for="staff in staffOptionsList"
                                                           :value="staff.userId">{{staff.userName}}</option>
                                               </select>
                                           </div>
                                           <div class="col-sm-2" v-if="index > 0">
                                               <span class="glyphicon glyphicon-minus-sign" aria-hidden="true" @click="removeEveryDayInspectorItem(index)"></span>
                                           </div>
                                       </div>
                                   </div>

                               </div>
                               <div>
                                   <button class="btn btn-primary" @click="addEveryDayInspectorItem">添加</button>
                               </div>
                           </template>
                            <template v-else>
                                <div class="form-group row" v-for="inspectDate in inspectScheduleData">
                                    <template v-if="inspectScheduleType == 1">
                                        <label class="col-sm-2 col-form-label">{{weekMapping[inspectDate]}}</label>
                                    </template>
                                    <template v-else>
                                        <label class="col-sm-2 col-form-label">{{inspectDate}}</label>
                                    </template>
                                    <div class="col-sm-4">
                                        <select v-model="checkedStaffIdMapping[inspectDate]" class="form-control">
                                            <option value="" disabled>请选择</option>
                                            <option v-for="staff in staffOptionsList"
                                                    :value="staff.userId">{{staff.userName}}</option>
                                        </select>
                                    </div>
                                </div>
                            </template>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveInspector"><i class="fa fa-check"></i>&nbsp;确定
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                        data-dismiss="modal">取消
                                </button>
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"weekMapping":"[object Object]","inspectScheduleType":"0","inspectScheduleData":"","staffOptionsList":"","checkedStaffIdMapping":"[object Object]","everyDayInspector":"","checkedStaffIdList":""}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('editInspectorModal', 'openSetInspectorModal', this.getInspectPlanScheduleDate)
        })()   
            },
            methods: {
                removeEveryDayInspectorItem(index) {
                this.everyDayInspector.splice(index, 1);
            },addEveryDayInspectorItem() {
                this.everyDayInspector.push('');
            },getStaffOptionsList() {
                this.$vc.http.get("staff", "loadData", {
                        params: {
                            branchOrgId: "",
                            departmentOrgId: "",
                            orgId: "",
                            orgName: "",
                            orgLevel: "",
                            parentOrgId: "",
                            name: "",
                            tel: "",
                            staffId: "",
                            page: 1,
                            rows: 50,
                            row: 50,
                        }
                    },
                    (resText, res) => {
                        this.staffOptionsList = res.body.staffs;
                    },
                    (errText, err) => {

                    })
            },getInspectPlanScheduleDate(planInfo) {
                $('#editInspectorModel').modal('show');
                this.getStaffOptionsList();
                this.orgId = planInfo.orgId;
                this.planId = planInfo.id;
                this.$vc.http.get("inspectionPlanManage", "getInspectPlanSchedule", {
                    params: {
                        planId: planInfo.id,
                        orgId: planInfo.orgId,
                        operatorId: planInfo.operatorId,
                        regionId: this.$vc.getCurrentCommunity().communityId,
                    }
                },
                (resText, res) => {
                    const response = res.body;
                    if (response.data) {
                        this.inspectScheduleType = response.data[0].toString().includes('-') ? INSPECT_SCHEDULE_TYPE.DATE : INSPECT_SCHEDULE_TYPE.WEEK;
                        this.inspectScheduleData = response.data;
                    } else {
                        this.inspectScheduleType = INSPECT_SCHEDULE_TYPE.EVERY_DAY;
                    }
                })
            },saveInspector() {
                const params = {
                    regionId: this.$vc.getCurrentCommunity().communityId,
                    orgId: this.orgId,
                    planId: this.planId,
                    performers: this.inspectScheduleType === INSPECT_SCHEDULE_TYPE.EVERY_DAY ? this.$vc.arrToString(this.checkedStaffIdList) : JSON.stringify(this.checkedStaffIdMapping),
                };

                this.$vc.http.post(
                    'inspectionPlanManage',
                    'saveInspector',
                    JSON.stringify(params),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editInspectorModel').modal('hide');
                            this.clearAddInspectionPlanInfo();
                            this.$vc.emit('inspectionPlanManage', 'listInspectionPlan', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    