
        <template>
            <div class="modal fade" id="deleteComplaintModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定删除投诉建议</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteComplaintModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteComplaint()">确认删除</button>
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
                return {"deleteComplaintInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('deleteComplaint','openDeleteComplaintModal',function(_params){

                this.deleteComplaintInfo = _params;
                $('#deleteComplaintModel').modal('show');

            });
        })()   
            },
            methods: {
                deleteComplaint:function(){
                this.deleteComplaintInfo.communityId=this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'deleteComplaint',
                    'delete',
                    JSON.stringify(this.deleteComplaintInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteComplaintModel').modal('hide');
                            this.$vc.emit('complaintManage','listComplaint',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteComplaintModel:function(){
                $('#deleteComplaintModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    