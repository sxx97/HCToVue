
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
                    <Pagination name="pagination"></Pagination>
                </div>
            </div>
        </div>
    </div>

    <ViewModal name="viewModal"></ViewModal>

    <vc:create name="addInspectionPoint"
               callBackListener="inspectionPointManage"
               callBackFunction="addInspectPoint"
    ></vc:create>

    <vc:create name="addInspectionItem"
               callBackListener="inspectionPointManage"
               callBackFunction="addInspectItem"></vc:create>

    <DeleteInspectionPoint name="deleteInspectionPoint"></DeleteInspectionPoint>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import ViewModal from './ViewModal.vue';import DeleteInspectionPoint from './DeleteInspectionPoint.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"checkinMethodStr":"[object Object]","staffInfo":"[object Object]","floorList":"","orgList":"","queryParams":"[object Object]","inspectionPointManageInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            // this.getBuildingList();
            this.getOrgList();
            this._listInspectionPoints(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function () {

            this.$vc.on('inspectionPointManage', 'listInspectionPoint', function (_param) {
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
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
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
                    function (json, res) {
                        this.inspectionPointManageInfo.inspectionPoints = res.body.data;
                        this.$vc.emit('pagination', 'init', {
                            currentPage: _page,
                        });
                    }, function (errInfo, error) {
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
    