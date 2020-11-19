
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="newVisitInfo.index == 0">

        <!-- 选择停车位 -->
        <vc:create name="viewVisitInfo"
                   callBackComponent="addVisitSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="newVisitInfo.index == 1">
        <vc:create name="visitForOwner"
                   callBackListener="addVisitSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="newVisitInfo.index == 2">
        <vc:create name="addVisitCase"
                   callBackComponent="addVisitSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>



    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="newVisitInfo.index != 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;"
                    v-on:click="_nextStep()">下一步
            </button>
            <button v-if="newVisitInfo.index == 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;"
                    v-on:click="_addVisitFinish()">登记
            </button>
        </div>
    </div>

</div>
        </template>
        <script>
            
            import ViewVisitInfo from '@/component/ViewVisitInfo.vue';import VisitForOwner from '@/component/VisitForOwner.vue';import AddVisitCase from '@/component/AddVisitCase.vue';



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
                    ViewVisitInfo,VisitForOwner,AddVisitCase
                },
                data () {
                    return {"newVisitInfo":{"$step":{},"index":0,"infos":[]}}    
                },
                mounted() {
                (() =>{
            this._initStep();
        })()
(() =>{

           this.$vc.on("addVisitSpace", "notify", (_info) =>{
               console.log("侦听到index为 "+_info);
                this.newVisitInfo.infos[this.newVisitInfo.index] = _info;
            });
            this.$vc.on("addVisitSpace", "ownerId", (_ownerId) =>{
                this.newVisitInfo.infos[0]["ownerId"] = _ownerId;
            });
            this.$vc.on("addVisitSpace", "visitCase", (_visitCase) =>{
                this.newVisitInfo.infos[0]["visitCase"] = _visitCase;
            });

        })()   
                },
                methods: {
                    _initStep:function(){
                this.newVisitInfo.$step = $("#step");
                this.newVisitInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["新增访客","选择目标业主","填写拜访事由"]
                });
                this.newVisitInfo.index = this.newVisitInfo.$step.getIndex();
            },_prevStep:function(){
                this.newVisitInfo.$step.prevStep();
                this.newVisitInfo.index = this.newVisitInfo.$step.getIndex();

                this.$vc.emit('addVisit', 'onIndex', this.newVisitInfo.index);
                this.$vc.emit('visitForOwner', 'onIndex', this.newVisitInfo.index);
                this.$vc.emit('addVisitCase', 'onIndex', this.newVisitInfo.index);

                // if(this.newVisitInfo.index == 1){
                //     this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                // }

            },_nextStep:function(){
                var _currentData = this.newVisitInfo.infos[this.viewVisitInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.newVisitInfo.$step.nextStep();
                this.newVisitInfo.index = this.newVisitInfo.$step.getIndex();
                this.$vc.emit('addVisit', 'onIndex', this.newVisitInfo.index);
                this.$vc.emit('visitForOwner', 'onIndex', this.newVisitInfo.index);
                this.$vc.emit('addVisitCase', 'onIndex', this.newVisitInfo.index);

                // if(this.newVisitInfo.index == 1){
                //     this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                // }

            },_addVisitFinish:function(){


                var _currentData = this.newVisitInfo.infos[this.newVisitInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.newVisitInfo.infos[0]['communityId']=this.$vc.getCurrentCommunity().communityId;
                var param = {
                    vName:this.newVisitInfo.infos[0]['vName'],
                    visitGender:this.newVisitInfo.infos[0]['visitGender'],
                    phoneNumber:this.newVisitInfo.infos[0]['phoneNumber'],
                    communityId:this.newVisitInfo.infos[0]['communityId'],
                    ownerId:this.newVisitInfo.infos[0]['ownerId'],
                    visitCase:this.newVisitInfo.infos[0]['visitCase'],
                    visitTime:this.newVisitInfo.infos[0]['visitTime'],
                    departureTime:this.newVisitInfo.infos[0]['departureTime']
                }
                console.log(param);
               this.$vc.http.post(
                   'addVisit',
                   'save',
                   JSON.stringify(param),
                   {
                       emulateJSON:true
                    },
                    (json,res) =>{
                       //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                       if(res.status == 200){
                           //关闭model
                           this.$vc.jumpToPage("/flow/visitFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
                           return ;
                       }
                       this.$vc.message(json);
                    },
                    (errInfo,error) =>{
                       console.log('请求失败处理');

                       this.$vc.message(errInfo);
                    });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    