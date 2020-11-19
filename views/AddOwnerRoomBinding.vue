
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="addOwnerRoomBindingInfo.index == 0">
        <vc:create name="viewFloorInfo"
                   callBackListener="addOwnerRoomBinding"
                   callBackFunction="notify"
                   showAddFloorButton="false"
        ></vc:create>
    </div>
    <div v-if="addOwnerRoomBindingInfo.index == 1">
        <vc:create name="sellRoomSelectRoom"
                   callBackListener="addOwnerRoomBinding"
                   callBackFunction="notify"
        ></vc:create>
        <vc:create name="searchRoom"
                   emitChooseRoom="sellRoomSelectRoom"
                   emitLoadData="sellRoomOther"
                   roomFlag="2"
        ></vc:create>
    </div>
    <div v-if="addOwnerRoomBindingInfo.index == 2">
        <vc:create name="viewOwnerInfo"
                   callBackListener="addOwnerRoomBinding"
                   callBackFunction="notify"
        ></vc:create>
    </div>



    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="addOwnerRoomBindingInfo.index != 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;"
                    v-on:click="_nextStep()">下一步
            </button>
            <button v-if="addOwnerRoomBindingInfo.index == 2" type="button" class="btn btn-primary"
                    style="margin-left:10px;"
                    v-on:click="_finishStep()">完成
            </button>
        </div>
    </div>

</div>

        </template>
        <script>
            
            import ViewFloorInfo from '@/component/ViewFloorInfo.vue';import SellRoomSelectRoom from '@/component/SellRoomSelectRoom.vue';import SearchRoom from '@/component/SearchRoom.vue';import ViewOwnerInfo from '@/component/ViewOwnerInfo.vue';



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
                    ViewFloorInfo,SellRoomSelectRoom,SearchRoom,ViewOwnerInfo
                },
                data () {
                    return {"addOwnerRoomBindingInfo":{"$step":{},"index":0,"infos":[]}}    
                },
                mounted() {
                (() =>{
            this._initStep();
        })()
(() =>{
            this.$vc.on("addOwnerRoomBinding", "notify", (_info) =>{
                this.addOwnerRoomBindingInfo.infos[this.addOwnerRoomBindingInfo.index] = _info;

                if(this.addOwnerRoomBindingInfo.index == 0){
                    this.$vc.emit('searchRoom','listenerFloorInfo',_info);
                }
            });

        })()   
                },
                methods: {
                    _initStep:function(){
                this.addOwnerRoomBindingInfo.$step = $("#step");
                this.addOwnerRoomBindingInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择楼栋","选择房间", window.location.search.includes('tenant') ? '租客信息' : "业主信息"]
                });
                this.addOwnerRoomBindingInfo.index = this.addOwnerRoomBindingInfo.$step.getIndex();
            },_prevStep:function(){
                this.addOwnerRoomBindingInfo.$step.prevStep();
                this.addOwnerRoomBindingInfo.index = this.addOwnerRoomBindingInfo.$step.getIndex();

                this.$vc.emit('viewFloorInfo', 'onIndex', this.addOwnerRoomBindingInfo.index);
                this.$vc.emit('sellRoomSelectRoom', 'onIndex', this.addOwnerRoomBindingInfo.index);
                this.$vc.emit('viewOwnerInfo', 'onIndex', this.addOwnerRoomBindingInfo.index);
                if(this.addOwnerRoomBindingInfo.index == 2){
                    this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                }

            },_nextStep:function(){
                var _currentData = this.addOwnerRoomBindingInfo.infos[this.addOwnerRoomBindingInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.addOwnerRoomBindingInfo.$step.nextStep();
                this.addOwnerRoomBindingInfo.index = this.addOwnerRoomBindingInfo.$step.getIndex();

                 this.$vc.emit('viewFloorInfo', 'onIndex', this.addOwnerRoomBindingInfo.index);
                this.$vc.emit('sellRoomSelectRoom', 'onIndex', this.addOwnerRoomBindingInfo.index);
                this.$vc.emit('viewOwnerInfo', 'onIndex', this.addOwnerRoomBindingInfo.index);
                if(this.addOwnerRoomBindingInfo.index == 2){
                    this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                }

            },_finishStep:function(){


                var _currentData = this.addOwnerRoomBindingInfo.infos[this.addOwnerRoomBindingInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                // 业主传0 租客传1
                let refType = 0;
                if (window.location.search.includes('tenant')) {
                    refType = 1;
                    this.addOwnerRoomBindingInfo.infos[2].ownerId = getQueryString('ownerId');
                }
                var param = {
                    refType,
                    communityId:this.$vc.getCurrentCommunity().communityId,
                    data:this.addOwnerRoomBindingInfo.infos
                }

               this.$vc.http.post(
                   'addOwnerRoomBinding',
                   'binding',
                   JSON.stringify(param),
                   {
                       emulateJSON:true
                    },
                    (json,res) =>{
                       if(res.status == 200){

                           this.$vc.message('处理成功',true);
                           //关闭model
                           let jumpUrl = '/flow/ownerFlow';
                           if (window.location.search.includes('tenant')) {
                               jumpUrl = '/flow/tenantFlow';
                           }
                           this.$vc.jumpToPage(jumpUrl+"?" + this.$vc.objToGetParam(JSON.parse(json)));
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
    