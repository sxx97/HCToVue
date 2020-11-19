
        <template>
            <div class="modal fade" id="deletePrivilegeModel" tabindex="-1" role="dialog"
     aria-labelledby="deletePrivilegeModelLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deletePrivilegeModelLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否删除!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeletePrivilegeModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deletePrivilege()">确认删除</button>
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
                    return {"deletePrivilegeInfo":{}}    
                },
                mounted() {
                (undefined)()
(() =>{
             this.$vc.on('deletePrivilege','openDeletePrivilegeModel',(_p) =>{
                    this.deletePrivilegeInfo = _p;
                    $('#deletePrivilegeModel').modal('show');
                });
        })()   
                },
                methods: {
                    closeDeletePrivilegeModel:function(){
                $('#deletePrivilegeModel').modal('hide');
            },deletePrivilege:function(){
                console.log("开始删除限组：",this.deletePrivilegeInfo);
                this.$vc.http.post(
                    'deletePrivilege',
                    'delete',
                    JSON.stringify(this.deletePrivilegeInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deletePrivilegeModel').modal('hide');
                            this.$vc.emit('privilege','loadPrivilege',this.deletePrivilegeInfo.pgId);
                            return ;
                        }
                        this.deletePrivilegeInfo.errorInfo = json;
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.deletePrivilegeInfo.errorInfo = errInfo;
                     });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    