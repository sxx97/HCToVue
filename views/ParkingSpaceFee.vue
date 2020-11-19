
        <template>
            <div id="component">
    <vc:create name="viewMainParkingSpaceFee"
               feeName="停车费"
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
                            <input size="16" type="text" placeholder="请选择开始时间" readonly
                                   class="form-control form-control-sm start_time">
                        </div>
                        <div class="col-sm-2">

                        </div>
                        <div class="col-sm-3 input-group">
                            <input size="16" type="text" placeholder="请选择结束时间" readonly
                                   class="form-control form-control-sm end_time">
                        </div>

                        <div class="col-sm-2">

                        </div>

                        <div class="col-sm-2">
                            <button type="button" class="btn btn-primary btn-sm" v-on:click="queryFeeDetailMethod()">
                                <i class="glyphicon glyphicon-search"></i> 马上查询
                            </button>
                        </div>

                    </div>

                    <table class="footable table table-stripped toggle-arrow-tiny" style="margin-top:10px"
                           data-page-size="10">
                        <thead>
                        <tr>
                            <th>缴费ID</th>
                            <th data-hide="phone" v-if="feeDetailInfo.amount == '-1.00'">周期</th>
                            <th data-hide="phone">应收金额</th>
                            <th data-hide="phone">实收金额</th>
                            <th data-hide="phone">打折率</th>
                            <th data-hide="phone">备注</th>
                            <th data-hide="phone">缴费时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="feeDetail in feeDetailInfo.feeDetails">
                            <td>
                                {{feeDetail.detailId}}
                            </td>
                            <td v-if="feeDetailInfo.amount == '-1.00'">
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
                    <vc:create name="pagination"></vc:create>

                </div>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
            import ViewMainParkingSpaceFee from '@/component/ViewMainParkingSpaceFee.vue';import Pagination from '@/component/Pagination.vue';



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
                    ViewMainParkingSpaceFee,Pagination
                },
                data () {
                    return {"feeDetailInfo":{"feeDetails":[],"total":0,"records":1,"feeId":"","amount":"-1.00","startTime":"","endTime":""}}    
                },
                mounted() {
                (() =>{
            this.initDate();
        })()
(() =>{
            this.$vc.on('propertyFee','listFeeDetail',(_param) =>{
                  this.feeDetailInfo.feeId = _param.feeId;
                  this.feeDetailInfo.amount = _param.amount;
                  this.listFeeDetail(DEFAULT_PAGE,DEFAULT_ROW);
            });

            this.$vc.on('pagination','page_event',(_currentPage) =>{
                this.listRoom(_currentPage,DEFAULT_ROW);
            });
        })()   
                },
                methods: {
                    initDate:function(){
                $('.start_time').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    autoClose: 1,
                    minView: "month",
                    todayBtn: true
                });
                $('.start_time').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".start_time").val();
                        this.feeDetailInfo.startTime = value;
                    });
                $('.end_time').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    autoClose: 1,
                    minView: "month",
                    todayBtn: true
                });
                $('.end_time').datetimepicker()
                  .on('changeDate',  (ev) => {
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
                             (json,res) =>{
                                var listFeeDetailData =JSON.parse(json);

                                this.feeDetailInfo.total = listFeeDetailData.total;
                                this.feeDetailInfo.records = listFeeDetailData.records;
                                this.feeDetailInfo.feeDetails = listFeeDetailData.feeDetails;

                                this.$vc.emit('pagination','init',{
                                    total:this.feeDetailInfo.records,
                                    currentPage:_page
                                });
                             },(errInfo,error) =>{
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
    