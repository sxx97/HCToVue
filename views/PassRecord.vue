
        <template>
            <div id="component">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-link btn-sm" style="margin-right:10px;"
                                @click="moreCondition = !moreCondition">{{moreCondition == true?'隐藏':'更多'}}
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">

                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="text" placeholder="请输入姓名"
                                       v-model="conditions.name" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input type="number" placeholder="请输入联系电话"
                                       v-model="conditions.link" class=" form-control">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <select class="form-control" v-model="conditions.typeCd">
                                    <option value="" disabled>请选择身份</option>
                                    <option value="1001">业主</option>
<!--                                    <option value="1002">家庭成员</option>-->
                                    <option value="1003">租客</option>
                                    <option value="1004">访客</option>
                                    <option value="1005">企业员工</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm" @click="searchTurnstilePassingLog"><i
                                    class="glyphicon glyphicon-search"></i> 查询
                            </button>
                        </div>

                    </div>
                    <div class="row" v-show="moreCondition == true">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input v-model="conditions.startTime" type="text" placeholder="请填写开始时间"
                                       class="form-control noticeStartTime">
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <input v-model="conditions.endTime" type="text" placeholder="请填写结束时间"
                                       class="form-control noticeEndTime">
                            </div>
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
                    <h5>通行记录</h5>
                </div>

                <div class="ibox-content">
                    <table class="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                        <thead>
                            <tr>
                                <th>通行时间</th>
                                <th>姓名</th>
                                <th>联系电话</th>
                                <th>身份</th>
                                <th>身份证</th>
                                <th>企业</th>
                                <th>通行方式</th>
                                <th>方向</th>
                                <th>体温</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="log in logList">
                                <td>{{log.time || '--'}}</td>
                                <td>{{log.name || '--'}}</td>
                                <td>{{log.link || '--'}}</td>
                                <td>{{ownerTypeCdMapping[log.ownerTypeCd]}}</td>
                                <td>{{log.idCard || '--'}}</td>
                                <td>{{'--'}}</td>
                                <td>{{passingMethodMapping[log.method]}}</td>
                                <td>{{log.dir == 1 ? '进入' : '离开'}}</td>
                                <td>--</td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="9">
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
            
            import Pagination from '@/component/Pagination.vue';



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
                    Pagination
                },
                data () {
                    return {"moreCondition":false,"conditions":{"link":"","name":"","communityId":"","typeCd":"","startTime":"","endTime":""},"ownerTypeCdMapping":{"1001":"业主","1002":"家庭成员","1003":"租客","1004":"访客","1005":"企业员工"},"passingMethodMapping":{"1":"扫码","2":"刷脸"},"logList":[]}    
                },
                mounted() {
                (() => {
            this.initTimePlugin();
            this.getTurnstilePassRecord();
        })()
(() => {
            this.$vc.on('pagination', 'page_event', (page, count) => {
                this.getTurnstilePassRecord(page, count);
            });
        })()   
                },
                methods: {
                    searchTurnstilePassingLog() {
                this.getTurnstilePassRecord();
            },getTurnstilePassRecord(page = 1, pageSize = 10) {
                this.$vc.http.get('turnstilePassRecordComponent', 'getPassRecord', {
                    params: {
                        page,
                        pageSize,
                        ...this.conditions,
                    }
                },
                (resText, res) => {
                    this.logList = res.body.data;
                    console.log(res, '查询结果')
                },
                (errText, err) => {
                    console.log(err, '错误结果')
                })
            },initTimePlugin() {
                $('.noticeStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.noticeStartTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".noticeStartTime").val();
                        this.conditions.startTime = value;
                    });
                $('.noticeEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.noticeEndTime').datetimepicker().on('changeDate',  (ev) => {
                    var value = $(".noticeEndTime").val();
                    this.conditions.endTime = value;
                });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    