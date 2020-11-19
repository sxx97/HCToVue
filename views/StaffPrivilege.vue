
        <template>
            <div id="component" >
    <vc:create name="privilegeStaffInfo"></vc:create>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <!--<th>权限ID</th>-->
                            <th data-hide="phone">权限名称</th>
                            <th data-hide="phone">权限描述</th>
                            <!--<th data-hide="phone">隶属权限组ID</th>-->
                            <th data-hide="phone,tablet" >隶属权限组名称</th>
                            <th data-hide="phone">状态</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="privilege in staffPrivilegeInfo.privileges">
                                <!--<td>
                                    {{privilege.pId}}
                                </td>-->
                                <td>
                                    {{privilege.name}}
                                </td>
                                <td>
                                    {{privilege.description}}
                                </td>
                                <!--<td>
                                    {{privilege.pgId}}
                                </td>-->
                                <td>
                                    {{privilege.pgName}}
                                </td>
                                <td>
                                    <span class="label label-primary">在用</span>
                                </td>
                                <td      class="text-right">
                                    <div class="btn-group">
                                        <button class="btn-white btn btn-xs" v-on:click="_openDeleteStaffPrivilegeModel(privilege)">删除</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="7">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>

                </div>
            </div>
        </div>
    </div>
    <!-- 删除员工权限 -->
    <vc:create name="deleteStaffPrivilege"></vc:create>
</div>
        </template>
        <script>
            
            import PrivilegeStaffInfo from '@/component/PrivilegeStaffInfo.vue';import DeleteStaffPrivilege from '@/component/DeleteStaffPrivilege.vue';



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
                    PrivilegeStaffInfo,DeleteStaffPrivilege
                },
                data () {
                    return {"staffPrivilegeInfo":{"privileges":[],"_currentStaffId":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('staffPrivilege','_loadStaffPrivileges',(_param) =>{
                this._loadStaffPrivileges(_param);
            });
        })()   
                },
                methods: {
                    _loadStaffPrivileges:function(_param){
                this.staffPrivilegeInfo._currentStaffId=_param.staffId;
                var param = {
                    params:{
                        staffId:_param.staffId
                    }
                };
             //发送get请求
            this.$vc.http.get('staffPrivilege',
                         'listStaffPrivileges',
                          param,
                          (json) =>{
                             var _staffPrivilegeInfo = JSON.parse(json);
                             this.staffPrivilegeInfo.privileges = _staffPrivilegeInfo.datas;

                          },() =>{
                             console.log('请求失败处理');
                          });
            },_openDeleteStaffPrivilegeModel:function(_staffPrivilege){
                _staffPrivilege.staffId = this.staffPrivilegeInfo._currentStaffId;
                this.$vc.emit('deleteStaffPrivilege','openStaffPrivilegeModel',_staffPrivilege);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    