
        <template>
            <div id = "chooseApplicationKeyModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseApplicationKeyModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseApplicationKeyModelLabel">选择钥匙申请</h3>
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
                                        <input placeholder="输入钥匙申请名称" type="text" v-model="chooseApplicationKeyInfo._currentApplicationKeyName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryApplicationKeys()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">钥匙申请ID</th>
                            <th class="text-center">姓名</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">用户类型</th>
                            <th class="text-center">性别</th>
                            <th class="text-center">年龄</th>
                            <th class="text-center">身份证号</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="applicationKey in chooseApplicationKeyInfo.applicationKeys">
                                                                        <td class="text-center">{{applicationKey.applicationKeyId}}</td>
                            <td class="text-center">{{applicationKey.name}}</td>
                            <td class="text-center">{{applicationKey.tel}}</td>
                            <td class="text-center">{{applicationKey.typeCd}}</td>
                            <td class="text-center">{{applicationKey.sex}}</td>
                            <td class="text-center">{{applicationKey.age}}</td>
                            <td class="text-center">{{applicationKey.idCard}}</td>
                            <td class="text-center">{{applicationKey.startTime}}</td>
                            <td class="text-center">{{applicationKey.endTime}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseApplicationKey(applicationKey)">选择</button>
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
            props: {"emitChooseApplicationKey":"true","emitLoadData":"true"},
            components: {
                
            },
            data () {
                return {"chooseApplicationKeyInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
            this.$vc.on('chooseApplicationKey','openChooseApplicationKeyModel',function(_param){
                $('#chooseApplicationKeyModel').modal('show');
                this._refreshChooseApplicationKeyInfo();
                this._loadAllApplicationKeyInfo(1,10,'');
            });
        })()   
            },
            methods: {
                _loadAllApplicationKeyInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseApplicationKey',
                            'list',
                             param,
                             function(json){
                                var _applicationKeyInfo = JSON.parse(json);
                                this.chooseApplicationKeyInfo.applicationKeys = _applicationKeyInfo.applicationKeys;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseApplicationKey:function(_applicationKey){
                if(_applicationKey.hasOwnProperty('name')){
                     _applicationKey.applicationKeyName = _applicationKey.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseApplicationKey,'chooseApplicationKey',_applicationKey);
                this.$vc.emit(this.$vc._thisemitLoadData,'listApplicationKeyData',{
                    applicationKeyId:_applicationKey.applicationKeyId
                });
                $('#chooseApplicationKeyModel').modal('hide');
            },queryApplicationKeys:function(){
                this._loadAllApplicationKeyInfo(1,10,this.chooseApplicationKeyInfo._currentApplicationKeyName);
            },_refreshChooseApplicationKeyInfo:function(){
                this.chooseApplicationKeyInfo._currentApplicationKeyName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    