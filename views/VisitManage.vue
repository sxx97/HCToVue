
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
                    <vc:create name="pagination"></vc:create>
                </div>
            </div>
        </div>
    </div>

    <vc:create name="editVisit"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import EditVisit from '@/component/EditVisit.vue';



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
                    Pagination,EditVisit
                },
                data () {
                    return {"appManageInfo":{"apps":[],"total":0,"records":1}}    
                },
                mounted() {
                ( () => {
            this._listApps(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {
            this.$vc.on('appManage', 'listApp',  (_param) => {
                this._listApps(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
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
                     (json, res) => {
                        var _visitManageInfo = JSON.parse(json);
                        console.log(_visitManageInfo);
                        this.appManageInfo.total = _visitManageInfo.total;
                        this.appManageInfo.records = _visitManageInfo.records;
                        this.appManageInfo.visits = _visitManageInfo.visits;
                        this.$vc.emit('pagination', 'init', {
                            total: _visitManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
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
    