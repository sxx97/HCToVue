
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{serviceProvideManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入提供ID"
                                       v-model="serviceProvideManageInfo.conditions.id" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入服务编码"
                                       v-model="serviceProvideManageInfo.conditions.serviceCode" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入服务名称"
                                       v-model="serviceProvideManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryServiceProvideMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="serviceProvideManageInfo.moreCondition == true">
                            <select class="custom-select" v-model="serviceProvideManageInfo.conditions.queryModel">
                                <option selected value="">请选择实现方式</option>
                                <option value="1">sql方式</option>
                                <option value="3">java方式</option>
                                <option value="2">存储过程方式</option>
                            </select></div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>服务提供信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddServiceProvideModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            开发服务
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">提供ID</th>
                            <th class="text-center">服务名称</th>
                            <th class="text-center">服务编码</th>
                            <th class="text-center">参数</th>
                            <th class="text-center">实现方式</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="serviceProvide in serviceProvideManageInfo.serviceProvides">
                            <td class="text-center">{{serviceProvide.id}}</td>
                            <td class="text-center">{{serviceProvide.name}}</td>
                            <td class="text-center">{{serviceProvide.serviceCode}}</td>
                            <td class="text-center">{{serviceProvide.params}}</td>
                            <td class="text-center">{{serviceProvide.queryModel}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditServiceProvideModel(serviceProvide)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteServiceProvideModel(serviceProvide)">删除
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
                    <vc:create name="pagination"></vc:create>
                </div>
            </div>
        </div>
    </div>


   <!-- <vc:create name="addServiceProvide"
               callBackListener=""
               callBackFunction=""
    ></vc:create>-->
    <vc:create name="editServiceProvide"></vc:create>
    <vc:create name="deleteServiceProvide"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import EditServiceProvide from '@/component/EditServiceProvide.vue';import DeleteServiceProvide from '@/component/DeleteServiceProvide.vue';



            const OWNER_TYPE = {
                OWNER: '1001',
                TENANT: '1003'
            };
            // 考核类型
            const ASSESSMENT_TYPE = {
                BUSINESS: 2,
                COMMON: 1,
                SYSTEM: 3,
            };
            
            // 删除时的类型
            const DELETE_TYPE = {
                TABLE: 1, // 删除通用考核表
                BUSINESS_ITEM: 2,  // 删除业务考核项
                COMMON_ITEM: 3, // 删除通用考核项
            }
            // 考核人员
            const ASSESSMENT_OBJECT_TYPE = {
                STAFF: 1,
                SUPERVISOR: 2,
                MANAGER: 3,
            }
            
            const AUTO_ASSESSMENT_TYPE = {
                INSPECTION: 1,
                WORK_ORDER: 2,
                ATTENDANCE: 3,
            }
            
            // 考核项目
            const ASSESSMENT_ITEM_TYPE = {
                COMMON_ITEM: 1,
                BUSINESS_ITEM: 2,
            }
            
            const DEFAULT_PAGE = 1;
            const DEFAULT_ROWS = 10;

            
            export default {
                props: {},
                components: {
                    Pagination,EditServiceProvide,DeleteServiceProvide
                },
                data () {
                    return {"serviceProvideManageInfo":{"serviceProvides":[],"total":0,"records":1,"moreCondition":false,"name":"","conditions":{"id":"","serviceCode":"","name":"","queryModel":""}}}    
                },
                mounted() {
                (() =>{
            this.serviceProvideManageInfo.conditions.serviceCode = this.$vc.getParam("serviceCode");
            this._listServiceProvides(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{
            
            this.$vc.on('serviceProvideManage','listServiceProvide',(_param) =>{
                  this._listServiceProvides(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listServiceProvides(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listServiceProvides:function(_page, _rows){

                this.serviceProvideManageInfo.conditions.page = _page;
                this.serviceProvideManageInfo.conditions.row = _rows;
                var param = {
                    params:this.serviceProvideManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('serviceProvideManage',
                            'list',
                             param,
                             (json,res) =>{
                                var _serviceProvideManageInfo=JSON.parse(json);
                                this.serviceProvideManageInfo.total = _serviceProvideManageInfo.total;
                                this.serviceProvideManageInfo.records = _serviceProvideManageInfo.records;
                                this.serviceProvideManageInfo.serviceProvides = _serviceProvideManageInfo.serviceProvides;
                                this.$vc.emit('pagination','init',{
                                     total:this.serviceProvideManageInfo.records,
                                     currentPage:_page
                                 });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAddServiceProvideModal:function(){
                //this.$vc.emit('addServiceProvide','openAddServiceProvideModal',{});
                this.$vc.jumpToPage("/flow/devServiceProvideFlow");
            },_openEditServiceProvideModel:function(_serviceProvide){
                this.$vc.emit('editServiceProvide','openEditServiceProvideModal',_serviceProvide);
            },_openDeleteServiceProvideModel:function(_serviceProvide){
                this.$vc.emit('deleteServiceProvide','openDeleteServiceProvideModal',_serviceProvide);
            },_queryServiceProvideMethod:function(){
                this._listServiceProvides(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function(){
                if(this.serviceProvideManageInfo.moreCondition){
                    this.serviceProvideManageInfo.moreCondition = false;
                }else{
                    this.serviceProvideManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    