
        <template>
            <div class="modal fade" id="exitParkingSpaceModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否退车位，退车位后可以再次售卖或出租</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="doOwnerExitParkingSpace()">确认退出</button>
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
                return {"listParkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._listParkingSpaceData(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function () {
            this.$vc.on('listParkingSpace', 'listParkingSpaceData', function () {
                this._listParkingSpaceData(DEFAULT_PAGE, DEFAULT_ROWS);
                this.listParkingSpaceInfo.num = '';
            });
            this.$vc.on('listParkingSpace', 'chooseParkingArea', function (_parkingArea) {
                this.listParkingSpaceInfo.conditions.paId = _parkingArea.paId;
                this.listParkingSpaceInfo.conditions.areaNum = _parkingArea.num;
                this.listParkingSpaceInfo.num = '';
            });

            this.$vc.on('listParkingSpace', 'listParkingAreaData', function (_parkingArea) {
                this.listParkingSpaceInfo.conditions.paId = _parkingArea.paId;
                this._listParkingSpaceData(DEFAULT_PAGE, DEFAULT_ROWS);
                this.listParkingSpaceInfo.num = '';
            });
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this._listParkingSpaceData(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listParkingSpaceData:function (_page, _row) {
                var param = {
                    params: {
                        page: _page,
                        row: _row,
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        num: this.listParkingSpaceInfo.num,
                        psId: this.listParkingSpaceInfo.conditions.psId,
                        area: this.listParkingSpaceInfo.conditions.area,
                        paId: this.listParkingSpaceInfo.conditions.paId,
                        state: this.listParkingSpaceInfo.conditions.state,
                    }
                }

                //发送get请求
                this.$vc.http.get('listParkingSpace',
                    'list',
                    param,
                    function (json, res) {
                        var listParkingSpaceData = JSON.parse(json);

                        this.listParkingSpaceInfo.total = listParkingSpaceData.total;
                        this.listParkingSpaceInfo.records = listParkingSpaceData.records;
                        this.listParkingSpaceInfo.parkingSpaces = listParkingSpaceData.parkingSpaces;

                        this.$vc.emit('pagination', 'init', {
                            total: this.listParkingSpaceInfo.records,
                            dataCount: this.listParkingSpaceInfo.total,
                            currentPage: _page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );

            },_openAddParkingSpaceModal:function () { //打开添加框
                this.$vc.emit('addParkingSpace', 'openAddParkingSpaceModal', -1);
            },_openDelParkingSpaceModel:function (_parkingSpace) { // 打开删除对话框
                this.$vc.emit('deleteParkingSpace', 'openParkingSpaceModel', _parkingSpace);
            },_openEditParkingSpaceModel:function (_parkingSpace) {
                this.$vc.emit('editParkingSpace', 'openEditParkingSpaceModal', _parkingSpace);
            },_openToSellParkingSpaceModel:function(_parkingSpace){ // 出售
                this.$vc.jumpToPage('/flow/sellParkingSpaceFlow?'+this.$vc.objToGetParam(_parkingSpace));
            },_openToHireParkingSpaceModel:function(_parkingSpace){ //出租
                this.$vc.jumpToPage('/flow/hireParkingSpaceFlow?'+this.$vc.objToGetParam(_parkingSpace));
            },_viewParkingSpaceState:function (state) {
                if (state == 'F') {
                    return "空闲";
                } else if (state == 'S') {
                    return "已售卖";
                } else if (state == 'H') {
                    return "已出租";
                } else {
                    return "未知";
                }
            },_viewParkingTypeCd:function (typeCd) {
                var result = '未知';
                switch (typeCd) {
                    case '1001':
                        result = '地上停车位';
                        break;
                    case '2001':
                        result = '地下停车位';
                        break;
                }
                return result;
            },_queryRoomMethod:function () {
                this._listParkingSpaceData(DEFAULT_PAGE, DEFAULT_ROWS);
            },_moreCondition:function () {
                if (this.listParkingSpaceInfo.moreCondition) {
                    this.listParkingSpaceInfo.moreCondition = false;
                } else {
                    this.listParkingSpaceInfo.moreCondition = true;
                }
            },_openChooseParkingArea:function(){
                this.$vc.emit('chooseParkingArea','openChooseParkingAreaModel',{});
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    