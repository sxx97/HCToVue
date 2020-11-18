
        <template>
            <div id="searchOwnerModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="searchOwnerModelLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="searchOwnerModelLabel">选择业主</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <!--<div class="col-sm-7 m-b-xs">
                                    <div class="input-group">
                                        <input placeholder="输入业主ID" type="text"
                                               v-model="searchOwnerInfo._currentOwnerId"
                                               class="form-control form-control-sm">
                                    </div>
                                </div>-->
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入业主名称" type="text"
                                               v-model="searchOwnerInfo._currentOwnerName"
                                               class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary"
                                                        v-on:click="searchOwners()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <!--<th>业主ID</th>-->
                                        <th>名称</th>
                                        <th>性别</th>
                                        <th>年龄</th>
                                        <th>联系方式</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="owner in searchOwnerInfo.owners">
                                        <!--<td>
                                            {{owner.memberId}}
                                        </td>-->

                                        <td>
                                            {{owner.name}}
                                        </td>
                                        <td>
                                            {{owner.sex == 0 ? '男' : '女'}}
                                        </td>
                                        <td>
                                            {{owner.age}}
                                        </td>
                                        <td>
                                            {{owner.link}}
                                        </td>
                                        <td>
                                            <button class="btn btn-primary btn-xs" v-on:click="chooseOwner(owner)">选择
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
            props: {},
            components: {
                
            },
            data () {
                return {"searchOwnerInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('searchOwner','openSearchOwnerModel',function(_param){
                $('#searchOwnerModel').modal('show');
                this._refreshSearchOwnerData();
                this._loadAllOwnerInfo(1,10);
            });
        })()   
            },
            methods: {
                _loadAllOwnerInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name,
                        ownerId:this.searchOwnerInfo._currentOwnerId,
                        ownerTypeCd:'1001'
                    }
                };

                //发送get请求
                this.$vc.http.get('searchOwner',
                    'listOwner',
                    param,
                    function(json){
                        var _ownerInfo = JSON.parse(json);
                        this.searchOwnerInfo.owners = _ownerInfo.owners;
                    },function(){
                        console.log('请求失败处理');
                    }
                );
            },chooseOwner:function(_owner){
                this.$vc.emit('visitForOwner','ownerInfo',_owner);
                // this.$vc.emit(this.$vc._thisemitLoadData,'listOwnerData',{
                //     ownerId:_owner.ownerId
                // });
                $('#searchOwnerModel').modal('hide');
            },searchOwners:function(){
                this._loadAllOwnerInfo(1,10,this.searchOwnerInfo._currentOwnerName);
            },_refreshSearchOwnerData:function(){
                this.searchOwnerInfo._currentOwnerName = "";
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    