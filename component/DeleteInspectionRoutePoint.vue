
        <template>
            <div class="modal fade" id="deleteInspectionRoutePointModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定删除巡检点</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteInspectionRoutePointModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteInspectionRoutePoint()">确认删除</button>
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
                return {"deleteInspectionRoutePointInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('deleteInspectionRoutePoint','openDeleteInspectionRoutePointModal',function(_params){

                this.deleteInspectionRoutePointInfo = _params;
                $('#deleteInspectionRoutePointModel').modal('show');

            });
        })()   
            },
            methods: {
                deleteInspectionRoutePoint:function(){
                this.deleteInspectionRoutePointInfo.communityId=this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'deleteInspectionRoutePoint',
                    'delete',
                    JSON.stringify(this.deleteInspectionRoutePointInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteInspectionRoutePointModel').modal('hide');
                            this.$vc.emit('inspectionRoutePointManage','listInspectionRoutePoint',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteInspectionRoutePointModel:function(){
                $('#deleteInspectionRoutePointModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    