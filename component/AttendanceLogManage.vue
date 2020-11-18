
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
                            <input v-model="queryParams.month" type="text" placeholder="请选择月份"
                                   class="form-control month">
                        </div>

                        <template v-if="[1001, 1002, 1007, 1008].includes(staffInfo.departmentId)">
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <select class="form-control" v-model="queryParams.orgId">
                                        <option value="" disabled>选择部门</option>
                                        <option v-for="org in orgList" :value="org.orgId">{{org.orgName}}</option>
                                    </select>
                                </div>
                            </div>
                        </template>


                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    @click="refreshAttendanceLog">
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
                    <h5>打卡信息</h5>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15">
                        <thead>
                            <tr v-html="getThead(queryParams.month)"></tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in attendanceList">
                            <td class="text-center">{{item.orgName}}</td>
                            <td class="text-center">{{item.userName}}</td>
                            <template v-for="index in currentMonthDays">
                                <template v-if="item.attendanceRecord && item.attendanceRecord[index] && item.attendanceRecord[index] != ''">
                                    <td class="text-center">
                                        <div>{{item.attendanceRecord[index].onDutyTime || '--'}}</div>
                                        <div>{{item.attendanceRecord[index].offDutyTime || '--'}}</div>
                                    </td>
                                </template>
                                <template v-else>
                                    <td class="text-center">
                                        --
                                    </td>
                                </template>
                            </template>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="33">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <!-- 分页 -->
                    <Pagination name="pagination"></Pagination>
                </div>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            import Pagination from './Pagination.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"assessmentType":"2","orgList":"","staffList":"","staffInfo":"[object Object]","queryParams":"[object Object]","businessItemData":"","commonData":"","systemData":""}    
            },
            mounted() {
             (_initMethod() {
            this.initTimePlugin();
            this.getOrgList();
            this.getStaffList();
            this.getAssessmentSummaryData();
        })()(_initEvent() {

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
                    .on('changeDate', function (ev) {
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
                $('.endDate').datetimepicker().on('changeDate', function (ev) {
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
    