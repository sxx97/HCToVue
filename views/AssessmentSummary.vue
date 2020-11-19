
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                </div>
                <div class="ibox-content">
                    <div class="btn-group mr-5 m-3" role="group">
                        <button type="button"
                                style="width:150px;"
                                @click="changeAssessmentType(2)"
                                :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': assessmentType == 2}]">
                            业务考核汇总
                        </button>
                        <button type="button"
                                style="width:150px;"
                                @click="changeAssessmentType(1)"
                                :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': assessmentType == 1}]">
                            通用考核汇总
                        </button>
                        <button type="button"
                                style="width:150px;"
                                @click="changeAssessmentType(3)"
                                :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': assessmentType == 3}]">
                            系统考核汇总
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-2">
                            <input v-model="queryParams.startDate" type="text" placeholder="请选择日期"
                                   class="form-control startDate">
                        </div>
                        <div class="col-sm-2 ml-1">
                            <input v-model="queryParams.endDate" type="text" placeholder="请选择日期"
                                   class="form-control endDate">
                        </div>
                        <template v-if="[1001, 1002].includes(staffInfo.departmentId)">
                            <div class="col-sm-1 ml-1">
                                <select class="custom-select" v-model="queryParams.orgId">
                                    <option value="" disabled>请选择部门</option>
                                    <option v-for="org in orgList" :value="org.orgId">{{org.orgName}}</option>
                                </select>

                            </div>
                        </template>

                        <div class="col-sm-1 ml-1">
                            <select class="custom-select" v-model="queryParams.userId">
                                <option selected disabled value="">请选择员工</option>
                                <option v-for="staff in staffList"
                                        :value="staff.userId">{{staff.userName}}</option>
                            </select>
                        </div>
                        <button class="btn btn-primary ml-1" @click="getAssessmentSummaryData">查询</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>考核汇总信息</h5>
                </div>
                <div class="ibox-content">
                    <template v-if="assessmentType === 2">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                                <tr>
                                    <th class="text-center">日期</th>
                                    <th class="text-center">员工</th>
                                    <th class="text-center">部门</th>
                                    <th class="text-center">岗位</th>
                                    <th class="text-center">扣分</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in businessItemData">
                                    <td class="text-center">{{item.date}}</td>
                                    <td class="text-center">{{item.userName}}</td>
                                    <td class="text-center">{{item.orgName}}</td>
                                    <td class="text-center">{{item.staffName}}</td>
                                    <td class="text-center">
                                        <div class="btn btn-link" @click="openBusinessItemDetailModal(item)">
                                            {{item.score}}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                    <template v-if="assessmentType === 1">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                                <tr>
                                    <th class="text-center">日期</th>
                                    <th class="text-center">员工</th>
                                    <th class="text-center">部门</th>
                                    <th class="text-center">岗位</th>
                                    <th class="text-center">表名</th>
                                    <th class="text-center">得分</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in commonData">
                                <td class="text-center">{{item.date}}</td>
                                <td class="text-center">{{item.userName}}</td>
                                <td class="text-center">{{item.orgName}}</td>
                                <td class="text-center">{{item.staffName}}</td>
                                <td class="text-center">{{item.formName}}</td>
                                <td class="text-center">
                                    <div class="btn btn-link" @click="openCommonItemModal(item)">
                                        {{item.totalScore}}/{{item.score}}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </template>
                    <template v-if="assessmentType === 3">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                                <tr>
                                    <th class="text-center">日期</th>
                                    <th class="text-center">员工</th>
                                    <th class="text-center">部门</th>
                                    <th class="text-center">岗位</th>
                                    <th class="text-center">扣分</th>
                                    <th class="text-center">加分</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in systemData">
                                    <td class="text-center">{{item.date}}</td>
                                    <td class="text-center">{{item.userName}}</td>
                                    <td class="text-center">{{item.orgName}}</td>
                                    <td class="text-center">{{item.staffName}}</td>
                                    <td class="text-center">
                                        <button class="btn btn-link" @click="openSystemItemModal(item, 2)">{{item.deductScore}}</button>
                                    </td>
                                    <td class="text-center">
                                        <button class="btn btn-link" @click="openSystemItemModal(item, 1)">{{item.awardScore}}</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <vc:create name="viewModal"></vc:create>
</div>
        </template>
        <script>
            
            import ViewModal from '@/component/ViewModal.vue';



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
                    ViewModal
                },
                data () {
                    return {"assessmentType":2,"orgList":[],"staffList":[],"staffInfo":{"accountCreateTime":"2020-09-16T03:07:05.000+00:00","communityId":"8888","departmentId":1005,"levels":1,"orgId":"842020090421460005","orgLevel":"3","parentOrgId":"842020071395050140","positionName":"保洁主管","relCd":"8","staffId":"302020091636910031","storeId":"402020051157600001","storeName":"和平里物业有限公司","tel":"13366357549","userId":"302020091636910031"},"queryParams":{"regionId":"","startDate":"","endDate":"","orgId":"842020090421460005","userId":""},"businessItemData":[],"commonData":[],"systemData":[]}    
                },
                mounted() {
                (() => {
            this.initTimePlugin();
            this.getOrgList();
            this.getStaffList();
            this.getAssessmentSummaryData();
        })()
(() => {

        })()   
                },
                methods: {
                    getStaffList(query) {
                this.$vc.http.get("staff", "loadData", {
                        params: {
                            branchOrgId: "",
                            departmentOrgId: "",
                            orgId: this.queryParams.orgId || '',
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
                $('.startDate').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    // initTime: true,
                    initialDate: new Date(),
                    autoclose: true,
                    todayBtn: true
                });
                $('.startDate').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".startDate").val();
                        this.queryParams.startDate = value;
                    });
                $('.endDate').datetimepicker({
                    language: 'zh-CN',
                    format: "yyyy-mm-dd"/*'yyyy-mm-dd hh:ii:ss'*/,
                    // initTime: true,
                    initialDate: new Date(),
                    autoclose: true,
                    todayBtn: true
                });
                $('.endDate').datetimepicker().on('changeDate',  (ev) => {
                    var value = $(".endDate").val();
                    this.queryParams.endDate = value;
                });
                this.queryParams.startDate = dayjs().date(1).format("YYYY-MM-DD")/* + " 00:00:00"*/;
                this.queryParams.endDate = dayjs().format("YYYY-MM-DD")/* + " 23:59:59"*/;
            },getOrgList() {
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
                    this.orgList = orgsData.orgs;
                },
                (errText, err) => {

                })
            },changeAssessmentType(type) {
                this.assessmentType = type;
                this.getAssessmentSummaryData();
            },getAssessmentSummaryData() {
                const requestMethodParam = {
                    [ASSESSMENT_TYPE.BUSINESS]: 'professionalSummary',
                    [ASSESSMENT_TYPE.COMMON]: 'generalSummary',
                    [ASSESSMENT_TYPE.SYSTEM]: 'automationSummary',
                };
                this.$vc.http.post('assessmentComponent', requestMethodParam[this.assessmentType],
                    JSON.stringify(this.queryParams), {
                        emulateJSON: true
                    },
                    res => {
                        const data = JSON.parse(res);
                        const resultMapping = {
                            [ASSESSMENT_TYPE.BUSINESS]: 'businessItemData',
                            [ASSESSMENT_TYPE.COMMON]: 'commonData',
                            [ASSESSMENT_TYPE.SYSTEM]: 'systemData',
                        };
                        this[resultMapping[this.assessmentType]] = data.data;
                    })
            },async openCommonItemModal(item) {
                const assessmentItems = await this.getCommonItems(item.taskId);
                let theadStr = `
                        <thead>
                            <tr>
                               <td colspan="2" class="text-center">${item.formName}</td>
                            </tr>
                            <tr>
                                <td class="text-center">考核项</td><td class="text-center">分值</td>
                            </tr>
                        </thead>`;
                let trStr = '';
                assessmentItems.forEach(val => {
                    trStr += `<tr>
                        <td class="text-center">${val.content}</td>
                        <td class="text-center">${val.score}</td>
                    </tr>`;
                })
                this.$vc.emit('viewModal', 'openViewModal', {
                    content: `<table class="footable table table-stripped toggle-arrow-tiny">${theadStr}<tbody>${trStr}</tbody></table>`,
                    photos: null,
                })
            },getCommonItems(taskId) {
                return new Promise(resolve => {
                    this.$vc.http.post('assessmentComponent', 'generalDetails',
                        JSON.stringify({
                            taskId,
                            regionId: this.$vc.getCurrentCommunity().communityId,
                        }), {
                            emulateJSON: true
                        },
                        res => {
                            resolve(JSON.parse(res).data);
                        })
                })

            },async openBusinessItemDetailModal(item) {
                const businessItems = await this.getBusinessItemDetail(item.userId);
                let theadStr = '<thead><tr><td class="text-center">日期</td><td class="text-center">考核项</td><td class="text-center">扣分</td></tr></thead>';
                let trStr = '';
                businessItems.forEach(val => {
                    trStr += `<tr><td class="text-center">${val.date}</td><td class="text-center">${val.content}</td><td class="text-center">${val.score}</td></tr>`;
                })
                this.$vc.emit('viewModal', 'openViewModal', {
                    content: `<table class="footable table table-stripped toggle-arrow-tiny">${theadStr}<tbody>${trStr}</tbody></table>`,
                    photos: null,
                })
            },getBusinessItemDetail(userId) {
                return new Promise(resolve => {
                    this.$vc.http.post('assessmentComponent', 'professionalDetails',
                        JSON.stringify({
                            userId,
                            startDate: this.queryParams.startDate,
                            endDate: this.queryParams.endDate,
                            regionId: this.$vc.getCurrentCommunity().communityId,
                        }), {
                            emulateJSON: true
                        },
                        res => {
                            resolve(JSON.parse(res).data);
                        })
                })
            },async openSystemItemModal(item, queryType) {
                const systemItems = await this.getSystemItemDetail(item.userId, queryType);
                let theadStr = `<thead><tr><td class="text-center">日期</td><td class="text-center">类型</td><td class="text-center">考核项</td><td class="text-center">详情</td><td class="text-center">${queryType === 1 ? '加分' : '扣分'}</td></tr></thead>`;
                let trStr = '';
                systemItems.forEach(val => {
                    trStr += `<tr>
                        <td class="text-center">${val.date}</td>
                        <td class="text-center">${val.category}</td>
                        <td class="text-center">${val.content}</td>
                        <td class="text-center">
                            <button class="btn btn-link" onclick="openAbnormalTaskModal(this)" data-url="${val.refUrl}">查看</button>
                        </td>
                        <td class="text-center">${val.score}</td>
                    </tr>`;
                })
                this.$vc.emit('viewModal', 'openViewModal', {
                    content: `<table class="footable table table-stripped toggle-arrow-tiny">${theadStr}<tbody>${trStr}</tbody></table>`,
                    photos: null,
                })
            },getSystemItemDetail(userId, type) {
                return new Promise(resolve => {
                    this.$vc.http.post('assessmentComponent', 'automationDetails',
                        JSON.stringify({
                            userId,
                            type,
                            startDate: this.queryParams.startDate,
                            endDate: this.queryParams.endDate,
                            regionId: this.$vc.getCurrentCommunity().communityId,
                        }), {
                            emulateJSON: true
                        },
                        res => {
                            resolve(JSON.parse(res).data);
                        })
                })
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    