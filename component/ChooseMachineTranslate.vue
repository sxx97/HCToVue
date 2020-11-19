
        <template>
            <div id = "chooseMachineTranslateModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseMachineTranslateModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseMachineTranslateModelLabel">选择设备同步</h3>
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
                                        <input placeholder="输入设备同步名称" type="text" v-model="chooseMachineTranslateInfo._currentMachineTranslateName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryMachineTranslates()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">同步ID</th>
                            <th class="text-center">设备编码</th>
                            <th class="text-center">设备ID</th>
                            <th class="text-center">对象类型</th>
                            <th class="text-center">对象名称</th>
                            <th class="text-center">对象Id</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="machineTranslate in chooseMachineTranslateInfo.machineTranslates">
                                                                        <td class="text-center">{{machineTranslate.machineTranslateId}}</td>
                            <td class="text-center">{{machineTranslate.machineCode}}</td>
                            <td class="text-center">{{machineTranslate.machineId}}</td>
                            <td class="text-center">{{machineTranslate.typeCd}}</td>
                            <td class="text-center">{{machineTranslate.objName}}</td>
                            <td class="text-center">{{machineTranslate.objId}}</td>
                            <td class="text-center">{{machineTranslate.state}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseMachineTranslate(machineTranslate)">选择</button>
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
                props: {"emitChooseMachineTranslate":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseMachineTranslateInfo":{"machineTranslates":[],"_currentMachineTranslateName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseMachineTranslate','openChooseMachineTranslateModel',(_param) =>{
                $('#chooseMachineTranslateModel').modal('show');
                this._refreshChooseMachineTranslateInfo();
                this._loadAllMachineTranslateInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllMachineTranslateInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseMachineTranslate',
                            'list',
                             param,
                             (json) =>{
                                var _machineTranslateInfo = JSON.parse(json);
                                this.chooseMachineTranslateInfo.machineTranslates = _machineTranslateInfo.machineTranslates;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseMachineTranslate:function(_machineTranslate){
                if(_machineTranslate.hasOwnProperty('name')){
                     _machineTranslate.machineTranslateName = _machineTranslate.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseMachineTranslate,'chooseMachineTranslate',_machineTranslate);
                this.$vc.emit(this.$vc._thisemitLoadData,'listMachineTranslateData',{
                    machineTranslateId:_machineTranslate.machineTranslateId
                });
                $('#chooseMachineTranslateModel').modal('hide');
            },queryMachineTranslates:function(){
                this._loadAllMachineTranslateInfo(1,10,this.chooseMachineTranslateInfo._currentMachineTranslateName);
            },_refreshChooseMachineTranslateInfo:function(){
                this.chooseMachineTranslateInfo._currentMachineTranslateName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    