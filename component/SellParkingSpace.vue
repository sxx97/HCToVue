
        <template>
            <div id="component">

    <div class="java110_step">
        <div id="step"></div>
    </div>

    <!-- 选择 应用信息 -->
    <div v-if="sellParkingSpaceInfo.index == 0">

        <!-- 选择停车位 -->
        <vc:create name="viewSelectParkingSpace"
                   callBackComponent="sellParkingSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="sellParkingSpaceInfo.index == 1">
        <vc:create name="viewOwnerInfo"
                   callBackListener="sellParkingSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>
    <div v-if="sellParkingSpaceInfo.index == 2">
        <vc:create name="addCar"
                   callBackComponent="sellParkingSpace"
                   callBackFunction="notify"
        >

        </vc:create>
    </div>

    <div v-if="sellParkingSpaceInfo.index == 3">
        <vc:create name="sellParkingSpaceFee"
                   callBackComponent="sellParkingSpace"
                   callBackFunction="notify"
        ></vc:create>
    </div>


    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-secondary" v-on:click="_prevStep()">上一步</button>
            <button v-if="sellParkingSpaceInfo.index != 3" type="button" class="btn btn-primary"
                    style="margin-left:10px;"
                    v-on:click="_nextStep()">下一步
            </button>
            <button v-if="sellParkingSpaceInfo.index == 3" type="button" class="btn btn-primary"
                    style="margin-left:10px;"
                    v-on:click="_finishStep()">出售
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
                return {"sellParkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._initStep();
        })()(function(){

           this.$vc.on("sellParkingSpace", "notify", function(_info){
                this.sellParkingSpaceInfo.infos[this.sellParkingSpaceInfo.index] = _info;

                /*if(this.sellParkingSpaceInfo.index == 0){
                    this.$vc.emit('searchRoom','listenerFloorInfo',_info);
                }*/
            });

        })()   
            },
            methods: {
                _initStep:function(){
                this.sellParkingSpaceInfo.$step = $("#step");
                this.sellParkingSpaceInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择车位","业主信息","车辆信息","收费信息"]
                });
                this.sellParkingSpaceInfo.index = this.sellParkingSpaceInfo.$step.getIndex();
            },_prevStep:function(){
                this.sellParkingSpaceInfo.$step.prevStep();
                this.sellParkingSpaceInfo.index = this.sellParkingSpaceInfo.$step.getIndex();

                this.$vc.emit('viewSelectParkingSpace', 'onIndex', this.sellParkingSpaceInfo.index);
                this.$vc.emit('viewOwnerInfo', 'onIndex', this.sellParkingSpaceInfo.index);
                this.$vc.emit('addCar', 'onIndex', this.sellParkingSpaceInfo.index);
                this.$vc.emit('sellParkingSpaceFee', 'onIndex', this.sellParkingSpaceInfo.index);

                if(this.sellParkingSpaceInfo.index == 1){
                    this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                }

                if(this.sellParkingSpaceInfo.index == 3){
                    this.$vc.emit('sellParkingSpaceFee','callBackParkingSpaceInfo',{});
                    this.$vc.emit('sellParkingSpaceFee', 'flowComponentShow', true);
                }else{
                    this.$vc.emit('sellParkingSpaceFee', 'flowComponentShow', false);
                }

            },_nextStep:function(){
                var _currentData = this.sellParkingSpaceInfo.infos[this.sellParkingSpaceInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.sellParkingSpaceInfo.$step.nextStep();
                this.sellParkingSpaceInfo.index = this.sellParkingSpaceInfo.$step.getIndex();

                this.$vc.emit('viewSelectParkingSpace', 'onIndex', this.sellParkingSpaceInfo.index);
                this.$vc.emit('viewOwnerInfo', 'onIndex', this.sellParkingSpaceInfo.index);
                this.$vc.emit('addCar', 'onIndex', this.sellParkingSpaceInfo.index);
                this.$vc.emit('parkingSpaceFee', 'onIndex', this.sellParkingSpaceInfo.index);
                if(this.sellParkingSpaceInfo.index == 1){
                    this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                }

                if(this.sellParkingSpaceInfo.index == 3){
                    this.$vc.emit('sellParkingSpaceFee','callBackParkingSpaceInfo',{});
                    this.$vc.emit('sellParkingSpaceFee', 'flowComponentShow', true);
                }else{
                    this.$vc.emit('sellParkingSpaceFee', 'flowComponentShow', false);
                }

            },_finishStep:function(){


                var _currentData = this.sellParkingSpaceInfo.infos[this.sellParkingSpaceInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }

                var param = {
                    communityId:this.$vc.getCurrentCommunity().communityId,
                    data:this.sellParkingSpaceInfo.infos
                }

               this.$vc.http.post(
                   'sellParkingSpace',
                   'sell',
                   JSON.stringify(param),
                   {
                       emulateJSON:true
                    },
                    function(json,res){
                       //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                       if(res.status == 200){
                           //关闭model
                           this.$vc.jumpToPage("/flow/ownerFlow?" + this.$vc.objToGetParam(JSON.parse(json)));
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
    