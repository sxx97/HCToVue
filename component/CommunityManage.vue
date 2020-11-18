
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-2">
                            <div class="form-group">
                                <input type="text" placeholder="请输入管理区ID"
                                       v-model="communityManageInfo.conditions.communityId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入管理区名称"
                                       v-model="communityManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <vc:create name="areaSelect"
                                       callBackListener="communityManage"
                                       callBackFunction="notifyArea"
                                       namespace="communityManage"
                            ></vc:create>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryCommunityMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>管理区信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddCommunityModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加管理区
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>管理区ID</th>
                            <th>管理区名称</th>
                            <!--<th>管理区地址</th>-->
                            <th>附近地标</th>
                            <th>城市编码</th>
                            <th>状态</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="community in communityManageInfo.communitys">
                            <td>{{community.communityId}}</td>
                            <td>{{community.name}}</td>
                            <!--<td>{{community.address}}</td>-->
                            <td>{{community.nearbyLandmarks}}</td>
                            <td>{{community.cityName}}</td>
                            <td>{{community.stateName}}</td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-bind:disabled="community.state == '1100' && communityManageInfo.storeTypeCd != '800900000001'"
                                            v-on:click="_openEditCommunityModel(community)">修改
                                    </button>
                                </div>
                                <div class="btn-group"
                                     v-if="community.state != '1000' && communityManageInfo.storeTypeCd == '800900000001'">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openRecallCommunityModel(community)">审核撤回
                                    </button>
                                </div>
                            </td>

                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="7">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <!-- 分页 -->
                    <Pagination name="pagination"></Pagination>
                </div>
            </div>
        </div>
    </div>

    <AddCommunity name="addCommunity"></AddCommunity>
    <EditCommunity name="editCommunity"></EditCommunity>
    <DeleteCommunity name="deleteCommunity"></DeleteCommunity>
    <RecallAuditFinishCommunity name="recallAuditFinishCommunity"></RecallAuditFinishCommunity>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import AddCommunity from './AddCommunity.vue';import EditCommunity from './EditCommunity.vue';import DeleteCommunity from './DeleteCommunity.vue';import RecallAuditFinishCommunity from './RecallAuditFinishCommunity.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"communityManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            this.$vc.on('communityManage','listCommunity',function(_param){
                  this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on("communityManage","communityManage","notifyArea",function(_param){
                this.communityManageInfo.conditions.cityCode = _param.selectArea;
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listCommunitys(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listCommunitys:function(_page, _rows){

               this.communityManageInfo.conditions.page = _page;
               this.communityManageInfo.conditions.row = _rows;
               var _param = {
                    params:this.communityManageInfo.conditions
               }
               //发送get请求
               this.$vc.http.get('communityManage',
                            'list',
                             _param,
                             function(json,res){
                                var _communityManageInfo=JSON.parse(json);
                                this.communityManageInfo.total = _communityManageInfo.total;
                                this.communityManageInfo.records = _communityManageInfo.records;
                                this.communityManageInfo.communitys = _communityManageInfo.communitys;
                                this.$vc.emit('pagination','init',{
                                    total:this.communityManageInfo.records,
                                    currentPage:_page
                                });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAddCommunityModal:function(){
                this.$vc.emit('addCommunity','openAddCommunityModal',{});
            },_openEditCommunityModel:function(_community){
                this.$vc.emit('editCommunity','openEditCommunityModal',_community);
            },_openDeleteCommunityModel:function(_community){
                this.$vc.emit('deleteCommunity','openDeleteCommunityModal',_community);
            },_openRecallCommunityModel:function(_community){
                this.$vc.emit('recallAuditFinishCommunity','openRecallAuditFinishCommunityModal',_community);
            },_queryCommunityMethod:function(){
                  this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    