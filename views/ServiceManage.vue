
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                       <!-- <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">更多
                        </button>-->
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入服务名称"
                                       v-model="serviceManageInfo.conditions.serviceName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入服务编码"
                                       v-model="serviceManageInfo.conditions.serviceCode" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入调用地址"
                                       v-model="serviceManageInfo.conditions.serviceUrl" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryServiceMethod()"><i
                                    class="glyphicon glyphicon-search" ></i> 查询
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
                    <h5>服务信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddServiceModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            添加服务
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                           style="table-layout: fixed;word-break:break-all;"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">服务ID</th>
                            <th class="text-center">服务名称</th>
                            <th class="text-center">服务编码</th>
                            <th class="text-center">消息队列</th>
                            <th class="text-center">调用地址</th>
                            <th class="text-center">调用方式</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="service in serviceManageInfo.services">
                            <td class="text-center">{{service.serviceId}}</td>
                            <td class="text-center">{{service.name}}</td>
                            <td class="text-center">{{service.serviceCode}}</td>
                            <td class="text-center">{{service.messageQueueName}}</td>
                            <td class="text-center">{{service.url}}</td>
                            <td class="text-center">{{service.method}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditServiceModel(service)">
                                        修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteServiceModel(service)">
                                        删除
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

    <!--<vc:create name="chooseApp"
               emitChooseApp="serviceManage"
               emitLoadData="serviceManage"
    ></vc:create>-->


    <vc:create name="addService"
               callBackListener=""
               callBackFunction=""
    ></vc:create>
    <vc:create name="editService"></vc:create>
    <vc:create name="deleteService"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import AddService from '@/component/AddService.vue';import EditService from '@/component/EditService.vue';import DeleteService from '@/component/DeleteService.vue';



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
                    Pagination,AddService,EditService,DeleteService
                },
                data () {
                    return {"serviceManageInfo":{"services":[],"total":0,"records":1,"moreCondition":false,"name":"","conditions":{"appName":"","appId":"","serviceName":"","serviceCode":"","serviceUrl":""}}}    
                },
                mounted() {
                (() =>{
            //this._listServices(DEFAULT_PAGE, DEFAULT_ROWS);
            this._loadDataByParam();
        })()
(() =>{
            this.$vc.on('serviceManage','chooseApp',(_param) =>{
              this.$vc.copyObject(_param,this.serviceManageInfo.conditions);
            });

            this.$vc.on('serviceManage','listService',(_param) =>{
                  this._listServices(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',(_currentPage) =>{
                this._listServices(_currentPage,DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listServices:function(_page, _rows){

                this.serviceManageInfo.conditions.page = _page;
                this.serviceManageInfo.conditions.row = _rows;
                var param = {
                    params:this.serviceManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('serviceManage',
                            'list',
                             param,
                             (json,res) =>{
                                var _serviceManageInfo=JSON.parse(json);
                                this.serviceManageInfo.total = _serviceManageInfo.total;
                                this.serviceManageInfo.records = _serviceManageInfo.records;
                                this.serviceManageInfo.services = _serviceManageInfo.services;
                                this.$vc.emit('pagination','init',{
                                     total:this.serviceManageInfo.records,
                                     currentPage:_page
                                 });
                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },_openAddServiceModal:function(){
                this.$vc.emit('addService','openAddServiceModal',{});

            },_openEditServiceModel:function(_service){
                this.$vc.emit('editService','openEditServiceModal',_service);
            },_openDeleteServiceModel:function(_service){
                this.$vc.emit('deleteService','openDeleteServiceModal',_service);
            },_queryServiceMethod:function(){
                this._listServices(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function(){
                if(this.serviceManageInfo.moreCondition){
                    this.serviceManageInfo.moreCondition = false;
                }else{
                    this.serviceManageInfo.moreCondition = true;
                }
            },_openChooseAppMethod:function(){
                this.$vc.emit('chooseApp','openChooseAppModel',{});

            },_loadDataByParam:function(){
                this.serviceManageInfo.conditions.appId = this.$vc.getParam("appId");
                //如果 floodId 没有传 则，直接结束
                if(this.serviceManageInfo.conditions.appId == null
                    || this.serviceManageInfo.conditions.appId == undefined
                    || this.serviceManageInfo.conditions.appId == ''){
                    this._listServices(DEFAULT_PAGE, DEFAULT_ROWS);
                    return ;
                }

                var param = {
                    params:{
                        page:DEFAULT_PAGE,
                        row:DEFAULT_ROWS,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        appId:this.serviceManageInfo.conditions.appId
                    }
                }

                this.$vc.http.get(
                    'serviceManage',
                    'loadApp',
                     param,
                     (json,res) =>{
                        if(res.status == 200){
                            var _appInfo = JSON.parse(json);
                            var _tmpApp = _appInfo.apps[0];
                            this.serviceManageInfo.conditions.appName = _tmpApp.name;
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });

                this._listServices(DEFAULT_PAGE, DEFAULT_ROWS);


            },
                },
            }
    
        </script>
        <style>
            
        </style>
    