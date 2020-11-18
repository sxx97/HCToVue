
        <template>
            <div id="component">
    <div class="row" v-if="noticeManageInfo.componentShow == 'noticeList'">
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
                                <input type="text" placeholder="请输入公告标题"
                                       v-model="noticeManageInfo.conditions.title" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <select class="custom-select" v-model="noticeManageInfo.conditions.noticeTypeCd">
                                    <option selected value="">请选择公告类型</option>
                                    <option value="1000">用户小程序</option>
                                    <!--<option value="1001">员工通知</option>
                                    <option value="1002">写字楼通知</option>-->
                                </select>
                            </div>
                        </div>
                        <!--<div class="col-sm-4">
                            <div class="form-group">
                                <input type="text" placeholder="请输入公告ID"
                                       v-model="noticeManageInfo.conditions.noticeId" class=" form-control">
                            </div>
                        </div>-->
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="_queryNoticeMethod()"><i
                                    class="glyphicon glyphicon-search" ></i> 查询
                            </button>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="noticeManageInfo.componentShow == 'noticeList'">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>公告信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-on:click="_openEditNoticeModel()">
                            <i class="glyphicon glyphicon-plus"></i>
                            发布
                        </button>
                    </div>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                        <tr>
                            <!--<th>公告ID</th>-->
                            <th>标题</th>
                            <th>公告类型</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th class="text-right">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="notice in noticeManageInfo.notices">
                            <!--<td>{{notice.noticeId}}</td>-->
                            <td>{{notice.title}}</td>
                            <td>{{notice.noticeTypeCdName}}</td>
                            <td>{{notice.startTime}}</td>
                            <td>{{notice.endTime}}</td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openNoticeDetail(notice)">详情
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openEditNoticeModel(notice)">修改
                                    </button>
                                </div>
                                <div class="btn-group">
                                    <button class="btn-white btn btn-xs" v-on:click="_openDeleteNoticeModel(notice)">
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
                    <Pagination name="pagination"></Pagination>
                </div>
            </div>
        </div>
    </div>

    <div :class="{no_display:noticeManageInfo.componentShow != 'editNoticeView'}">
        <EditNoticeView name="editNoticeView"></EditNoticeView>
    </div>

    <DeleteNotice name="deleteNotice"></DeleteNotice>

</div>

        </template>
        <script>
            import Pagination from './Pagination.vue';import EditNoticeView from './EditNoticeView.vue';import DeleteNotice from './DeleteNotice.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"noticeManageInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._listNotices(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){
            this.$vc.on('noticeManage','listNotice',function(_param){
                  this.noticeManageInfo.componentShow = 'noticeList';

                  this._listNotices(DEFAULT_PAGE, DEFAULT_ROWS);
            });
             this.$vc.on('pagination','page_event',function(_currentPage){
                this._listNotices(_currentPage,DEFAULT_ROWS);
            });
        })()   
            },
            methods: {
                _listNotices:function(_page, _rows){
                this.noticeManageInfo.conditions.page = _page;
                this.noticeManageInfo.conditions.row = _rows;
                this.noticeManageInfo.conditions.communityId = this.$vc.getCurrentCommunity().communityId;
                var param = {
                    params:this.noticeManageInfo.conditions
               };

               //发送get请求
               this.$vc.http.get('noticeManage',
                            'list',
                             param,
                             function(json,res){
                                var _noticeManageInfo=JSON.parse(json);
                                this.noticeManageInfo.total = _noticeManageInfo.total;
                                this.noticeManageInfo.records = _noticeManageInfo.records;
                                this.noticeManageInfo.notices = _noticeManageInfo.notices;
                                this.$vc.emit('pagination','init',{
                                     total:this.noticeManageInfo.records,
                                     currentPage:_page
                                 });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },_openAddNoticeModal:function(){
                this.noticeManageInfo.componentShow = 'addNoticeView';
                this.$vc.emit('addNoticeView','openAddNoticeView',{});

            },_openEditNoticeModel:function(_notice){

                this.$vc.emit('editNoticeViewInfo','noticeEditNoticeInfo',_notice);
                this.noticeManageInfo.componentShow = 'editNoticeView';
            },_openDeleteNoticeModel:function(_notice){
                this.$vc.emit('deleteNotice','openDeleteNoticeModal',_notice);
            },_openNoticeDetail:function(_notice){
                this.$vc.jumpToPage("/flow/noticeDetailFlow?noticeId="+_notice.noticeId);

            },_queryNoticeMethod:function(){
                this._listNotices(DEFAULT_PAGE, DEFAULT_ROWS);

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    