
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;" v-on:click="_moreCondition()">{{machineManageInfo.moreCondition == true?'隐藏':'更多'}}</button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入设备编码" v-model="machineManageInfo.conditions.machineCode" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="machineManageInfo.conditions.machineTypeCd">
                                <option selected value="">请选择设备类型</option>
                                <option value="992019111002270001">锐目门禁</option>
                                <option value="9998">其他</option>
                                <option value="9996">车辆道闸</option>
                            </select></div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入设备名称" v-model="machineManageInfo.conditions.machineName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryMachineMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="machineManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入设备IP" v-model="machineManageInfo.conditions.machineIp" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4" v-if="machineManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入设备MAC" v-model="machineManageInfo.conditions.machineMac" class=" form-control">
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
                    <h5>设备信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddMachineModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加设备
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <!--<th class="text-center">设备ID</th>-->
                            <th class="text-center">设备编码</th>
                            <!--<th class="text-center">版本号</th>-->
                            <th class="text-center">设备名称</th>
                            <th class="text-center">设备类型</th>
                            <th class="text-center">通行方式</th>
                            <th class="text-center">设备位置</th>
                            <th class="text-center">方向</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">时间</th>
<!--                            <th class="text-center">设备MAC</th>-->
                            <th class="text-center">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="machine in machineManageInfo.machines">
                            <!--<td class="text-center">{{machine.machineId}}</td>-->
                            <td class="text-center">{{machine.machineCode}}</td>
                            <!--<td class="text-center">{{machine.machineVersion}}</td>-->
                            <td class="text-center">{{machine.machineName}}</td>
                            <td class="text-center">{{machine.machineTypeCdName}}</td>
                            <td class="text-center">
                                {{machine.passageWayHumanFaceEnable == 1 ? '人脸' : ''}}
                                {{machine.passageWayHumanFaceEnable == 1 && machine.passageWayRfidCardEnable == 1 ? '、' : ''}}
                                {{machine.passageWayRfidCardEnable == 1 ? 'RFID卡' : ''}}
                            </td>
                            <td class="text-center">{{machine.locationObjName}}</td>
                            <td class="text-center">{{machine.directionName}}</td>
                            <td class="text-center">{{machine.stateName}}</td>
                           <td class="text-center">{{machine.createTime}}</td>
                           <!--<td class="text-center">{{machine.machineMac}}</td>-->
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditMachineModel(machine)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteMachineModel(machine)">删除</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openRestartMachineModel(machine)">重启</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openUpgradeMachineModel(machine)">升级</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openForbiddenMachineModel(machine)">禁用</button>
                                </div>
                                <!--<div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openMachineDetailModel(machine)">详情</button>
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


    <vc:create name="addMachine"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <EditMachine name="editMachine"></EditMachine>
    <DeleteMachine name="deleteMachine"></DeleteMachine>
    <MachineState name="machineState"></MachineState>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditMachine from './EditMachine.vue';import DeleteMachine from './DeleteMachine.vue';import MachineState from './MachineState.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"machineManageInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._listMachines(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function () {

            this.$vc.on('machineManage', 'listMachine', function (_param) {
                this._listMachines(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this._listMachines(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listMachines:function (_page, _rows) {

                this.machineManageInfo.conditions.page = _page;
                this.machineManageInfo.conditions.row = _rows;
                var param = {
                    params: this.machineManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('machineManage',
                    'list',
                    param,
                    function (json, res) {
                        var _machineManageInfo = JSON.parse(json);
                        this.machineManageInfo.total = _machineManageInfo.total;
                        this.machineManageInfo.records = _machineManageInfo.records;
                        this.machineManageInfo.machines = _machineManageInfo.machines;
                        this.$vc.emit('pagination', 'init', {
                            total: this.machineManageInfo.records,
                            currentPage: _page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },_openAddMachineModal:function () {
                this.$vc.emit('addMachine', 'openAddMachineModal', {});
            },_openEditMachineModel:function (_machine) {
                this.$vc.emit('editMachine', 'openEditMachineModal', _machine);
            },_openDeleteMachineModel:function (_machine) {
                this.$vc.emit('deleteMachine', 'openDeleteMachineModal', _machine);
            },_queryMachineMethod:function () {
                this._listMachines(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.machineManageInfo.moreCondition) {
                    this.machineManageInfo.moreCondition = false;
                } else {
                    this.machineManageInfo.moreCondition = true;
                }
            },_openMachineDetailModel:function (_machine) {

            },_openRestartMachineModel:function (_machine) { //设备重启处理
                this.$vc.emit('machineState', 'openMachineStateModal', {
                    machineId: _machine.machineId,
                    stateName: '重启',
                    state: '1400'
                });
            },_openUpgradeMachineModel:function (_machine) { //设备升级处理
                this.$vc.emit('machineState', 'openMachineStateModal', {
                    machineId: _machine.machineId,
                    stateName: '升级',
                    state: '1500'
                });
            },_openForbiddenMachineModel:function (_machine) { //设备禁用处理
                this.$vc.emit('machineState', 'openMachineStateModal', {
                    machineId: _machine.machineId,
                    stateName: '禁用',
                    state: '1600'
                });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    