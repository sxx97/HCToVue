
        <template>
            <div class="modal fade" id="deleteUnitModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定删除楼栋单元</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteUnitModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteUnit()">确认删除</button>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"deleteUnitInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('deleteUnit','openUnitModel',function(_params){

                this.deleteUnitInfo._currentFloorId = _params.floorId;
                this.deleteUnitInfo._currentUnitId = _params.unitId;
                $('#deleteUnitModel').modal('show');

            });
        })()   
            },
            methods: {
                deleteUnit:function(){
                var param = {
                    floorId:this.deleteUnitInfo._currentFloorId,
                    unitId:this.deleteUnitInfo._currentUnitId,
                    communityId:this.$vc.getCurrentCommunity().communityId
                }
                this.$vc.http.post(
                    'deleteUnit',
                    'delete',
                    JSON.stringify(param),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteUnitModel').modal('hide');
                            this.$vc.emit('unit','loadUnit',{
                                floorId:this.deleteUnitInfo._currentFloorId
                            });
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteUnitModel:function(){
                $('#deleteUnitModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    