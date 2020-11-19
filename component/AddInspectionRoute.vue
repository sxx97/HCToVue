
        <template>
            <div id="addInspectionRouteModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">{{addInspectionRouteInfo.routeId != null ? "修改" : "添加"}}巡检路线</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">巡检路线</label>
                                <div class="col-sm-10">
                                    <input v-model="addInspectionRouteInfo.name" type="text"
                                           placeholder="请输入" class="form-control">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">巡检点</label>
                                <div class="col-sm-10">
                                    <div v-for="(item,index) in checkedInspectPoints" draggable="true"
                                         @drop="drop($event, index)"  @dragover="allowDrop"
                                         @dragstart="startDrag($event, index)"
                                         :key="item.id"
                                        style="margin-bottom: 10px;">
                                            {{item.name}}
                                        <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                                        <span class="glyphicon glyphicon-minus-sign" aria-hidden="true" @click="removeCheckedInspectPoints(index)"></span>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-7" style="position: relative;">
                                            <input type="text" placeholder="选择巡检点" :value="getTemporaryName(temporaryPoints)" @focus.stop="inspectViewStatus = true">
                                            <div v-if="inspectViewStatus" style="border: 1px solid #c4c4c4;border-radius: 5px;padding: 10px;max-height: 260px;overflow-y: auto;position: absolute;top: 30px;left: 0; background: #fff;">
                                                <div>
                                                    <input placeholder="搜索巡检点" type="text" v-model="inspectPointKeyword">
                                                    <button class="btn btn-primary btn-small" @click.stop="_listInspectionPoints">查询</button>
                                                </div>
                                                <select multiple v-model="temporaryPoints" @change="inspectViewStatus = false">
                                                    <option v-for="point in inspectPoints"
                                                            :value="point">{{point.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <button class="btn btn-primary" @click="addInspectPoint">添加</button>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        @click="saveInspectionRouteInfo"><i class="fa fa-check"></i>&nbsp;保存
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
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
                    return {"inspectViewStatus":false,"inspectPointKeyword":"","inspectPoints":[],"temporaryPoints":[],"checkedInspectPoints":[],"addInspectionRouteInfo":{"name":"","inspectPoints":"","orgId":"842020090421460005","regionId":""}}    
                },
                mounted() {
                (() => {
            this._listInspectionPoints()
        })()
(() => {
            this.$vc.on('addInspectionRoute', 'openAddInspectionRouteModal',
            (params) => {
                $('#addInspectionRouteModel').modal('show');
                this.inspectViewStatus = false;
                if (params) {
                    this.addInspectionRouteInfo = {
                        name: params.name,
                        routeId: params.id,
                        inspectPoints: '',
                        regionId: this.$vc.getCurrentCommunity().communityId,
                    };
                    this.checkedInspectPoints = params.inspectPoints;
                    this.temporaryPoints = [];
                } else {
                    this.checkedInspectPoints  = [];
                    this.temporaryPoints = [];
                    this.addInspectionRouteInfo = {
                        name: '',
                        inspectPoints: '',
                        orgId: this.$vc.getCurrentStaffInfo().orgId,
                        regionId: this.$vc.getCurrentCommunity().communityId,
                    };
                }

            });
        })()   
                },
                methods: {
                    startDrag(e, index) {
                e.dataTransfer.setData('pointIndex', index);
            },drop(e, index){
                this.allowDrop(e);
                //使用一个新数组重新排序后赋给原变量
                let arr = this.checkedInspectPoints.concat([]),
                    dragIndex = e.dataTransfer.getData('pointIndex');
                temp = arr.splice(dragIndex, 1);

                arr.splice(index, 0, temp[0]);
                this.checkedInspectPoints = arr;
            },allowDrop(e){
                e.preventDefault();
            },removeCheckedInspectPoints(index) {
                this.checkedInspectPoints.splice(index, 1);
            },getTemporaryName(temporaryPoints) {
                let temporaryPointsName = [];
                temporaryPoints.forEach(val => {
                    temporaryPointsName.push(val.name);
                })
                return temporaryPointsName.toString();
            },addInspectPoint() {
                this.checkedInspectPoints.push(...this.temporaryPoints);
                this.inspectViewStatus = false;
                this.temporaryPoints = [];
            },_listInspectionPoints:function () {
                let orgId = this.$vc.getCurrentStaffInfo().orgId;
                let param = {
                    regionId: this.$vc.getCurrentCommunity().communityId,
                    buildingId: '',
                    keyword: this.inspectPointKeyword,
                    pageNum: 1,
                    pageSize: 50,
                    orgId,
                };

                //发送get请求
                this.$vc.http.post('inspectionPointManage',
                    'list',
                    JSON.stringify(param),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        this.inspectPoints = res.body.data;
                        /*this.$vc.emit('pagination', 'init', {
                            total: this.inspectionPointManageInfo.records,
                            currentPage: _page
                        })*/
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },saveInspectionRouteInfo:function() {
                this.addInspectionRouteInfo.regionId = this.$vc.getCurrentCommunity().communityId;
                let checkedInspectPoints = [];
                this.checkedInspectPoints.forEach(val => {
                    checkedInspectPoints.push(val.id);
                })
                this.addInspectionRouteInfo.inspectPoints = this.$vc.arrToString(checkedInspectPoints);
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addInspectionRouteInfo);
                    $('#addInspectionRouteModel').modal('hide');
                    return;
                }

                this.$vc.http.post('addInspectionRoute', this.addInspectionRouteInfo.routeId ? 'update' : 'save', JSON.stringify(this.addInspectionRouteInfo), {
                    emulateJSON: true
                },
                (json, res) => {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        this.$vc.toast(res.body.code == 0 ? "操作成功" : res.body.msg);
                        $('#addInspectionRouteModel').modal('hide');
                        this.clearAddInspectionRouteInfo();
                        this.$vc.emit('inspectionRouteManage', 'listInspectionRoute', {});
                        return;
                    }
                },
                (errInfo, error) => {
                    console.log('请求失败处理');

                    this.$vc.message(errInfo);

                });
            },clearAddInspectionRouteInfo:function() {
                this.addInspectionRouteInfo = {
                    name: '',
                    inspectPoints: '',
                    orgId: this.$vc.getCurrentStaffInfo().orgId,
                    regionId: this.$vc.getCurrentCommunity().communityId,
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    