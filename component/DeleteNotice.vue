
        <template>
            <div class="modal fade" id="deleteNoticeModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定删除公告</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteNoticeModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteNotice()">确认删除</button>
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
                return {"deleteNoticeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('deleteNotice','openDeleteNoticeModal',function(_params){

                this.deleteNoticeInfo = _params;
                $('#deleteNoticeModel').modal('show');

            });
        })()   
            },
            methods: {
                deleteNotice:function(){
                this.deleteNoticeInfo.communityId=this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'deleteNotice',
                    'delete',
                    JSON.stringify(this.deleteNoticeInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteNoticeModel').modal('hide');
                            this.$vc.emit('noticeManage','listNotice',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteNoticeModel:function(){
                $('#deleteNoticeModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    