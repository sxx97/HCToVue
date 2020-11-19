
        <template>
            <div id = "chooseMachineModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseMachineModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseMachineModelLabel">选择设备</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入设备名称" type="text" v-model="chooseMachineInfo._currentMachineName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryMachines()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">设备ID</th>
                            <th class="text-center">设备编码</th>
                            <th class="text-center">版本号</th>
                            <th class="text-center">设备名称</th>
                            <th class="text-center">设备类型</th>
                            <th class="text-center">鉴权编码</th>
                            <th class="text-center">设备IP</th>
                            <th class="text-center">设备MAC</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="machine in chooseMachineInfo.machines">
                                                                        <td class="text-center">{{machine.machineId}}</td>
                            <td class="text-center">{{machine.machineCode}}</td>
                            <td class="text-center">{{machine.machineVersion}}</td>
                            <td class="text-center">{{machine.machineName}}</td>
                            <td class="text-center">{{machine.machineTypeCd}}</td>
                            <td class="text-center">{{machine.authCode}}</td>
                            <td class="text-center">{{machine.machineIp}}</td>
                            <td class="text-center">{{machine.machineMac}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseMachine(machine)">选择</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
            



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
                props: {"emitChooseMachine":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseMachineInfo":{"machines":[],"_currentMachineName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseMachine','openChooseMachineModel',(_param) =>{
                $('#chooseMachineModel').modal('show');
                this._refreshChooseMachineInfo();
                this._loadAllMachineInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllMachineInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseMachine',
                            'list',
                             param,
                             (json) =>{
                                var _machineInfo = JSON.parse(json);
                                this.chooseMachineInfo.machines = _machineInfo.machines;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseMachine:function(_machine){
                if(_machine.hasOwnProperty('name')){
                     _machine.machineName = _machine.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseMachine,'chooseMachine',_machine);
                this.$vc.emit(this.$vc._thisemitLoadData,'listMachineData',{
                    machineId:_machine.machineId
                });
                $('#chooseMachineModel').modal('hide');
            },queryMachines:function(){
                this._loadAllMachineInfo(1,10,this.chooseMachineInfo._currentMachineName);
            },_refreshChooseMachineInfo:function(){
                this.chooseMachineInfo._currentMachineName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    