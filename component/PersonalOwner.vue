
        <template>
            <div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <!--<div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{listOwnerInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>-->
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入业主名称"
                                       v-model="listOwnerInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入业主身份证号"
                                       v-model="listOwnerInfo.conditions.idCard" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="number" placeholder="请输入联系方式"
                                       v-model="listOwnerInfo.conditions.link" class=" form-control">
                            </div>
                        </div>

                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryOwnerMethod()"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>

                    </div>
                    <div class="row" v-show="listOwnerInfo.moreCondition == true">
                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                <vc:create name="floorSelect2"
                                           parentModal="listOwnerModel"
                                           namespace="listOwner"
                                ></vc:create>
                            </div>

                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <vc:create name="unitSelect2"
                                           parentModal="listOwnerModel"
                                           callBackListener="listOwner"
                                           callBackFunction="notify"
                                           namespace="listOwner"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <vc:create name="roomSelect2"
                                           parentModal="listOwnerModel"
                                           callBackListener="listOwner"
                                           callBackFunction="notify"
                                           namespace="listOwner"
                                ></vc:create>
                            </div>
                        </div>


                    </div>
                    <!--<div class="row" v-if="listOwnerInfo.moreCondition == true">


                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入业主ID"
                                       v-model="listOwnerInfo.conditions.ownerId" class=" form-control">
                            </div>
                        </div>
                    </div>-->


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>业主信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddOwnerModal(-1)">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加业主
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <!--<th>业主ID</th>-->
                            <th data-hide="phone">名称</th>
                            <th data-hide="phone">性别</th>
                            <th data-hide="phone">年龄</th>
                            <th data-hide="phone">身份证</th>
                            <th data-hide="phone">联系方式</th>
                            <th data-hide="phone">创建员工</th>
                            <th data-hide="phone">通行方式</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="owner in listOwnerInfo.owners">
                            <!--<td>
                                {{owner.memberId}}
                            </td>-->

                            <td>
                                {{owner.name}}
                            </td>
                            <td>
                                {{owner.sex == 0 ? '男' : '女'}}
                            </td>
                            <td>
                                {{owner.age}}
                            </td>
                            <td>
                                {{owner.idCard}}
                            </td>
                            <td>
                                {{owner.link}}
                            </td>
                            <td>
                                {{owner.userName}}
                            </td>
                            <td>
                                人脸、RFID卡
                                <input type="text" :class="['form-control', 'rfid'+owner.memberId]"
                                   :value="owner.passageWayRfidCardMeterial"
                                    style="width: 120px;display:inline-block;">
                                <button class="btn-white btn" @click="saveRFID(owner)">保存</button>
                            </td>
                            <td class="text-right">
                                <!--<div class="btn-group">
                                    <button class="btn-white btn btn-xs "
                                            v-on:click="_openEditOwnerModel(owner)">修改
                                    </button>
                                </div>-->
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">变更
                                    </button>


                                    <div class="dropdown-menu p-4 text-muted" style="max-width: 200px;">
                                        <p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openEditOwnerModel(owner)">修改业主</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="_openDelOwnerModel(owner)">删除业主</a>
                                        </p>
                                        <p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openAddOwnerRoom(owner)">绑定房间</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="_openDeleteOwnerRoom(owner)">房间解绑</a>
                                        </p>
                                        <!--<p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openHireParkingSpace(owner)">车位出租</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="_openSellParkingSpace(owner)">车位出售</a>
                                        </p>-->
                                        <!--
                                            TODO:暂时隐藏费用相关内容
                                        <p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openPayPropertyFee(owner)">物业费用</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="_openPayParkingSpaceFee(owner)">停车费用</a>
                                        </p>-->
                                        <!--<p style="margin:10px 0;">
                                            <a href="#"
                                               v-on:click="_openOwnerRepair(owner)">业主报修</a>
                                            <span>|</span>

                                        </p>-->
                                    </div>
                                </div>

                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs "
                                            v-on:click="_openOwnerDetailModel(owner)">详情
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="9">
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



</div>
        </template>
        <script>
            
            import FloorSelect2 from '@/component/FloorSelect2.vue';import UnitSelect2 from '@/component/UnitSelect2.vue';import RoomSelect2 from '@/component/RoomSelect2.vue';import Pagination from '@/component/Pagination.vue';



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
                    FloorSelect2,UnitSelect2,RoomSelect2,Pagination
                },
                data () {
                    return {"listOwnerInfo":{"owners":[],"total":0,"records":1,"moreCondition":false,"_currentOwnerId":"","_eventName":"","conditions":{"isEnterprise":0,"ownerTypeCd":"1001","ownerId":"","name":"","link":"","idCard":"","floorId":"","floorName":"","unitId":"","roomNum":"","roomId":""}}}    
                },
                mounted() {
                ( () => {
            //加载 业主信息
            var _ownerId = this.$vc.getParam('ownerId')

            if (this.$vc.notNull(_ownerId)) {
                this.listOwnerInfo.conditions.ownerId = _ownerId;
            }
            this._listOwnerData(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {
            this.$vc.on('listOwner', 'listOwnerData',  () => {
                this._listOwnerData(DEFAULT_PAGE, DEFAULT_ROWS);
            });


            this.$vc.on('listOwner', 'chooseRoom',  (_room) => {
                if (this.listOwnerInfo._eventName == 'PayPropertyFee') {
                    this.$vc.jumpToPage("/flow/listRoomFeeFlow?" + this.$vc.objToGetParam(_room));
                } else {
                    this.$vc.jumpToPage("/flow/ownerRepairFlow?ownerId=" + this.listOwnerInfo._currentOwnerId + "&roomId=" + _room.roomId);
                }
            });

            this.$vc.on('listOwner', 'chooseParkingSpace',  (_parkingSpace) => {
                this.$vc.jumpToPage("/flow/listParkingSpaceFeeFlow?" + this.$vc.objToGetParam(_parkingSpace));
            });

            this.$vc.on("listOwner", "notify",  (_param) => {
                if (_param.hasOwnProperty("floorId")) {
                    this.listOwnerInfo.conditions.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.listOwnerInfo.conditions.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.listOwnerInfo.conditions.roomId = _param.roomId;
                    this._listOwnerData(DEFAULT_PAGE, DEFAULT_ROWS);
                }
            });
        })()   
                },
                methods: {
                    _listOwnerData:function (_page, _row) {

                this.listOwnerInfo.conditions.page = _page;
                this.listOwnerInfo.conditions.row = _row;
                this.listOwnerInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.listOwnerInfo.conditions
                }

                //发送get请求
                this.$vc.http.get('listOwner',
                    'list',
                    param,
                     (json, res) => {
                        var listOwnerData = JSON.parse(json);
                        this.listOwnerInfo.total = listOwnerData.total;
                        this.listOwnerInfo.records = listOwnerData.records;
                        this.listOwnerInfo.owners = listOwnerData.owners;
                        this.$vc.emit('pagination', 'init', {
                            total: this.listOwnerInfo.records,
                            dataCount: this.listOwnerInfo.total,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );

            },_openAddOwnerModal:function () { //打开添加框
                this.$vc.emit('addOwner', 'openAddOwnerModal', -1);
                //this.$vc.jumpToPage("/flow/addOwnerBindingFlow");
                this.listOwnerInfo.moreCondition = false;
            },_openDelOwnerModel:function (_owner) { // 打开删除对话框
                this.$vc.emit('deleteOwner', 'openOwnerModel', _owner);
                this.listOwnerInfo.moreCondition = false;
            },_openEditOwnerModel:function (_owner) {
                this.$vc.emit('editOwner', 'openEditOwnerModal', _owner);
                this.listOwnerInfo.moreCondition = false;
            },_queryOwnerMethod:function () {
                this._listOwnerData(DEFAULT_PAGE, DEFAULT_ROWS);
            },_openAddOwnerRoom:function (_owner) {
                this.$vc.jumpToPage("/flow/addOwnerRoomBindingFlow?ownerId=" + _owner.ownerId);
            },_openHireParkingSpace:function (_owner) {
                this.$vc.jumpToPage("/flow/hireParkingSpaceFlow?ownerId=" + _owner.ownerId);
            },_openSellParkingSpace:function (_owner) {
                this.$vc.jumpToPage("/flow/sellParkingSpaceFlow?ownerId=" + _owner.ownerId);
            },_openOwnerDetailModel:function (_owner) {
                this.$vc.jumpToPage("/flow/ownerDetailFlow?ownerId=" + _owner.ownerId);
            },_openDeleteOwnerRoom:function (_owner) {
                this.$vc.jumpToPage("/flow/deleteOwnerRoomFlow?ownerId=" + _owner.ownerId);
            },_openOwnerRepair:function (_owner) {
                //查看 业主是否有多套房间，如果有多套房间，则提示对话框选择，只有一套房间则直接跳转至交费页面缴费
                this.listOwnerInfo._eventName = "OwnerRepair";
                this.listOwnerInfo._currentOwnerId = _owner.ownerId; // 暂存如果有多个房间是回调回来时 ownerId 会丢掉
                var param = {
                    params: {
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        ownerId: _owner.ownerId
                    }
                }
                this.$vc.http.get('listOwner',
                    'getRooms',
                    param,
                     (json, res) => {
                        var listRoomData = JSON.parse(json);
                        var rooms = listRoomData.rooms;
                        if (rooms.length == 1) {
                            this.$vc.jumpToPage("/flow/ownerRepairFlow?ownerId=" + _owner.ownerId + "&roomId=" + rooms[0].roomId);
                        } else if (rooms.length == 0) {
                            //this.$vc.message("当前业主未查询到房间信息");
                            this.$vc.toast("当前业主未查询到房间信息");
                        } else {

                            this.$vc.emit('searchRoom', 'showOwnerRooms', rooms);
                        }
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openPayPropertyFee:function (_owner) {
                //查看 业主是否有多套房间，如果有多套房间，则提示对话框选择，只有一套房间则直接跳转至交费页面缴费
                this.listOwnerInfo._eventName = "PayPropertyFee";
                this.listOwnerInfo._currentOwnerId = _owner.ownerId; // 暂存如果有多个房间是回调回来时 ownerId 会丢掉
                var param = {
                    params: {
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        ownerId: _owner.ownerId
                    }
                }
                this.$vc.http.get('listOwner',
                    'getRooms',
                    param,
                     (json, res) => {
                        var listRoomData = JSON.parse(json);
                        var rooms = listRoomData.rooms;
                        if (rooms.length == 1) {
                            this.$vc.jumpToPage("/flow/listRoomFeeFlow?" + this.$vc.objToGetParam(rooms[0]));

                        } else if (rooms.length == 0) {
                            //this.$vc.message("当前业主未查询到房间信息");
                            this.$vc.toast("当前业主未查询到房间信息");
                        } else {

                            this.$vc.emit('searchRoom', 'showOwnerRooms', rooms);
                        }
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openPayParkingSpaceFee:function (_owner) {
                //查看 业主是否有多套停车位，如果有多套停车位，则提示对话框选择，只有一套停车位则直接跳转至交费页面缴费

                this.listOwnerInfo._currentOwnerId = _owner.ownerId; // 暂存如果有多个停车位是回调回来时 ownerId 会丢掉
                var param = {
                    params: {
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        ownerId: _owner.ownerId
                    }
                }
                this.$vc.http.get('listOwner',
                    'getParkingSpace',
                    param,
                     (json, res) => {
                        var listParkingSpaceData = JSON.parse(json);
                        var parkingSpaces = listParkingSpaceData.parkingSpaces;
                        if (parkingSpaces.length == 1) {
                            //this.$vc.jumpToPage("/flow/parkingSpaceFeeFlow?ownerId=" + _owner.ownerId + "&psId=" + parkingSpaces[0].psId);
                            this.$vc.jumpToPage("/flow/listParkingSpaceFeeFlow?" + this.$vc.objToGetParam(parkingSpaces[0]));
                        } else if (parkingSpaces.length == 0) {
                            //this.$vc.message("当前业主未查询到车位信息");
                            this.$vc.toast("当前业主未查询到车位信息");

                        } else {

                            this.$vc.emit('searchParkingSpace', 'showOwnerParkingSpaces', parkingSpaces);
                        }
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_moreCondition:function () {
                if (this.listOwnerInfo.moreCondition) {
                    this.listOwnerInfo.moreCondition = false;
                } else {
                    this.listOwnerInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    