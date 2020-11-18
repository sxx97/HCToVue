
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{machineTranslateManageInfo.moreCondition ==
                            true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入设备编码"
                                       v-model="machineTranslateManageInfo.conditions.machineCode"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="machineTranslateManageInfo.conditions.typeCd">
                                <option selected value="">请选择同步类型</option>
                                <option value="8899">业主</option>
                                <option value="9988">写字楼</option>
                            </select></div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入对象名称"
                                       v-model="machineTranslateManageInfo.conditions.objName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryMachineTranslateMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="machineTranslateManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入对象ID"
                                       v-model="machineTranslateManageInfo.conditions.objId" class=" form-control">
                            </div>
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
                    <h5>设备同步信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                v-on:click="_openAddMachineTranslateModal()">
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
                            <th class="text-center">同步ID</th>
                            <th class="text-center">设备编码</th>
                            <th class="text-center">对象类型</th>
                            <th class="text-center">对象名称</th>
                            <th class="text-center">对象Id</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">同步时间</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="machineTranslate in machineTranslateManageInfo.machineTranslates">
                            <td class="text-center">{{machineTranslate.machineTranslateId}}</td>
                            <td class="text-center">{{machineTranslate.machineCode}}</td>
                            <td class="text-center">{{machineTranslate.typeCdName}}</td>
                            <td class="text-center">{{machineTranslate.objName}}</td>
                            <td class="text-center">{{machineTranslate.objId}}</td>
                            <td class="text-center">{{machineTranslate.stateName}}</td>
                            <td class="text-center">{{machineTranslate.updateTime}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditMachineTranslateModel(machineTranslate)">修改
                                    </button>
                                </div>
                                <!-- <div class="btn-group">
                                     <button class="btn-white btn btn-xs"
                                             v-on:click="_openDeleteMachineTranslateModel(machineTranslate)">删除
                                     </button>
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
                    <Pagination name="pagination"></Pagination>
                </div>
            </div>
        </div>
    </div>


    <vc:create name="addMachineTranslate"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <EditMachineTranslate name="editMachineTranslate"></EditMachineTranslate>
    <!-- <DeleteMachineTranslate name="deleteMachineTranslate"></DeleteMachineTranslate>-->

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditMachineTranslate from './EditMachineTranslate.vue';import DeleteMachineTranslate from './DeleteMachineTranslate.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"machineTranslateManageInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._listMachineTranslates(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function () {

            this.$vc.on('machineTranslateManage', 'listMachineTranslate', function (_param) {
                this._listMachineTranslates(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this._listMachineTranslates(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listMachineTranslates:function (_page, _rows) {

                this.machineTranslateManageInfo.conditions.page = _page;
                this.machineTranslateManageInfo.conditions.row = _rows;
                var param = {
                    params: this.machineTranslateManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('machineTranslateManage',
                    'list',
                    param,
                    function (json, res) {
                        var _machineTranslateManageInfo = JSON.parse(json);
                        this.machineTranslateManageInfo.total = _machineTranslateManageInfo.total;
                        this.machineTranslateManageInfo.records = _machineTranslateManageInfo.records;
                        this.machineTranslateManageInfo.machineTranslates = _machineTranslateManageInfo.machineTranslates;
                        this.$vc.emit('pagination', 'init', {
                            total: this.machineTranslateManageInfo.records,
                            currentPage: _page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },_openAddMachineTranslateModal:function () {
                this.$vc.emit('addMachineTranslate', 'openAddMachineTranslateModal', {});
            },_openEditMachineTranslateModel:function (_machineTranslate) {
                this.$vc.emit('editMachineTranslate', 'openEditMachineTranslateModal', _machineTranslate);
            },_openDeleteMachineTranslateModel:function (_machineTranslate) {
                this.$vc.emit('deleteMachineTranslate', 'openDeleteMachineTranslateModal', _machineTranslate);
            },_queryMachineTranslateMethod:function () {
                this._listMachineTranslates(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.machineTranslateManageInfo.moreCondition) {
                    this.machineTranslateManageInfo.moreCondition = false;
                } else {
                    this.machineTranslateManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    