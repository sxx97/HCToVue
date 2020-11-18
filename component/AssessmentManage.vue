
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                </div>
                <div class="ibox-content">
                    <div class="p-3 d-flex position-relative">
                        <div class="btn-group mr-5" role="group">
                            <button type="button"
                                    @click="changeAssessmentType(2)"
                                    style="width:150px;"
                                    :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': assessmentType == 2}]">
                                业务考核
                            </button>
                            <button type="button"
                                    style="width:150px;"
                                    @click="changeAssessmentType(1)"
                                    :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': assessmentType == 1}]">
                                通用考核
                            </button>
                        </div>
                    </div>

                    <div class="btn-group mr-5 m-3" role="group" v-if="staffInfo.levels == 1">
<!--                        :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': orderAndMallTab == 1}]"-->
                        <template v-if="![1001, 1002].includes(staffInfo.departmentId) || (assessmentType == 1 && 1001 == staffInfo.departmentId)">
                            <button type="button"
                                    style="width:150px;"
                                    @click="assessmentObjectType = 1"
                                    :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': assessmentObjectType == 1}]">
                                普通员工
                            </button>
                        </template>

                        <template v-if="1002 == staffInfo.departmentId || (1001 == staffInfo.departmentId && assessmentType == 1)">
                            <button type="button"
                                    style="width:150px;"
                                    @click="assessmentObjectType = 2"
                                    :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': assessmentObjectType == 2}]">
                                部门主管
                            </button>
                        </template>
                        <template v-if="1001 == staffInfo.departmentId">
                            <button type="button"
                                    style="width:150px;"
                                    @click="assessmentObjectType = 3"
                                    :class="['btn', 'btn-lg', 'btn-secondary', {'btn-primary': assessmentObjectType == 3}]">
                                物业经理
                            </button>
                        </template>
                    </div>


                </div>
            </div>
        </div>

    </div>

    <div class="row" v-if="[1001, 1002].includes(staffInfo.departmentId)">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">
                    <div class="form-group row">
                        <label  class="col-form-label">部门</label>
                        <div class="col-sm-2 row">
                            <select class="form-control" v-model="queryParams.checkedOrg">
                                <option value="" disabled>请选择</option>
                                <option v-for="org in orgList" :value="org">{{org.orgName}}</option>
                            </select>
                        </div>
                        <button class="btn btn-primary ml-1" @click="queryData">查询</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <template v-if="assessmentType === 1">
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>考核表信息</h5>
                        <div class="ibox-tools">
                            <button type="button" class="btn btn-primary btn-sm"
                                @click="openAddCommonTable">
                                <i class="glyphicon glyphicon-plus"></i>
                                添加考核表
                            </button>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                            <tr>
                                <th class="text-center">表名</th>
                                <th class="text-center">部门</th>
                                <th class="text-center">考核项</th>
                                <th class="text-center">通知提醒</th>
                                <th class="text-center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                                <template v-for="as in assessmentTableData">
                                    <tr>
                                        <td class="text-center">{{as.name}}</td>
                                        <td class="text-center">{{as.orgName}}</td>
                                        <td class="text-center">
                                            <button class="btn btn-link"
                                                @click="lookCommonAssessmentItem(as)">
                                                {{as.items.length}}
                                            </button>
                                        </td>
                                        <td class="text-center">{{as?.disposable == 0 ? '单次' : '循环'}}/{{as?.scheduleDays}}天</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary" @click="openCommonAssessmentItem(as)">
                                                添加考核项
                                            </button>
                                            <button class="btn btn-primary"
                                                @click="openAddCommonTable(as)">修改</button>
                                            <button class="btn btn-primary" @click="deleteAssessmentTable(as)">删除</button>
                                        </td>
                                    </tr>
                                    <template v-if="assessmentItemOpenStatus[as.id] && as.items && as.items.length > 0">
                                        <tr>
                                           <td colspan="5"  style="background: #e6e4e4;height:300px;overflow-y:auto;">
                                               <table class="footable table table-stripped toggle-arrow-tiny">
                                                   <thead>
                                                   <tr>
                                                       <th class="text-center">考核项</th>
                                                       <th class="text-center">分值</th>
                                                       <th class="text-center">操作</th>
                                                   </tr>
                                                   </thead>
                                                   <tbody>
                                                   <tr v-for="item in as.items">
                                                       <td class="text-center">{{item.content || '--'}}</td>
                                                       <td class="text-center">{{item.score}}</td>
                                                       <td class="text-center">
                                                           <button class="btn btn-primary" @click="openCommonAssessmentItem(as, item)">修改</button>
                                                           <button class="btn btn-primary" @click="deleteCommonItem(as, item)">删除</button>
                                                       </td>
                                                   </tr>
                                                   </tbody>
                                               </table>
                                           </td>
                                        </tr>
                                    </template>
                                </template>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox">
                    <div class="ibox-title">

                        <h5>考核项信息</h5>
                        <div class="ibox-tools">
                            <button type="button" class="btn btn-primary btn-sm"
                                    @click="openBusinessAssessmentItem()">
                                <i class="glyphicon glyphicon-plus"></i>
                                添加考核项
                            </button>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <table class="footable table table-stripped toggle-arrow-tiny"
                               data-page-size="15">
                            <thead>
                            <tr>
                                <th class="text-center">考核项</th>
                                <th class="text-center">扣分分数</th>
                                <th class="text-center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in businessItemData">
                                    <td class="text-center">{{item.content}}</td>
                                    <td class="text-center">{{item.score}}</td>
                                    <td class="text-center">
                                        <button class="btn btn-primary"
                                                @click="openBusinessAssessmentItem(item)">修改</button>
                                        <button class="btn btn-primary" @click="deleteBusinessItem(item)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <!--  添加通用考核表  -->
    <AddCommonTable name="addCommonTable"></AddCommonTable>
    <!-- 删除弹窗 -->
    <delete-modal :delete-type="deleteType" :delete-info="deleteInfo" ref="deleteModal"></delete-modal>
    <!-- 添加/编辑考核项   -->
    <edit-assessment-item :org-list="orgList" :target="assessmentObjectType"
       :department="staffInfo.departmentId"
       :assessment-item-type="assessmentItemType"
        ref="editAssessmentItem"></edit-assessment-item>
</div>
        </template>
        <script>
            import AddCommonTable from './AddCommonTable.vue';
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
    