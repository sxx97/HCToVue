
        <template>
            <div id="component" >
    <vc:create name="sellRoomSelectOwner"
               callBackComponent = "sellRoom"
    ></vc:create>

    <vc:create name="sellRoomSelectRoom"
               callBackListener="sellRoom"
               callBackFunction="notify"
    ></vc:create>
    <vc:create name="searchRoom"
               emitChooseRoom="sellRoomSelectRoom"
               emitLoadData="sellRoomOther"
               roomFlag="2"
    ></vc:create>

    <vc:create name="sellRoomOther"
    ></vc:create>

    <div style="height:50px">
        <button class="btn btn-primary float-right" type="button" v-on:click="doSellRoom()" ><i class="fa fa-check"></i>&nbsp;我要售卖</button>
    </div>

</div>
        </template>
        <script>
            
            import SellRoomSelectOwner from '@/component/SellRoomSelectOwner.vue';import SellRoomSelectRoom from '@/component/SellRoomSelectRoom.vue';import SearchRoom from '@/component/SearchRoom.vue';import SellRoomOther from '@/component/SellRoomOther.vue';



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
                    SellRoomSelectOwner,SellRoomSelectRoom,SearchRoom,SellRoomOther
                },
                data () {
                    return {"sellRoomInfo":{"ownerId":"","roomId":"","state":"","remark":"","ownerInfo":{"ownerId":"","name":"","age":"","sex":"","userName":"","remark":"","link":""}}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('sellRoom','notify',(_param) =>{
                  this.$vc.copyObject(_param,this.sellRoomInfo.ownerInfo);

                  if(_param.hasOwnProperty("ownerId")){
                    this.sellRoomInfo.ownerId = _param.ownerId;
                  }

                   if(_param.hasOwnProperty("roomId")){
                      this.sellRoomInfo.roomId = _param.roomId;
                    }

                if(_param.hasOwnProperty("otherState")){
                   this.sellRoomInfo.state = _param.otherState;
                 }

                  if(_param.hasOwnProperty("otherRemark")){
                     this.sellRoomInfo.remark = _param.otherRemark;
                   }


            });
        })()   
                },
                methods: {
                    sellRoomValidate:function(){
                        return this.$vc.validate.validate({
                            sellRoomInfo:this.sellRoomInfo
                        },{
                            'sellRoomInfo.ownerId':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"未选择业主"
                                }
                            ],
                            'sellRoomInfo.roomId':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"未选择房间"
                                }
                            ],
                            'sellRoomInfo.state':[
                                {
                                    limit:"required",
                                    param:"",
                                    errInfo:"未选择出售状态"
                                }
                            ],


                        });
             },doSellRoom:function(){
                //
                if(!this.sellRoomValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }

                this.sellRoomInfo.communityId=this.$vc.getCurrentCommunity().communityId;
            this.$vc.http.post(
                    'sellRoom',
                    'sell',
                    JSON.stringify(this.sellRoomInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            this.$vc.jumpToPage("/flow/ownerRoomFlow?" + this.$vc.objToGetParam(this.sellRoomInfo.ownerInfo));
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
    