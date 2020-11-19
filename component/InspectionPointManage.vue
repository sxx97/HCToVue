
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
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="搜索巡检点"
                                       v-model="queryParams.keyword"
                                       class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-3">
                            <div class="form-group">
                                <select class="form-control" v-model="queryParams.buildingId">
                                    <option value="" disabled>请选择</option>
                                    <option v-for="floor in floorList" :value="floor.floorId">{{floor.floorName}}</option>
                                </select>
                            </div>
                        </div>-->
                        <template v-if="[1001, 1002].includes(staffInfo.departmentId)">
                            <div class="col-sm-3">
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
                                    v-on:click="_queryInspectionPointMethod()">
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
                    <h5>巡检点信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                v-on:click="_openAddInspectionPointModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15">
                        <thead>
                        <tr>
                            <th class="text-center">创建时间</th>
                            <th class="text-center">巡检点</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">iBeacon UUID</th>
                            <th class="text-center">签到</th>
                            <th class="text-center">签到方式</th>
                            <th class="text-center">检查项</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="inspectionPoint in inspectionPointManageInfo.inspectionPoints">
                                <td class="text-center">{{inspectionPoint.createTime}}</td>
                                <td class="text-center">
                                    <div class="btn btn-link btn-content" @click="openViewModal(inspectionPoint.name)">{{inspectionPoint.name}}</div>
                                </td>
                                <td class="text-center">{{inspectionPoint.orgName}}</td>
                                <td class="text-center">
                                    <div class="btn btn-link btn-content" @click="openViewModal(inspectionPoint.beaconId)">
                                        {{(inspectionPoint.beaconId - 0).toString() == "NaN" ? inspectionPoint.beaconId : "--"}}
                                    </div>
                                </td>
                                <td class="text-center">{{ inspectionPoint.checkinMethod && inspectionPoint.checkinMethod != 0 ? "需要" : "不需要" }}</td>
                                <td class="text-center">{{checkinMethodStr[inspectionPoint.checkinMethod] || '--'}}</td>
                                <td class="text-center">
                                    <template v-if="inspectionPoint.inspectItemCount > 0">
                                        <div class="btn btn-link" @click="openViewModal(inspectionPoint.inspectItems, 2)">{{inspectionPoint.inspectItemCount}}</div>
                                    </template>
                                    <template v-else>--</template>
                                </td>
                                <td class="text-center">
                                    <template v-if="staffInfo && staffInfo.levels == 1">
                                        <button class="btn-white btn btn-xs"
                                                v-on:click="openInspectPointModel(inspectionPoint)">设置签到/检查项
                                        </button>
                                    </template>
                                    <!-- <template v-else>-->
                                        <div class="btn-group">
                                            <button class="btn-white btn btn-xs"
                                                    v-on:click="_openEditInspectionPointModel(inspectionPoint)">修改
                                            </button>
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn-white btn btn-xs"
                                                    v-on:click="_openDeleteInspectionPointModel(inspectionPoint)">删除
                                            </button>
                                        </div>
<!--                                    </template>-->
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

    <vc:create name="addInspectionPoint"
               callBackListener="inspectionPointManage"
               callBackFunction="addInspectPoint"
    ></vc:create>

    <vc:create name="addInspectionItem"
               callBackListener="inspectionPointManage"
               callBackFunction="addInspectItem"></vc:create>

    <vc:create name="deleteInspectionPoint"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import ViewModal from '@/component/ViewModal.vue';import AddInspectionPoint from '@/component/AddInspectionPoint.vue';import AddInspectionItem from '@/component/AddInspectionItem.vue';import DeleteInspectionPoint from '@/component/DeleteInspectionPoint.vue';



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
                    Pagination,ViewModal,AddInspectionPoint,AddInspectionItem,DeleteInspectionPoint
                },
                data () {
                    return {"checkinMethodStr":{"1":"定位自动签到","2":"照片签到"},"staffInfo":{"accountCreateTime":"2020-09-16T03:07:05.000+00:00","communityId":"8888","departmentId":1005,"levels":1,"orgId":"842020090421460005","orgLevel":"3","parentOrgId":"842020071395050140","positionName":"保洁主管","relCd":"8","staffId":"302020091636910031","storeId":"402020051157600001","storeName":"和平里物业有限公司","tel":"13366357549","userId":"302020091636910031"},"floorList":[],"orgList":[],"queryParams":{"regionId":"","buildingId":"","keyword":"","orgId":"842020090421460005","pageNum":1,"pageSize":10},"inspectionPointManageInfo":{"inspectionPoints":[],"total":0,"records":1,"moreCondition":false,"inspectionName":"","conditions":{"inspectionId":"","machineId":"","inspectionName":"","machineCode":""}}}    
                },
                mounted() {
                ( () => {
            // this.getBuildingList();
            this.getOrgList();
            this._listInspectionPoints(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('inspectionPointManage', 'listInspectionPoint',  (_param) => {
                this._listInspectionPoints(this.queryParams.pageNum, DEFAULT_ROWS);
            });

            this.$vc.on('inspectionPointManage', 'addInspectPoint', params => {
                if (params.pointId != null) {
                    this.editInspectPoint(params);
                    return ;
                }
                this.addInspectPoint(params);
            })
            this.$vc.on('inspectionPointManage', 'addInspectItem', params => {
                this.saveInspectionItemListener(params);
            })
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listInspectionPoints(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    openInspectPointModel(pointInfo) {
                this.$vc.emit('addInspectionItem', 'notify', pointInfo)
            },openViewModal(viewInfo, type = 1) {
                let params = {};
                if (type === 1) {
                    params.content = viewInfo;
                }
                if (type === 2) {
                    let content = '';
                    const inspectMethodMapping = {
                        1: "直接完成",
                        2: "拍照完成"
                    };
                    viewInfo.forEach((val, key) => {
                        content += `<li>${key+1}、${val.name}(完成方式：${inspectMethodMapping[val.inspectMethod]})</li>`
                    })
                    params.content = `<ul>${content}</ul>`;
                }
                this.$vc.emit('viewModal', 'openViewModal', params);
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
            },getBuildingList() {
                this.$vc.http.get('listFloor', 'list', {
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
                    var listFloorData = JSON.parse(json);
                    this.floorList = listFloorData.apiFloorDataVoList;

                },
                (errText, err) => {

                })
            },saveInspectionItemListener(params) {
                this.$vc.http.post("addInspectionPoint", "saveInspectItem", JSON.stringify(params), {
                    emulateJSON: true,
                },
                (resText, res) => {
                    this.$vc.toast(res.body.code === 0 ? "设置成功" : res.body.msg);
                    this._listInspectionPoints(this.queryParams.pageNum);
                },
                (errText, err) => {

                })
            },editInspectPoint(params) {
                this.$vc.http.post('addInspectionPoint', 'edit',
                    JSON.stringify(params),{
                        emulateJSON: true
                    },
                    (resText, res) => {
                        this.$vc.toast(res.body.code === 0 ? "修改成功" : res.body.msg);
                        this._listInspectionPoints(this.queryParams.pageNum);
                    },
                    (errText, err) => {
                        this.$vc.toast(errText);
                    })
            },addInspectPoint(params) {
                this.$vc.http.post('addInspectionPoint', 'save',
                    JSON.stringify(params),{
                        emulateJSON: true
                    },
                    (resText, res) => {
                        this.$vc.toast(res.body.code === 0 ? "添加成功" : res.body.msg);
                        this._listInspectionPoints(this.queryParams.pageNum);
                    },
                    (errText, err) => {
                        this.$vc.toast(errText);
                    })
            },_listInspectionPoints:function (_page, _rows) {

                this.queryParams.pageNum = _page;
                this.queryParams.pageSize = _rows;


                //发送get请求
                this.$vc.http.post('inspectionPointManage',
                    'list',
                    JSON.stringify(this.queryParams),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        this.inspectionPointManageInfo.inspectionPoints = res.body.data;
                        this.$vc.emit('pagination', 'init', {
                            currentPage: _page,
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddInspectionPointModal:function () {
                this.$vc.emit('addInspectionPoint', 'openAddInspectionPointModal', {});
            },_openEditInspectionPointModel:function (_inspectionPoint) {
                this.$vc.emit('addInspectionPoint', 'openAddInspectionPointModal', _inspectionPoint);
            },_openDeleteInspectionPointModel:function (_inspectionPoint) {
                this.$vc.emit('deleteInspectionPoint', 'openDeleteInspectionPointModal', _inspectionPoint);
            },_queryInspectionPointMethod:function () {
                this._listInspectionPoints(DEFAULT_PAGE, DEFAULT_ROWS);
            },_moreCondition:function () {
                if (this.inspectionPointManageInfo.moreCondition) {
                    this.inspectionPointManageInfo.moreCondition = false;
                } else {
                    this.inspectionPointManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    