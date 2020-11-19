
        <template>
            <div id = "chooseActivitiesModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="chooseActivitiesModelLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="chooseActivitiesModelLabel">选择活动</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class=" row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="row">

                                <div class="col-sm-7 m-b-xs">
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group">
                                        <input placeholder="输入活动名称" type="text" v-model="chooseActivitiesInfo._currentActivitiesName" class="form-control form-control-sm">
                                        <span class="input-group-append">
                                                <button type="button" class="btn btn-sm btn-primary" v-on:click="queryActivitiess()">查询</button>
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:15px">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                                                        <!--<th class="text-center">活动ID</th>-->
                            <th class="text-center">活动标题</th>
                            <th class="text-center">活动类型</th>
                            <th class="text-center">头部照片</th>
                            <th class="text-center">活动内容</th>
                            <th class="text-center">开始时间</th>
                            <th class="text-center">结束时间</th>
                            <th class="text-center">操作</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="activities in chooseActivitiesInfo.activitiess">
                                                                        <!--<td class="text-center">{{activities.activitiesId}}</td>-->
                            <td class="text-center">{{activities.title}}</td>
                            <td class="text-center">{{activities.typeCd}}</td>
                            <td class="text-center">{{activities.headerImg}}</td>
                            <td class="text-center">{{activities.context}}</td>
                            <td class="text-center">{{activities.startTime}}</td>
                            <td class="text-center">{{activities.endTime}}</td>

                                            <td>
                                                <button class="btn btn-primary btn-xs" v-on:click="chooseActivities(activities)">选择</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        </template>
        <script>
            
            



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
                props: {"emitChooseActivities":"string","emitLoadData":"string"},
                components: {
                    
                },
                data () {
                    return {"chooseActivitiesInfo":{"activitiess":[],"_currentActivitiesName":""}}    
                },
                mounted() {
                (() =>{
        })()
(() =>{
            this.$vc.on('chooseActivities','openChooseActivitiesModel',(_param) =>{
                $('#chooseActivitiesModel').modal('show');
                this._refreshChooseActivitiesInfo();
                this._loadAllActivitiesInfo(1,10,'');
            });
        })()   
                },
                methods: {
                    _loadAllActivitiesInfo:function(_page,_row,_name){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        name:_name
                    }
                };

                //发送get请求
               this.$vc.http.get('chooseActivities',
                            'list',
                             param,
                             (json) =>{
                                var _activitiesInfo = JSON.parse(json);
                                this.chooseActivitiesInfo.activitiess = _activitiesInfo.activitiess;
                             },() =>{
                                console.log('请求失败处理');
                             }
                           );
            },chooseActivities:function(_activities){
                if(_activities.hasOwnProperty('name')){
                     _activities.activitiesName = _activities.name;
                }
                this.$vc.emit(this.$vc._thisemitChooseActivities,'chooseActivities',_activities);
                this.$vc.emit(this.$vc._thisemitLoadData,'listActivitiesData',{
                    activitiesId:_activities.activitiesId
                });
                $('#chooseActivitiesModel').modal('hide');
            },queryActivitiess:function(){
                this._loadAllActivitiesInfo(1,10,this.chooseActivitiesInfo._currentActivitiesName);
            },_refreshChooseActivitiesInfo:function(){
                this.chooseActivitiesInfo._currentActivitiesName = "";
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    