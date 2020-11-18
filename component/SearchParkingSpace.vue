
        <template>
            <div id="searchParkingSpaceModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchParkingSpaceModelLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="searchParkingSpaceModelLabel">选择停车位</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row" v-if="searchParkingSpaceInfo.showSearchCondition == 'true'">

                                <div class="col-sm-6 m-b-xs">
                                    <div class="input-group" v-if="searchParkingSpaceInfo.psFlag == 'SH'">
                                        <input placeholder="请输入车牌号" type="text" v-model="searchParkingSpaceInfo.carNum" class="form-control form-control-sm">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <input placeholder="请输入停车场" type="text" v-model="searchParkingSpaceInfo.areaNum" class="form-control form-control-sm">
                                        <input placeholder="请输入停车位编号" type="text" v-model="searchParkingSpaceInfo.num" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                            <button type="button" class="btn btn-sm btn-primary" v-on:click="searchParkingSpaces()">查询</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>车位ID</th>
                                        <th data-hide="phone">车位编码</th>
                                        <th data-hide="phone">车位类型</th>
                                        <th data-hide="phone">车位状态</th>
                                        <th data-hide="phone">面积</th>

                                        <th class="text-right">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="parkingSpace in searchParkingSpaceInfo.parkingSpaces">
                                        <td>
                                            {{parkingSpace.psId}}
                                        </td>

                                        <td>
                                            {{parkingSpace.num}}
                                        </td>
                                        <td>
                                            {{parkingSpace.typeCd == '1001'?'地上停车位':'地下停车位'}}
                                        </td>
                                        <td>
                                            <!-- {{vc.component._viewParkingSpaceState(parkingSpace.state)}}-->
                                            {{parkingSpace.stateName}}
                                        </td>
                                        <td>
                                            {{parkingSpace.area}}
                                        </td>

                                        <td>
                                            <button class="btn btn-primary btn-xs" v-on:click="chooseParkingSpace(parkingSpace)">选择</button>
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
            props: {"emitChooseParkingSpace":"false","emitLoadData":"false","parkingSpaceFlag":"false","showSearchCondition":"true"},
            components: {
                
            },
            data () {
                return {"searchParkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('searchParkingSpace','openSearchParkingSpaceModel',function(_param){
                console.log("打开业主成员界面")
                $('#searchParkingSpaceModel').modal('show');
                this._refreshSearchParkingSpaceData();
                this._loadAllParkingSpaceInfo(1,10);
            });

            this.$vc.on('searchParkingSpace','showOwnerParkingSpaces',function(_parkingSpaces){
                $('#searchParkingSpaceModel').modal('show');
                this.searchParkingSpaceInfo.parkingSpaces=_parkingSpaces;
            });
        })()   
            },
            methods: {
                _loadAllParkingSpaceInfo:function(_page,_row){

                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        num:this.searchParkingSpaceInfo.num,
                        areaNum:this.searchParkingSpaceInfo.areaNum,
                        carNum:this.searchParkingSpaceInfo.carNum,
                        state:this.$vc._thisparkingSpaceFlag
                    }
                };

                //发送get请求
               this.$vc.http.get('searchParkingSpace',
                            'listParkingSpace',
                             param,
                             function(json){
                                var _parkingSpaceInfo = JSON.parse(json);
                                this.searchParkingSpaceInfo.parkingSpaces = _parkingSpaceInfo.parkingSpaces;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseParkingSpace:function(_parkingSpace){
                this.$vc.emit(this.$vc._thisemitChooseParkingSpace,'chooseParkingSpace',_parkingSpace);
                this.$vc.emit(this.$vc._thisemitLoadData,'listParkingSpaceData',{
                    psId:_parkingSpace.psId
                });
                $('#searchParkingSpaceModel').modal('hide');
            },searchParkingSpaces:function(){
                this._loadAllParkingSpaceInfo(1,15);
            },_refreshSearchParkingSpaceData:function(){
                this.searchParkingSpaceInfo.num = "";
            },_viewParkingSpaceState:function(state){
                if(state == 'F'){
                    return "空闲";
                }else if(state == 'S'){
                    return "已售卖";
                }else if(state == 'H'){
                    return "已出租";
                }else{
                    return "未知";
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    