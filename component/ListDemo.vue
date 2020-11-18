
        <template>
            <div id="component" >
    <!-- class="wrapper wrapper-content animated fadeInRight ecommerce" -->
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>DEMO信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddOwnerModal(-1)">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加DEMO
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>用例ID</th>
                            <th data-hide="phone">名称</th>
                            <th data-hide="phone">用例值</th>
                            <th data-hide="phone">备注</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="demo in listDemoInfo.demos">
                            <td>
                                {{demo.demoId}}
                            </td>

                            <td>
                                {{demo.demoName}}
                            </td>

                            <td>
                                {{demo.demoValue}}
                            </td>
                            <td>
                                {{demo.demoRemark}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditOwnerModel(owner)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDelOwnerModel(owner)">删除</button>
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

    <vc:create
            name="addDemo"
    ></vc:create>
    <vc:create
            name="addDemo"
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
                return {"listDemoInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listOwnerData(DEFAULT_PAGE,DEFAULT_ROWS);
        })()(function(){
            this.$vc.on('listDemo','listDemoData',function(){
                this._listOwnerData(DEFAULT_PAGE,DEFAULT_ROWS);
            });
            this.$vc.on('pagination','page_event',function(_currentPage){
                this._listOwnerData(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listOwnerData:function(_page,_row){
                var param = {
                    params:{
                        page:_page,
                        row:_row
                    }
                }

               //发送get请求
               this.$vc.http.get('listDemo',
                            'list',
                             param,
                             function(json,res){
                                var listDemoDate =JSON.parse(json);
                                this.listDemoInfo.total = listDemoDate[0].total;
                                this.listDemoInfo.records = listDemoDate[0].records;
                                this.listDemoInfo.demos = listDemoDate;

                                this.$vc.emit('pagination','init',{
                                    total:this.listDemoInfo.records,
                                    currentPage:_page
                                });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );

            },_openAddOwnerModal:function(){ //打开添加框
                this.$vc.emit('addDemo','openAddDemoModal',-1);
            },_openDelOwnerModel:function(_owner){ // 打开删除对话框
                this.$vc.emit('deleteOwner','openOwnerModel',_owner);
            },_openEditOwnerModel:function(_owner){
                this.$vc.emit('editOwner','openEditOwnerModal',_owner);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    