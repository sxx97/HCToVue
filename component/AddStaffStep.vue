
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="addStaffStepInfo.index == 0 || addStaffStepInfo.index == 1">
        <vc:create name="viewOrgInfo"
                   callBackListener="addStaffStep"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="addStaffStepInfo.index == 2">
        <vc:create name="addStaffView"
                   callBackListener="addStaffStep"
                   callBackFunction="notify"
        ></vc:create>
    </div>


    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="addStaffStepInfo.index != 2" type="button" class="btn btn-primary" style="margin-left:10px;"
                    v-on:click="_nextStep()">下一步
            </button>
            <button v-if="addStaffStepInfo.index == 2" type="button" class="btn btn-primary" style="margin-left:10px;"
                    v-on:click="_finishStep()">完成
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
                return {"addStaffStepInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._initStep();
        })()(function(){
            this.$vc.on("addStaffStep", "notify", function(_info){
                if(this.addStaffStepInfo.index == 0){
                    this.$vc.copyObject(_info,this.addStaffStepInfo.branchOrgInfo);
                    this.addStaffStepInfo.infos[0] = this.addStaffStepInfo.branchOrgInfo;
                }else if(this.addStaffStepInfo.index == 1){
                    this.$vc.copyObject(_info, this.addStaffStepInfo.departmemtOrgInfo);
                    this.addStaffStepInfo.staffInfo.orgId = _info.orgId
                    this.addStaffStepInfo.infos[1] = this.addStaffStepInfo.departmemtOrgInfo;

                }else{
                    this.$vc.copyObject(_info, this.addStaffStepInfo.staffInfo);
                    this.addStaffStepInfo.infos[2] = this.addStaffStepInfo.staffInfo;
                }

            });

        })()   
            },
            methods: {
                _initStep:function(){
                this.addStaffStepInfo.$step = $("#step");
                this.addStaffStepInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择分公司","选择部门","员工信息"]
                });
                this.addStaffStepInfo.index = this.addStaffStepInfo.$step.getIndex();
                this._notifyViewOrgInfoComponentData();
            },_prevStep:function(){
                this.addStaffStepInfo.$step.prevStep();
                this.addStaffStepInfo.index = this.addStaffStepInfo.$step.getIndex();

                this.$vc.emit('viewOrgInfo', 'onIndex', this.addStaffStepInfo.index);
                this.$vc.emit('addStaffViewInfo', 'onIndex', this.addStaffStepInfo);
                this._notifyViewOrgInfoComponentData();
            },_nextStep:function(){
                var _currentData = this.addStaffStepInfo.infos[this.addStaffStepInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.addStaffStepInfo.$step.nextStep();
                this.addStaffStepInfo.index = this.addStaffStepInfo.$step.getIndex();

                 this.$vc.emit('viewOrgInfo', 'onIndex', this.addStaffStepInfo.index);
                this.$vc.emit('addStaffViewInfo', 'onIndex', this.addStaffStepInfo);
                this._notifyViewOrgInfoComponentData();
            },_finishStep:function(){

                //this.addStaffStepInfo.staffInfo.departmentOrgId = this.addStaffStepInfo.infos[1].orgId;
                var _currentData = this.addStaffStepInfo.infos[this.addStaffStepInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.addStaffStepInfo.staffInfo.parentOrgId = this.addStaffStepInfo.departmemtOrgInfo.parentOrgId;
               this.$vc.http.post(
                   'addStaffStepBinding',
                   'binding',
                   JSON.stringify(this.addStaffStepInfo.staffInfo),
                   {
                       emulateJSON:true
                    },
                    function(json,res){
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           this.$vc.jumpToPage("/flow/staff");
                           return ;
                       }
                       this.$vc.message(json);
                    },
                    function(errInfo,error){
                       console.log('请求失败处理');

                       this.$vc.message(errInfo);
                    });
            },_notifyViewOrgInfoComponentData:function(){

                if(this.addStaffStepInfo.index == 0){
                    this.$vc.emit('viewOrgInfo', '_initInfo',this.addStaffStepInfo.branchOrgInfo);
                }else if(this.addStaffStepInfo.index == 1){
                    this.addStaffStepInfo.departmemtOrgInfo.parentOrgId = this.addStaffStepInfo.branchOrgInfo.orgId;
                    this.$vc.emit('viewOrgInfo', '_initInfo',this.addStaffStepInfo.departmemtOrgInfo);
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    