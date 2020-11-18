
        <template>
            <div class="modal fade" id="deleteInspectionPointModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteInspectionPointModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteInspectionPoint()">确认删除</button>
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
                return {"deleteInspectionPointInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('deleteInspectionPoint','openDeleteInspectionPointModal',function(_params){
                this.deleteInspectionPointInfo.pointId = _params.id;
                $('#deleteInspectionPointModel').modal('show');

            });
        })()   
            },
            methods: {
                deleteInspectionPoint:function(){
                this.$vc.http.post(
                    'deleteInspectionPoint',
                    'delete',
                    JSON.stringify(this.deleteInspectionPointInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            this.$vc.toast(res.body.code == 0 ? "删除成功" : res.body.msg)
                            $('#deleteInspectionPointModel').modal('hide');
                            this.$vc.emit('inspectionPointManage','listInspectionPoint',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteInspectionPointModel:function(){
                $('#deleteInspectionPointModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    