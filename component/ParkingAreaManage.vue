
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入停车场编号" v-model="parkingAreaManageInfo.conditions.num"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="parkingAreaManageInfo.conditions.typeCd">
                                <option selected value="">请选择停车场类型</option>
                                <option value="1001">地上停车场</option>
                                <option value="2001">地下停车场</option>
                            </select></div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入停车场ID"
                                       v-model="parkingAreaManageInfo.conditions.paId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryParkingAreaMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
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
                    <h5>停车场信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddParkingAreaModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">停车场ID</th>
                            <th class="text-center">停车场编号</th>
                            <th class="text-center">停车场类型</th>
                            <th class="text-center">创建时间</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="parkingArea in parkingAreaManageInfo.parkingAreas">
                            <td class="text-center">{{parkingArea.paId}}</td>
                            <td class="text-center">{{parkingArea.num}}</td>
                            <td class="text-center">{{parkingArea.typeCd}}</td>
                            <td class="text-center">{{parkingArea.createTime}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditParkingAreaModel(parkingArea)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteParkingAreaModel(parkingArea)">删除
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


    <vc:create name="addParkingArea"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <EditParkingArea name="editParkingArea"></EditParkingArea>
    <DeleteParkingArea name="deleteParkingArea"></DeleteParkingArea>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditParkingArea from './EditParkingArea.vue';import DeleteParkingArea from './DeleteParkingArea.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"parkingAreaManageInfo":"[object Object]"}    
            },
            mounted() {
             (function() {
            this._listParkingAreas(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function() {

            this.$vc.on('parkingAreaManage', 'listParkingArea',
            function(_param) {
                this._listParkingAreas(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',
            function(_currentPage) {
                this._listParkingAreas(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listParkingAreas:function(_page, _rows) {

                this.parkingAreaManageInfo.conditions.page = _page;
                this.parkingAreaManageInfo.conditions.row = _rows;
                this.parkingAreaManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.parkingAreaManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('parkingAreaManage', 'list', param,
                function(json, res) {
                    var _parkingAreaManageInfo = JSON.parse(json);
                    this.parkingAreaManageInfo.total = _parkingAreaManageInfo.total;
                    this.parkingAreaManageInfo.records = _parkingAreaManageInfo.records;
                    this.parkingAreaManageInfo.parkingAreas = _parkingAreaManageInfo.parkingAreas;
                    this.$vc.emit('pagination', 'init', {
                        total: this.parkingAreaManageInfo.records,
                        currentPage: _page
                    });
                },
                function(errInfo, error) {
                    console.log('请求失败处理');
                });
            },_openAddParkingAreaModal:function() {
                this.$vc.emit('addParkingArea', 'openAddParkingAreaModal', {});
            },_openEditParkingAreaModel:function(_parkingArea) {
                this.$vc.emit('editParkingArea', 'openEditParkingAreaModal', _parkingArea);
            },_openDeleteParkingAreaModel:function(_parkingArea) {
                this.$vc.emit('deleteParkingArea', 'openDeleteParkingAreaModal', _parkingArea);
            },_queryParkingAreaMethod:function() {
                this._listParkingAreas(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function() {
                if (this.parkingAreaManageInfo.moreCondition) {
                    this.parkingAreaManageInfo.moreCondition = false;
                } else {
                    this.parkingAreaManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    