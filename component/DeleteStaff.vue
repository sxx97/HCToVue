
        <template>
            <div class="modal fade" id="deleteStaffModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否删除!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteStaffModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteStaff()">确认删除</button>
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
                    return {"deleteStaffInfo":{}}    
                },
                mounted() {
                (undefined)()
(() =>{
             this.$on('delete_staff_event',(_staffInfo) =>{
                    this.deleteStaffInfo = _staffInfo;
                    $('#deleteStaffModel').modal('show');
                });
        })()   
                },
                methods: {
                    closeDeleteStaffModel:function(){
                $('#deleteStaffModel').modal('hide');
            },deleteStaff:function(){
                console.log("开始删除工号：",this.deleteStaffInfo);
                this.$vc.http.post(
                    'deleteStaff',
                    'delete',
                    JSON.stringify(this.deleteStaffInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#deleteStaffModel').modal('hide');
                            this.$emit('deleteStaff_reload_event',{});
                            return ;
                        }
                        this.deleteStaffInfo.errorInfo = json;
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.deleteStaffInfo.errorInfo = errInfo;
                     });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    