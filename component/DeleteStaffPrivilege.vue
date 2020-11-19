
        <template>
            <div class="modal fade" id="deleteStaffPrivilegeModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>{{deleteStaffPrivilegeInfo.deleteMessage}}</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteStaffPrivilegeModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteStaffPrivilege()">确认删除</button>
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
                    return {"deleteStaffPrivilegeInfo":{"_currentStaffId":"","_currentPId":"","_currentPFlag":"","deleteMessage":"","errorInfo":""}}    
                },
                mounted() {
                (() =>{

         })()
(() =>{
             this.$vc.on('deleteStaffPrivilege','openStaffPrivilegeModel',(_params) =>{

                this.deleteStaffPrivilegeInfo._currentStaffId = _params.staffId;
                this.deleteStaffPrivilegeInfo._currentPId = _params.pId;
                if(_params.pgId == '-1'){

                   this.deleteStaffPrivilegeInfo._currentPFlag = '0';
                   this.deleteStaffPrivilegeInfo.deleteMessage = '确定是否删除当前权限';
                }else{
                   this.deleteStaffPrivilegeInfo._currentPId = _params.pgId;
                   this.deleteStaffPrivilegeInfo._currentPFlag = '1';
                    this.deleteStaffPrivilegeInfo.deleteMessage = '您删除是权限组下权限，会删除整个权限组权限，确认是否删除';

                }
                $('#deleteStaffPrivilegeModel').modal('show');

            });
        })()   
                },
                methods: {
                    deleteStaffPrivilege:function(){
                var param = {
                    userId:this.deleteStaffPrivilegeInfo._currentStaffId,
                    pId:this.deleteStaffPrivilegeInfo._currentPId,
                    pFlag:this.deleteStaffPrivilegeInfo._currentPFlag,
                }
                this.$vc.http.post(
                    'deleteStaffPrivilege',
                    'delete',
                    JSON.stringify(param),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteStaffPrivilegeModel').modal('hide');
                            this.$vc.emit('staffPrivilege','_loadStaffPrivileges',{
                                staffId:this.deleteStaffPrivilegeInfo._currentStaffId
                            });
                            return ;
                        }
                        this.deleteStaffInfo.errorInfo = json;
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.deleteStaffInfo.errorInfo = errInfo;
                     });
            },closeDeleteStaffPrivilegeModel:function(){
                $('#deleteStaffPrivilegeModel').modal('hide');
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    