
        <template>
            <div id = "chooseOwnerRepairModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseOwnerRepairModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseOwnerRepairModelLabel">选择业主报修</h3>
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
                                        <input placeholder="输入业主报修名称" type="text" v-model="chooseOwnerRepairInfo._currentOwnerRepairName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryOwnerRepairs()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">报修ID</th>
                            <th class="text-center">报修类型</th>
                            <th class="text-center">报修人</th>
                            <th class="text-center">联系方式</th>
                            <th class="text-center">房间ID</th>
                            <th class="text-center">预约时间</th>
                            <th class="text-center">报修内容</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="ownerRepair in chooseOwnerRepairInfo.ownerRepairs">
                                                                        <td class="text-center">{{ownerRepair.repairId}}</td>
                            <td class="text-center">{{ownerRepair.repairType}}</td>
                            <td class="text-center">{{ownerRepair.repairName}}</td>
                            <td class="text-center">{{ownerRepair.tel}}</td>
                            <td class="text-center">{{ownerRepair.roomId}}</td>
                            <td class="text-center">{{ownerRepair.appointmentTime}}</td>
                            <td class="text-center">{{ownerRepair.context}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseOwnerRepair(ownerRepair)">选择</button>
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
            props: {"emitChooseOwnerRepair":"false","emitLoadData":"false"},
            components: {
                
            },
            data () {
                return {"chooseOwnerRepairInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
            this.$vc.on('chooseOwnerRepair','openChooseOwnerRepairModel',function(_param){
                $('#chooseOwnerRepairModel').modal('show');
                this._refreshChooseOwnerRepairInfo();
                this._loadAllOwnerRepairInfo(1,10,'');
            });
        })()   
            },
            methods: {
                _loadAllOwnerRepairInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseOwnerRepair',
                            'list',
                             param,
                             function(json){
                                var _ownerRepairInfo = JSON.parse(json);
                                this.chooseOwnerRepairInfo.ownerRepairs = _ownerRepairInfo.ownerRepairs;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseOwnerRepair:function(_ownerRepair){
                if(_ownerRepair.hasOwnProperty('name')){
                     _ownerRepair.ownerRepairName = _ownerRepair.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseOwnerRepair,'chooseOwnerRepair',_ownerRepair);
                this.$vc.emit(this.$vc._thisemitLoadData,'listOwnerRepairData',{
                    ownerRepairId:_ownerRepair.ownerRepairId
                });
                $('#chooseOwnerRepairModel').modal('hide');
            },queryOwnerRepairs:function(){
                this._loadAllOwnerRepairInfo(1,10,this.chooseOwnerRepairInfo._currentOwnerRepairName);
            },_refreshChooseOwnerRepairInfo:function(){
                this.chooseOwnerRepairInfo._currentOwnerRepairName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    