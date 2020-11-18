
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
                            <input v-model="queryParams.date" type="text" placeholder="请选择月份"
                                   class="form-control month">
                        </div>

                        <template v-if="[1001, 1002].includes(staffInfo.departmentId)">
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
                                    @click="refreshLog">
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
                    <h5>交接记录信息</h5>
                </div>
                <div class="ibox-content">

                    <table class="footable table table-stripped toggle-arrow-tiny"
                           data-page-size="15">
                        <thead>
                        <tr>
                            <td class="text-center">提交时间</td>
                            <td class="text-center">部门</td>
                            <td class="text-center">交接人</td>
                            <td class="text-center">接班人</td>
                            <td class="text-center">内容</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in memoList">
                            <td class="text-center">{{item.date}}</td>
                            <td class="text-center">{{item.orgName}}</td>

                            <td class="text-center">{{item.fromUser}}</td>
                            <td class="text-center">{{item.toUser}}</td>
                            <td class="text-center">
                                <div class="btn btn-link" @click="lookHandoverReason(item.memo)">内容</div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colspan="5">
                                <ul class="pagination float-right"></ul>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <!-- 分页 -->
<!--                    <Pagination name="pagination"></Pagination>-->
                </div>
            </div>
        </div>
    </div>
    <ViewModal name="viewModal"></ViewModal>
</div>
        </template>
        <script>
            import Pagination from './Pagination.vue';import ViewModal from './ViewModal.vue';
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"staffInfo":"[object Object]","orgList":"","queryParams":"[object Object]","memoList":""}    
            },
            mounted() {
             (_initMethod() {
            Vue.config.devtools = true;
            this.getOrgList();
            this.initTimePlugin();
            this.queryLog();
        })()(_initEvent() {
            /*this.$vc.on('pagination', 'page_event', function (_currentPage) {
                this.queryLog(_currentPage);
            });*/
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
            },refreshLog() {
                this.queryLog();
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
                    .on('changeDate', function (ev) {
                        var value = $(".month").val();
                        this.queryParams.date = value;
                        this.queryLog();
                    });

                this.queryParams.date = dayjs().format("YYYY-MM")/* + " 00:00:00"*/;
            },lookHandoverReason(content) {
                this.$vc.emit('viewModal', 'openViewModal', {
                    photos: null,
                    content,
                });
            },queryLog () {
                var param = {
                    params: {
                        date: '',
                        orgId: '',
                    },
                };
                this.$vc.copyObject(this.queryParams, param.params)
                if(param.params.orgId == null || param.params.orgId === '') {
                    delete param.params.orgId;
                }
                //发送get请求
                this.$vc.http.get('attendanceComponent',
                    'handoverLogs',
                    param,
                    function (json, res) {
                         const data = JSON.parse(json).data;
                         let memoList = [];
                         data.forEach(date => {
                            date.memoList.forEach(val => {
                                memoList.push({
                                    ...val,
                                    date: `${date.date} ${val.time}`
                                })
                            })
                         })
                        this.memoList = memoList.slice();
                        /*this.$vc.emit('pagination', 'init', {
                            currentPage: _page,
                        });*/
                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    