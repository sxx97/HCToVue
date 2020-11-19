
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{listStoreManageInfo.moreCondition ==
                            true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入商户名称"
                                       v-model="listStoreManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="listStoreManageInfo.conditions.storeTypeCd">
                                <option selected value="">请选择商户类型</option>
                                <option value="800900000003">物业公司</option>
                                <option value="800900000002">代理商</option>
                            </select></div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入联系电话"
                                       v-model="listStoreManageInfo.conditions.tel" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryListStoreMethod()">
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
                    <h5>商户信息</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">商户名称</th>
                            <th class="text-center">商户地址</th>
                            <th class="text-center">联系电话</th>
                            <th class="text-center">商户类型</th>
                            <th class="text-center">企业法人</th>
                            <th class="text-center">成立日期</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="listStore in listStoreManageInfo.listStores">
                            <td class="text-center">{{listStore.name}}</td>
                            <td class="text-center">{{listStore.address}}</td>
                            <td class="text-center">{{listStore.tel}}</td>
                            <td class="text-center">{{listStore.storeTypeName}}</td>
                            <td class="text-center">{{listStore.artificialPerson}}</td>
                            <td class="text-center">{{listStore.establishment}}</td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openStoresCommunityModel(listStore)">隶属管理区
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

    <vc:create name="storesCommunity"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import StoresCommunity from '@/component/StoresCommunity.vue';



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
                    Pagination,StoresCommunity
                },
                data () {
                    return {"listStoreManageInfo":{"listStores":[],"total":0,"records":1,"moreCondition":false,"conditions":{"name":"","storeTypeCd":"","tel":""}}}    
                },
                mounted() {
                ( () => {
            this._listListStores(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('listStoreManage', 'listListStore',  (_param) => {
                this._listListStores(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listListStores(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listListStores:function (_page, _rows) {
                this.listStoreManageInfo.conditions.page = _page;
                this.listStoreManageInfo.conditions.row = _rows;
                var param = {
                    params: this.listStoreManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('listStoreManage',
                    'list',
                    param,
                     (json, res) => {
                        var _listStoreManageInfo = JSON.parse(json);
                        this.listStoreManageInfo.total = _listStoreManageInfo.total;
                        this.listStoreManageInfo.records = _listStoreManageInfo.records;
                        this.listStoreManageInfo.listStores = _listStoreManageInfo.stores;
                        this.$vc.emit('pagination', 'init', {
                            total: this.listStoreManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openStoresCommunityModel:function (_listStore) {
                this.$vc.emit('storesCommunity','openStoresCommunity', _listStore);
            },_queryListStoreMethod:function () {
                this._listListStores(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.listStoreManageInfo.moreCondition) {
                    this.listStoreManageInfo.moreCondition = false;
                } else {
                    this.listStoreManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    