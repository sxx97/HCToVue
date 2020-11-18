
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <!--<div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                @click="changeMoreCondition">{{companyListOwnerInfo.companyMoreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>-->
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入企业名称"
                                       v-model="companyListOwnerInfo.companyConditions.enterpriseName" class=" form-control">
                            </div>
                        </div>
                        <!--<div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入租客身份证号"
                                       v-model="companyListOwnerInfo.companyConditions.idCard" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="number" placeholder="请输入联系方式"
                                       v-model="companyListOwnerInfo.companyConditions.link" class=" form-control">
                            </div>
                        </div>-->

                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="queryCompanyOwnerMethod"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>

                    </div>
                    <div class="row" v-show="companyListOwnerInfo.companyMoreCondition == true">
                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                <vc:create name="floorSelect2"
                                           parentModal="listOwnerModel"
                                           namespace="companyOwner"
                                ></vc:create>
                            </div>

                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <vc:create name="unitSelect2"
                                           parentModal="listOwnerModel"
                                           callBackListener="companyOwner"
                                           callBackFunction="notify"
                                           namespace="companyOwner"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <vc:create name="roomSelect2"
                                           parentModal="listOwnerModel"
                                           callBackListener="companyOwner"
                                           callBackFunction="notify"
                                           namespace="companyOwner"
                                ></vc:create>
                            </div>
                        </div>


                    </div>
                    <!--<div class="row" v-if="companyListOwnerInfo.companyMoreCondition == true">


                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入租客ID"
                                       v-model="companyListOwnerInfo.companyConditions.ownerId" class=" form-control">
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
                    <h5>租客信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" @click="openEditOwnerModel(null)">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加企业租客
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <!--<th>租客ID</th>-->
                            <th data-hide="phone">企业名称</th>
                            <th data-hide="phone">法人代表</th>
                            <th data-hide="phone">统一社会信用代码</th>
                            <th data-hide="phone">楼内具体位置</th>
                            <th data-hide="phone">企业代表</th>
                            <th data-hide="phone">性别</th>
                            <th data-hide="phone">年龄</th>
                            <th data-hide="phone">手机</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="owner in companyListOwnerInfo.companyOwners">
                            <!--<td>
                                {{owner.memberId}}
                            </td>-->

                            <td>
                                {{owner.enterpriseName}}
                            </td>
                            <td>
                                {{owner.legalPerson}}
                            </td>
                            <td>
                                {{owner.unifiedSocialCreditCode}}
                            </td>
                            <td>
                                {{owner.companyAddress || '--'}}
                            </td>
                            <td>
                                {{owner.name}}
                            </td>
                            <td>
                                {{owner.sex == 0 ? '男' : '女'}}
                            </td>
                            <td>{{owner.age}}</td>
                            <td>
                                {{owner.link}}
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
                                               v-on:click="openEditOwnerModel(owner)">修改租客</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="openDelOwnerModel(owner)">删除租客</a>
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
                                               v-on:click="_openHireParkingSpace(owner)">绑定车位</a>
                                            <span>|</span>
                                            <a href="#"
                                               v-on:click="_openSellParkingSpace(owner)">车位解绑</a>
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
                                               v-on:click="_openOwnerRepair(owner)">租客报修</a>
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


    <vc:create name="editCompanyOwner"
       componentTitle="租客"
       ownerTypeCd="1003"
       notifyLoadDataComponentName="listCompanyOwner"></vc:create>

    <vc:create name="deleteOwner"
               notifyLoadDataComponentName="listOwner"
    ></vc:create>

    <vc:create
            name="searchRoom"
            emitChooseRoom="listOwner"
            emitLoadData="listOwner"
            roomFlag="1"
            showSearchCondition="false"
    ></vc:create>

    <vc:create name="searchParkingSpace"
               emitChooseParkingSpace="listOwner"
               emitLoadData="listOwner"
               parkingSpaceFlag="SH"
               showSearchCondition="false"
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
                return {"companyListOwnerInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            console.log('CompanyOwner组件触发', this);
        })()(function () {
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this.companyListOwner(_currentPage, DEFAULT_ROWS)
            });
            this.$vc.on('listCompanyOwner', 'listCompanyOwnerData', () => {
                this.companyListOwner(DEFAULT_PAGE, DEFAULT_ROWS);
            })
            this.$vc.on("companyOwner", "notify", function (_param) {
                if (_param.hasOwnProperty("floorId")) {
                    this.companyListOwnerInfo.companyConditions.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.companyListOwnerInfo.companyConditions.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.companyListOwnerInfo.companyConditions.roomId = _param.roomId;
                    this.companyListOwner(DEFAULT_PAGE, DEFAULT_ROWS);
                }
            });
        })()   
            },
            methods: {
                companyListOwner(page = 1, row = 10) {
                this.companyListOwnerInfo.companyConditions.page = page;
                this.companyListOwnerInfo.companyConditions.row = row;
                this.companyListOwnerInfo.companyConditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.companyListOwnerInfo.companyConditions
                }

                //发送get请求
                this.$vc.http.get('listOwner',
                    'list',
                    param,
                    function (json, res) {
                        var listOwnerData = JSON.parse(json);
                        this.companyListOwnerInfo.total = listOwnerData.total;
                        this.companyListOwnerInfo.records = listOwnerData.records;
                        this.companyListOwnerInfo.companyOwners = listOwnerData.owners;
                        this.$vc.emit('pagination', 'init', {
                            total: this.companyListOwnerInfo.records,
                            dataCount: this.companyListOwnerInfo.total,
                            currentPage: page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },changeMoreCondition() {
                this.companyListOwnerInfo.companyMoreCondition = !this.companyListOwnerInfo.companyMoreCondition;
            },openEditOwnerModel(owner) {
                this.$vc.emit('companyOwner', 'editCompanyOwner', 'show', owner);
            },openDelOwnerModel(owner) {
                this.$vc.emit('deleteOwner', 'openOwnerModel', owner);
                this.listOwnerInfo.moreCondition = false;
            },queryCompanyOwnerMethod() {
                this.companyListOwner(DEFAULT_PAGE, DEFAULT_ROWS);
            },_openAddOwnerRoom:function (_owner) {
                this.$vc.jumpToPage("/flow/addOwnerRoomBindingFlow?ownerId=" + _owner.memberId+'&tenant=1');
            },_openHireParkingSpace:function (_owner) {
                this.$vc.jumpToPage("/flow/hireParkingSpaceFlow?ownerId=" + _owner.memberId);
            },_openSellParkingSpace:function (_owner) {
                this.$vc.jumpToPage("/flow/sellParkingSpaceFlow?ownerId=" + _owner.memberId);
            },_openOwnerDetailModel:function (_owner) {
                this.$vc.jumpToPage("/flow/tenantDetailFlow?ownerId=" + _owner.memberId);
            },_openDeleteOwnerRoom:function (_owner) {
                this.$vc.jumpToPage("/flow/deleteOwnerRoomFlow?ownerId=" + _owner.memberId);
            },_openOwnerRepair:function (_owner) {
                //查看 业主是否有多套房间，如果有多套房间，则提示对话框选择，只有一套房间则直接跳转至交费页面缴费
                this.listOwnerInfo._eventName = "OwnerRepair";
                this.listOwnerInfo._currentOwnerId = _owner.memberId; // 暂存如果有多个房间是回调回来时 ownerId 会丢掉
                var param = {
                    params: {
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        ownerId: _owner.ownerId
                    }
                }
                this.$vc.http.get('listOwner',
                    'getRooms',
                    param,
                    function (json, res) {
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
                    }, function (errInfo, error) {
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
                    function (json, res) {
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
                    }, function (errInfo, error) {
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
                    function (json, res) {
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
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    