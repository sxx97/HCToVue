
        <template>
            <div id = "chooseServiceProvideModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseServiceProvideModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseServiceProvideModelLabel">选择服务提供</h3>
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
                                        <input placeholder="输入服务提供名称" type="text" v-model="chooseServiceProvideInfo._currentServiceProvideName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryServiceProvides()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">提供ID</th>
                            <th class="text-center">服务名称</th>
                            <th class="text-center">服务编码</th>
                            <th class="text-center">参数</th>
                            <th class="text-center">实现方式</th>
                            <th class="text-center">sql</th>
                            <th class="text-center">输出模板</th>
                            <th class="text-center">存储过程</th>
                            <th class="text-center">java</th>
                            <th class="text-center">描述</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="serviceProvide in chooseServiceProvideInfo.serviceProvides">
                                                                        <td class="text-center">{{serviceProvide.id}}</td>
                            <td class="text-center">{{serviceProvide.name}}</td>
                            <td class="text-center">{{serviceProvide.serviceCode}}</td>
                            <td class="text-center">{{serviceProvide.params}}</td>
                            <td class="text-center">{{serviceProvide.queryModel}}</td>
                            <td class="text-center">{{serviceProvide.sql}}</td>
                            <td class="text-center">{{serviceProvide.template}}</td>
                            <td class="text-center">{{serviceProvide.proc}}</td>
                            <td class="text-center">{{serviceProvide.javaScript}}</td>
                            <td class="text-center">{{serviceProvide.remark}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseServiceProvide(serviceProvide)">选择</button>
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
            props: {"emitChooseServiceProvide":"true","emitLoadData":"true"},
            components: {
                
            },
            data () {
                return {"chooseServiceProvideInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
            this.$vc.on('chooseServiceProvide','openChooseServiceProvideModel',function(_param){
                $('#chooseServiceProvideModel').modal('show');
                this._refreshChooseServiceProvideInfo();
                this._loadAllServiceProvideInfo(1,10,'');
            });
        })()   
            },
            methods: {
                _loadAllServiceProvideInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseServiceProvide',
                            'list',
                             param,
                             function(json){
                                var _serviceProvideInfo = JSON.parse(json);
                                this.chooseServiceProvideInfo.serviceProvides = _serviceProvideInfo.serviceProvides;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseServiceProvide:function(_serviceProvide){
                if(_serviceProvide.hasOwnProperty('name')){
                     _serviceProvide.serviceProvideName = _serviceProvide.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseServiceProvide,'chooseServiceProvide',_serviceProvide);
                this.$vc.emit(this.$vc._thisemitLoadData,'listServiceProvideData',{
                    serviceProvideId:_serviceProvide.serviceProvideId
                });
                $('#chooseServiceProvideModel').modal('hide');
            },queryServiceProvides:function(){
                this._loadAllServiceProvideInfo(1,10,this.chooseServiceProvideInfo._currentServiceProvideName);
            },_refreshChooseServiceProvideInfo:function(){
                this.chooseServiceProvideInfo._currentServiceProvideName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    