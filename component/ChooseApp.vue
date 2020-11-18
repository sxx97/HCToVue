
        <template>
            <div id = "chooseAppModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseAppModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseAppModelLabel">选择应用</h3>
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
                                        <input placeholder="输入应用名称" type="text" v-model="chooseAppInfo._currentAppName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryApps()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>应用Id</th>
                                            <th>应用名称</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="app in chooseAppInfo.apps">
                                            <td>{{app.appId}}</td>
                                            <td>{{app.name}}</td>
                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseApp(app)">选择</button>
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
            props: {"emitChooseApp":"string","emitLoadData":"string"},
            components: {
                
            },
            data () {
                return {"chooseAppInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
        })()(function () {
            this.$vc.on('chooseApp', 'openChooseAppModel', function (_param) {
                console.log("打开业主成员界面")
                $('#chooseAppModel').modal('show');
                this._refreshChooseAppInfo();
                this._loadAllAppInfo(1, 10, '');
            });
        })()   
            },
            methods: {
                _loadAllAppInfo:function (_page, _row, _name) {
                var param = {
                    params: {
                        page: _page,
                        row: _row,

                        name: _name
                    }
                };

                //发送get请求
                this.$vc.http.get('chooseApp',
                    'list',
                    param,
                    function (json) {
                        var _appInfo = JSON.parse(json);
                        this.chooseAppInfo.apps = _appInfo.apps;
                    }, function () {
                        console.log('请求失败处理');
                    }
                );
            },chooseApp:function (_app) {
                _app.appName = _app.name;
                this.$vc.emit(this.$vc._thisemitChooseApp, 'chooseApp', _app);
                this.$vc.emit(this.$vc._thisemitLoadData, 'listAppData', {
                    appId: _app.appId
                });
                $('#chooseAppModel').modal('hide');
            },queryApps:function () {
                this._loadAllAppInfo(1, 10, this.chooseAppInfo._currentAppName);
            },_refreshChooseAppInfo:function () {
                this.chooseAppInfo._currentAppName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    