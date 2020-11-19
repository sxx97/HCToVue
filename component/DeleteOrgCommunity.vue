
        <template>
            <div class="modal fade" id="deleteOrgCommunityModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确定删除隶属管理区</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteOrgCommunityModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteOrgCommunity()">确认删除</button>
            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
            



            const OWNER_TYPE = {
                OWNER: '1001',
                TENANT: '1003'
            };
            // 考核类型
            const ASSESSMENT_TYPE = {
                BUSINESS: 2,
                COMMON: 1,
                SYSTEM: 3,
            };
            
            // 删除时的类型
            const DELETE_TYPE = {
                TABLE: 1, // 删除通用考核表
                BUSINESS_ITEM: 2,  // 删除业务考核项
                COMMON_ITEM: 3, // 删除通用考核项
            }
            // 考核人员
            const ASSESSMENT_OBJECT_TYPE = {
                STAFF: 1,
                SUPERVISOR: 2,
                MANAGER: 3,
            }
            
            const AUTO_ASSESSMENT_TYPE = {
                INSPECTION: 1,
                WORK_ORDER: 2,
                ATTENDANCE: 3,
            }
            
            // 考核项目
            const ASSESSMENT_ITEM_TYPE = {
                COMMON_ITEM: 1,
                BUSINESS_ITEM: 2,
            }
            
            const DEFAULT_PAGE = 1;
            const DEFAULT_ROWS = 10;

            
            export default {
                props: {},
                components: {
                    
                },
                data () {
                    return {"deleteOrgCommunityInfo":{}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
             this.$vc.on('deleteOrgCommunity','openDeleteOrgCommunityModal',(_params) =>{

                this.deleteOrgCommunityInfo = _params;
                $('#deleteOrgCommunityModel').modal('show');

            });
        })()   
                },
                methods: {
                    deleteOrgCommunity:function(){
                this.deleteOrgCommunityInfo.communityId=this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'deleteOrgCommunity',
                    'delete',
                    JSON.stringify(this.deleteOrgCommunityInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteOrgCommunityModel').modal('hide');
                            this.$vc.emit('orgCommunityManageInfo','listOrgCommunity',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');
                        this.$vc.message(json);

                     });
            },closeDeleteOrgCommunityModel:function(){
                $('#deleteOrgCommunityModel').modal('hide');
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    