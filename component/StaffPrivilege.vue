
        <template>
            <div id="component" >
    <PrivilegeStaffInfo name="privilegeStaffInfo"></PrivilegeStaffInfo>
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
    <DeleteStaffPrivilege name="deleteStaffPrivilege"></DeleteStaffPrivilege>
</div>
        </template>
        <script>
            import PrivilegeStaffInfo from './PrivilegeStaffInfo.vue';import DeleteStaffPrivilege from './DeleteStaffPrivilege.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"staffPrivilegeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('staffPrivilege','_loadStaffPrivileges',function(_param){
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
                          function(json){
                             var _staffPrivilegeInfo = JSON.parse(json);
                             this.staffPrivilegeInfo.privileges = _staffPrivilegeInfo.datas;

                          },function(){
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
    