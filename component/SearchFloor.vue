
        <template>
            <div id = "searchFloorModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchFloorModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="searchFloorModelLabel">楼栋</h3>
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
                                        <input placeholder="输入楼栋编号" type="text" v-model="searchFloorInfo._currentFloorNum" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="searchFloors()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>楼ID</th>
                                        <th>名称</th>
                                        <th>编号</th>
                                        <th>创建人</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="floor in searchFloorInfo.floors">
                                        <td>{{floor.floorId}}</td>
                                        <td>{{floor.floorName}}</td>
                                        <td>{{floor.floorNum}}</td>
                                        <td>{{floor.userName}}</td>
                                        <td>
                                            <button class="btn btn-primary btn-xs" v-on:click="chooseFloor(floor)">选择</button>
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
                    return {"searchFloorInfo":{"floors":[],"_currentFloorNum":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('searchFloor','openSearchFloorModel',(_param) =>{
                console.log("打开定位写字楼楼界面")
                $('#searchFloorModel').modal('show');
                this._refreshSearchFloorData();
                this._loadAllFloorInfo(1,10);
            });
        })()   
                },
                methods: {
                    _loadAllFloorInfo:function(_page,_rows,_floorNum){
                var param = {
                    params:{
                        page:_page,
                        row:_rows,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        floorNum:_floorNum
                    }
                };

                //发送get请求
               this.$vc.http.get('searchFloor',
                            'listFloor',
                             param,
                             (json) =>{
                                var _floorInfo = JSON.parse(json);
                                this.searchFloorInfo.floors = _floorInfo.apiFloorDataVoList;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseFloor:function(_floor){
                this.$vc.emit(this.$vc._thisemitChooseFloor,'chooseFloor',_floor);
                this.$vc.emit(this.$vc._thisemitLoadData,'loadData',{
                    floorId:_floor.floorId
                });
                $('#searchFloorModel').modal('hide');
            },searchFloors:function(){
                this._loadAllFloorInfo(1,10,this.searchFloorInfo._currentFloorNum);
            },_refreshSearchFloorData:function(){
                this.searchFloorInfo._currentFloorNum = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    