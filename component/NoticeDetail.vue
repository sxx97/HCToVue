
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"noticeDetailInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            var tmpNoticeId = this.$vc.getParam('noticeId');
            if(!this.$vc.notNull(tmpNoticeId)){
                return ;
            }
            this.noticeDetailInfo.noticeId = tmpNoticeId;
            this._listNotices(DEFAULT_PAGE, DEFAULT_ROWS);
        })()(function(){

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
                             function(json,res){
                                var _noticeDetailInfo=JSON.parse(json);

                                var _notices = _noticeDetailInfo.notices;
                                if(_notices.length >0){
                                    //filterXSS
                                    _notices[0].context = filterXSS(_notices[0].context);
                                    this.$vc.copyObject(_notices[0], this.noticeDetailInfo);
                                }

                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    