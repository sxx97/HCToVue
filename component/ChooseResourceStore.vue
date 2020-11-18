
        <template>
            <div id = "chooseResourceStoreModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseResourceStoreModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseResourceStoreModelLabel">选择物品管理</h3>
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
                                        <input placeholder="输入物品管理名称" type="text" v-model="chooseResourceStoreInfo._currentResourceStoreName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryResourceStores()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <th class="text-center">物品ID</th>
                            <th class="text-center">物品名称</th>
                            <th class="text-center">物品编码</th>
                            <th class="text-center">物品价格</th>
                            <th class="text-center">物品库存</th>
                            <th class="text-center">描述</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="resourceStore in chooseResourceStoreInfo.resourceStores">
                                                                        <td class="text-center">{{resourceStore.resId}}</td>
                            <td class="text-center">{{resourceStore.resName}}</td>
                            <td class="text-center">{{resourceStore.resCode}}</td>
                            <td class="text-center">{{resourceStore.price}}</td>
                            <td class="text-center">{{resourceStore.stock}}</td>
                            <td class="text-center">{{resourceStore.description}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseResourceStore(resourceStore)">选择</button>
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
            props: {"emitChooseResourceStore":"false","emitLoadData":"false"},
            components: {
                
            },
            data () {
                return {"chooseResourceStoreInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
            this.$vc.on('chooseResourceStore','openChooseResourceStoreModel',function(_param){
                $('#chooseResourceStoreModel').modal('show');
                this._refreshChooseResourceStoreInfo();
                this._loadAllResourceStoreInfo(1,10,'');
            });
        })()   
            },
            methods: {
                _loadAllResourceStoreInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseResourceStore',
                            'list',
                             param,
                             function(json){
                                var _resourceStoreInfo = JSON.parse(json);
                                this.chooseResourceStoreInfo.resourceStores = _resourceStoreInfo.resourceStores;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },chooseResourceStore:function(_resourceStore){
                if(_resourceStore.hasOwnProperty('name')){
                     _resourceStore.resourceStoreName = _resourceStore.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseResourceStore,'chooseResourceStore',_resourceStore);
                this.$vc.emit(this.$vc._thisemitLoadData,'listResourceStoreData',{
                    resourceStoreId:_resourceStore.resourceStoreId
                });
                $('#chooseResourceStoreModel').modal('hide');
            },queryResourceStores:function(){
                this._loadAllResourceStoreInfo(1,10,this.chooseResourceStoreInfo._currentResourceStoreName);
            },_refreshChooseResourceStoreInfo:function(){
                this.chooseResourceStoreInfo._currentResourceStoreName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    