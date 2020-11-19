
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
            
            import ViewOrgInfo from '@/component/ViewOrgInfo.vue';import AddStaffView from '@/component/AddStaffView.vue';



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
                    ViewOrgInfo,AddStaffView
                },
                data () {
                    return {"addStaffStepInfo":{"$step":{},"index":0,"infos":[],"branchOrgInfo":{"orgId":"","componentName":"分公司信息","buttonName":"选择分公司","orgName":"","orgLevel":"2","parentOrgId":"","description":""},"departmemtOrgInfo":{"orgId":"","componentName":"部门信息","buttonName":"选择部门","orgName":"","orgLevel":"3","parentOrgId":"","description":"","department":""},"staffInfo":{"orgId":"","username":"","sex":"","email":"","tel":"","address":"","relCd":"","rfidCard":"","photo":""}}}    
                },
                mounted() {
                (() =>{
            this._initStep();
        })()
(() =>{
            this.$vc.on("addStaffStep", "notify", (_info) =>{
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
                    (json,res) =>{
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           this.$vc.jumpToPage("/flow/staff");
                           return ;
                       }
                       this.$vc.message(json);
                    },
                    (errInfo,error) =>{
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
    