
        <template>
            <div id="searchRoomModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchRoomModelLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="searchRoomModelLabel">选择房间</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row" v-if="searchRoomInfo.showSearchCondition == 'true'">

                                <div class="col-sm-6 m-b-xs">
                                    <div class="input-group">
                                        <input placeholder="输入写字楼编号，必填" type="text"
                                               v-bind:readonly="searchRoomInfo.floorNumInputReadonly"
                                               v-model="searchRoomInfo._currentFloorNum"
                                               class="form-control form-control-sm">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <input placeholder="输入房间编号" type="text" v-model="searchRoomInfo._currentRoomNum"
                                               class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary"
                                                        v-on:click="searchRooms()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>房间ID</th>
                                        <th>楼栋编号</th>
<!--                                        <th>单元编号</th>-->
                                        <th>房间编号</th>
                                        <th>楼层</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="room in searchRoomInfo.rooms">
                                        <td>
                                            {{room.roomId}}
                                        </td>
                                        <td>
                                            {{room.floorNum}}号楼
                                        </td>
                                        <!--<td>
                                            {{room.unitNum}}单元
                                        </td>-->
                                        <td>
                                            {{room.roomNum}}室
                                        </td>
                                        <td>
                                            {{room.layer}}层
                                        </td>
                                        <td>
                                            <button class="btn btn-primary btn-xs" v-on:click="chooseRoom(room)">选择
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
                props: {"emitChooseRoom":"false","emitLoadData":"false","roomFlag":"false","showSearchCondition":"true"},
                components: {
                    
                },
                data () {
                    return {"searchRoomInfo":{"rooms":[],"_currentRoomNum":"","_currentFloorNum":"","floorNumInputReadonly":false}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('searchRoom','openSearchRoomModel',(_param) =>{
                console.log("打开业主成员界面")
                $('#searchRoomModel').modal('show');
                this._refreshSearchRoomData();
                //this._loadAllRoomInfo(1,10);
            });

            this.$vc.on('searchRoom','listenerFloorInfo',(_floorInfo) =>{
                this.searchRoomInfo._currentFloorNum = _floorInfo.floorNum;
                this.searchRoomInfo.floorNumInputReadonly = true;
                this.searchRooms();
            });
            this.$vc.on('searchRoom','showOwnerRooms',(_rooms) =>{
                $('#searchRoomModel').modal('show');
                this.searchRoomInfo.rooms=_rooms;
            });
        })()   
                },
                methods: {
                    tenantSearchRoom(_page, _row, _roomNum) {
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        roomNum:_roomNum,
                        floorNum:this.searchRoomInfo._currentFloorNum,
                        /*roomFlag:this.$vc._thisroomFlag*/
                    }
                };

                this.$vc.http.get('room',
                    'listRoom',
                    param,
                    (json) =>{
                        var _roomInfo = JSON.parse(json);
                        this.searchRoomInfo.rooms = _roomInfo.rooms;
                    },() =>{
                        console.log('请求失败处理');
                    }
                );
            },_loadAllRoomInfo:function(_page,_row,_roomNum){

                if(this.searchRoomInfo._currentFloorNum == ''){
                    this.$vc.message("未填写写字楼编号");
                    return ;
                }

                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        roomNum:_roomNum,
                        floorNum:this.searchRoomInfo._currentFloorNum,
                        roomFlag:this.$vc._thisroomFlag
                    }
                };

                //发送get请求
               this.$vc.http.get('searchRoom',
                            'listRoom',
                             param,
                             (json) =>{
                                var _roomInfo = JSON.parse(json);
                                this.searchRoomInfo.rooms = _roomInfo.rooms;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseRoom:function(_room){
                this.$vc.emit(this.$vc._thisemitChooseRoom,'chooseRoom',_room);
                this.$vc.emit(this.$vc._thisemitLoadData,'listRoomData',{
                    roomId:_room.roomId
                });
                $('#searchRoomModel').modal('hide');
            },searchRooms:function(){
                if (window.location.search.includes('tenant')) {
                    this.tenantSearchRoom(1,15,this.searchRoomInfo._currentRoomNum);
                } else {
                    this._loadAllRoomInfo(1,15,this.searchRoomInfo._currentRoomNum);
                }
            },_refreshSearchRoomData:function(){
                this.searchRoomInfo._currentRoomNum = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    