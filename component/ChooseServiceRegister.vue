
        <template>
            <div id = "chooseServiceRegisterModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseServiceRegisterModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseServiceRegisterModelLabel">选择服务绑定</h3>
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
                                        <input placeholder="输入服务绑定名称" type="text" v-model="chooseServiceRegisterInfo._currentServiceRegisterName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryServiceRegisters()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">绑定ID</th>
                            <th class="text-center">应用ID</th>
                            <th class="text-center">服务ID</th>
                            <th class="text-center">订单类型</th>
                            <th class="text-center">调用次数</th>
                            <th class="text-center">调用方式</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="serviceRegister in chooseServiceRegisterInfo.serviceRegisters">
                                                                        <td class="text-center">{{serviceRegister.id}}</td>
                            <td class="text-center">{{serviceRegister.appId}}</td>
                            <td class="text-center">{{serviceRegister.serviceId}}</td>
                            <td class="text-center">{{serviceRegister.orderTypeCd}}</td>
                            <td class="text-center">{{serviceRegister.invokeLimitTimes}}</td>
                            <td class="text-center">{{serviceRegister.invokeModel}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseServiceRegister(serviceRegister)">选择</button>
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
                props: {"emitChooseServiceRegister":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseServiceRegisterInfo":{"serviceRegisters":[],"_currentServiceRegisterName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseServiceRegister','openChooseServiceRegisterModel',(_param) =>{
                $('#chooseServiceRegisterModel').modal('show');
                this._refreshChooseServiceRegisterInfo();
                this._loadAllServiceRegisterInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllServiceRegisterInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseServiceRegister',
                            'list',
                             param,
                             (json) =>{
                                var _serviceRegisterInfo = JSON.parse(json);
                                this.chooseServiceRegisterInfo.serviceRegisters = _serviceRegisterInfo.serviceRegisters;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseServiceRegister:function(_serviceRegister){
                if(_serviceRegister.hasOwnProperty('name')){
                     _serviceRegister.serviceRegisterName = _serviceRegister.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseServiceRegister,'chooseServiceRegister',_serviceRegister);
                this.$vc.emit(this.$vc._thisemitLoadData,'listServiceRegisterData',{
                    serviceRegisterId:_serviceRegister.serviceRegisterId
                });
                $('#chooseServiceRegisterModel').modal('hide');
            },queryServiceRegisters:function(){
                this._loadAllServiceRegisterInfo(1,10,this.chooseServiceRegisterInfo._currentServiceRegisterName);
            },_refreshChooseServiceRegisterInfo:function(){
                this.chooseServiceRegisterInfo._currentServiceRegisterName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    