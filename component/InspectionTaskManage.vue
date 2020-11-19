
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="form-group">
                            <input v-model="queryParams.startDate" type="text" placeholder="请填写开始时间"
                                   class="form-control startTime">
                        </div>
                        <span>-</span>
                        <div class="form-group">
                            <input v-model="queryParams.endDate" type="text" placeholder="请填写结束时间"
                                   class="form-control endTime">
                        </div>
                        <template v-if="[1001, 1002].includes(staffInfo.departmentId)">
                            <div class="col-sm-2">
                                <select class="custom-select" v-model="queryParams.operatorId">
                                    <option selected disabled value="">请选择创建人</option>
                                    <option v-for="staff in staffList"
                                            :value="staff.userId">{{staff.userName}}</option>
                                </select>
                            </div>
                        </template>

                        <div class="col-sm-2">
                            <select class="custom-select" v-model="queryParams.performerId">
                                <option selected disabled value="">请选择巡检人</option>
                                <option v-for="staff in staffList"
                                        :value="staff.userId">{{staff.userName}}</option>
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <select class="custom-select" v-model="queryParams.isTimeout">
                                    <option value="" disabled>请选择异常</option>
                                    <option :value="true">是</option>
                                    <option :value="false">否</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary btn-sm"
                                    @click="queryInspectTask()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>巡检任务信息</h5>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">巡检时间</th>
                            <th class="text-center">巡检计划</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">巡检人</th>
                            <th class="text-center">巡检是否异常</th>
                            <th class="text-center">巡检详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="task in inspectionTaskList">
                            <tr >
                                <td class="text-center">{{task.scheduleDate}}</td>
                                <td class="text-center">
                                    {{task.name}}
                                </td>
                                <td class="text-center">{{task.startTime}}</td>
                                <td class="text-center">{{task.endTime}}</td>
                                <td class="text-center">{{task.performer}}</td>
                                <td class="text-center">{{task.timeout ? "是": "否"}}</td>

                                <td class="text-center">
                                    <div class="btn btn-link" @click="lookInspectPointLog(task.id)">查看</div>
                                </td>
                            </tr>
                            <template v-if="inspectPointLogShowStatus[task.id] && inspectPointLogShowStatus[task.id]['status']">
                                <tr>
                                    <td colspan="7" style="background: #e6e4e4;height:300px;overflow-y:auto;">
                                        <table class="footable table table-stripped toggle-arrow-tiny">
                                            <thead>
                                            <tr>
                                                <th>巡检点</th>
                                                <th>签到</th>
                                                <th>签到时间</th>
                                                <th>签到是否异常</th>
                                                <th>检查项</th>
                                                <th>完成检查项是否异常</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="log in inspectPointLogShowStatus[task.id]['data']">
                                                <td>{{log.name}}</td>
                                                <td>{{log.checkinMethod != 0 ? "需要" : "不需要"}}</td>
                                                <td>
                                                    <template v-if="log.checkinTime && log.checkinTime != ''">
                                                        {{log.checkinTime.slice(0, log.checkinTime.length -3)}}
                                                    </template>
                                                    <template v-else>
                                                        --
                                                    </template>

                                                    <template v-if="log.archives && log.archives != '' && log.checkinMethod == 2">
                                                        <div class="btn btn-link" @click="lookCheckInPhotos(log.archives)">查看图片</div>
                                                    </template>
                                                </td>
                                                <td>{{log.checkinTimeout ? "是" : "否"}}</td>
                                                <td>
                                                    <template v-if="log.inspectItemCount > 0">
                                                        <div class="btn btn-link" @click="lookInspectItemLog(log.id)">{{log.inspectItemCount}}</div>
                                                    </template>
                                                    <template v-else>
                                                        --
                                                    </template>
                                                </td>
                                                <td>{{log.inspectTimeout ? "是" : "否"}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </template>
                        </template>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="7">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <!-- 分页 -->
                    <vc:create name="pagination"></vc:create>
                </div>
            </div>
        </div>
    </div>

    <vc:create name="viewModal"></vc:create>
</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import ViewModal from '@/component/ViewModal.vue';



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
                    Pagination,ViewModal
                },
                data () {
                    return {"staffInfo":{"accountCreateTime":"2020-09-16T03:07:05.000+00:00","communityId":"8888","departmentId":1005,"levels":1,"orgId":"842020090421460005","orgLevel":"3","parentOrgId":"842020071395050140","positionName":"保洁主管","relCd":"8","staffId":"302020091636910031","storeId":"402020051157600001","storeName":"和平里物业有限公司","tel":"13366357549","userId":"302020091636910031"},"queryParams":{"operatorId":"302020091636910031","regionId":"","startDate":"","endDate":"","performerId":"","isTimeout":""},"staffList":[],"inspectionTaskList":{},"inspectPointLogShowStatus":{}}    
                },
                mounted() {
                (() => {
            this.initTimePlugin();
            this.getStaffList();
            this.queryInspectTask();
        })()
(() => {
            this.$vc.on('pagination','page_event',(_currentPage) =>{
                this.queryInspectTask(_currentPage);
            });
        })()   
                },
                methods: {
                    getStaffList(query) {
                this.$vc.http.get("staff", "loadData", {
                        params: {
                            branchOrgId: "",
                            departmentOrgId: "",
                            orgId: "",
                            orgName: "",
                            orgLevel: "",
                            parentOrgId: "",
                            name: query,
                            tel: "",
                            staffId: "",
                            page: 1,
                            rows: 50,
                            row: 50,
                        }
                    },
                    (resText, res) => {
                        this.staffList = res.body.staffs;
                    },
                    (errText, err) => {

                    })
            },initTimePlugin() {
                $('.startTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    // initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.startTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".startTime").val();
                        this.queryParams.startDate = value;
                    });
                $('.endTime').datetimepicker({
                    language: 'zh-CN',
                    format: "yyyy-mm-dd"/*'yyyy-mm-dd hh:ii:ss'*/,
                    // initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.endTime').datetimepicker().on('changeDate',  (ev) => {
                    var value = $(".endTime").val();
                    this.queryParams.endDate = value;
                });
                this.queryParams.startDate = dayjs().add(-7, "day").format("YYYY-MM-DD")/* + " 00:00:00"*/;
                this.queryParams.endDate = dayjs().format("YYYY-MM-DD")/* + " 23:59:59"*/;
            },queryInspectTask(page = 1, rows = DEFAULT_ROWS) {
                this.queryParams.pageNum = page;
                this.queryParams.pageSize = rows;
                let param = {
                    params: this.queryParams,
                };

                this.$vc.http.get("inspectionPlanManage", "getInspectTaskList", param,
                (resText, res) => {
                    this.inspectionTaskList = res.body.data;
                    this.$vc.emit('pagination', 'init', {
                        currentPage: page,
                    });
                },
                errText => {
                    this.$vc.toast(typeof errText === 'string' ? errText : JSON.stringify(errText));
                })
            },lookInspectPointLog(taskId) {
                let currentPoint = {};
                if (this.inspectPointLogShowStatus[taskId] == null) {
                    currentPoint = {
                        status: true,
                        data: []
                    }
                } else {
                    for (let key in this.inspectPointLogShowStatus[taskId]) {
                        if (this.inspectPointLogShowStatus[taskId].hasOwnProperty(key)) {
                            currentPoint[key] = this.inspectPointLogShowStatus[taskId][key];
                        }
                    }
                    currentPoint.status = !currentPoint.status;
                }
                Vue.set(this.inspectPointLogShowStatus, taskId, currentPoint);
                if (currentPoint.status === false) {
                    return ;
                }
                this.$vc.http.post("inspectionPlanManage", "queryInspectPointLog",
                    JSON.stringify({
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        taskId: Number(taskId),
                    }),
                    {
                        emulateJSON:true
                    },
                (resText, res) => {
                    Vue.set(this.inspectPointLogShowStatus[taskId], "data", res.body.data);
                },
                errText => {
                    console.log(errText);
                })
            },lookCheckInPhotos(photosStr) {
                this.$vc.emit('viewModal', 'openViewModal', {
                    photos: JSON.parse(photosStr),
                    content: null,
                });
            },lookInspectItemLog(pointLogId) {
                this.$vc.http.get("inspectionPlanManage", "queryInspectItemLog", {
                    params: {
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        pointLogId,
                    }
                },
                (resText, res) => {
                    let viewModalContent = {
                        photos: null,
                        content: '',
                    }
                    const tableThead = `<thead><tr><th>检查项</th><th>完成时间</th><th>是否异常</th></tr></thead>`;
                    let content = '';
                    res.body.data.forEach(val => {
                        content += `<tr>
                            <td>${val.name}</td>
                            <td>
                                ${val.checkinTime || "--"}
                                ${val.archives && val.archives !== '' ? `<button class="btn btn-link" onclick="lookImage(this)" data-photos="${JSON.parse(val.archives).toString()}">查看图片</button>`  : ""}
                            </td>
                            <td>${val.isTimeout ? '是' : '否'}</td>
                        </tr>`;
                    })
                    viewModalContent.content = `<table class="footable table table-stripped toggle-arrow-tiny">${tableThead}<tbody>${content}</tbody></table>`;
                    this.$vc.emit('viewModal', 'openViewModal', viewModalContent);
                },
                errText => {
                    this.$vc.toast(typeof errText === 'string' ? errText : JSON.stringify(errText));
                })
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    