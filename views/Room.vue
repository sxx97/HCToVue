
        <template>
            <div id="component">
    <!--<vc:create name="roomSelectFloor"
               openAddRoomModelName="addRoom"
    ></vc:create>-->

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{roomInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                <input type="text" placeholder="请选择楼栋"
                                       v-model="roomInfo.conditions.floorName" class=" form-control">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-primary btn-sm"
                                            v-on:click="_openChooseFloorMethod()"><i
                                            class="glyphicon glyphicon-search"></i> 选择
                                    </button>
                                </div>
                            </div>

                        </div>
                       <!-- <div class="col-sm-3">
                            <div class="form-group">
                                <select class="form-control-sm form-control input-s-sm inline"
                                        v-model="roomInfo.conditions.unitId">
                                    <option selected value="">请选择单元</option>
                                    <option v-for="(unit,index) in roomUnits" :key="index" v-bind:value="unit.unitId">
                                        {{unit.unitNum}}单元
                                    </option>
                                </select>
                            </div>
                        </div>-->
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请填写房间编号" class="form-control form-control-sm"
                                       v-model="roomInfo.conditions.roomNum">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryRoomMethod()"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>

                    </div>
                    <!--<div class="row" v-if="roomInfo.moreCondition == true">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请填写房间ID" class="form-control form-control-sm"
                                       v-model="roomInfo.conditions.roomId">
                            </div>
                        </div>
                        &lt;!&ndash;<div class="col-sm-3">
                            <select class="form-control-sm form-control input-s-sm inline"
                                    v-model="roomInfo.conditions.state">
                                <option selected value="">请选择状态</option>
                                <option value="2001">房间已售</option>
                                <option value="2002">房间未售</option>
                                <option value="2003">已交定金</option>
                                <option value="2004">已出租</option>
                            </select>
                        </div>&ndash;&gt;
                        &lt;!&ndash;<div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请填写房间房间数" class="form-control form-control-sm"
                                       v-model="roomInfo.conditions.section">
                            </div>
                        </div>&ndash;&gt;
                    </div>-->

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
                                style="margin-left:10px" v-on:click="_openAddRoom()">
                            <i class="glyphicon glyphicon-plus"></i> 添加房间
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" style="margin-top:10px"
                           data-page-size="10">
                        <thead>
                        <tr>
                            <!--<th>房间ID</th>-->
                            <th data-hide="phone">楼栋编号</th>
<!--                            <th data-hide="phone">单元</th>-->
                            <th data-hide="phone">房间编号</th>
                            <th data-hide="phone">楼层</th>
                            <!--<th data-hide="phone">户型</th>-->
                            <th data-hide="phone">建筑面积</th>
<!--                            <th data-hide="phone">单价</th>-->
                            <!--<th data-hide="phone">房间状态</th>-->
                            <th data-hide="phone">业主(个人/企业)</th>
                            <th data-hide="phone">租客</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="room in roomInfo.rooms">
                            <!--<td>
                                {{room.roomId}}
                            </td>-->
                            <td>
                                {{room.floorNum}}
                            </td>
                            <!--<td>
                                {{room.unitNum}}
                            </td>-->
                            <td>
                                {{room.roomNum}}
                            </td>
                            <td>
                                {{room.layer}}
                            </td>
                            <!--<td>
                                {{room.apartment}}
                            </td>-->
                            <td>
                                {{room.builtUpArea}}
                            </td>
                            <!--<td>
                                {{room.unitPrice != '0.00'?room.unitPrice:'0'}}
                            </td>-->
                            <!--<td>
                                {{vc.component.showState(room.state)}}
                            </td>-->
                            <td>{{getBinderName(room.ownerRef)}}</td>
                            <td>{{getBinderName(room.tenantRef)}}</td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditRoomModel(room)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDelRoomModel(room)">删除
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

    <vc:create name="searchFloor"
               emitChooseFloor="room"
               emitLoadData="room"
    ></vc:create>
    <!-- 删除员工权限 -->
    <vc:create name="editRoom"></vc:create>
    <vc:create name="deleteRoom"></vc:create>
</div>
        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import SearchFloor from '@/component/SearchFloor.vue';import EditRoom from '@/component/EditRoom.vue';import DeleteRoom from '@/component/DeleteRoom.vue';



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
                    Pagination,SearchFloor,EditRoom,DeleteRoom
                },
                data () {
                    return {"roomUnits":[],"roomInfo":{"rooms":[],"total":0,"records":1,"floorId":"","unitId":"","state":"","roomNum":"","moreCondition":false,"conditions":{"floorId":"","floorName":"","unitId":"","roomNum":"","roomId":"","state":"","section":""}}}    
                },
                mounted() {
                (() =>{
            this.roomInfo.conditions.floorId = this.$vc.getParam("floorId");
            this.roomInfo.conditions.floorName = this.$vc.getParam("floorName");
            this.listRoom(DEFAULT_PAGE,DEFAULT_ROW);
            //根据 参数查询相应数据
            //this._loadDataByParam();
        })()
(() =>{
            this.$vc.on('room','chooseFloor',(_param) =>{
                this.roomInfo.conditions.floorId = _param.floorId;
                this.roomInfo.conditions.floorName = _param.floorName;
                this.loadUnits(_param.floorId);

            });
            this.$vc.on('room','listRoom',(_param) =>{
                  this.listRoom(DEFAULT_PAGE,DEFAULT_ROW);
            });
            this.$vc.on('room','loadData',(_param) =>{
                  this.listRoom(DEFAULT_PAGE,DEFAULT_ROW);
            });
            this.$vc.on('pagination','page_event',(_currentPage) =>{
                this.listRoom(_currentPage,DEFAULT_ROW);
            });
        })()   
                },
                methods: {
                    getBinderName(binderInfo) {
                if (binderInfo == null) {
                    return '--';
                }
                return binderInfo.isEnterprise == 1 ? binderInfo.enterpriseName :  binderInfo.name+',  '+binderInfo.link;
            },listRoom:function(_page,_row){

                this.roomInfo.conditions.page=_page;
                this.roomInfo.conditions.row=_row;
                this.roomInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.roomInfo.conditions
                };

               //发送get请求
               this.$vc.http.get('room',
                            'listRoom',
                             param,
                             (json,res) =>{
                                var listRoomData =JSON.parse(json);

                                this.roomInfo.total = listRoomData.total;
                                this.roomInfo.records = listRoomData.records;
                                this.roomInfo.rooms = listRoomData.rooms;

                                this.$vc.emit('pagination','init',{
                                    total:this.roomInfo.records,
                                    dataCount: this.roomInfo.total,
                                    currentPage:_page
                                });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAddRoom:function(){
                this.$vc.jumpToPage("/flow/addRoomBindingFlow");
            },_openEditRoomModel:function(_room){
                //_room.floorId = this.roomInfo.conditions.floorId;
                this.$vc.emit('editRoom','openEditRoomModal',_room);
            },_openDelRoomModel:function(_room){
                 //_room.floorId = this.roomInfo.conditions.floorId;
                 this.$vc.emit('deleteRoom','openRoomModel',_room);
            },loadUnits:function(_floorId){
                this.addRoomUnits = [];
                var param = {
                    params:{
                        floorId:_floorId,
                        communityId:this.$vc.getCurrentCommunity().communityId
                    }
                }
                this.$vc.http.get(
                    'room',
                    'loadUnits',
                     param,
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            var tmpUnits = JSON.parse(json);
                            this.roomUnits = tmpUnits;
                            if (tmpUnits &&　tmpUnits.length > 0) {
                                this.$vc.componet.roomInfo.conditions.unitId = tmpUnits[0].unitId;
                            }　
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },_queryRoomMethod:function(){
                this.listRoom(DEFAULT_PAGE,DEFAULT_ROW);
            },showState:function(_state){
                if(_state == '2001'){
                    return "房间已售";
                }else if(_state == '2002'){
                    return "房间未售";
                }else if(_state == '2003'){
                    return "已交定金";
                }
                else if(_state == '2004'){
                    return "已出租";
                }else{
                    return "未知";
                }
            },_loadDataByParam:function(){
                this.roomInfo.conditions.floorId = this.$vc.getParam("floorId");
                this.roomInfo.conditions.floorId = this.$vc.getParam("floorName");
                //如果 floodId 没有传 则，直接结束
               /* if(!this.$vc.notNull(this.roomInfo.conditions.floorId)){
                    return ;
                }*/

                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        floorId:this.roomInfo.conditions.floorId
                    }
                }

                this.$vc.http.get(
                    'room',
                    'loadFloor',
                     param,
                     (json,res) =>{
                        if(res.status == 200){
                            var _floorInfo = JSON.parse(json);
                            var _tmpFloor = _floorInfo.apiFloorDataVoList[0];
                            /*this.$vc.emit('roomSelectFloor','chooseFloor', _tmpFloor);
                            */

                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });

            },_moreCondition:function(){
                if(this.roomInfo.moreCondition){
                    this.roomInfo.moreCondition = false;
                }else{
                    this.roomInfo.moreCondition = true;
                }
            },_openChooseFloorMethod:function(){
                this.$vc.emit('searchFloor','openSearchFloorModel',{});
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    