
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

            <vc:create name="addPrivilegeGroup"></vc:create>
            <vc:create name="editPrivilegeGroup"></vc:create>
            <vc:create name="deletePrivilegeGroup"></vc:create>
        </div>
    </div>
</div>
        </template>
        <script>
            
            import AddPrivilegeGroup from '@/component/AddPrivilegeGroup.vue';import EditPrivilegeGroup from '@/component/EditPrivilegeGroup.vue';import DeletePrivilegeGroup from '@/component/DeletePrivilegeGroup.vue';



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
                    AddPrivilegeGroup,EditPrivilegeGroup,DeletePrivilegeGroup
                },
                data () {
                    return {"privilegeGroupInfo":{"groups":[]}}    
                },
                mounted() {
                (() =>{
            this.loadPrivilegeGroup();
        })()
(() =>{
             this.$on('privilegeGroup_loadPrivilegeGroup',(_params) =>{
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
                             (json) =>{
                                var _groupsInfo = JSON.parse(json);
                                this.privilegeGroupInfo.groups = _groupsInfo;
                                if(_groupsInfo.length > 0){
                                    this.$emit('privilege_group_event',{
                                                                    _pgId:_groupsInfo[0].pgId,
                                                                    _pgName:_groupsInfo[0].name,
                                                                    _storeId:_groupsInfo[0].storeId
                                                                });
                                }


                             },() =>{
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
    