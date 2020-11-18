
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>访客信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openAddVisitModal()">
                            <i class="glyphicon glyphicon-plus"></i>
                            登记
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <th>访客ID</th>
                            <th>访客姓名</th>
                            <th>访客联系方式</th>
                            <th>访客性别</th>
                            <th>来访事由</th>
                            <th>来访时间</th>
                            <th>离开时间</th>
<!--                            <th class="text-right">操作</th>-->


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="visit in appManageInfo.visits">
                            <td>{{visit.vId}}</td>
                            <td>{{visit.vName}}</td>
                            <td>{{visit.phoneNumber}}</td>
                            <td>{{visit.visitGender=='0'?'男':'女'}}</td>
                            <td>{{visit.visitCase}}</td>
                            <td>{{visit.visitTime}}</td>
                            <td>{{visit.departureTime}}</td>
<!--                            <td>-->
<!--&lt;!&ndash;                                <div class="btn-group">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <button class="btn-white btn btn-xs" v-on:click="_openEditVisitModel(visit)">修改</button>&ndash;&gt;-->
<!--&lt;!&ndash;                                </div>&ndash;&gt;-->
<!--                                <div class="btn-group">-->
<!--                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteAppModel(visit)">删除-->
<!--                                    </button>-->
<!--                                </div>-->
<!--                            </td>-->

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

    <EditVisit name="editVisit"></EditVisit>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditVisit from './EditVisit.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"appManageInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._listApps(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function () {
            this.$vc.on('appManage', 'listApp', function (_param) {
                this._listApps(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this._listApps(_currentPage, DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listApps:function (_page, _rows) {
                var param = {
                        params: {
                            page: _page,
                            row: _rows,
                            communityId:this.$vc.getCurrentCommunity().communityId
                        }

                    }

                //发送get请求
                this.$vc.http.get('visitManage',
                    'list',
                    param,
                    function (json, res) {
                        var _visitManageInfo = JSON.parse(json);
                        console.log(_visitManageInfo);
                        this.appManageInfo.total = _visitManageInfo.total;
                        this.appManageInfo.records = _visitManageInfo.records;
                        this.appManageInfo.visits = _visitManageInfo.visits;
                        this.$vc.emit('pagination', 'init', {
                            total: _visitManageInfo.records,
                            currentPage: _page
                        });
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },_openAddVisitModal:function () {
                this.$vc.jumpToPage("/flow/addNewOneVisit")
                // this.$vc.emit('addApp','openAddAppModal',{});
            },_openEditVisitModel:function (_app) {
                this.$vc.emit('editVisit', 'openEditVisitModel', _app);
                // this.$vc.emit('deleteApp','openDeleteAppModal',_app);

            },_openDeleteAppModel:function (_app) {
                this.$vc.emit('deleteApp', 'openDeleteAppModal', _app);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    