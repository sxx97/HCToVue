
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
        <div class="col-md-9">
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

                    <table class="table shoping-cart-table"
                           data-page-size="15"
                    >
                        <tbody>
                        <tr v-for="resourceStore in resourceStoreManageInfo.resourceStores">
                            <td class="desc">
                                <h3>
                                    <a class="text-navy">
                                        {{resourceStore.resName}}
                                    </a>
                                </h3>
                                <p class="small">
                                    {{resourceStore.description}}
                                </p>
                            </td>
                            <td>{{resourceStore.price}}</td>
                            <td width="65">
                                <input type="text" class="form-control" :placeholder="resourceStore.stock" v-model="resourceStore.stock">
<!--                                <button class="btn btn-default" type="button" @click="_resourceStoreLess(resourceStore.stock)">-</button>-->
                            </td>
                            <td>
                                <button class="btn btn-default" type="button" @click="_resourceStoreLess(resourceStore.stock)">-</button>

                            </td>
                            <td>
                                <h4>
                                    {{resourceStore.price}}
                                </h4>
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
        <div class="col-md-3">

            <div class="ibox">
                <div class="ibox-title">
                    <h5>物品摘要</h5>
                </div>
                <div class="ibox-content">
                            <span>
                                总价
                            </span>
                    <h2 class="font-bold">
                        390,00 元
                    </h2>

                    <hr/>
                </div>
            </div>

            <div class="ibox">
                <div class="ibox-title">
                    <h5>当前申请人</h5>
                </div>
                <div class="ibox-content text-center">


                    <h3><i class="fa fa-adn"></i> 系统登陆人</h3>
                    <h3><i class="fa fa-dashcube"></i> 登陆时间</h3>
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
                _resourceStoreLess:function(stock){
                this.$data.resourceStoreManageInfo.conditions.stock=parseInt(stock--);
            },_listResourceStores:function (_page, _rows) {

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
    