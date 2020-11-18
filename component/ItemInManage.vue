
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入物品ID"
                                       v-model="resourceStoreManageInfo.conditions.resId" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入物品名称"
                                       v-model="resourceStoreManageInfo.conditions.resName" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入物品编码"
                                       v-model="resourceStoreManageInfo.conditions.resCode" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    v-on:click="_queryResourceStoreMethod()">
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
                    <h5>物品信息</h5>
<!--                    <div class="ibox-tools" style="top:10px;">-->
<!--                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddResourceStoreModal()">-->
<!--                            <i class="glyphicon glyphicon-plus"></i>-->
<!--                            添加-->
<!--                        </button>-->
<!--                    </div>-->
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">物品ID</th>
                            <th class="text-center">物品名称</th>
                            <th class="text-center">物品编码</th>
                            <th class="text-center">物品价格</th>
                            <th class="text-center">物品库存</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="resourceStore in resourceStoreManageInfo.resourceStores">
                            <td class="text-center">{{resourceStore.resId}}</td>
                            <td class="text-center">{{resourceStore.resName}}</td>
                            <td class="text-center">{{resourceStore.resCode}}</td>
                            <td class="text-center">{{resourceStore.price}}</td>
                            <td class="text-center">{{resourceStore.stock}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditResourceStoreModel(resourceStore)">修改
                                    </button>
                                </div>
<!--                                <div class="btn-group">-->
<!--                                    <button class="btn-white btn btn-xs"-->
<!--                                            v-on:click="_openDeleteResourceStoreModel(resourceStore)">删除-->
<!--                                    </button>-->
<!--                                </div>-->
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


<!--    <vc:create name="addResourceStore"-->
<!--               callBackListener=""-->
<!--               callBackFunction=""-->
<!--    ></vc:create>-->
    <EditItemNumberStore name="editItemNumberStore"></EditItemNumberStore>
<!--    <DeleteResourceStore name="deleteResourceStore"></DeleteResourceStore>-->

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditItemNumberStore from './EditItemNumberStore.vue';import DeleteResourceStore from './DeleteResourceStore.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"resourceStoreManageInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._listResourceStores(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function () {

            this.$vc.on('resourceStoreManage', 'listResourceStore', function (_param) {
                this._listResourceStores(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this._listResourceStores(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listResourceStores:function (_page, _rows) {

                this.resourceStoreManageInfo.conditions.page = _page;
                this.resourceStoreManageInfo.conditions.row = _rows;
                var param = {
                    params: this.resourceStoreManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('resourceStoreManage',
                    'list',
                    param,
                    function (json, res) {
                        var _resourceStoreManageInfo = JSON.parse(json);
                        this.resourceStoreManageInfo.total = _resourceStoreManageInfo.total;
                        this.resourceStoreManageInfo.records = _resourceStoreManageInfo.records;
                        this.resourceStoreManageInfo.resourceStores = _resourceStoreManageInfo.resourceStores;
                        this.$vc.emit('pagination', 'init', {
                            total: this.resourceStoreManageInfo.records,
                            currentPage: _page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },_openAddResourceStoreModal:function () {
                this.$vc.emit('addResourceStore', 'openAddResourceStoreModal', {});
            },_openEditResourceStoreModel:function (_resourceStore) {
                this.$vc.emit('editItemNumberStore', 'openEditItemNumberStoreModal', _resourceStore);
            },_openDeleteResourceStoreModel:function (_resourceStore) {
                this.$vc.emit('deleteResourceStore', 'openDeleteResourceStoreModal', _resourceStore);
            },_queryResourceStoreMethod:function () {
                this._listResourceStores(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.resourceStoreManageInfo.moreCondition) {
                    this.resourceStoreManageInfo.moreCondition = false;
                } else {
                    this.resourceStoreManageInfo.moreCondition = true;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    