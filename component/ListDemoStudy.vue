
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>demo学习信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddDemoStudyModal()">
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
                        <tr v-for="demo in listDemoStudyInfo.demos">
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
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditDemoStudyModel(demo)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDelDemoStudyModel(demo)">删除</button>
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

    <!--<AddFloor name="addFloor"></AddFloor>
    <EditFloor name="editFloor"></EditFloor>
    <DeleteFloor name="deleteFloor"></DeleteFloor>-->

</div>
        </template>
        <script>
            import Pagination from './Pagination.vue';import AddFloor from './AddFloor.vue';import EditFloor from './EditFloor.vue';import DeleteFloor from './DeleteFloor.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"listDemoStudyInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listDemoStudyData(DEFAULT_PAGE,DEFAULT_ROWS);
        })()(function(){
            /*this.$vc.on('listFloor','listFloorData',function(){
                this._listFloorData(DEFAULT_PAGE,DEFAULT_ROWS);
            });*/
            this.$vc.on('pagination','page_event',function(_currentPage){
                this._listDemoStudyData(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listDemoStudyData:function(_page,_rows){
                var param = {
                    params:{
                        page:_page,
                        row:_rows,
                        communityId:this.$vc.getCurrentCommunity().communityId
                    }
                }

               //发送get请求
               this.$vc.http.get('listDemoStudy',
                            'list',
                             param,
                             function(json,res){
                                var listData =JSON.parse(json);

                                this.listDemoStudyInfo.total = listData[0].total;
                                this.listDemoStudyInfo.records = listData[0].records;
                                this.listDemoStudyInfo.demos = listData;

                                this.$vc.emit('pagination','init',{
                                    total:this.listDemoStudyInfo.records,
                                    currentPage:_page
                                });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );

            },_openAddDemoStudyModal:function(){ //打开添加框
                //this.$vc.emit('addFloor','openAddFloorModal',{});
            },_openDelDemoStudyModel:function(_floor){ // 打开删除对话框
                //this.$vc.emit('deleteFloor','openFloorModel',_floor);
            },_openEditDemoStudyModel:function(_floor){
                //this.$vc.emit('editFloor','openEditFloorModal',_floor);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    