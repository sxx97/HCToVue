
        <template>
            <div id = "chooseServiceImplModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseServiceImplModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseServiceImplModelLabel">选择服务实现</h3>
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
                                        <input placeholder="输入服务实现名称" type="text" v-model="chooseServiceImplInfo._currentServiceImplName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryServiceImpls()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">服务实现ID</th>
                            <th class="text-center">服务实现ID</th>
                            <th class="text-center">业务类型</th>
                            <th class="text-center">业务名称</th>
                            <th class="text-center">调用类型</th>
                            <th class="text-center">调用地址</th>
                            <th class="text-center">kafka主题</th>
                            <th class="text-center">超时时间</th>
                            <th class="text-center">重试次数</th>
                            <th class="text-center">描述</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="serviceImpl in chooseServiceImplInfo.serviceImpls">
                                                                        <td class="text-center">{{serviceImpl.serviceBusinessId}}</td>
                            <td class="text-center">{{serviceImpl.serviceBusinessId}}</td>
                            <td class="text-center">{{serviceImpl.businessTypeCd}}</td>
                            <td class="text-center">{{serviceImpl.name}}</td>
                            <td class="text-center">{{serviceImpl.invokeType}}</td>
                            <td class="text-center">{{serviceImpl.url}}</td>
                            <td class="text-center">{{serviceImpl.messageTopic}}</td>
                            <td class="text-center">{{serviceImpl.timeout}}</td>
                            <td class="text-center">{{serviceImpl.retryCount}}</td>
                            <td class="text-center">{{serviceImpl.description}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseServiceImpl(serviceImpl)">选择</button>
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
            props: {"emitChooseServiceImpl":"true","emitLoadData":"true"},
            components: {
                
            },
            data () {
                return {"chooseServiceImplInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
            this.$vc.on('chooseServiceImpl','openChooseServiceImplModel',function(_param){
                $('#chooseServiceImplModel').modal('show');
                this._refreshChooseServiceImplInfo();
                this._loadAllServiceImplInfo(1,10,'');
            });
        })()   
            },
            methods: {
                _loadAllServiceImplInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseServiceImpl',
                            'list',
                             param,
                             function(json){
                                var _serviceImplInfo = JSON.parse(json);
                                this.chooseServiceImplInfo.serviceImpls = _serviceImplInfo.serviceImpls;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseServiceImpl:function(_serviceImpl){
                if(_serviceImpl.hasOwnProperty('name')){
                     _serviceImpl.serviceImplName = _serviceImpl.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseServiceImpl,'chooseServiceImpl',_serviceImpl);
                this.$vc.emit(this.$vc._thisemitLoadData,'listServiceImplData',{
                    serviceImplId:_serviceImpl.serviceImplId
                });
                $('#chooseServiceImplModel').modal('hide');
            },queryServiceImpls:function(){
                this._loadAllServiceImplInfo(1,10,this.chooseServiceImplInfo._currentServiceImplName);
            },_refreshChooseServiceImplInfo:function(){
                this.chooseServiceImplInfo._currentServiceImplName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    