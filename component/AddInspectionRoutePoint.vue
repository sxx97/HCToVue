
        <template>
            <div id="addInspectionPointModel" class="modal fade" tabindex="-1" role="dialog"
     aria-labelledby="addInspectionPointModelLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="addInspectionPointModelLabel">添加巡检点</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入写字楼名称" type="text"
                                               v-model="addInspectionPointInfo.inspectionName"
                                               class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary"
                                                        v-on:click="queryInspectionPoints()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th class="text-center">
                                            <input type="checkbox"  class="i-checks " @click="checkAll($event)" id="quan">
                                        </th>
                                        <th class="text-center">巡检点ID</th>
                                        <th class="text-center">巡检点名称</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="inspectionPoint in addInspectionPointInfo.inspectionPoints">
                                        <td class="text-center">
                                            <input type="checkbox" class="i-checks checkItem" v-bind:value="inspectionPoint.inspectionId" v-model="addInspectionPointInfo.selectInspectionPoints" >
                                        </td>
                                        <td class="text-center">{{inspectionPoint.inspectionId}}</td>
                                        <td class="text-center">{{inspectionPoint.inspectionName}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <!-- 分页 -->
                                <vc:create namespace="addInspectionRoutePoint" name="paginationPlus"></vc:create>
                                <div class="ibox-content" v-if="addInspectionRoutePointInfo.inspectionPoints.length > 0">

                                    <button class="btn btn-primary float-right" type="button" v-on:click="addInspectionRoutePoint()"><i
                                            class="fa fa-check"></i>&nbsp;提交
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
</div>

        </template>
        <script>
            
            import PaginationPlus from '@/component/PaginationPlus.vue';



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
                props: {"emitListener":"true","emitFunction":"true"},
                components: {
                    PaginationPlus
                },
                data () {
                    return {"addInspectionRoutePointInfo":{"inspectionRouteId":"","inspectionPoints":[],"inspectionName":"","selectInspectionPoints":[]}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('addInspectionRoutePoint','openAddInspectionRoutePointModal',(_param) =>{
                this._refreshInspectionPointsInfo();
                $('#addInspectionRoutePointModel').modal('show');
                this.$vc.copyObject(_param,this.addInspectionRoutePointInfo);
                this._loadAllCommunityInfo(1,10,'');
            });

            this.$vc.on('addInspectionRoutePoint','paginationPlus', 'page_event',  (_currentPage) => {
                this._listInspectionRoutePoints(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _loadInspectionPointInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        name:_name,
                        inspectionRouteId:this.addInspectionRoutePointInfo.inspectionRouteId,
                        communityId:this.$vc.getCurrentCommunity().communityId
                    }
                };

                //发送get请求
               this.$vc.http.get('addInspectionRoutePoint',
                            'list',
                             param,
                             (json) =>{
                                var _inspectionPointInfo = JSON.parse(json);
                                this.addInspectionRoutePointInfo.inspectionPoints = _inspectionPointInfo.inspectionPoints;
                                this.$vc.emit('addInspectionRoutePoint','paginationPlus', 'init', {
                                    total: _inspectionPointInfo.records,
                                    currentPage: _page
                                });
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },addInspectionRoutePoint:function(_org){
                var _selectInspectionPoints = this.addInspectionRoutePointInfo.selectInspectionPoints;
                var _tmpCommunitys = this.addInspectionRoutePointInfo.inspectionPoints;
                if(_selectInspectionPoints.length <1){
                    this.$vc.toast("请选择隶属写字楼");
                    return ;
                }
                var _inspectionPoints = [];
                for(var _selectIndex = 0 ;_selectIndex <_selectInspectionPoints.length ;_selectIndex ++){
                    for(var _communityIndex =0; _communityIndex < _tmpCommunitys.length;_communityIndex++){
                        if(_selectInspectionPoints[_selectIndex] == _tmpCommunitys[_communityIndex].communityId){
                            _inspectionPoints.push({
                                communityId:_tmpCommunitys[_communityIndex].communityId,
                                communityName:_tmpCommunitys[_communityIndex].name
                            });
                        }
                    }
                }
                var _objData = {
                    orgId:this.addInspectionRoutePointInfo.orgId,
                    orgName:this.addInspectionRoutePointInfo.orgName,
                    inspectionPoints:_inspectionPoints
                }
                this.$vc.http.post('addInspectionRoutePoint',
                    'save',
                    JSON.stringify(_objData),
                    {
                        emulateJSON: true
                    },
                 (json,res) =>{
                    $('#addInspectionRoutePointModel').modal('hide');
                    if(res.status == 200){
                        this.$vc.emit(this.$vc._thisemitListener,this.$vc._thisemitFunction,{
                        });
                        return ;
                    }
                    this.$vc.toast(json);
                 },() =>{
                    console.log('请求失败处理');
                 }
               );
                $('#addInspectionRoutePointModel').modal('hide');
            },queryInspectionPoints:function(){
                this._loadInspectionPointInfo(1,10,this.addInspectionRoutePointInfo.inspectionName);
            },_refreshInspectionPointsInfo:function(){
                this.addInspectionRoutePointInfo={
                    inspectionPoints:[],
                    inspectionName:'',
                    selectInspectionPoints:[]
                };
            },checkAll:function(e){
                    var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
                    if(e.target.checked){ // 判定全选checkbox的勾选状态
                        for(var i=0;i<checkObj.length;i++){
                            if(!checkObj[i].checked){ // 将未勾选的checkbox选项push到绑定数组中
                                this.addInspectionRoutePointInfo.selectInspectionPoints.push(checkObj[i].value);
                            }
                        }
                    }else { // 如果是去掉全选则清空checkbox选项绑定数组
                        this.addInspectionRoutePointInfo.selectInspectionPoints = [];
                    }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    