
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
                return {"checkedOrg":"[object Object]","submitParams":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('addCommonTable', 'show', params => {
                this.submitParams.target = params.target;
                this.orgList.forEach(val => {
                    if (val.department.toString() === this.$vc.getCurrentStaffInfo().departmentId.toString()) {
                        this.checkedOrg = val;
                    }
                })
                if (params.tableInfo) {
                    const {tableInfo} = params;
                    this.$vc.copyObject(tableInfo, this.submitParams);
                    this.submitParams.formId = tableInfo.id;
                    this.submitParams.regionId = this.$vc.getCurrentCommunity().communityId;
                    this.orgList.forEach(val => {
                        if (val.orgName === tableInfo.orgName) {
                            this.checkedOrg = val;
                            this.submitParams.orgId = val.orgId;
                            this.submitParams.dept = val.department;
                        }
                    })
                } else {
                    this.submitParams = {
                        name: '',
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        orgId: '',
                        dept: '',
                        target: '',
                        disposable: '',
                        scheduleDays: '',
                    };
                }
                $('#addCommonTableModal').modal('show');
            })
        })()   
            },
            methods: {
                submitCommonAssessment() {
                let params = {};
                for (let key in this.submitParams) {
                    params[key] = this.submitParams[key];
                }
                params['dept'] = this.checkedOrg.department;
                params['orgId'] = this.checkedOrg.orgId;

                const isEditRequest = params.formId && params.formId !== '';

                this.$vc.http.post('assessmentComponent', isEditRequest ? 'editGeneralForm' : 'addAssessmentTable',
                    JSON.stringify(params),{
                        emulateJSON:true
                    },
                    res => {
                        const data = JSON.parse(res);
                        this.$vc.toast(data.code === 0 ? '添加成功' : data.msg);
                        if (data.code === 0) {
                            $('#addCommonTableModal').modal('hide');
                            this.$vc.emit('assessmentManage', 'list', null);
                        }
                    },
                    err => {

                    })
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    