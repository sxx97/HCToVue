
        <template>
            <div class="modal fade" id="deleteServiceModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定删除服务</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteServiceModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteService()">确认删除</button>
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
                return {"deleteServiceInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('deleteService','openDeleteServiceModal',function(_params){

                this.deleteServiceInfo = _params;
                $('#deleteServiceModel').modal('show');

            });
        })()   
            },
            methods: {
                deleteService:function(){
                this.deleteServiceInfo.communityId=this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'deleteService',
                    'delete',
                    JSON.stringify(this.deleteServiceInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteServiceModel').modal('hide');
                            this.$vc.emit('serviceManage','listService',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteServiceModel:function(){
                $('#deleteServiceModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    