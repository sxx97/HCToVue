
        <template>
            <div id="chooseAuditUserModel" class="modal fade" tabindex="-1" role="dialog"
     aria-labelledby="chooseAuditUserModelLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseAuditUserModelLabel">选择审核人员</h3>
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
                                        <input placeholder="输入审核人员名称" type="text"
                                               v-model="chooseAuditUserInfo._currentAuditUserName"
                                               class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary"
                                                        v-on:click="queryAuditUsers()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th class="text-center">审核ID</th>
                                        <th class="text-center">用户ID</th>
                                        <th class="text-center">用户名称</th>
                                        <th class="text-center">审核环节</th>
                                        <th class="text-center">流程对象</th>
                                        <th class="text-center">操作</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="auditUser in chooseAuditUserInfo.auditUsers">
                                        <td class="text-center">{{auditUser.auditUserId}}</td>
                                        <td class="text-center">{{auditUser.userId}}</td>
                                        <td class="text-center">{{auditUser.userName}}</td>
                                        <td class="text-center">{{auditUser.auditLink}}</td>
                                        <td class="text-center">{{auditUser.objCode}}</td>

                                        <td>
                                            <button class="btn btn-primary btn-xs"
                                                    v-on:click="chooseAuditUser(auditUser)">选择
                                            </button>
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
            props: {"emitChooseAuditUser":"true","emitLoadData":"true"},
            components: {
                
            },
            data () {
                return {"chooseAuditUserInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
        })()(function () {
            this.$vc.on('chooseAuditUser', 'openChooseAuditUserModel', function (_param) {
                $('#chooseAuditUserModel').modal('show');
                this._refreshChooseAuditUserInfo();
                this._loadAllAuditUserInfo(1, 10, '');
            });
        })()   
            },
            methods: {
                _loadAllAuditUserInfo:function (_page, _row, _name) {
                var param = {
                    params: {
                        page: _page,
                        row: _row,
                        communityId: this.$vc.getCurrentCommunity().communityId,
                        name: _name
                    }
                };

                //发送get请求
                this.$vc.http.get('chooseAuditUser',
                    'list',
                    param,
                    function (json) {
                        var _auditUserInfo = JSON.parse(json);
                        this.chooseAuditUserInfo.auditUsers = _auditUserInfo.auditUsers;
                    }, function () {
                        console.log('请求失败处理');
                    }
                );
            },chooseAuditUser:function (_auditUser) {
                if (_auditUser.hasOwnProperty('name')) {
                    _auditUser.auditUserName = _auditUser.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseAuditUser, 'chooseAuditUser', _auditUser);
                this.$vc.emit(this.$vc._thisemitLoadData, 'listAuditUserData', {
                    auditUserId: _auditUser.auditUserId
                });
                $('#chooseAuditUserModel').modal('hide');
            },queryAuditUsers:function () {
                this._loadAllAuditUserInfo(1, 10, this.chooseAuditUserInfo._currentAuditUserName);
            },_refreshChooseAuditUserInfo:function () {
                this.chooseAuditUserInfo._currentAuditUserName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    