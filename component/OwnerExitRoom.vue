
        <template>
            <div class="modal fade" id="exitRoomModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否解绑房间，解绑后可再次绑定</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="doOwnerExitRoom()">确认解绑</button>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
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
    