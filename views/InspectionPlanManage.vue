
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
                        <div class="col-sm-2">
                            <select class="form-control" v-model="queryParams.type">
                                <option selected disabled value="">请选择巡检类型</option>
                                <option v-for="(val,key) in inspectPlanType"
                                        :value="key">{{val}}</option>
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="搜索巡检计划"
                                       v-model="queryParams.keyword" class=" form-control">
                            </div>
                        </div>
                        <template v-if="[1001, 1002].includes(staffInfo.departmentId)">
                            <div class="col-sm-2">
                                <select class="form-control" v-model="queryParams.operatorId">
                                    <option selected disabled value="">请选择创建人</option>
                                    <option v-for="staff in staffList"
                                            :value="staff.userId">{{staff.userName}}</option>
                                </select>
                            </div>
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
                                    v-on:click="_queryInspectionPlanMethod()">
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
                    <h5>巡检计划信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddInspectionPlanModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加巡检计划
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">创建时间</th>
                            <th class="text-center">巡检类型</th>
                            <th class="text-center">巡检计划</th>
                            <th class="text-center">巡检路线</th>
                            <th class="text-center">巡检日</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">创建人</th>
                            <th class="text-center">巡检计划状态</th>
                            <th class="text-center">巡检人</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="inspectionPlan in inspectionPlans">
                            <td class="text-center">{{inspectionPlan.createTime}}</td>
                            <td class="text-center">{{inspectPlanType[inspectionPlan.type]}}</td>
                            <td class="text-center">{{inspectionPlan.name}}</td>
                            <td class="text-center">{{inspectionPlan.routeName}}</td>
                            <td class="text-center">
                                <template v-if="inspectionPlan.scheduleType != 1">
                                    <div class="btn btn-link btn-content"
                                         @click="openViewModal(scheduleDateStr(inspectionPlan), 1)">
                                        {{scheduleDateStr(inspectionPlan)}}
                                    </div>
                                    <template v-else>
                                        --
                                    </template>
                                </template>
                                <template v-else>
                                    每天
                                </template>

                            </td>
                            <td class="text-center">{{inspectionPlan.startTime}}</td>
                            <td class="text-center">{{inspectionPlan.endTime}}</td>
                            <td class="text-center">{{inspectionPlan.createBy}}</td>
                            <td class="text-center">{{inspectionPlan.enable ? "开启" : "关闭"}}</td>
                            <td class="text-center">
                                <template v-if="inspectionPlan.performers && inspectionPlan.performers.length > 0">
                                    <div class="btn btn-link btn-content" @click="openViewModal(inspectionPlan.performersMap, 2)">
                                        {{inspectionPlan.performers.toString()}}
                                    </div>
                                </template>
                                <template v-else>
                                    --
                                </template>
                            </td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="openSetInspectorModal(inspectionPlan)">设置巡检人
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openAddInspectionPlanModal(inspectionPlan)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteInspectionPlanModel(inspectionPlan)">删除
                                    </button>
                                </div>
                                <div class="btn-group" v-if="inspectionPlan.enable">
                                    <button class="btn-white btn btn-xs"
                                            @click="_openDisabledInspectionPlanModel(inspectionPlan)">停用
                                    </button>
                                </div>
                                <div class="btn-group" v-else>
                                    <button class="btn-white btn btn-xs"
                                            @click="_openEnabledInspectionPlanModel(inspectionPlan)">启用
                                    </button>
                                </div>

                            </td>

                        </tr>
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
    <vc:create name="addInspectionPlan"
               callBackListener=""
               callBackFunction=""
    ></vc:create>

    <vc:create name="editInspector"></vc:create>
    <vc:create name="deleteInspectionPlan"></vc:create>
    <vc:create name="inspectionPlanState"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import ViewModal from '@/component/ViewModal.vue';import AddInspectionPlan from '@/component/AddInspectionPlan.vue';import EditInspector from '@/component/EditInspector.vue';import DeleteInspectionPlan from '@/component/DeleteInspectionPlan.vue';import InspectionPlanState from '@/component/InspectionPlanState.vue';



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
                    Pagination,ViewModal,AddInspectionPlan,EditInspector,DeleteInspectionPlan,InspectionPlanState
                },
                data () {
                    return {"weekMapping":{"1":"一","2":"二","3":"三","4":"四","5":"五","6":"六","7":"日"},"staffName":"","staffList":[],"inspectPlanType":{"101":"保洁巡检","102":"绿化及虫害检查","201":"客服巡检","202":"空置房检查","301":"保安消防巡检","302":"保安安全巡检","303":"保安车库巡检","401":"工程消防巡检","402":"公共区域设施及用电设备巡检","403":"电器系统巡检","404":"给排水系统巡检","405":"空调系统巡检","406":"煤气运行巡检","407":"电梯设备巡检","408":"卫生间设备巡检","409":"避雷系统巡检","410":"其他系统及设备机房巡检","411":"锅炉运行巡检","412":"移动工具检查"},"orgList":[],"queryParams":{"regionId":"","type":"","keyword":"","orgId":"842020090421460005","operatorId":"302020091636910031","pageNum":1,"pageSize":10},"inspectionPlans":[],"staffInfo":{"accountCreateTime":"2020-09-16T03:07:05.000+00:00","communityId":"8888","departmentId":1005,"levels":1,"orgId":"842020090421460005","orgLevel":"3","parentOrgId":"842020071395050140","positionName":"保洁主管","relCd":"8","staffId":"302020091636910031","storeId":"402020051157600001","storeName":"和平里物业有限公司","tel":"13366357549","userId":"302020091636910031"},"inspectionPlanManageInfo":{"inspectionPlans":[],"total":0,"records":1,"moreCondition":false,"inspectionPlanName":"","states":"","conditions":{"keyWord":"","state":""}}}    
                },
                mounted() {
                ( () => {
            this.getOrgList();
            this.getStaffList();
            this._listInspectionPlans(DEFAULT_PAGE, DEFAULT_ROWS);
            this.$vc.getDict('inspection_plan',"state",(_data) =>{
                this.inspectionPlanManageInfo.states = _data;
            });
        })()
( () => {

            this.$vc.on('inspectionPlanManage', 'listInspectionPlan',  (_param) => {
                this._listInspectionPlans(this.queryParams.pageNum, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listInspectionPlans(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    scheduleDateStr(inspect) {
                let scheduleDates = [];
                if (inspect.scheduleDates) {
                    scheduleDates.push(...inspect.scheduleDates);
                }
                if (inspect.scheduleType == 2) {
                    return scheduleDates.map(val => {
                        return "星期" + this.weekMapping[val];
                    }).toString();
                } else {
                    return scheduleDates.toString();
                }
            },openViewModal(viewInfo, type = 1) {
                let params = {};
                if (type === 1) {
                    params.content = viewInfo;
                }

                if (type === 2) {
                    let contentArr = [];
                    for(let key in viewInfo) {
                        if((key - 0).toString() === "NaN") {
                            contentArr.push(`${key}:${viewInfo[key]}`);
                        } else {
                            if (key.length < 2) {
                                contentArr.push(`星期${this.weekMapping[key]}:${viewInfo[key]}`);
                            } else {
                                contentArr.push(viewInfo[key]);
                            }
                        }
                    }
                    params.content = contentArr.toString();
                }

                this.$vc.emit('viewModal', 'openViewModal', params);
            },getStaffList(query) {
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
            },_listInspectionPlans:function (_page, _rows) {
                this.queryParams.pageNum = _page;
                this.queryParams.pageSize = _rows;
                var param = {
                    params: this.queryParams,
                };

                //发送get请求
                this.$vc.http.get('inspectionPlanManage',
                    'list',
                    param,
                     (json, res) => {
                        var _inspectionPlanManageInfo = JSON.parse(json);
                        this.inspectionPlans = _inspectionPlanManageInfo.data;
                        this.$vc.emit('pagination', 'init', {
                            currentPage: _page,
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddInspectionPlanModal:function (params) {
                this.$vc.emit('addInspectionPlan', 'openAddInspectionPlanModal', params);
            },_openEditInspectionPlanModel:function (_inspectionPlan) {
                this.$vc.emit('editInspectionPlan', 'openEditInspectionPlanModal', _inspectionPlan);
            },_openDeleteInspectionPlanModel:function (_inspectionPlan) {
                this.$vc.emit('deleteInspectionPlan', 'openDeleteInspectionPlanModal', {planId:_inspectionPlan.id});
            },_queryInspectionPlanMethod:function () {
                this._listInspectionPlans(DEFAULT_PAGE, DEFAULT_ROWS);
            },openSetInspectorModal(inspectPlanInfo) {
                this.$vc.emit('editInspectorModal', 'openSetInspectorModal', {
                    ...inspectPlanInfo,
                    orgId: this.queryParams.orgId,
                    operatorId: this.queryParams.operatorId,
                });
            },_openEnabledInspectionPlanModel:function (_inspectionPlan) {
                this.$vc.emit('inspectionPlanState', 'openInspectionPlanStateModal', {
                    ..._inspectionPlan,
                    stateName: '启用',
                    enable: true,
                    orgId: this.queryParams.orgId,
                });
            },_openDisabledInspectionPlanModel:function (_inspectionPlan) {
                this.$vc.emit('inspectionPlanState', 'openInspectionPlanStateModal', {
                    ..._inspectionPlan,
                    stateName: '停用',
                    enable: false,
                    orgId: this.queryParams.orgId,
                });
            },_moreCondition:function () {
                if (this.inspectionPlanManageInfo.moreCondition) {
                    this.inspectionPlanManageInfo.moreCondition = false;
                } else {
                    this.inspectionPlanManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    