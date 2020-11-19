
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>巡检点信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm "
                            v-on:click="_goBack()"  style="margin-right:10px">
                        返回
                    </button>
                    <button type="button" class="btn btn-primary btn-sm"
                            v-on:click="_openAddInspectionRoutePointModal()">
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
                        <th class="text-center">巡检点名称</th>
                        <th class="text-center">巡检点ID</th>
                        <th class="text-center">设备位置</th>
                        <th class="text-center">设备编码</th>
                        <th class="text-center">设备名称</th>
                        <th class="text-right">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="inspectionPoint in inspectionRoutePointManageInfo.inspectionRoutes">
                        <td class="text-center">{{inspectionPoint.inspectionName}}</td>
                        <td class="text-center">{{inspectionPoint.inspectionId}}</td>
                        <td class="text-center">{{inspectionPoint.locationObjName}}</td>
                        <td class="text-center">{{inspectionPoint.machineCode}}</td>
                        <td class="text-center">{{inspectionPoint.machineName}}</td>
                        <td class="text-right">
                            <div class="btn-group">
                                <button class="btn-white btn btn-xs"
                                        v-on:click="_openDeleteInspectionPointModel(inspectionPoint)">删除
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
                <vc:create name="pagination"></vc:create>
            </div>
        </div>
    </div>
    <vc:create name="deleteInspectionRoutePoint"></vc:create>
    <vc:create name="addInspectionRoutePoint"
               emitListener="inspectionRoutePointManage"
               emitFunction="notify"
    ></vc:create>
</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import DeleteInspectionRoutePoint from '@/component/DeleteInspectionRoutePoint.vue';import AddInspectionRoutePoint from '@/component/AddInspectionRoutePoint.vue';



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
                    Pagination,DeleteInspectionRoutePoint,AddInspectionRoutePoint
                },
                data () {
                    return {"inspectionRoutePointManageInfo":{"inspectionRoutes":[],"inspectionRouteId":"","total":0,"records":1,"routeName":""}}    
                },
                mounted() {
                (() =>{
            //this._listInspectionRoutePoints(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{
            this.$vc.on('inspectionRoutePointManage','notify',(_param) =>{
                  this._listInspectionRoutePoints(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            
            this.$vc.on('inspectionRoutePointManage','listInspectionPoint',(_param) =>{
                  if(!_param.hasOwnProperty('inspectionRouteId')){
                        return ;
                  }
                  this.inspectionRoutePointManageInfo.inspectionRouteId = _param.inspectionRouteId;
                  this._listInspectionRoutePoints(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listInspectionRoutes(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listInspectionRoutePoints:function(_page, _rows){

                var param = {
                    params:{
                        page:_page,
                        row:_rows,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        inspectionRouteId:this.inspectionRoutePointManageInfo.inspectionRouteId
                    }
               };

               //发送get请求
               this.$vc.http.get('inspectionRoutePointManage',
                            'list',
                             param,
                             (json,res) =>{
                                var _inspectionRouteManageInfo=JSON.parse(json);
                                this.inspectionRoutePointManageInfo.total = _inspectionRouteManageInfo.total;
                                this.inspectionRoutePointManageInfo.records = _inspectionRouteManageInfo.records;
                                this.inspectionRoutePointManageInfo.inspectionPonits = _inspectionRouteManageInfo.inspectionPonits;
                                this.$vc.emit('pagination','init',{
                                     total:this.inspectionRoutePointManageInfo.records,
                                     currentPage:_page
                                 });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAddInspectionRoutePointModal:function(){
                this.$vc.emit('addInspectionRoutePoint','openAddInspectionRoutePointModal',{
                    inspectionRouteId:this.inspectionRoutePointManageInfo.inspectionRouteId
                });
            },_openDeleteInspectionPointModel:function(_inspectionPoint){
                this.$vc.emit('deleteInspectionRoutePoint','openDeleteInspectionRoutePointModal',_inspectionPoint);
            },_goBack:function(){
                this.$vc.emit('inspectionRouteManage','goBack',{});
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    