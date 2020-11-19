
        <template>
            <div id = "chooseUnitModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseUnitModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseUnitModelLabel">选择单元</h3>
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
                                        <input placeholder="输入单元名称" type="text" v-model="chooseUnitInfo._currentUnitName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryUnits()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">单元ID</th>
                            <th class="text-center">单元编号</th>
                            <th class="text-center">总层数</th>
                            <th class="text-center">电梯</th>
                            <th class="text-center">备注</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="unit in chooseUnitInfo.units">
                                                                        <td class="text-center">{{unit.unitId}}</td>
                            <td class="text-center">{{unit.unitNum}}</td>
                            <td class="text-center">{{unit.layerCount}}</td>
                            <td class="text-center">{{unit.lift}}</td>
                            <td class="text-center">{{unit.remark}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseUnit(unit)">选择</button>
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
                props: {"emitChooseUnit":"chooseStaff","emitLoadData":"chooseStaff"},
                components: {
                    
                },
                data () {
                    return {"chooseUnitInfo":{"units":[],"_currentUnitName":"","floorId":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseUnit','openChooseUnitModel',(_param) =>{
                $('#chooseUnitModel').modal('show');
                this._refreshChooseUnitInfo();
                this._loadAllUnitInfo(1,10,'');
            });
            this.$vc.on('chooseUnit','onFloorInfo',(_param) =>{
                this.chooseUnitInfo.floorId = _param.floorId;
            });
        })()   
                },
                methods: {
                    _loadAllUnitInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        floorId:this.chooseUnitInfo.floorId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseUnit',
                            'list',
                             param,
                             (json) =>{
                                var _unitInfo = JSON.parse(json);
                                this.chooseUnitInfo.units = _unitInfo;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseUnit:function(_unit){
                this.$vc.emit(this.$vc._thisemitChooseUnit,'chooseUnit',_unit);
                this.$vc.emit(this.$vc._thisemitLoadData,'listUnitData',{
                    unitId:_unit.unitId
                });
                $('#chooseUnitModel').modal('hide');
            },queryUnits:function(){
                this._loadAllUnitInfo(1,10,this.chooseUnitInfo._currentUnitName);
            },_refreshChooseUnitInfo:function(){
                this.chooseUnitInfo._currentUnitName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    