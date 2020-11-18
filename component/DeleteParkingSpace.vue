
        <template>
            <div class="modal fade" id="deleteParkingSpaceModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否删除!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" >点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteParkingSpace()">确认删除</button>
            </div>
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
                return {"hireParkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            this._initStep();
        })()(function(){

           this.$vc.on("hireParkingSpace", "notify", function(_info){
                this.hireParkingSpaceInfo.infos[this.hireParkingSpaceInfo.index] = _info;

                /*if(this.hireParkingSpaceInfo.index == 0){
                    this.$vc.emit('searchRoom','listenerFloorInfo',_info);
                }*/
            });

        })()   
            },
            methods: {
                _initStep:function(){
                this.hireParkingSpaceInfo.$step = $("#step");
                this.hireParkingSpaceInfo.$step.step({
                    index: 0,
                    time: 500,
                    title: ["选择车位","业主信息","车辆信息","收费信息"]
                });
                this.hireParkingSpaceInfo.index = this.hireParkingSpaceInfo.$step.getIndex();
            },_prevStep:function(){
                this.hireParkingSpaceInfo.$step.prevStep();
                this.hireParkingSpaceInfo.index = this.hireParkingSpaceInfo.$step.getIndex();

                this.$vc.emit('viewSelectParkingSpace', 'onIndex', this.hireParkingSpaceInfo.index);
                this.$vc.emit('viewOwnerInfo', 'onIndex', this.hireParkingSpaceInfo.index);
                this.$vc.emit('addCar', 'onIndex', this.hireParkingSpaceInfo.index);
                this.$vc.emit('parkingSpaceFee', 'onIndex', this.hireParkingSpaceInfo.index);

                if(this.hireParkingSpaceInfo.index == 1){
                    this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                }

            },_nextStep:function(){
                var _currentData = this.hireParkingSpaceInfo.infos[this.hireParkingSpaceInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }
                this.hireParkingSpaceInfo.$step.nextStep();
                this.hireParkingSpaceInfo.index = this.hireParkingSpaceInfo.$step.getIndex();

                this.$vc.emit('viewSelectParkingSpace', 'onIndex', this.hireParkingSpaceInfo.index);
                this.$vc.emit('viewOwnerInfo', 'onIndex', this.hireParkingSpaceInfo.index);
                this.$vc.emit('addCar', 'onIndex', this.hireParkingSpaceInfo.index);
                this.$vc.emit('parkingSpaceFee', 'onIndex', this.hireParkingSpaceInfo.index);
                if(this.hireParkingSpaceInfo.index == 1){
                    this.$vc.emit('viewOwnerInfo','callBackOwnerInfo',{});
                }

            },_finishStep:function(){


                var _currentData = this.hireParkingSpaceInfo.infos[this.hireParkingSpaceInfo.index];
                if( _currentData == null || _currentData == undefined){
                    this.$vc.message("请选择或填写必选信息");
                    return ;
                }

                var param = {
                    communityId:this.$vc.getCurrentCommunity().communityId,
                    data:this.hireParkingSpaceInfo.infos
                }

               this.$vc.http.post(
                   'hireParkingSpace',
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
    