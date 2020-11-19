
        <template>
            <div id="addInspectionPlanModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">{{addInspectionPlanInfo.id != null ? "修改" : "添加"}}巡检计划</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">巡检类型</label>
                                <div class="col-sm-4 row">
                                    <select v-model="addInspectionPlanInfo.type" class="form-control">
                                        <option value="" disabled>请选择</option>
                                        <option v-for="(val,key) in inspectPlanType"
                                            :value="key">{{val}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">巡检计划</label>
                                <div class="col-sm-4  row">
                                    <input v-model="addInspectionPlanInfo.name" type="text"
                                           placeholder="请输入" class="form-control">
                                </div>
                            </div>

                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">选择部门</label>
                                <div class="col-sm-4">
                                    <select class="form-control " v-model="addInspectionPlanInfo.orgId"
                                        @change="getInspectRouteList(addInspectionPlanInfo.orgId)">
                                        <option value="" disabled>请选择</option>
                                        <option v-for="org in orgs" :value="org.orgId">{{org.orgName}}</option>
                                    </select>
                                </div>
                            </div>-->

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">巡检路线</label>
                                <div class="col-sm-4 row">
                                    <select class="form-control" v-model="addInspectionPlanInfo.routeId">
                                        <option value="" disabled>请选择</option>
                                        <option v-for="route in inspectRoutes"
                                                :value="route.id">{{route.name}}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">巡检日</label>
                                <div class="col-sm-4 row">
                                    <select  class="form-control" v-model="addInspectionPlanInfo.scheduleType">
                                        <option value="" disabled>请选择</option>
                                        <option :value="1">每天</option>
                                        <option :value="2">每周</option>
                                        <option :value="5">指定日期</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row" v-if="addInspectionPlanInfo.scheduleType != '' && addInspectionPlanInfo.scheduleType != 1">
                                <label class="col-sm-2 col-form-label">&nbsp;</label>
                                <div class="col-sm-10">
                                    <template v-if="addInspectionPlanInfo.scheduleType == 2">
                                        <div class="row">
                                            <label v-for="n in 7" class="mr-3"><input type="checkbox" v-model="scheduleConfig.days" :value="n">星期{{week[n]}}</label>
                                        </div>
                                    </template>
                                    <template v-if="addInspectionPlanInfo.scheduleType == 5">
                                        <div v-for="(date, index) in scheduleConfig.dates" class="row mb-2">
                                            <select class="form-control col-sm-2 mr-2" v-model="date.month">
                                                <option value="" disabled>选择</option>
                                                <option v-for="n in 12" :value="n">{{prefixAddZero(n)}}</option>
                                            </select>
                                            <select class="form-control col-sm-2 mr-2" v-model="date.day">
                                                <option value="" disabled>选择</option>
                                                <option v-for="n in daysPerMonth[scheduleConfig.dates[index].month -1]" :value="prefixAddZero(n)">{{prefixAddZero(n)}}</option>
                                            </select>
                                            <span class="glyphicon glyphicon-minus-sign" aria-hidden="true" @click="removeScheduleConfigDate(index)"></span>
                                        </div>

                                        <button class="btn btn-primary" @click="addScheduleConfigDate">添加</button>

                                    </template>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">开始时间</label>
                                <div class="col-sm-4 row">
                                    <select v-model="scheduleConfig.startDateHour" class="form-control col-sm-5 mr-2">
                                        <option value="" disabled>时</option>
                                        <option v-for="n in 24" :value="prefixAddZero(n-1)"
                                                :disabled="scheduleConfig.endDateHour != '' && scheduleConfig.endDateHour < n -1">
                                            {{prefixAddZero(n-1)}}
                                        </option>
                                    </select>
                                    <select v-model="scheduleConfig.startDateMinute" class="form-control col-sm-5">
                                        <option value="" disabled>分</option>
                                        <option v-for="n in 60" :value="prefixAddZero(n-1)"
                                                :disabled="scheduleConfig.endDateHour == scheduleConfig.startDateHour && scheduleConfig.endDateMinute <=  n -1">
                                            {{prefixAddZero(n-1)}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">结束时间</label>
                                <div class="col-sm-4 row">
                                    <select v-model="scheduleConfig.endDateHour" class="form-control col-sm-5 mr-2">
                                        <option value="" disabled>时</option>
                                        <option v-for="n in 24" :value="prefixAddZero(n-1)"
                                                :disabled="scheduleConfig.startDateHour > n -1">
                                            {{prefixAddZero(n-1)}}
                                        </option>
                                    </select>
                                    <select v-model="scheduleConfig.endDateMinute" class="form-control col-sm-5">
                                        <option value="" disabled>分</option>
                                        <option v-for="n in 60" :value="prefixAddZero(n-1)"
                                                :disabled="scheduleConfig.startDateHour == scheduleConfig.endDateHour && scheduleConfig.startDateMinute >= n -1">
                                            {{prefixAddZero(n -1)}}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveInspectionPlanInfo"><i class="fa fa-check"></i>&nbsp;保存
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" v-on:click="cleanInspectionPlanAddModel"
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
                    
                },
                data () {
                    return {"orgs":[],"inspectRoutes":[],"inspectPlanType":{"101":"保洁巡检","102":"绿化及虫害检查","201":"客服巡检","202":"空置房检查","301":"保安消防巡检","302":"保安安全巡检","303":"保安车库巡检","401":"工程消防巡检","402":"公共区域设施及用电设备巡检","403":"电器系统巡检","404":"给排水系统巡检","405":"空调系统巡检","406":"煤气运行巡检","407":"电梯设备巡检","408":"卫生间设备巡检","409":"避雷系统巡检","410":"其他系统及设备机房巡检","411":"锅炉运行巡检","412":"移动工具检查"},"week":{"1":"一","2":"二","3":"三","4":"四","5":"五","6":"六","7":"日"},"daysPerMonth":[31,29,31,30,31,30,31,31,30,31,30,31],"scheduleConfig":{"startDateHour":"","startDateMinute":"","endDateHour":"","endDateMinute":"","dates":[],"days":[]},"addInspectionPlanInfo":{"regionId":"","orgId":"842020090421460005","type":"","name":"","routeId":"","scheduleType":"","scheduleConfig":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('addInspectionPlan', 'openAddInspectionPlanModal',  (params) => {
                if (params) {
                    this.addInspectionPlanInfo = {
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        orgId: this.$vc.getCurrentStaffInfo().orgId,
                        type: params.type,
                        name: params.name,
                        routeId: params.routeId,
                        id: params.id,
                        scheduleType: params.scheduleType,
                        scheduleConfig: "",
                        enable: params.enable,
                    }

                    if (params.scheduleType === 2) {
                        Vue.set(this.scheduleConfig, "days", params.scheduleDates)
                    }

                    if (params.scheduleType === 5) {
                        let dates = [];
                        params.scheduleDates.forEach(val=> {
                            dates.push({month: Number(val.toString().slice(0, 2)), day: Number(val.toString().slice(3))});
                        })
                        Vue.set(this.scheduleConfig, "dates", dates);
                    }
                    Vue.set(this.scheduleConfig, "startDateHour", params.startTime.slice(0, 2));
                    Vue.set(this.scheduleConfig, "startDateMinute", params.startTime.slice(3));
                    Vue.set(this.scheduleConfig, "endDateHour", params.endTime.slice(0, 2));
                    Vue.set(this.scheduleConfig, "endDateMinute", params.endTime.slice(3));
                } else {
                    this.scheduleConfig =  {
                        startDateHour: '',
                        startDateMinute: '',
                        endDateHour: '',
                        endDateMinute: '',
                        dates: [],
                        days: [],
                    };
                }
                this.getInspectRouteList();
                $('#addInspectionPlanModel').modal('show');
            });

            this.$vc.on("addInspectionPlanInfo", "notify",  (_param) => {
                if (_param.hasOwnProperty("staffId")) {
                    this.addInspectionPlanInfo.staffId = _param.staffId;
                    this.addInspectionPlanInfo.staffName = _param.staffName;
                }
                if (_param.hasOwnProperty("inspectionRouteId")) {
                    this.addInspectionPlanInfo.inspectionRouteId = _param.inspectionRouteId;
                }
            });

        })()   
                },
                methods: {
                    removeScheduleConfigDate(index) {
                this.scheduleConfig.dates.splice(index, 1);
            },addScheduleConfigDate() {
                this.scheduleConfig.dates.push({
                    month: '',
                    day: ''
                })
            },prefixAddZero(num) {
                return num >= 10 ? num : `0${num}`
            },getInspectRouteList() {
                var param = {
                    params: {
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        keyword: '',
                        operatorId: this.$vc.getCurrentStaffInfo().userId,
                        orgId: this.$vc.getCurrentStaffInfo().orgId,
                        pageNo: 1,
                        pageSize: 50,
                    }
                };
                this.$vc.http.get('inspectionRouteManage',
                    'list',
                    param,
                    (json,res) =>{
                        this.inspectRoutes = res.body.data;
                    },(errInfo,error) =>{
                        console.log('请求失败处理');
                    }
                );
            },getOrgs() {
                this.$vc.http.get('orgManage', 'belongingList', {
                        params: {
                            floorId: '',
                            floorNum: '',
                            floorName: '',
                            page: 1,
                            row: 50,
                            communityId: this.$vc.getCurrentCommunity().communityId,
                        }
                    },
                    (json, res) => {
                        const orgsData = JSON.parse(json);
                        this.orgs = orgsData.orgs;

                    },
                    (errText, err) => {

                    })
            },saveInspectionPlanInfo:function () {
                let scheduleConfig = {
                    startTime: `${this.scheduleConfig.startDateHour}:${this.scheduleConfig.startDateMinute}`,
                    endTime: `${this.scheduleConfig.endDateHour}:${this.scheduleConfig.endDateMinute}`,
                    dates: [],
                    days: []
                }
                if (this.addInspectionPlanInfo.scheduleType === 2) {
                    scheduleConfig.days = this.scheduleConfig.days;
                    delete scheduleConfig.dates;
                }

                if (this.addInspectionPlanInfo.scheduleType === 5) {
                    delete scheduleConfig.days;
                    this.scheduleConfig.dates.forEach(val => {
                        scheduleConfig.dates.push(`${this.prefixAddZero(val.month)}-${val.day}`);
                    })
                }

                this.addInspectionPlanInfo.scheduleConfig = JSON.stringify(scheduleConfig);
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addInspectionPlanInfo);
                    $('#addInspectionPlanModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    this.addInspectionPlanInfo.id == null || this.addInspectionPlanInfo.routeId  === '' ? 'addInspectionPlan' : 'updateInspectionPlanState',
                    this.addInspectionPlanInfo.id == null || this.addInspectionPlanInfo.routeId  === '' ? 'save': 'update',
                    JSON.stringify(this.addInspectionPlanInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            this.$vc.toast(res.body.code == 0 ? '操作成功' : res.body.msg)
                            $('#addInspectionPlanModel').modal('hide');
                            this.clearAddInspectionPlanInfo();
                            this.$vc.emit('inspectionPlanManage', 'listInspectionPlan', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddInspectionPlanInfo:function () {

                this.addInspectionPlanInfo = {
                    regionId: this.$vc.getCurrentCommunity().communityId,
                    orgId: this.$vc.getCurrentStaffInfo().orgId,
                    type: '',
                    name: '',
                    routeId: '',
                    scheduleType: '',
                    scheduleConfig: ""
                };
            },cleanInspectionPlanAddModel:function(){
                this.clearAddInspectionPlanInfo();
                //员工select2
                this.$vc.emit('addInspectionPlan', 'inspectionRouteSelect2', 'clearInspectionRoute', {});
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    