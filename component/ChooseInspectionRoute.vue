
        <template>
            <div id = "chooseInspectionRouteModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseInspectionRouteModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseInspectionRouteModelLabel">选择巡检路线</h3>
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
                                        <input placeholder="输入巡检路线名称" type="text" v-model="chooseInspectionRouteInfo._currentInspectionRouteName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryInspectionRoutes()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">inspectionRouteId</th>
                            <th class="text-center">路线名称</th>
                            <th class="text-center">巡检点</th>
                            <th class="text-center">设备数量</th>
                            <th class="text-center">检查项数量</th>
                            <th class="text-center">备注</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="inspectionRoute in chooseInspectionRouteInfo.inspectionRoutes">
                                                                        <td class="text-center">{{inspectionRoute.configId}}</td>
                            <td class="text-center">{{inspectionRoute.routeName}}</td>
                            <td class="text-center">{{inspectionRoute.inspectionName}}</td>
                            <td class="text-center">{{inspectionRoute.machineQuantity}}</td>
                            <td class="text-center">{{inspectionRoute.checkQuantity}}</td>
                            <td class="text-center">{{inspectionRoute.remark}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseInspectionRoute(inspectionRoute)">选择</button>
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
                props: {"emitChooseInspectionRoute":"true","emitLoadData":"true"},
                components: {
                    
                },
                data () {
                    return {"chooseInspectionRouteInfo":{"inspectionRoutes":[],"_currentInspectionRouteName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseInspectionRoute','openChooseInspectionRouteModel',(_param) =>{
                $('#chooseInspectionRouteModel').modal('show');
                this._refreshChooseInspectionRouteInfo();
                this._loadAllInspectionRouteInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllInspectionRouteInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseInspectionRoute',
                            'list',
                             param,
                             (json) =>{
                                var _inspectionRouteInfo = JSON.parse(json);
                                this.chooseInspectionRouteInfo.inspectionRoutes = _inspectionRouteInfo.inspectionRoutes;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseInspectionRoute:function(_inspectionRoute){
                if(_inspectionRoute.hasOwnProperty('name')){
                     _inspectionRoute.inspectionRouteName = _inspectionRoute.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseInspectionRoute,'chooseInspectionRoute',_inspectionRoute);
                this.$vc.emit(this.$vc._thisemitLoadData,'listInspectionRouteData',{
                    inspectionRouteId:_inspectionRoute.inspectionRouteId
                });
                $('#chooseInspectionRouteModel').modal('hide');
            },queryInspectionRoutes:function(){
                this._loadAllInspectionRouteInfo(1,10,this.chooseInspectionRouteInfo._currentInspectionRouteName);
            },_refreshChooseInspectionRouteInfo:function(){
                this.chooseInspectionRouteInfo._currentInspectionRouteName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    