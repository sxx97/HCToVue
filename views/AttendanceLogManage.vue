
        <template>
            <div id="component" class="wrapper wrapper-content animated fadeInRight ecommerce">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>查询条件</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="form-group">
                            <input v-model="queryParams.month" type="text" placeholder="请选择月份"
                                   class="form-control month">
                        </div>

                        <template v-if="[1001, 1002, 1007, 1008].includes(staffInfo.departmentId)">
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <select class="form-control" v-model="queryParams.orgId">
                                        <option value="" disabled>选择部门</option>
                                        <option v-for="org in orgList" :value="org.orgId">{{org.orgName}}</option>
                                    </select>
                                </div>
                            </div>
                        </template>


                        <div class="col-sm-1">
                            <button type="button" class="btn btn-primary btn-sm"
                                    @click="refreshAttendanceLog">
                                <i class="glyphicon glyphicon-search"></i> 查询
                            </button>
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
                    <h5>打卡信息</h5>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15">
                        <thead>
                            <tr v-html="getThead(queryParams.month)"></tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in attendanceList">
                            <td class="text-center">{{item.orgName}}</td>
                            <td class="text-center">{{item.userName}}</td>
                            <template v-for="index in currentMonthDays">
                                <template v-if="item.attendanceRecord && item.attendanceRecord[index] && item.attendanceRecord[index] != ''">
                                    <td class="text-center">
                                        <div>{{item.attendanceRecord[index].onDutyTime || '--'}}</div>
                                        <div>{{item.attendanceRecord[index].offDutyTime || '--'}}</div>
                                    </td>
                                </template>
                                <template v-else>
                                    <td class="text-center">
                                        --
                                    </td>
                                </template>
                            </template>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="33">
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
                    return {"staffInfo":{"accountCreateTime":"2020-09-16T03:07:05.000+00:00","communityId":"8888","departmentId":1005,"levels":1,"orgId":"842020090421460005","orgLevel":"3","parentOrgId":"842020071395050140","positionName":"保洁主管","relCd":"8","staffId":"302020091636910031","storeId":"402020051157600001","storeName":"和平里物业有限公司","tel":"13366357549","userId":"302020091636910031"},"orgList":[],"queryParams":{"month":"","orgId":""},"currentMonthDays":"null","attendanceList":[]}    
                },
                mounted() {
                (() => {
            Vue.config.devtools = true;
            this.getOrgList();
            this.initTimePlugin();
            this.queryAttendanceLog();
        })()
(() => {
            this.$vc.on('pagination', 'page_event',  (_currentPage) => {
                this.queryAttendanceLog(_currentPage);
            });
        })()   
                },
                methods: {
                    getOrgList() {
                this.$vc.http.get('orgManage', 'belongingList', {
                        params: {
                            floorId: '',
                            floorNum: '',
                            floorName: '',
                            page: 1,
                            row: 50,
                            communityId: this.$vc.getCurrentCommunity().communityId,
                        }
                    },
                    (json, res) => {
                        const orgsData = JSON.parse(json);
                        this.orgList = orgsData.orgs;

                    },
                    (errText, err) => {

                    })
            },refreshAttendanceLog() {
                this.queryAttendanceLog();
            },initTimePlugin() {
                $('.month').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm',
                    // initTime: true,
                    autoclose: true,
                    startView: 'year',
                    minView:'year',
                    maxView:'decade',
                    todayBtn: true,
                    initialDate: new Date(),
                });
                $('.month').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".month").val();
                        this.queryParams.month = value;
                        this.queryAttendanceLog();
                    });

                this.queryParams.month = dayjs().format("YYYY-MM")/* + " 00:00:00"*/;
            },getThead(date) {
                const isLeapYear = Number(date.slice(0, 4)) % 4 === 0;
                let dayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (isLeapYear) {
                    dayArr[1] = 29;
                }
                this.currentMonthDays = dayArr[Number(date.slice(5)) - 1];
                const weekMapping = {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'};
                let tr = '<td>部门</td><td>员工</td>';
                for(let i = 1; i <= dayArr[Number(date.slice(5)) - 1]; i++) {
                    tr += `<td>
                            <div>${weekMapping[dayjs(date.concat(this.$vc.prefixZero(i))).day()]}</div>
                            <div>${this.$vc.prefixZero(i)}</div>
                        </td>`;
                }
                return tr;
            },queryAttendanceLog (_page = 1, _rows = 10) {
                this.queryParams.pageNum = _page;
                this.queryParams.pageSize = _rows;
                var param = {
                    params: {
                        month: '',
                        pageNum: '',
                        orgId: '',
                        pageSize: '',
                    },
                };
                this.$vc.copyObject(this.queryParams, param.params)
                param.params.month = param.params.month.split('-')[0]+param.params.month.split('-')[1];
                //发送get请求
                this.$vc.http.get('attendanceComponent',
                    'attendanceLogs',
                    param,
                     (json, res) => {
                        this.attendanceList = JSON.parse(json).data;
                        this.$vc.emit('pagination', 'init', {
                            currentPage: _page,
                        });
                    },  (errInfo, error) => {
                        console.log('请求失败处理');
                    }
                );
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    