
        <template>
            <div class="modal" tabindex="-1" role="dialog" id="addCommonTableModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-group row">
                    <label  class="col-sm-4 col-form-label">表名</label>
                    <div class="col-sm-8 row">
                        <div class="col-sm-8">
                            <input type="text" class="form-control"
                                   v-model="submitParams.name" placeholder="请输入">
                        </div>
                    </div>
                </div>
                <template v-if="submitParams.target != 3 && [1001, 1002].includes(staffInfo.departmentId)">
                    <div class="form-group row">
                        <label  class="col-sm-4 col-form-label">部门</label>
                        <div class="col-sm-8 row">
                            <div class="col-sm-8">
                                <select class="form-control" v-model="checkedOrg">
                                    <option value="" disabled>请选择</option>
                                    <option v-for="org in orgList" :value="org">{{org.orgName}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </template>


                <div class="form-group row">
                    <label  class="col-sm-4 col-form-label" >通知提醒频次</label>
                    <div class="col-sm-8 row">
                        <div class="col-sm-8">
                            <label>
                                <input type="radio" :value="0" v-model="submitParams.disposable"> 单次
                            </label>
                            <label class="ml-3">
                                <input type="radio" :value="1" v-model="submitParams.disposable"> 循环
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label  class="col-sm-4 col-form-label">通知提醒周期</label>
                    <div class="col-sm-8 row">
                        <div class="col-sm-8">
                            <input type="number" class="form-control"
                                   max-length="3"
                                   v-model="submitParams.scheduleDays" placeholder="请输入">
                        </div>
                        天
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary"
                        @click="submitCommonAssessment">确认</button>
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
                return {"checkedOrg":"[object Object]","submitParams":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('addCommonTable', 'show', params => {
                this.submitParams.target = params.target;
                this.orgList.forEach(val => {
                    if (val.department.toString() === this.$vc.getCurrentStaffInfo().departmentId.toString()) {
                        this.checkedOrg = val;
                    }
                })
                if (params.tableInfo) {
                    const {tableInfo} = params;
                    this.$vc.copyObject(tableInfo, this.submitParams);
                    this.submitParams.formId = tableInfo.id;
                    this.submitParams.regionId = this.$vc.getCurrentCommunity().communityId;
                    this.orgList.forEach(val => {
                        if (val.orgName === tableInfo.orgName) {
                            this.checkedOrg = val;
                            this.submitParams.orgId = val.orgId;
                            this.submitParams.dept = val.department;
                        }
                    })
                } else {
                    this.submitParams = {
                        name: '',
                        regionId: this.$vc.getCurrentCommunity().communityId,
                        orgId: '',
                        dept: '',
                        target: '',
                        disposable: '',
                        scheduleDays: '',
                    };
                }
                $('#addCommonTableModal').modal('show');
            })
        })()   
            },
            methods: {
                submitCommonAssessment() {
                let params = {};
                for (let key in this.submitParams) {
                    params[key] = this.submitParams[key];
                }
                params['dept'] = this.checkedOrg.department;
                params['orgId'] = this.checkedOrg.orgId;

                const isEditRequest = params.formId && params.formId !== '';

                this.$vc.http.post('assessmentComponent', isEditRequest ? 'editGeneralForm' : 'addAssessmentTable',
                    JSON.stringify(params),{
                        emulateJSON:true
                    },
                    res => {
                        const data = JSON.parse(res);
                        this.$vc.toast(data.code === 0 ? '添加成功' : data.msg);
                        if (data.code === 0) {
                            $('#addCommonTableModal').modal('hide');
                            this.$vc.emit('assessmentManage', 'list', null);
                        }
                    },
                    err => {

                    })
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    