
        <template>
            <div id="component" class="row">
    <PrivilegeGroup name="privilegeGroup"></PrivilegeGroup>
    <div class="col-lg-9 animated fadeInRight">
        <div class="mail-box-header">
            <button v-if="privilegeInfo._currentStoreId != '9999'"
                    class="btn btn-primary btn-sm float-right"
                    data-toggle="tooltip"
                    title="Refresh inbox"
                    v-on:click="openAddPrivilegeModel()"
            ><i class="fa fa-plus"></i> 添加权限</button>
            <div class="float-right mail-search" style="margin-right:10px">
                <div class="input-group">
                    <input type="text" class="form-control form-control-sm" v-model="privilegeInfo._pName" name="search" placeholder="请输入权限名称">
                    <div class="input-group-btn">
                        <button v-on:click="queryPrivilege()" class="btn btn-sm btn-primary">
                            查询
                        </button>
                    </div>
                </div>
            </div>
            <h2>
                {{privilegeInfo._currentPgName}}
            </h2>
        </div>
        <div class="mail-box">

            <table class="table table-hover table-mail">
                <thead>
                    <tr>
                        <!--<th>权限编码</th>-->
                        <th>权限名称</th>
                        <th>权限描述</th>
                        <th>创建时间</th>
                        <th class="text-right">操作</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="privilege in privilegeInfo._privileges" class="read">
                    <!--<td class="check-mail">
                        {{privilege.pId}}
                    </td>-->
                    <td class="mail-ontact">{{privilege.name}}</td>
                    <td class="mail-subject">{{privilege.description}}</td>
                    <td class="">{{vc.dateFormat(privilege.createTime)}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <button class="btn-white btn btn-xs" v-on:click="openDeletePrivilegeModel(privilege)">删除</button>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>


        </div>
    </div>

    <AddPrivilege name="addPrivilege"></AddPrivilege>
    <DeletePrivilege name="deletePrivilege"></DeletePrivilege>
</div>
        </template>
        <script>
            import PrivilegeGroup from './PrivilegeGroup.vue';import AddPrivilege from './AddPrivilege.vue';import DeletePrivilege from './DeletePrivilege.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"privilegeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$on('privilege_group_event',function(_pgObj){
                this.privilegeInfo._currentPgId = _pgObj._pgId;
                this.privilegeInfo._currentPgName = _pgObj._pgName;
                this.privilegeInfo._currentStoreId = _pgObj._storeId;
                //调用接口查询权限
                this._loadPrivilege(_pgObj._pgId);
            });
            this.$on('privilege_loadPrivilege',function(_pgId){
                this._loadPrivilege(_pgId);
            });
        })()   
            },
            methods: {
                _loadPrivilege:function(_pgId){
                this.privilegeInfo._privileges=[];
                var param = {
                    params:{
                        pgId:_pgId,
                        name:this.privilegeInfo._pName

                    }
                };

                                //发送get请求
               this.$vc.http.get('privilege',
                            'listPrivilege',
                             param,
                             function(json){
                                var _privileges = JSON.parse(json);
                                this.privilegeInfo._privileges = _privileges;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },openAddPrivilegeModel:function(){
                this.$emit('addPrivilege_openPrivilegeModel',{
                            pgId:this.privilegeInfo._currentPgId
                });
            },openDeletePrivilegeModel:function(_p){
                _p.pgId = this.privilegeInfo._currentPgId;
                this.$vc.emit('deletePrivilege','openDeletePrivilegeModel',_p);
            },queryPrivilege:function(){
                this._loadPrivilege(this.privilegeInfo._currentPgId);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    