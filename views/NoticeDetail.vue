
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12 col-lg-offset-1">
            <div class="ibox">
                <div class="ibox-content">
                    <div class="text-center article-title">
                        <h1>
                            {{noticeDetailInfo.title}}
                        </h1>
                        <span class="text-muted"><i class="fa fa-clock-o"></i> {{noticeDetailInfo.createTime}}</span>
                    </div>


                    <div v-html="noticeDetailInfo.context"></div>


                    <hr/>
                    <div class="row">
                        <div class="col-md-6">
                            <h5>开始时间:</h5>
                            <i class="fa fa-clock-o"></i> {{noticeDetailInfo.startTime}}</span>
                        </div>
                        <div class="col-md-6">
                            <div class="small text-right">
                                <h5>结束时间:</h5>
                                <i class="fa fa-clock-o"></i> {{noticeDetailInfo.endTime}}</span>
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"noticeDetailInfo":{"noticeId":"","title":"","context":"","startTime":"","endTime":"","createTime":""}}    
                },
                mounted() {
                (() =>{
            var tmpNoticeId = this.$vc.getParam('noticeId');
            if(!this.$vc.notNull(tmpNoticeId)){
                return ;
            }
            this.noticeDetailInfo.noticeId = tmpNoticeId;
            this._listNotices(DEFAULT_PAGE, DEFAULT_ROWS);
        })()
(() =>{

        })()   
                },
                methods: {
                    _listNotices:function(_page, _rows){

                var param = {
                    params:{
                        page:_page,
                        row:_rows,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        noticeId:this.noticeDetailInfo.noticeId
                    }
               };

               //发送get请求
               this.$vc.http.get('noticeDetail',
                            'get',
                             param,
                             (json,res) =>{
                                var _noticeDetailInfo=JSON.parse(json);

                                var _notices = _noticeDetailInfo.notices;
                                if(_notices.length >0){
                                    //filterXSS
                                    _notices[0].context = filterXSS(_notices[0].context);
                                    this.$vc.copyObject(_notices[0], this.noticeDetailInfo);
                                }

                             },(errInfo,error) =>{
                                console.log('请求失败处理');
                             }
                           );
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    