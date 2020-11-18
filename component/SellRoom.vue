
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"sellRoomInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('sellRoom','notify',function(_param){
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
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            this.$vc.jumpToPage("/flow/ownerRoomFlow?" + this.$vc.objToGetParam(this.sellRoomInfo.ownerInfo));
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    