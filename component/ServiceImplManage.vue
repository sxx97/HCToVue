
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{serviceImplManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入业务类型"
                                       v-model="serviceImplManageInfo.conditions.businessTypeCd" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入业务名称" v-model="serviceImplManageInfo.conditions.name"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <select class="custom-select" v-model="serviceImplManageInfo.conditions.invokeType">
                                <option selected value="">请选择调用方式</option>
                                <option value="1">微服务POST方式</option>
                                <option value="2">webservice方式</option>
                                <option value="3">http post方式</option>
                            </select>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryServiceImplMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="serviceImplManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入kafka主题"
                                       v-model="serviceImplManageInfo.conditions.messageTopic" class=" form-control">
                            </div>
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
                    <h5>服务实现信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddServiceImplModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>

                            <th class="text-center">服务实现ID</th>
                            <th class="text-center">业务类型</th>
                            <th class="text-center">业务名称</th>
                            <th class="text-center">调用类型</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="serviceImpl in serviceImplManageInfo.serviceImpls">

                            <td class="text-center">{{serviceImpl.serviceBusinessId}}</td>
                            <td class="text-center">{{serviceImpl.businessTypeCd}}</td>
                            <td class="text-center">{{serviceImpl.name}}</td>
                            <td class="text-center">{{serviceImpl.invokeType}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditServiceImplModel(serviceImpl)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteServiceImplModel(serviceImpl)">删除
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


    <vc:create name="addServiceImpl"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <EditServiceImpl name="editServiceImpl"></EditServiceImpl>
    <DeleteServiceImpl name="deleteServiceImpl"></DeleteServiceImpl>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditServiceImpl from './EditServiceImpl.vue';import DeleteServiceImpl from './DeleteServiceImpl.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"serviceImplManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listServiceImpls(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            
            this.$vc.on('serviceImplManage','listServiceImpl',function(_param){
                  this._listServiceImpls(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listServiceImpls(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listServiceImpls:function(_page, _rows){

                this.serviceImplManageInfo.conditions.page = _page;
                this.serviceImplManageInfo.conditions.row = _rows;
                var param = {
                    params:this.serviceImplManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('serviceImplManage',
                            'list',
                             param,
                             function(json,res){
                                var _serviceImplManageInfo=JSON.parse(json);
                                this.serviceImplManageInfo.total = _serviceImplManageInfo.total;
                                this.serviceImplManageInfo.records = _serviceImplManageInfo.records;
                                this.serviceImplManageInfo.serviceImpls = _serviceImplManageInfo.serviceImpls;
                                this.$vc.emit('pagination','init',{
                                     total:this.serviceImplManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAddServiceImplModal:function(){
                this.$vc.emit('addServiceImpl','openAddServiceImplModal',{});
            },_openEditServiceImplModel:function(_serviceImpl){
                this.$vc.emit('editServiceImpl','openEditServiceImplModal',_serviceImpl);
            },_openDeleteServiceImplModel:function(_serviceImpl){
                this.$vc.emit('deleteServiceImpl','openDeleteServiceImplModal',_serviceImpl);
            },_queryServiceImplMethod:function(){
                this._listServiceImpls(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function(){
                if(this.serviceImplManageInfo.moreCondition){
                    this.serviceImplManageInfo.moreCondition = false;
                }else{
                    this.serviceImplManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    