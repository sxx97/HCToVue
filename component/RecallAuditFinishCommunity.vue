
        <template>
            <div class="modal fade" id="recallAuditFinishCommunityModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定撤回审核</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeRecallAuditFinishCommunityModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="recallAuditFinishCommunity()">确认撤回</button>
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
                return {"recallAuditFinishCommunityInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('recallAuditFinishCommunity','openRecallAuditFinishCommunityModal',function(_params){

                this.recallAuditFinishCommunityInfo = _params;
                $('#recallAuditFinishCommunityModel').modal('show');

            });
        })()   
            },
            methods: {
                recallAuditFinishCommunity:function(){
                var _paramObj = {
                    communityId:this.recallAuditFinishCommunityInfo.communityId,
                    state:'1000',
                    remark:'撤回审核'
                };
                this.$vc.http.post(
                    'recallAuditFinishCommunity',
                    'recall',
                    JSON.stringify(_paramObj),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#recallAuditFinishCommunityModel').modal('hide');
                            this.$vc.emit('communityManage','listCommunity',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeRecallAuditFinishCommunityModel:function(){
                $('#recallAuditFinishCommunityModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    