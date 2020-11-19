
        <template>
            <div id="loadingComponent" class="java110_loading" v-bind:class="{no_display:loadingInfo.hide}">
    <!--<div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
    </div>-->

    <div class="sk-spinner sk-spinner-wave" style="margin: 70px auto;">
        <div class="sk-rect1"></div>
        <div class="sk-rect2"></div>
        <div class="sk-rect3"></div>
        <div class="sk-rect4"></div>
        <div class="sk-rect5"></div>
    </div>
</div>
        </template>
        <script>
            
            import ViewOrgInfo from '@/component/ViewOrgInfo.vue';import ViewStaffInfo from '@/component/ViewStaffInfo.vue';



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
                    ViewOrgInfo,ViewStaffInfo
                },
                data () {
                    return {"repairDispatchStepInfo":{"$step":{},"index":0,"repairId":"","infos":[],"branchOrgInfo":{"orgId":"","componentName":"分公司信息","buttonName":"选择分公司","orgName":"","orgLevel":"2","parentOrgId":"","description":""},"departmemtOrgInfo":{"orgId":"","componentName":"部门信息","buttonName":"选择部门","orgName":"","orgLevel":"3","parentOrgId":"","description":""},"repairDispatchInfo":{"orgId":"","userId":"","name":"","email":"","tel":"","sex":""}}}    
                },
                mounted() {
                (() =>{
            this.repairDispatchStepInfo.repairId = this.$vc.getParam('repairId');

            if(!this.$vc.notNull(this.repairDispatchStepInfo.repairId)){
                this.$vc.message("非法数据，未找到派单信息");
                this.$vc.jumpToPage("/flow/ownerFlow");
                return ;
            }
            this._initStep();
        })()
(() =>{
            this.$vc.on("repairDispatchStep", "notify", (_info) =>{
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
                    (json,res) =>{
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           this.$vc.jumpToPage("/flow/repairDispatchFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
                           return ;
                       }
                       this.$vc.message(json);
                    },
                    (errInfo,error) =>{
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
    