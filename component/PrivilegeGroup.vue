
        <template>
            <div class="col-lg-3" style="background:#FFFFFF">
    <div class="ibox ">
        <div class="ibox-content mailbox-content">
            <div class="file-manager">
                <a class="btn btn-block btn-primary compose-mail" href="javascript:void(0);" v-on:click="openPrivilegeGroupModel()">添加权限组</a>
                <div class="space-25"></div>

                <h5>权限组</h5>
                <ul class="category-list" style="padding: 0">
                    <li v-for="pGroup in privilegeGroupInfo.groups">
                        <a v-on:click="notifyQueryPrivilege(pGroup)">
                            <i class="glyphicon glyphicon-chevron-right text-navy"></i>
                            {{pGroup.name}}
                            <i v-if="pGroup.storeId != '9999'" class="glyphicon glyphicon-remove-sign float-right"
                               style="color:#dc3545"
                               v-on:click.stop="openDeletePrivilegeGroupModel(pGroup)"></i>
                            <i v-if="pGroup.storeId != '9999'" class="glyphicon glyphicon-edit float-right"
                               style="color:#1ab394"
                               v-on:click.stop="openEditPrivilegeGroupModel(pGroup)"></i>

                        </a>
                    </li>
                </ul>

                <div class="clearfix"></div>
            </div>

            <AddPrivilegeGroup name="addPrivilegeGroup"></AddPrivilegeGroup>
            <EditPrivilegeGroup name="editPrivilegeGroup"></EditPrivilegeGroup>
            <DeletePrivilegeGroup name="deletePrivilegeGroup"></DeletePrivilegeGroup>
        </div>
    </div>
</div>
        </template>
        <script>
            import AddPrivilegeGroup from './AddPrivilegeGroup.vue';import EditPrivilegeGroup from './EditPrivilegeGroup.vue';import DeletePrivilegeGroup from './DeletePrivilegeGroup.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"privilegeGroupInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this.loadPrivilegeGroup();
        })()(function(){
             this.$on('privilegeGroup_loadPrivilegeGroup',function(_params){
                this.loadPrivilegeGroup();
            });
        })()   
            },
            methods: {
                loadPrivilegeGroup:function(){
                var param = {
                    msg:234
                };

                //发送get请求
               this.$vc.http.get('privilegeGroup',
                            'listPrivilegeGroup',
                             param,
                             function(json){
                                var _groupsInfo = JSON.parse(json);
                                this.privilegeGroupInfo.groups = _groupsInfo;
                                if(_groupsInfo.length > 0){
                                    this.$emit('privilege_group_event',{
                                                                    _pgId:_groupsInfo[0].pgId,
                                                                    _pgName:_groupsInfo[0].name,
                                                                    _storeId:_groupsInfo[0].storeId
                                                                });
                                }


                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },notifyQueryPrivilege:function(_pGroup){
                this.$emit('privilege_group_event',{
                    _pgId:_pGroup.pgId,
                    _pgName:_pGroup.name,
                    _storeId:_pGroup.storeId
                });
            },openPrivilegeGroupModel:function(){
                this.$emit('addPrivilegeGroup_openPrivilegeGroupModel',{});
            },openEditPrivilegeGroupModel:function(_pGroup){
                this.$vc.emit('editPrivilegeGroup','openPrivilegeGroupModel',_pGroup);
            },openDeletePrivilegeGroupModel:function(_pGroup){
                this.$emit('deletePrivilegeGroup_openDeletePrivilegeGroupModel',_pGroup);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    