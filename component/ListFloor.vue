
        <template>
            <div id="component" >
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <!-- <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                 v-on:click="_moreCondition()">更多
                         </button>-->
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <!--<div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入楼栋ID"
                                       v-model="listFloorInfo.conditions.floorId" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入楼栋编号"
                                       v-model="listFloorInfo.conditions.floorNum" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入楼栋名称"
                                       v-model="listFloorInfo.conditions.floorName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryFloorMethod()"><i
                                    class="glyphicon glyphicon-search" ></i> 查询
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
                    <h5>楼栋信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddFloorModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加楼栋
                        </button>
                        <!--<button type="button" class="btn btn-primary btn-sm" v-on:click="_openBatchAddFloorModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            批量生成
                        </button>-->
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <!--<th class="text-center">楼栋ID</th>-->
                            <th class="text-center">编号</th>
                            <th class="text-center">名称</th>
                            <th class="text-center">创建员工</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="floor in listFloorInfo.floors">
                            <!--<td class="text-center">
                                {{floor.floorId}}
                            </td>-->
                            <td class="text-center">
                                {{floor.floorNum}}
                            </td>
                            <td class="text-center">
                                {{floor.floorName}}
                            </td>
                            <td class="text-center">
                                {{floor.userName}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group" v-if="floor.qrCode &&　floor.qrCode != ''">
                                    <a class="btn-white btn btn-xs"
                                        @click="downloadFile(floor.qrCode)">下载二维码</a>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditFloorModel(floor)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDelFloorModel(floor)">删除</button>
                                </div>
                                <!--<div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openAddUnit(floor)">添加单元</button>
                                </div>-->
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

    <vc:create name="addFloor"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <!--<vc:create name="batchAddFloor"
               callBackListener=""
               callBackFunction=""
    ></vc:create>-->
    <vc:create name="editFloor"></vc:create>
    <vc:create name="deleteFloor"></vc:create>

</div>
        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddFloor from '@/component/AddFloor.vue';import EditFloor from '@/component/EditFloor.vue';import DeleteFloor from '@/component/DeleteFloor.vue';



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
                    Pagination,AddFloor,EditFloor,DeleteFloor
                },
                data () {
                    return {"listFloorInfo":{"floors":[],"total":0,"records":1,"errorInfo":"","conditions":{"floorId":"","floorNum":"","floorName":""}}}    
                },
                mounted() {
                ( () => {
            this._listFloorData(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {
            this.$vc.on('listFloor', 'listFloorData',  () => {
                this._listFloorData(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listFloorData(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listFloorData:function (_page, _rows) {

                this.listFloorInfo.conditions.page = _page;
                this.listFloorInfo.conditions.row = _rows;
                this.listFloorInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId
                var param = {
                    params: this.listFloorInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('listFloor',
                    'list',
                    param,
                     (json, res) => {
                        var listFloorData = JSON.parse(json);

                        this.listFloorInfo.total = listFloorData.total;
                        this.listFloorInfo.records = listFloorData.records;
                        this.listFloorInfo.floors = listFloorData.apiFloorDataVoList;

                        this.$vc.emit('pagination', 'init', {
                            total: this.listFloorInfo.records,
                            dataCount: this.listFloorInfo.total,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );

            },downloadFile(fileUrl) {
                $.ajax({
                    url: fileUrl,
                    type: 'get',
                    headers: {
                        'Content-Disposition': 'attachment',
                    }
                })
            },_openAddFloorModal:function () { //打开添加框
                this.$vc.emit('addFloor', 'openAddFloorModal', {});
            },_openDelFloorModel:function (_floor) { // 打开删除对话框
                this.$vc.emit('deleteFloor', 'openFloorModel', _floor);
            },_openEditFloorModel:function (_floor) {
                this.$vc.emit('editFloor', 'openEditFloorModal', _floor);
            },_queryFloorMethod:function () {
                this._listFloorData(DEFAULT_PAGE, DEFAULT_ROWS);
            },_openAddUnit:function (_floor) {
                this.$vc.jumpToPage("/flow/unitFlow?floorId=" + _floor.floorId + "&floorName=" + _floor.floorName);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    