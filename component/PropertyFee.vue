
        <template>
            <div id="component" >
    <vc:create name="viewMainFee"
               feeName="物业费"
               feeTypeCd="888800010001"
               payName="propertyPay"
    ></vc:create>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox">
                <div class="ibox-title">
                    <h5>缴费历史</h5>
                </div>
                <div class="ibox-content">

                    <div class="row">
                        <div class="col-sm-3 input-group">
                            <input size="16" type="text" placeholder="请选择开始时间"   readonly class="form-control form-control-sm start_time">
                        </div>
                        <div class="col-sm-2">

                        </div>
                        <div class="col-sm-3 input-group">
                            <input size="16" type="text" placeholder="请选择结束时间"  readonly class="form-control form-control-sm end_time">
                        </div>

                        <div class="col-sm-2">

                        </div>

                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="queryFeeDetailMethod()">
                                <i class="glyphicon glyphicon-search"></i> 马上查询</button>
                        </div>

                        </div>

                    <table class="footable table table-stripped toggle-arrow-tiny" style="margin-top:10px" data-page-size="10">
                        <thead>
                        <tr>
                            <th>缴费ID</th>
                            <th data-hide="phone">周期</th>
                            <th data-hide="phone">应收金额</th>
                            <th data-hide="phone">实收金额</th>
                            <th data-hide="phone">打折率</th>
                            <th data-hide="phone" >备注</th>
                            <th data-hide="phone">缴费时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="feeDetail in feeDetailInfo.feeDetails">
                            <td>
                                {{feeDetail.detailId}}
                            </td>
                            <td>
                                {{feeDetail.cycles}} 月
                            </td>
                            <td>
                                {{feeDetail.receivableAmount}} 元
                            </td>
                            <td>
                                {{feeDetail.receivedAmount}} 元
                            </td>
                            <td>
                                {{feeDetail.primeRate}}
                            </td>
                            <td>
                                {{feeDetail.remark}}
                            </td>
                            <td>
                                {{feeDetail.createTime}}
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
                return {"feeDetailInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this.initDate();
        })()(function(){
            this.$vc.on('propertyFee','listFeeDetail',function(_param){
                  this.feeDetailInfo.feeId = _param.feeId;
                  this.listFeeDetail(DEFAULT_PAGE,DEFAULT_ROW);
            });

            this.$vc.on('propertyFee','listParkingSpaceData',function(_param){
                  this.feeDetailInfo.feeId = _param.feeId;
                  this.listFeeDetail(DEFAULT_PAGE,DEFAULT_ROW);
            });

            this.$vc.on('pagination','page_event',function(_currentPage){
                this.listRoom(_currentPage,DEFAULT_ROW);
            });
        })()   
            },
            methods: {
                initDate:function(){
                $(".start_time").datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN',minView: "day"});
                $(".end_time").datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN',minView: "hour"});
                $('.start_time').datetimepicker()
                          .on('changeDate', function (ev) {
                            var value = $(".start_time").val();
                            this.feeDetailInfo.startTime = value ;
                          });
                $('.end_time').datetimepicker()
                              .on('changeDate', function (ev) {
                                var value = $(".end_time").val();
                                this.feeDetailInfo.endTime = value ;
                              });
            },listFeeDetail:function(_page,_row){
                var param = {
                    params:{
                        page:_page,
                        row:_row,
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        feeId:this.feeDetailInfo.feeId,
                        startTime:this.feeDetailInfo.startTime,
                        endTime:this.feeDetailInfo.endTime
                    }
                }
               //发送get请求
               this.$vc.http.get('propertyFee',
                            'listFeeDetail',
                             param,
                             function(json,res){
                                var listFeeDetailData =JSON.parse(json);

                                this.feeDetailInfo.total = listFeeDetailData.total;
                                this.feeDetailInfo.records = listFeeDetailData.records;
                                this.feeDetailInfo.feeDetails = listFeeDetailData.feeDetails;

                                this.$vc.emit('pagination','init',{
                                    total:this.feeDetailInfo.records,
                                    currentPage:_page
                                });
                             },function(errInfo,error){
                                console.log('请求失败处理');
                             }
                           );
            },queryFeeDetailMethod:function(){
                this.listFeeDetail(DEFAULT_PAGE,DEFAULT_ROW);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    