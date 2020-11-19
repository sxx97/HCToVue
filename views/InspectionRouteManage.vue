
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
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入路线名称"
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


                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryInspectionRouteMethod()">
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
                    <h5>巡检路线信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                v-on:click="_openAddInspectionRouteModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加
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
                            <th class="text-center">巡检路线</th>
                            <th class="text-center">巡检点</th>
                            <th class="text-center">部门</th>
                            <th class="text-center">创建人</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="route in inspectRouteArr">
                            <td class="text-center">{{route.createTime}}</td>
                            <td class="text-center">
                                <div class="btn btn-link btn-content"
                                     @click="openViewModal(route.name)">
                                    {{route.name}}
                                </div>
                            </td>
                            <td class="text-center">
                                <div class="btn btn-link btn-content"
                                     @click="openViewModal(route.id, 2)">
                                    {{route.routePointCount}}
                                </div>
                            </td>
                            <td class="text-center">{{route.orgName}}</td>
                            <td class="text-center">{{route.createBy}}</td>
                            <td class="text-right">
                                <!--<div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openInspectionPointModel(inspectionRoute)">巡检点
                                    </button>
                                </div>-->
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openAddInspectionRouteModal(route)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteInspectionRouteModel(route)">删除
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
    <vc:create name="addInspectionRoute"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <vc:create name="deleteInspectionRoute"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import ViewModal from '@/component/ViewModal.vue';import AddInspectionRoute from '@/component/AddInspectionRoute.vue';import DeleteInspectionRoute from '@/component/DeleteInspectionRoute.vue';



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
                    Pagination,ViewModal,AddInspectionRoute,DeleteInspectionRoute
                },
                data () {
                    return {"orgList":[],"staffList":[],"staffInfo":{"accountCreateTime":"2020-09-16T03:07:05.000+00:00","communityId":"8888","departmentId":1005,"levels":1,"orgId":"842020090421460005","orgLevel":"3","parentOrgId":"842020071395050140","positionName":"保洁主管","relCd":"8","staffId":"302020091636910031","storeId":"402020051157600001","storeName":"和平里物业有限公司","tel":"13366357549","userId":"302020091636910031"},"queryParams":{"regionId":"","keyword":"","operatorId":"302020091636910031","orgId":"842020090421460005","pageNo":1,"pageSize":10},"inspectRouteArr":[]}    
                },
                mounted() {
                (() =>{
            this.getOrgList();
            this._listInspectionRoutes(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{
            
            this.$vc.on('inspectionRouteManage','listInspectionRoute',(_param) =>{
                  this._listInspectionRoutes(this.queryParams.pageNo, DEFAULT_ROWS);
            });
            this.$vc.on('inspectionRouteManage','goBack',(_param) =>{
                this.inspectionRouteManageInfo.inspectionPoint = false;
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listInspectionRoutes(_currentPage, DEFAULT_ROWS);
            });
            this.getStaffList();
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
            },async openViewModal(viewInfo, type = 1) {
                let params = {};
                if (type === 1) {
                    params.content = viewInfo;
                }
                if (type === 2) {
                    const inspectPoints =  await this.getInspectPoints(viewInfo);
                    let content = '';
                    if (inspectPoints) {
                        inspectPoints.forEach((val, key) => {
                            content += `<li style="text-align: left;">${key+1}、${val.name}</li>`
                        })
                        params.content = `<ul>${content}</ul>`;
                    } else {
                        params.content = '';
                    }
                }
                this.$vc.emit('viewModal', 'openViewModal', params);
            },getInspectPoints(inspectRouteId) {
                return new Promise((resolve, reject) => {
                    this.$vc.http.get('inspectionRouteManage', 'pointList', {
                            params: {
                                rid: inspectRouteId
                            }
                        },
                        (json, res) => {
                            resolve(res.body.data);
                        },
                        (errText, err) => {
                            resolve(null)
                        })
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
            },_listInspectionRoutes:function(_page, _rows){
                this.queryParams.pageNo = _page;
                this.queryParams.pageSize = _rows;
                var param = {
                    params:this.queryParams
               };

               //发送get请求
               this.$vc.http.get('inspectionRouteManage',
                            'list',
                             param,
                             (json,res) =>{
                                this.inspectRouteArr = res.body.data;
                                 this.$vc.emit('pagination', 'init', {
                                     currentPage: _page,
                                 });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAddInspectionRouteModal:async function(params){
                let inspectPoints;
                let paramsInfo;
                if (params) {
                    inspectPoints =  await this.getInspectPoints(params.id);
                    paramsInfo = {
                        ...params,
                        inspectPoints,
                    };
                }
                this.$vc.emit('addInspectionRoute','openAddInspectionRouteModal', paramsInfo);
            },_openDeleteInspectionRouteModel:async function(_inspectionRoute){

                const params = {
                    routeId: _inspectionRoute.id,
                }
                this.$vc.emit('deleteInspectionRoute','openDeleteInspectionRouteModal', params);
            },_queryInspectionRouteMethod:function(){
                this._listInspectionRoutes(DEFAULT_PAGE, DEFAULT_ROWS);
            },_openInspectionPointModel:function(_inspectionRoute){
                this.inspectionRouteManageInfo.inspectionPoint = true;
                this.$vc.emit('inspectionRoutePointManage','listInspectionPoint',_inspectionRoute);
            },_moreCondition:function(){
                if(this.inspectionRouteManageInfo.moreCondition){
                    this.inspectionRouteManageInfo.moreCondition = false;
                }else{
                    this.inspectionRouteManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    