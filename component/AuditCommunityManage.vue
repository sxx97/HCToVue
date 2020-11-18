
        <template>
            <div id="component">

    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>未审核管理区</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>管理区ID</th>
                            <th>管理区名称</th>
                            <th>管理区地址</th>
                            <th>附近地标</th>
                            <th>城市编码</th>
                            <th>管理区维度</th>
                            <th>管理区经度</th>
                            <th>状态</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="community in auditCommunityManageInfo.communitys">
                            <td>{{community.communityId}}</td>
                            <td>{{community.name}}</td>
                            <td>{{community.address}}</td>
                            <td>{{community.nearbyLandmarks}}</td>
                            <td>{{community.cityCode}}</td>
                            <td>{{community.mapX}}</td>
                            <td>{{community.mapY}}</td>
                            <td>{{community.stateName}}</td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openAuditCommunityModal(community)">审核
                                    </button>
                                </div>


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
    <vc:create name="audit"
               callBackListener="auditCommunityManage"
               callBackFunction="notifyAuditInfo"
    ></vc:create>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"auditCommunityManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            this.$vc.on('auditCommunityManage','listCommunity',function(_param){
                  this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('auditCommunityManage','notifyAuditInfo',function(_auditInfo){
                  this._auditCommunityState(_auditInfo);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listCommunitys(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listCommunitys:function(_page, _rows){
                var param = {
                    params:{
                        page:_page,
                        row:_rows
                    }

               }
               //发送get请求
               this.$vc.http.get('auditCommunityManage',
                            'list',
                             param,
                             function(json,res){
                                var _auditCommunityManageInfo=JSON.parse(json);
                                this.auditCommunityManageInfo.total = _auditCommunityManageInfo.total;
                                this.auditCommunityManageInfo.records = _auditCommunityManageInfo.records;
                                this.auditCommunityManageInfo.communitys = _auditCommunityManageInfo.communitys;
                                this.$vc.emit('pagination','init',{
                                    total:this.auditCommunityManageInfo.records,
                                    currentPage:_page
                                });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAuditCommunityModal:function(_community){
                this.auditCommunityManageInfo.currentCommunityId = _community.communityId;
                this.$vc.emit('audit','openAuditModal',{});
            },_auditCommunityState:function(_auditInfo){
                _auditInfo.communityId = this.auditCommunityManageInfo.currentCommunityId;
                this.$vc.http.post(
                    'auditCommunityManage',
                    'audit',
                    JSON.stringify(_auditInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                             this._listCommunitys(DEFAULT_PAGE, DEFAULT_ROWS);
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    