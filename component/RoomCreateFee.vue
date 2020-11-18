
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{roomCreateFeeInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                <input type="text" placeholder="请选择楼栋"
                                       v-model="roomCreateFeeInfo.conditions.floorName" class=" form-control">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-primary btn-sm"
                                            v-on:click="_openChooseFloorMethod()"><i
                                            class="glyphicon glyphicon-search"></i> 选择
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <select class="form-control-sm form-control input-s-sm inline"
                                        v-model="roomCreateFeeInfo.conditions.unitId">
                                    <option selected value="">请选择单元</option>
                                    <option v-for="(unit,index) in roomUnits" :key="index" v-bind:value="unit.unitId">
                                        {{unit.unitNum}}单元
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请填写房间编号" class="form-control form-control-sm"
                                       v-model="roomCreateFeeInfo.conditions.roomNum">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryRoomMethod()"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>

                    </div>
                    <div class="row" v-if="roomCreateFeeInfo.moreCondition == true">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请填写房间ID" class="form-control form-control-sm"
                                       v-model="roomCreateFeeInfo.conditions.roomId">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <input type="text" placeholder="请填写业主名称" class="form-control form-control-sm"
                                   v-model="roomCreateFeeInfo.conditions.ownerName">
                        </div>
                        <div class="col-sm-4">
                            <input type="text" placeholder="请填写业主身份证号" class="form-control form-control-sm"
                                   v-model="roomCreateFeeInfo.conditions.idCard">
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
                    <h5>房间信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                style="margin-left:10px" v-on:click="_openRoomCreateFeeAddModal(null,true)">
                            <i class="glyphicon glyphicon-plus"></i> 批量创建
                        </button>
<!--                        <button type="button" class="btn btn-primary btn-sm"-->
<!--                                style="margin-left:10px" v-on:click="_openAddRoom()">-->
<!--                            <i class="glyphicon glyphicon-plus"></i> 批量取消收费-->
<!--                        </button>-->
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" style="margin-top:10px"
                           data-page-size="10">
                        <thead>
                        <tr>
                            <!--<th>房间ID</th>-->
                            <th data-hide="phone">房间编号</th>
                            <th data-hide="phone">楼层</th>
                            <!--<th data-hide="phone">业主ID</th>-->
                            <th data-hide="phone">业主名称</th>
                            <th data-hide="phone">业主身份证</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="room in roomCreateFeeInfo.rooms">
                            <!--<td>
                                {{room.roomId}}
                            </td-->>
                            <td>
                                {{room.floorNum}}号楼{{room.unitNum}}单元{{room.roomNum}}室
                            </td>
                            <td>
                                {{room.layer}}层
                            </td>
                            <!--<td>
                                {{room.ownerId}}
                            </td>-->
                            <td>
                                {{room.ownerName}}
                            </td>
                            <td>
                                {{room.idCard}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openRoomCreateFeeAddModal(room,false)">创建收费
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openViewRoomCreateFee(room)">查看收费
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
                    <Pagination name="pagination"></Pagination>

                </div>
            </div>
        </div>
    </div>
    <vc:create name="searchFloor"
               emitChooseFloor="room"
               emitLoadData="room"
    ></vc:create>

    <vc:create name="roomCreateFeeAdd"
    ></vc:create>
</div>
        </template>
        <script>
            import Pagination from './Pagination.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"roomUnits":"","roomCreateFeeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this.roomCreateFeeInfo.conditions.floorId = this.$vc.getParam("floorId");
            this.roomCreateFeeInfo.conditions.floorName = this.$vc.getParam("floorName");
            this.listRoom(DEFAULT_PAGE,DEFAULT_ROW);
        })()(function(){
            this.$vc.on('room','chooseFloor',function(_param){
                this.roomCreateFeeInfo.conditions.floorId = _param.floorId;
                this.roomCreateFeeInfo.conditions.floorName = _param.floorName;
                this.loadUnits(_param.floorId);

            });
            this.$vc.on('pagination','page_event',function(_currentPage){
                this.listRoom(_currentPage,DEFAULT_ROW);
            });
        })()   
            },
            methods: {
                listRoom:function(_page,_row){

                this.roomCreateFeeInfo.conditions.page=_page;
                this.roomCreateFeeInfo.conditions.row=_row;
                this.roomCreateFeeInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.roomCreateFeeInfo.conditions
                };

               //发送get请求
               this.$vc.http.get('roomCreateFee',
                            'listRoom',
                             param,
                             function(json,res){
                                var listRoomData =JSON.parse(json);

                                this.roomCreateFeeInfo.total = listRoomData.total;
                                this.roomCreateFeeInfo.records = listRoomData.records;
                                this.roomCreateFeeInfo.rooms = listRoomData.rooms;

                                this.$vc.emit('pagination','init',{
                                    total:this.roomCreateFeeInfo.records,
                                    dataCount: this.roomCreateFeeInfo.total,
                                    currentPage:_page
                                });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openRoomCreateFeeAddModal:function(_room,_isMore){
                this.$vc.emit('roomCreateFeeAdd', 'openRoomCreateFeeAddModal',{
                    isMore:_isMore,
                    room:_room
                });
            },_openViewRoomCreateFee:function(_room){
                 this.$vc.jumpToPage("/flow/listRoomFeeFlow?"+this.$vc.objToGetParam(_room));
            },loadUnits:function(_floorId){
                this.addRoomUnits = [];
                var param = {
                    params:{
                        floorId:_floorId,
                        communityId:this.$vc.getCurrentCommunity().communityId
                    }
                }
                this.$vc.http.get(
                    'roomCreateFee',
                    'loadUnits',
                     param,
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            var tmpUnits = JSON.parse(json);
                            this.roomUnits = tmpUnits;

                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },_queryRoomMethod:function(){
                this.listRoom(DEFAULT_PAGE,DEFAULT_ROW);
            },_loadDataByParam:function(){
                this.roomCreateFeeInfo.conditions.floorId = this.$vc.getParam("floorId");
                this.roomCreateFeeInfo.conditions.floorId = this.$vc.getParam("floorName");
                //如果 floodId 没有传 则，直接结束
               /* if(!this.$vc.notNull(this.roomCreateFeeInfo.conditions.floorId)){
                    return ;
                }*/

                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        floorId:this.roomCreateFeeInfo.conditions.floorId
                    }
                }

                this.$vc.http.get(
                    'roomCreateFee',
                    'loadFloor',
                     param,
                     function(json,res){
                        if(res.status == 200){
                            var _floorInfo = JSON.parse(json);
                            var _tmpFloor = _floorInfo.apiFloorDataVoList[0];
                            /*this.$vc.emit('roomSelectFloor','chooseFloor', _tmpFloor);
                            */

                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });

            },_moreCondition:function(){
                if(this.roomCreateFeeInfo.moreCondition){
                    this.roomCreateFeeInfo.moreCondition = false;
                }else{
                    this.roomCreateFeeInfo.moreCondition = true;
                }
            },_openChooseFloorMethod:function(){
                this.$vc.emit('searchFloor','openSearchFloorModel',{});
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    