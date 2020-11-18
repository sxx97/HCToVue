
        <template>
            <div id="auditModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">{{callBackListener == 'myAuditComplaints' ? '处理' : '审核信息'}}</h3>
                <div class="ibox-content">
                    <div>
                        <div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">{{callBackListener == 'myAuditComplaints' ? '处理' : '审核状态'}}</label>
                                <div class="col-sm-10">
                                    <template v-if="callBackListener == 'myAuditComplaints'">
                                        <select class="custom-select" v-model="auditInfo.state">
                                            <option selected disabled value="">请处理</option>
                                            <option value="10002">已处理</option>
                                            <option value="10003">无效</option>
                                        </select>
                                    </template>
                                    <template v-else>
                                        <select class="custom-select" v-model="auditInfo.state">
                                            <option selected disabled value="">请审核</option>
                                            <option value="1100">同意</option>
                                            <option value="1200">拒绝</option>
                                        </select>
                                    </template>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">{{callBackListener == 'myAuditComplaints' ? '结果' : '原因'}}</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写原因" class="form-control"
                                              v-model="auditInfo.remark"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="_auditSubmit()"><i class="fa fa-check"></i>&nbsp;提交
                                </button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                        data-dismiss="modal">取消
                                </button>
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
    