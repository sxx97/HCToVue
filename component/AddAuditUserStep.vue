
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="addAuditUserStepInfo.index == 0 || addAuditUserStepInfo.index == 1">
        <vc:create name="viewOrgInfo"
                   callBackListener="addAuditUserStep"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="addAuditUserStepInfo.index == 2">
        <vc:create name="viewStaffInfo"
                   callBackListener="addAuditUserStep"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="addAuditUserStepInfo.index == 3">
        <vc:create name="addAuditUserOtherView"
                   callBackListener="addAuditUserStep"
                   callBackFunction="notify"
        ></vc:create>
    </div>


    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="addAuditUserStepInfo.index != 3" type="button" class="btn btn-primary"
                    style="margin-left:10px;" v-on:click="_nextStep()">下一步
            </button>
            <button v-if="addAuditUserStepInfo.index == 3" type="button" class="btn btn-primary"
                    style="margin-left:10px;" v-on:click="_finishStep()">完成
            </button>
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
                return {"addAuditUserStepInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initStep();
        })()(function () {
            this.$vc.on("addAuditUserStep", "notify", function (_info) {
                //this.addAuditUserStepInfo.infos[this.addAuditUserStepInfo.index] = _info;

                if(this.addAuditUserStepInfo.index == 0){
                    this.$vc.copyObject(_info,this.addAuditUserStepInfo.branchOrgInfo);
                    this.addAuditUserStepInfo.infos[0] = this.addAuditUserStepInfo.branchOrgInfo;
                }else if(this.addAuditUserStepInfo.index == 1){
                    this.$vc.copyObject(_info,this.addAuditUserStepInfo.departmemtOrgInfo);
                    this.addAuditUserStepInfo.viewStaffInfo.orgId = _info.orgId
                    this.addAuditUserStepInfo.infos[1] = this.addAuditUserStepInfo.departmemtOrgInfo;
                }else if(this.addAuditUserStepInfo.index == 2){
                    this.$vc.copyObject(_info,this.addAuditUserStepInfo.viewStaffInfo);
                    this.addAuditUserStepInfo.infos[this.addAuditUserStepInfo.index] = _info;
                }else{
                    //this.$vc.copyObject(_info, this.addAuditUserStepInfo.repairDispatchInfo);
                    this.$vc.copyObject(_info,this.addAuditUserStepInfo.auditUserInfo);
                    this.addAuditUserStepInfo.infos[this.addAuditUserStepInfo.index] = _info;
                }
            });

        })()   
            },
            methods: {
                _initStep:function () {
                this.addAuditUserStepInfo.$step = $("#step");
                this.addAuditUserStepInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择分公司", "选择部门", "选择员工", "扩展信息"]
                });
                this.addAuditUserStepInfo.index = this.addAuditUserStepInfo.$step.getIndex();
                this._notifyViewOrgInfoComponentData();
            },_prevStep:function () {
                this.addAuditUserStepInfo.$step.prevStep();
                this.addAuditUserStepInfo.index = this.addAuditUserStepInfo.$step.getIndex();

                this.$vc.emit('viewOrgInfo', 'onIndex', this.addAuditUserStepInfo.index);
                this.$vc.emit('viewStaffInfo', 'onIndex', this.addAuditUserStepInfo.index);
                this.$vc.emit('addAuditUserOther', 'onIndex', this.addAuditUserStepInfo.index);
                this._notifyViewOrgInfoComponentData();

            },_nextStep:function () {
                var _currentData = this.addAuditUserStepInfo.infos[this.addAuditUserStepInfo.index];
                if (_currentData == null || _currentData == undefined) {
                    this.$vc.message("请选择或填写必选信息");
                    return;
                }
                this.addAuditUserStepInfo.$step.nextStep();
                this.addAuditUserStepInfo.index = this.addAuditUserStepInfo.$step.getIndex();

                this.$vc.emit('viewOrgInfo', 'onIndex', this.addAuditUserStepInfo.index);
                this.$vc.emit('viewStaffInfo', 'onIndex', this.addAuditUserStepInfo.index);
                this.$vc.emit('addAuditUserOther', 'onIndex', this.addAuditUserStepInfo.index);
                this._notifyViewOrgInfoComponentData();

            },_finishStep:function () {


                var _currentData = this.addAuditUserStepInfo.infos[this.addAuditUserStepInfo.index];
                if (_currentData == null || _currentData == undefined) {
                    this.$vc.message("请选择或填写必选信息");
                    return;
                }

              
                this.$vc.http.post(
                    'addAuditUserStepBinding',
                    'binding',
                    JSON.stringify(this.addAuditUserStepInfo.auditUserInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        if (res.status == 200) {

                            this.$vc.message('处理成功');
                            //关闭model
                            this.$vc.jumpToPage("/flow/auditUserFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },_notifyViewOrgInfoComponentData:function(){

                if(this.addAuditUserStepInfo.index == 0){
                    this.$vc.emit('viewOrgInfo', '_initInfo',this.addAuditUserStepInfo.branchOrgInfo);
                }else if(this.addAuditUserStepInfo.index == 1){
                    this.addAuditUserStepInfo.departmemtOrgInfo.parentOrgId = this.addAuditUserStepInfo.branchOrgInfo.orgId;
                    this.$vc.emit('viewOrgInfo', '_initInfo',this.addAuditUserStepInfo.departmemtOrgInfo);
                }else if(this.addAuditUserStepInfo.index == 2){
                    this.$vc.emit('viewStaffInfo', '_initInfo',this.addAuditUserStepInfo.viewStaffInfo);
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    