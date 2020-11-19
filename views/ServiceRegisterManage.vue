
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{serviceRegisterManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group input-group">
                                <input type="text" placeholder="请选择应用名称"
                                       v-model="serviceRegisterManageInfo.conditions.appName" class=" form-control">
                                <div class="input-group-prepend">
                                    <button type="button" class="btn btn-primary btn-sm"
                                            v-on:click="_openChooseAppMethod()"><i
                                            class="glyphicon glyphicon-search"></i> 选择
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入服务名称"
                                       v-model="serviceRegisterManageInfo.conditions.serviceName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入服务编码"
                                       v-model="serviceRegisterManageInfo.conditions.serviceCode" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryServiceRegisterMethod()">
                            <i class="glyphicon glyphicon-search" ></i> 查询
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4" v-if="serviceRegisterManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入调用地址"
                                       v-model="serviceRegisterManageInfo.conditions.serviceUrl" class=" form-control">
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
                    <h5>服务绑定信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                v-on:click="_openAddServiceRegisterModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            服务绑定
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
                            <th class="text-center">绑定ID</th>
                            <th class="text-center">应用ID</th>
                            <th class="text-center">应用名称</th>
                            <th class="text-center">服务ID</th>
                            <th class="text-center">服务名称</th>
                            <th class="text-center">服务编码</th>
                            <th class="text-center">订单类型</th>
                            <th class="text-center">操作</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="serviceRegister in serviceRegisterManageInfo.serviceRegisters">
                            <td class="text-center">{{serviceRegister.id}}</td>
                            <td class="text-center">{{serviceRegister.appId}}</td>
                            <td class="text-center">{{serviceRegister.appName}}</td>
                            <td class="text-center">{{serviceRegister.serviceId}}</td>
                            <td class="text-center">{{serviceRegister.serviceName}}</td>
                            <td class="text-center">{{serviceRegister.serviceCode}}</td>
                            <td class="text-center">{{serviceRegister.orderTypeCd}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditServiceRegisterModel(serviceRegister)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteServiceRegisterModel(serviceRegister)">删除
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

    <vc:create name="chooseApp"
               emitChooseApp="serviceRegisterManage"
               emitLoadData="serviceRegisterManage"
    ></vc:create>

    <vc:create name="editServiceRegister"></vc:create>
    <vc:create name="deleteServiceRegister"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import ChooseApp from '@/component/ChooseApp.vue';import EditServiceRegister from '@/component/EditServiceRegister.vue';import DeleteServiceRegister from '@/component/DeleteServiceRegister.vue';



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
                    Pagination,ChooseApp,EditServiceRegister,DeleteServiceRegister
                },
                data () {
                    return {"serviceRegisterManageInfo":{"serviceRegisters":[],"total":0,"records":1,"moreCondition":false,"name":"","conditions":{"appName":"","appId":"","serviceName":"","serviceCode":"","serviceUrl":""}}}    
                },
                mounted() {
                ( () => {
            //this._listServiceRegisters(DEFAULT_PAGE, DEFAULT_ROWS);
            this._loadDataByParam(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {
            this.$vc.on('serviceRegisterManage', 'chooseApp',  (_param) => {
                this.$vc.copyObject(_param, this.serviceRegisterManageInfo.conditions);
            });

            this.$vc.on('serviceRegisterManage', 'listServiceRegister',  (_param) => {
                this._listServiceRegisters(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listServiceRegisters(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listServiceRegisters:function (_page, _rows) {

                this.serviceRegisterManageInfo.conditions.page = _page;
                this.serviceRegisterManageInfo.conditions.row = _rows;
                var param = {
                    params: this.serviceRegisterManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('serviceRegisterManage',
                    'list',
                    param,
                     (json, res) => {
                        var _serviceRegisterManageInfo = JSON.parse(json);
                        this.serviceRegisterManageInfo.total = _serviceRegisterManageInfo.total;
                        this.serviceRegisterManageInfo.records = _serviceRegisterManageInfo.records;
                        this.serviceRegisterManageInfo.serviceRegisters = _serviceRegisterManageInfo.serviceRegisters;
                        this.$vc.emit('pagination', 'init', {
                            total: this.serviceRegisterManageInfo.records,
                            dataCount: this.serviceRegisterManageInfo.total,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddServiceRegisterModal:function () {
                //this.$vc.emit('addServiceRegister','openAddServiceRegisterModal',{});
                this.$vc.jumpToPage("/flow/serviceBindingFlow");
            },_openEditServiceRegisterModel:function (_serviceRegister) {
                this.$vc.emit('editServiceRegister', 'openEditServiceRegisterModal', _serviceRegister);
            },_openDeleteServiceRegisterModel:function (_serviceRegister) {
                this.$vc.emit('deleteServiceRegister', 'openDeleteServiceRegisterModal', _serviceRegister);
            },_queryServiceRegisterMethod:function () {
                this._listServiceRegisters(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.serviceRegisterManageInfo.moreCondition) {
                    this.serviceRegisterManageInfo.moreCondition = false;
                } else {
                    this.serviceRegisterManageInfo.moreCondition = true;
                }
            },_openChooseAppMethod:function () {
                this.$vc.emit('chooseApp', 'openChooseAppModel', {});

            },_loadDataByParam:function () {
                this.serviceRegisterManageInfo.conditions.appId = this.$vc.getParam("appId");
                //如果 floodId 没有传 则，直接结束
                if (this.serviceRegisterManageInfo.conditions.appId == null
                    || this.serviceRegisterManageInfo.conditions.appId == undefined
                    || this.serviceRegisterManageInfo.conditions.appId == '') {
                    this._listServiceRegisters(DEFAULT_PAGE, DEFAULT_ROWS);
                    return;
                }

                var param = {
                    params: {
                        page: DEFAULT_PAGE,
                        row: DEFAULT_ROWS,
                        /*communityId: this.$vc.getCurrentCommunity().communityId,*/
                        appId: this.serviceRegisterManageInfo.conditions.appId
                    }
                }

                this.$vc.http.get(
                    'serviceRegisterManage',
                    'loadApp',
                    param,
                     (json, res) => {
                        if (res.status == 200) {
                            var _appInfo = JSON.parse(json);
                            var _tmpApp = _appInfo.apps[0];
                            this.serviceRegisterManageInfo.conditions.appName = _tmpApp.name;
                            return;
                        }
                        this.$vc.message(json);
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });

                this._listServiceRegisters(DEFAULT_PAGE, DEFAULT_ROWS);
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    