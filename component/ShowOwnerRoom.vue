
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
            <vc:create name="ownerExitRoom"></vc:create>
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
            
            import OwnerExitRoom from '@/component/OwnerExitRoom.vue';



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
                props: {"deleteOwnerRoomFlag":"false"},
                components: {
                    OwnerExitRoom
                },
                data () {
                    return {"showOwnerRoomInfo":{"ownerId":"","rooms":[]}}    
                },
                mounted() {
                (() =>{

         //加载 业主信息
            var _ownerId = this.$vc.getParam('ownerId')
            if(!this.$vc.notNull(_ownerId)){
                return ;
            }

            this.showOwnerRoomInfo.ownerId = _ownerId;

            this.loadRooms();

        })()
(() =>{
            this.$vc.on('showOwnerRoom','notify',(_owner) =>{
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
                             (json) =>{
                                var _roomInfo = JSON.parse(json);
                                this.showOwnerRoomInfo.rooms = _roomInfo.rooms;
                             },() =>{
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
    