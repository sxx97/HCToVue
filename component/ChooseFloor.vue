
        <template>
            <div id="chooseFloorModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseFloorModelLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseFloorModelLabel">选择楼</h3>
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
                                    <div class="input-group">
                                        <input placeholder="输入楼栋编码" type="text"
                                               v-model="chooseFloorInfo._currentFloorNum"
                                               class="form-control form-control-sm">
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入楼栋名称" type="text"
                                               v-model="chooseFloorInfo._currentFloorName"
                                               class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary"
                                                        v-on:click="queryFloors()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th class="text-center">楼ID</th>
                                        <th class="text-center">楼名称</th>
                                        <th class="text-center">楼编号</th>
                                        <th class="text-center">备注</th>
                                        <th class="text-center">操作</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="floor in chooseFloorInfo.floors">
                                        <td class="text-center">{{floor.floorId}}</td>
                                        <td class="text-center">{{floor.floorName}}</td>
                                        <td class="text-center">{{floor.floorNum}}</td>
                                        <td class="text-center">{{floor.remark}}</td>

                                        <td>
                                            <button class="btn btn-primary btn-xs" v-on:click="chooseFloor(floor)">选择
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
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
                props: {"emitChooseFloor":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseFloorInfo":{"floors":[],"_currentFloorName":"","_currentFloorNum":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseFloor','openChooseFloorModel',(_param) =>{
                $('#chooseFloorModel').modal('show');
                this._refreshChooseFloorInfo();
                this._loadAllFloorInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllFloorInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name,
                        floorNum:this.chooseFloorInfo._currentFloorNum
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseFloor',
                            'list',
                             param,
                             (json) =>{
                                var _floorInfo = JSON.parse(json);
                                this.chooseFloorInfo.floors = _floorInfo.apiFloorDataVoList;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseFloor:function(_floor){
                this.$vc.emit(this.$vc._thisemitChooseFloor,'chooseFloor',_floor);
                this.$vc.emit(this.$vc._thisemitLoadData,'listFloorData',{
                    floorId:_floor.floorId
                });
                $('#chooseFloorModel').modal('hide');
            },queryFloors:function(){
                this._loadAllFloorInfo(1,10,this.chooseFloorInfo._currentFloorName);
            },_refreshChooseFloorInfo:function(){
                this.chooseFloorInfo._currentFloorName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    