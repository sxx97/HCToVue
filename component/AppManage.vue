
        <template>
            <div id="component" >
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>应用信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddAppModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加应用
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>应用Id</th>
                            <th>应用名称</th>
<!--                            <th>秘钥</th>-->
                            <th>白名单</th>
                            <th>黑名单</th>
<!--                            <th>备注</th>-->
                            <th class="text-right">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="app in appManageInfo.apps">
                            <td>{{app.appId}}</td>
                            <td>{{app.name}}</td>
<!--                            <td>{{app.securityCode}}</td>-->
                            <td>{{app.whileListIp}}</td>
                            <td>{{app.blackListIp}}</td>
<!--                            <td>{{app.remark}}</td>-->
                            <td><div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditAppModel(app)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteAppModel(app)">删除</button>
                                </div></td>

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

    <vc:create name="addApp"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <EditApp name="editApp"></EditApp>
    <DeleteApp name="deleteApp"></DeleteApp>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditApp from './EditApp.vue';import DeleteApp from './DeleteApp.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"appManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listApps(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            this.$vc.on('appManage','listApp',function(_param){
                  this._listApps(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listApps(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listApps:function(_page, _rows){
                var param = {
                    params:{
                        page:_page,
                        row:_rows
                    }

               }
               //发送get请求
               this.$vc.http.get('appManage',
                            'list',
                             param,
                             function(json,res){
                                var _appManageInfo=JSON.parse(json);
                                this.appManageInfo.total = _appManageInfo.total;
                                this.appManageInfo.records = _appManageInfo.records;
                                this.appManageInfo.apps = _appManageInfo.apps;
                                this.$vc.emit('pagination','init',{
                                     total:this.appManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAddAppModal:function(){
                this.$vc.emit('addApp','openAddAppModal',{});
            },_openEditAppModel:function(_app){
                this.$vc.emit('editApp','openEditAppModal',_app);
            },_openDeleteAppModel:function(_app){
                this.$vc.emit('deleteApp','openDeleteAppModal',_app);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    