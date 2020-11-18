
        <template>
            <div id = "chooseBasePrivilegeModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseBasePrivilegeModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseBasePrivilegeModelLabel">选择权限</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入权限名称" type="text" v-model="chooseBasePrivilegeInfo._currentBasePrivilegeName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryBasePrivileges()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <!--<th class="text-center">权限ID</th>-->
                            <th class="text-center">权限名称</th>
                            <th class="text-center">商户类型</th>
                            <th class="text-center">描述</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="basePrivilege in chooseBasePrivilegeInfo.basePrivileges">
                                                                        <!--<td class="text-center">{{basePrivilege.pId}}</td>-->
                            <td class="text-center">{{basePrivilege.name}}</td>
                            <td class="text-center">{{basePrivilege.domain}}</td>
                            <td class="text-center">{{basePrivilege.description}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseBasePrivilege(basePrivilege)">选择</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
        export default {
            props: {"emitChooseBasePrivilege":"true","emitLoadData":"true"},
            components: {
                
            },
            data () {
                return {"chooseBasePrivilegeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
            this.$vc.on('chooseBasePrivilege','openChooseBasePrivilegeModel',function(_param){
                $('#chooseBasePrivilegeModel').modal('show');
                this._refreshChooseBasePrivilegeInfo();
                this._loadAllBasePrivilegeInfo(1,10,'');
            });
        })()   
            },
            methods: {
                _loadAllBasePrivilegeInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseBasePrivilege',
                            'list',
                             param,
                             function(json){
                                var _basePrivilegeInfo = JSON.parse(json);
                                this.chooseBasePrivilegeInfo.basePrivileges = _basePrivilegeInfo.basePrivileges;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseBasePrivilege:function(_basePrivilege){
                if(_basePrivilege.hasOwnProperty('name')){
                     _basePrivilege.basePrivilegeName = _basePrivilege.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseBasePrivilege,'chooseBasePrivilege',_basePrivilege);
                this.$vc.emit(this.$vc._thisemitLoadData,'listBasePrivilegeData',{
                    basePrivilegeId:_basePrivilege.basePrivilegeId
                });
                $('#chooseBasePrivilegeModel').modal('hide');
            },queryBasePrivileges:function(){
                this._loadAllBasePrivilegeInfo(1,10,this.chooseBasePrivilegeInfo._currentBasePrivilegeName);
            },_refreshChooseBasePrivilegeInfo:function(){
                this.chooseBasePrivilegeInfo._currentBasePrivilegeName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    