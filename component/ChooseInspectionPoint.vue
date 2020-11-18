
        <template>
            <div id = "chooseInspectionPointModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseInspectionPointModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseInspectionPointModelLabel">选择巡检点</h3>
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
                                        <input placeholder="输入巡检点名称" type="text" v-model="chooseInspectionPointInfo._currentInspectionPointName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryInspectionPoints()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">巡检点ID</th>
                            <th class="text-center">巡检点名称</th>
                            <th class="text-center">备注</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="inspectionPoint in chooseInspectionPointInfo.inspectionPoints">
                                                                        <td class="text-center">{{inspectionPoint.inspectionId}}</td>
                            <td class="text-center">{{inspectionPoint.inspection_name}}</td>
                            <td class="text-center">{{inspectionPoint.remark}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseInspectionPoint(inspectionPoint)">选择</button>
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
            
        export default {
            props: {"emitChooseInspectionPoint":"true","emitLoadData":"true"},
            components: {
                
            },
            data () {
                return {"chooseInspectionPointInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
            this.$vc.on('chooseInspectionPoint','openChooseInspectionPointModel',function(_param){
                $('#chooseInspectionPointModel').modal('show');
                this._refreshChooseInspectionPointInfo();
                this._loadAllInspectionPointInfo(1,10,'');
            });
        })()   
            },
            methods: {
                _loadAllInspectionPointInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseInspectionPoint',
                            'list',
                             param,
                             function(json){
                                var _inspectionPointInfo = JSON.parse(json);
                                this.chooseInspectionPointInfo.inspectionPoints = _inspectionPointInfo.inspectionPoints;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseInspectionPoint:function(_inspectionPoint){
                if(_inspectionPoint.hasOwnProperty('name')){
                     _inspectionPoint.inspectionPointName = _inspectionPoint.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseInspectionPoint,'chooseInspectionPoint',_inspectionPoint);
                this.$vc.emit(this.$vc._thisemitLoadData,'listInspectionPointData',{
                    inspectionPointId:_inspectionPoint.inspectionPointId
                });
                $('#chooseInspectionPointModel').modal('hide');
            },queryInspectionPoints:function(){
                this._loadAllInspectionPointInfo(1,10,this.chooseInspectionPointInfo._currentInspectionPointName);
            },_refreshChooseInspectionPointInfo:function(){
                this.chooseInspectionPointInfo._currentInspectionPointName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    