
        <template>
            <div id="component" >
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>订单类型信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddBusinessTypeModal(-1)">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加订单类型
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>订单ID</th>
                            <th data-hide="phone">订单类型编码</th>
                            <th data-hide="phone">订单类型名称</th>
                            <th data-hide="phone">订单类型说明</th>
                            <th class="text-right">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="BusTypes in listBusinessTypeInfo.BusinessType">
                            <td>
                                {{BusTypes.id}}
                            </td>
                            <td>
                                {{BusTypes.businessTypeCd}}
                            </td>
                            <td>
                                {{BusTypes.name}}
                            </td>
                            <td>
                                {{BusTypes.description}}
                            </td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditBusinessTypeModel(owner)">修改</button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDelBusinessTypeModel(owner)">删除</button>
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

   <!-- <vc:create
            name="addOwnerRoomBinding"
            notifyLoadDataComponentName="listOwner"
    ></vc:create>
    <vc:create
            name="editOwner"
            notifyLoadDataComponentName="listOwner"

    ></vc:create>
    <vc:create name="deleteBusinessType"
    ></vc:create>-->

</div>
        </template>
        <script>
            import Pagination from './Pagination.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"listBusinessTypeInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listBusinessTypeData(DEFAULT_PAGE,DEFAULT_ROWS);
        })()(function(){
            this.$vc.on('listOwner','listOwnerData',function(){
                this._listBusinessTypeData(DEFAULT_PAGE,DEFAULT_ROWS);
            });
            this.$vc.on('pagination','page_event',function(_currentPage){
                this._listBusinessTypeData(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listBusinessTypeData:function(_page,_row){
                var param = {
                    params:{
                        page:_page,
                        row:_row
                    }
                }

               //发送get请求
               this.$vc.http.get('listBusinessType',
                            'list',
                             param,
                             function(json,res){
                                var listBusinessTypeData =JSON.parse(json);

                                this.listBusinessTypeInfo.BusinessType = listBusinessTypeData;

                                this.$vc.emit('pagination','init',{
                                    total:this.listBusinessTypeInfo.records,
                                    currentPage:_page
                                });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );

            },_openAddBusinessTypeModal:function(){ //打开添加框
                this.$vc.emit('addBusinessType','openAddBusinessTypeModal',-1);
            },_openDelBusinessTypeModel:function(_owner){ // 打开删除对话框
                this.$vc.emit('deleteBusinessType','openBusinessTypeModel',_owner);
            },_openEditBusinessTypeModel:function(_owner){
                this.$vc.emit('editBusinessType','openEditBusinessTypeModal',_owner);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    