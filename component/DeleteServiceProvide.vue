
        <template>
            <div class="modal fade" id="deleteServiceProvideModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定删除服务提供</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteServiceProvideModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteServiceProvide()">确认删除</button>
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
                return {"deleteServiceProvideInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('deleteServiceProvide','openDeleteServiceProvideModal',function(_params){

                this.deleteServiceProvideInfo = _params;
                $('#deleteServiceProvideModel').modal('show');

            });
        })()   
            },
            methods: {
                deleteServiceProvide:function(){
                this.deleteServiceProvideInfo.communityId=this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'deleteServiceProvide',
                    'delete',
                    JSON.stringify(this.deleteServiceProvideInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteServiceProvideModel').modal('hide');
                            this.$vc.emit('serviceProvideManage','listServiceProvide',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteServiceProvideModel:function(){
                $('#deleteServiceProvideModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    