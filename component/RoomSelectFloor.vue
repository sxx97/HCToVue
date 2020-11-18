
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>写字楼信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm" v-on:click="openSearchFloorModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择写字楼</button>
                    <!--<button type="button" class="btn btn-primary btn-sm"
                            v-if="floorInfo.floorId != null && floorInfo.floorId != ''"
                            style="margin-left:10px" v-on:click="openAddRoomModel()">
                        <i class="glyphicon glyphicon-plus" ></i> 添加房间</button>-->
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label" >写字楼ID：</label>
                            <label class="">{{floorInfo.floorId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label">名称：</label>
                            <label class="">{{floorInfo.floorName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group">
                            <label class="col-form-label" >编号：</label>
                            <label class="">{{floorInfo.floorNum}}</label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <vc:create name="searchFloor"
               emitChooseFloor="roomSelectFloor"
               emitLoadData="room"
    ></vc:create>
    <AddRoom name="addRoom"></AddRoom>
</div>
        </template>
        <script>
            import AddRoom from './AddRoom.vue';
        export default {
            props: {"openAddRoomModelName":"false"},
            components: {
                
            },
            data () {
                return {"floorInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

        })()(function(){
            this.$vc.on('roomSelectFloor','chooseFloor',function(_floor){
                this.floorInfo = _floor;
            });

        })()   
            },
            methods: {
                openSearchFloorModel:function(){
                this.$vc.emit('searchFloor','openSearchFloorModel',{});
            },openAddRoomModel:function(){
                this.$vc.emit(this.$vc._thisopenAddRoomModelName,'addRoomModel',{
                    floorId:this.floorInfo.floorId
                });
            },roomSelectFloorCallBack:function(obj){
                console.log("回调函数",obj);
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    