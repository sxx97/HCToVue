
        <template>
            <div v-for=" roomInfo in showOwnerRoomInfo.rooms">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>{{roomInfo.roomNum}}房间信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                v-if="showOwnerRoomInfo.deleteOwnerRoomFlag == 'true'"
                                v-on:click="ownerExitRoomModel(roomInfo.roomId)">
                            <i class="glyphicon glyphicon-remove"></i> 房间解绑
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">楼栋：</label>
                                <label class="">{{roomInfo.floorNum}}号楼</label>
                            </div>
                        </div>
                        <!--<div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">单元：</label>
                                <label class="">{{roomInfo.unitNum}}单元</label>
                            </div>
                        </div>-->
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">房间编号：</label>
                                <label class="">{{roomInfo.roomNum}}室</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">创建员工：</label>
                                <label class="">{{roomInfo.userName}}</label>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">房间ID：</label>
                                <label class="">{{roomInfo.roomId}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">楼层：</label>
                                <label class="">{{roomInfo.layer}}层</label>
                            </div>
                        </div>
                        <!--<div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">房间数：</label>
                                <label class="">{{roomInfo.section}}</label>
                            </div>
                        </div>-->
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">建筑面积：</label>
                                <label class="">{{roomInfo.builtUpArea}}平方米</label>
                            </div>
                        </div>
                    </div>
<!--                    <div class="row">-->
<!--                        <div class="col-sm-4">-->
<!--                            <div class="form-group">-->
<!--                                <label class="col-form-label">户型：</label>-->
<!--                                <label class="">{{roomInfo.apartment}}</label>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="col-sm-4">-->
<!--                            <div class="form-group">-->
<!--                                <label class="col-form-label">建筑面积：</label>-->
<!--                                <label class="">{{roomInfo.builtUpArea}}平方米</label>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="col-sm-4">-->
<!--                            <div class="form-group">-->
<!--                                <label class="col-form-label">单价：</label>-->
<!--                                <label class="">{{roomInfo.unitPrice}}元/平方米</label>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                    </div>-->
                </div>
            </div>
        </div>
        <div v-if="showOwnerRoomInfo.deleteOwnerRoomFlag == 'true'">
            <OwnerExitRoom name="ownerExitRoom"></OwnerExitRoom>
        </div>
    </div>
    <!--
        物业费信息
    <div class="row"  v-if="showOwnerRoomInfo.deleteOwnerRoomFlag == 'false'">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>{{roomInfo.roomNum}}物业费信息</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">

                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">物业费ID：</label>
                                <label class="">{{roomInfo.feeId}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">物业费开始时间：</label>
                                <label class="">{{roomInfo.startTime}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">物业费结束时间：</label>
                                <label class="">{{roomInfo.endTime}}</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>-->
</div>

        </template>
        <script>
            import OwnerExitRoom from './OwnerExitRoom.vue';
        export default {
            props: {"deleteOwnerRoomFlag":"false"},
            components: {
                
            },
            data () {
                return {"showOwnerRoomInfo":"[object Object]"}    
            },
            mounted() {
             (function(){

         //加载 业主信息
            var _ownerId = this.$vc.getParam('ownerId')
            if(!this.$vc.notNull(_ownerId)){
                return ;
            }

            this.showOwnerRoomInfo.ownerId = _ownerId;

            this.loadRooms();

        })()(function(){
            this.$vc.on('showOwnerRoom','notify',function(_owner){
                this.showOwnerRoomInfo.ownerId = _owner.ownerId;

                //查询 根据业主查询房间信息
                this.loadRooms();
            });

        })()   
            },
            methods: {
                loadRooms:function(){
                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        ownerId:this.showOwnerRoomInfo.ownerId
                    }
                };

                //发送get请求
                this.$vc.http.get('showOwnerRoom',
                            'list',
                             param,
                             function(json){
                                var _roomInfo = JSON.parse(json);
                                this.showOwnerRoomInfo.rooms = _roomInfo.rooms;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },ownerExitRoomModel:function(_roomId){
                this.$vc.emit('ownerExitRoom','openExitRoomModel',{
                    ownerId:this.showOwnerRoomInfo.ownerId,
                    roomId:_roomId
                });
            },showState:function(_state){
                if(_state == '2001'){
                    return "房间已售";
                }else if(_state == '2002'){
                    return "房间未售";
                }else if(_state == '2003'){
                    return "已交定金";
                }
                else if(_state == '2004'){
                    return "已出租";
                }else{
                    return "未知";
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    