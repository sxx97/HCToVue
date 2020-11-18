
        <template>
            <div class="modal fade" id="recallAuditEnterFinishCommunityModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeRecallAuditEnterFinishCommunityModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="recallAuditEnterFinishCommunity()">确认撤回</button>
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
                return {"recallAuditEnterFinishCommunityInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         })()(function(){
             this.$vc.on('recallAuditEnterFinishCommunity','openRecallAuditEnterFinishCommunityModal',function(_params){

                this.recallAuditEnterFinishCommunityInfo = _params;
                $('#recallAuditEnterFinishCommunityModel').modal('show');

            });
        })()   
            },
            methods: {
                recallAuditEnterFinishCommunity:function(){
                var _paramObj = {
                    communityMemberId:this.recallAuditEnterFinishCommunityInfo.communityMemberId,
                    state:'1000',
                    remark:'撤回审核'
                };
                this.$vc.http.post(
                    'recallAuditEnterFinishCommunity',
                    'recall',
                    JSON.stringify(_paramObj),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#recallAuditEnterFinishCommunityModel').modal('hide');
                            this.$vc.emit('auditEnterCommunityManage','listCommunity',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeRecallAuditEnterFinishCommunityModel:function(){
                $('#recallAuditEnterFinishCommunityModel').modal('hide');
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    