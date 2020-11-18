
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="repairDispatchStepInfo.index == 0 || repairDispatchStepInfo.index == 1">
        <vc:create name="viewOrgInfo"
                   callBackListener="repairDispatchStep"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="repairDispatchStepInfo.index == 2">
        <vc:create name="viewStaffInfo"
                   callBackListener="repairDispatchStep"
                   callBackFunction="notify"
        ></vc:create>
    </div>


    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="repairDispatchStepInfo.index != 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;" v-on:click="_nextStep()">下一步
            </button>
            <button v-if="repairDispatchStepInfo.index == 2" type="button" class="btn btn-primary"
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
                return {"repairDispatchStepInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this.repairDispatchStepInfo.repairId = this.$vc.getParam('repairId');

            if(!this.$vc.notNull(this.repairDispatchStepInfo.repairId)){
                this.$vc.message("非法数据，未找到派单信息");
                this.$vc.jumpToPage("/flow/ownerFlow");
                return ;
            }
            this._initStep();
        })()(function(){
            this.$vc.on("repairDispatchStep", "notify", function(_info){
                if(this.repairDispatchStepInfo.index == 0){
                    this.$vc.copyObject(_info,this.repairDispatchStepInfo.branchOrgInfo);
                    this.repairDispatchStepInfo.infos[0] = this.repairDispatchStepInfo.branchOrgInfo;
                }else if(this.repairDispatchStepInfo.index == 1){
                    this.$vc.copyObject(_info,this.repairDispatchStepInfo.departmemtOrgInfo);
                    this.repairDispatchStepInfo.repairDispatchInfo.orgId = _info.orgId
                    this.repairDispatchStepInfo.infos[1] = this.repairDispatchStepInfo.departmemtOrgInfo;

                }else{
                    this.$vc.copyObject(_info, this.repairDispatchStepInfo.repairDispatchInfo);
                    this.repairDispatchStepInfo.infos[2] = this.repairDispatchStepInfo.repairDispatchInfo;
                }

            });

        })()   
            },
            methods: {
                _initStep:function(){
                this.repairDispatchStepInfo.$step = $("#step");
                this.repairDispatchStepInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择分公司","选择部门","选择员工"]
                });
                this.repairDispatchStepInfo.index = this.repairDispatchStepInfo.$step.getIndex();
                 this._notifyViewOrgInfoComponentData();
            },_prevStep:function(){
                this.repairDispatchStepInfo.$step.prevStep();
                this.repairDispatchStepInfo.index = this.repairDispatchStepInfo.$step.getIndex();

                this.$vc.emit('viewOrgInfo', 'onIndex', this.repairDispatchStepInfo.index);
                this.$vc.emit('viewStaffInfo', 'onIndex', this.repairDispatchStepInfo.index);
                this._notifyViewOrgInfoComponentData();
            },_nextStep:function(){
                var _currentData = this.repairDispatchStepInfo.infos[this.repairDispatchStepInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.repairDispatchStepInfo.$step.nextStep();
                this.repairDispatchStepInfo.index = this.repairDispatchStepInfo.$step.getIndex();

                 this.$vc.emit('viewOrgInfo', 'onIndex', this.repairDispatchStepInfo.index);
                this.$vc.emit('viewStaffInfo', 'onIndex', this.repairDispatchStepInfo.index);
                this._notifyViewOrgInfoComponentData();

            },_finishStep:function(){


                var _currentData = this.repairDispatchStepInfo.infos[this.repairDispatchStepInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }

                this.repairDispatchStepInfo.repairDispatchInfo.repairId = this.repairDispatchStepInfo.repairId;
                this.repairDispatchStepInfo.repairDispatchInfo.communityId = this.$vc.getCurrentCommunity().communityId;

               this.$vc.http.post(
                   'repairDispatchStepBinding',
                   'binding',
                   JSON.stringify(this.repairDispatchStepInfo.repairDispatchInfo),
                   {
                       emulateJSON:true
                    },
                    function(json,res){
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           this.$vc.jumpToPage("/flow/repairDispatchFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
                           return ;
                       }
                       this.$vc.message(json);
                    },
                    function(errInfo,error){
                       console.log('请求失败处理');

                       this.$vc.message(errInfo);
                    });
            },_notifyViewOrgInfoComponentData:function(){

                if(this.repairDispatchStepInfo.index == 0){
                    this.$vc.emit('viewOrgInfo', '_initInfo',this.repairDispatchStepInfo.branchOrgInfo);
                }else if(this.repairDispatchStepInfo.index == 1){
                    this.repairDispatchStepInfo.departmemtOrgInfo.parentOrgId = this.repairDispatchStepInfo.branchOrgInfo.orgId;
                    this.$vc.emit('viewOrgInfo', '_initInfo',this.repairDispatchStepInfo.departmemtOrgInfo);
                }else{
                    this.$vc.emit('viewStaffInfo', '_initInfo',this.repairDispatchStepInfo.departmemtOrgInfo);
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    