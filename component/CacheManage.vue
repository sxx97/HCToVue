
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
                                <input type="text" placeholder="请输入缓存ID"
                                       v-model="cacheManageInfo.conditions.id" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入缓存编码"
                                       v-model="cacheManageInfo.conditions.cacheCode" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入缓存名称"
                                       v-model="cacheManageInfo.conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryCacheMethod()">
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
                    <h5>缓存信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                    </div>
                </div>
                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <th class="text-center">缓存ID</th>
                            <th class="text-center">缓存编码</th>
                            <th class="text-center">名称</th>
                            <th class="text-center">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="cache in cacheManageInfo.caches">
                            <td class="text-center">{{cache.id}}</td>
                            <td class="text-center">{{cache.cacheCode}}</td>
                            <td class="text-center">{{cache.cacheName}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_flushCache(cache)">刷新缓存
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

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"cacheManageInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._listCaches(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function () {

            this.$vc.on('cacheManage', 'listCache', function (_param) {
                this._listCaches(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this._listCaches(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listCaches:function (_page, _rows) {

                this.cacheManageInfo.conditions.page = _page;
                this.cacheManageInfo.conditions.row = _rows;
                //this.cacheManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.cacheManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('cacheManage',
                    'list',
                    param,
                    function (json, res) {
                        var _cacheManageInfo = JSON.parse(json);
                        this.cacheManageInfo.total = _cacheManageInfo.total;
                        this.cacheManageInfo.records = _cacheManageInfo.records;
                        this.cacheManageInfo.caches = _cacheManageInfo.caches;
                        this.$vc.emit('pagination', 'init', {
                            total: this.cacheManageInfo.records,
                            currentPage: _page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },_queryCacheMethod:function () {
                this._listCaches(DEFAULT_PAGE, DEFAULT_ROWS);
            },_flushCache:function (_cache) {

                var param = {
                    params: {
                        id: _cache.id
                    }
                }

                this.$vc.http.get(
                    'cacheManage',
                    'flushCache',
                    param,
                    function (json, res) {
                        if (res.status == 200) {
                            this.$vc.toast("刷新缓存成功");
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    