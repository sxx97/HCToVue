
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row" v-bind:class="{no_display:activitiesManageInfo.componentShow != 'activitiesList'}">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <!--<div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                v-on:click="_moreCondition()">{{activitiesManageInfo.moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>-->
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">  
                            <div class="form-group">
                                <input type="text" placeholder="请输入活动标题" v-model="activitiesManageInfo.conditions.title"
                                       class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <select class="custom-select" v-model="activitiesManageInfo.conditions.typeCd">
                                <option selected value="">请选择活动类型</option>
                                <option value="10001">活动</option>
<!--                                <option value="10002">其他</option>-->
                            </select></div>
                        <!--<div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入员工名称"
                                       v-model="activitiesManageInfo.conditions.userName" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryActivitiesMethod()">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>
                    </div>
                    <!--<div class="row">
                        <div class="col-sm-4" v-if="activitiesManageInfo.moreCondition == true">
                            <div class="form-group">
                                <input type="text" placeholder="请输入活动ID"
                                       v-model="activitiesManageInfo.conditions.activitiesId" class=" form-control">
                            </div>
                        </div>
                    </div>-->


                </div>
            </div>
        </div>
    </div>
    <div class="row" v-bind:class="{no_display:activitiesManageInfo.componentShow != 'activitiesList'}">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>活动信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openEditActivitiesModel()">
                            <i class="glyphicon glyphicon-plus"></i>
                            发布
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15"
                    >
                        <thead>
                        <tr>
                            <!--<th class="text-center">活动ID</th>-->
                            <th class="text-center">活动标题</th>
                            <th class="text-center">活动类型</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">操作</th>


                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="activities in activitiesManageInfo.activitiess">
                            <!--<td class="text-center">{{activities.activitiesId}}</td>-->
                            <td class="text-center">{{activities.title}}</td>
                            <td class="text-center">{{activities.typeCd}}</td>
                            <td class="text-center">{{activities.startTime}}</td>
                            <td class="text-center">{{activities.endTime}}</td>
                            <td class="text-center">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openEditActivitiesModel(activities)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs"
                                            v-on:click="_openDeleteActivitiesModel(activities)">删除
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


    <div :class="{no_display:activitiesManageInfo.componentShow != 'editActivitiesView'}">
        <vc:create name="editActivitiesView"></vc:create>
    </div>

    <vc:create name="deleteActivities"></vc:create>

</div>

        </template>
        <script>
            
            import Pagination from '@/component/Pagination.vue';import EditActivitiesView from '@/component/EditActivitiesView.vue';import DeleteActivities from '@/component/DeleteActivities.vue';



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
                    Pagination,EditActivitiesView,DeleteActivities
                },
                data () {
                    return {"activitiesManageInfo":{"activitiess":[],"total":0,"records":1,"moreCondition":false,"componentShow":"activitiesList","title":"","conditions":{"title":"","typeCd":"","userName":"","activitiesId":""}}}    
                },
                mounted() {
                ( () => {
            this._listActivitiess(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
( () => {

            this.$vc.on('activitiesManage', 'listActivities',  (_param) => {
                this.activitiesManageInfo.componentShow = 'activitiesList';
                this._listActivitiess(DEFAULT_PAGE, DEFAULT_ROWS);
            });
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this._listActivitiess(_currentPage, DEFAULT_ROWS);
            });
        })()   
                },
                methods: {
                    _listActivitiess:function (_page, _rows) {

                this.activitiesManageInfo.conditions.page = _page;
                this.activitiesManageInfo.conditions.row = _rows;
                this.activitiesManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params: this.activitiesManageInfo.conditions
                };

                //发送get请求
                this.$vc.http.get('activitiesManage',
                    'list',
                    param,
                     (json, res) => {
                        var _activitiesManageInfo = JSON.parse(json);
                        this.activitiesManageInfo.total = _activitiesManageInfo.total;
                        this.activitiesManageInfo.records = _activitiesManageInfo.records;
                        this.activitiesManageInfo.activitiess = _activitiesManageInfo.activitiess;
                        this.$vc.emit('pagination', 'init', {
                            total: this.activitiesManageInfo.records,
                            currentPage: _page
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },_openAddActivitiesModal:function(){
                this.activitiesManageInfo.componentShow = 'addActivitiesView';
                this.$vc.emit('addActivitiesView','openAddActivitiesView',{});

            },_openEditActivitiesModel:function(_activities){

                this.$vc.emit('editActivitiesView','activitiesEditActivitiesInfo',_activities);
                this.activitiesManageInfo.componentShow = 'editActivitiesView';
            },_openDeleteActivitiesModel:function (_activities) {
                this.$vc.emit('deleteActivities', 'openDeleteActivitiesModal', _activities);
            },_queryActivitiesMethod:function () {
                this._listActivitiess(DEFAULT_PAGE, DEFAULT_ROWS);

            },_moreCondition:function () {
                if (this.activitiesManageInfo.moreCondition) {
                    this.activitiesManageInfo.moreCondition = false;
                } else {
                    this.activitiesManageInfo.moreCondition = true;
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    