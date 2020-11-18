
        <template>
            <div v-for=" parkingSpaceInfo in showOwnerParkingSpaceInfo.parkingSpaces">
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>{{parkingSpaceInfo.num}}车位信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm" v-if="showOwnerParkingSpaceInfo.deleteOwnerParkingSpaceFlag == 'true'"
                                v-on:click="ownerExitParkingSpaceModel(parkingSpaceInfo.psId)">
                            <i class="glyphicon glyphicon-remove"></i> 我要退款
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车位ID：</label>
                                <label class="">{{parkingSpaceInfo.psId}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车位编号：</label>
                                <label class="">{{parkingSpaceInfo.num}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车位类型：</label>
                                <label class="">{{parkingSpaceInfo.typeCdName}}</label>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车位状态：</label>
                                <label class="">{{parkingSpaceInfo.stateName}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车位面积：</label>
                                <label class="">{{parkingSpaceInfo.area}}平方米</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车辆ID：</label>
                                <label class="">{{parkingSpaceInfo.carId}}</label>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车牌号：</label>
                                <label class="">{{parkingSpaceInfo.carNum}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车品牌：</label>
                                <label class="">{{parkingSpaceInfo.carBrand}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">车类型：</label>
                                <label class="">{{parkingSpaceInfo.carType}}</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div v-if="showOwnerParkingSpaceInfo.deleteOwnerParkingSpaceFlag == 'true'">
            <OwnerExitParkingSpace name="ownerExitParkingSpace"></OwnerExitParkingSpace>
        </div>
    </div>

    <div class="row" v-if="showOwnerParkingSpaceInfo.deleteOwnerParkingSpaceFlag == 'false'">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>{{parkingSpaceInfo.num}}停车费信息</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">费用开始时间：</label>
                                <label class="">{{parkingSpaceInfo.startTime}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label class="col-form-label">费用到期时间：</label>
                                <label class="">{{parkingSpaceInfo.endTime}}</label>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group" v-if="parkingSpaceInfo.amount != '-1.00'">
                                <label class="col-form-label">费用金额：</label>
                                <label class="">{{parkingSpaceInfo.amount}}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <OwnerExitParkingSpace name="ownerExitParkingSpace"></OwnerExitParkingSpace>
    </div>
</div>
        </template>
        <script>
            import OwnerExitParkingSpace from './OwnerExitParkingSpace.vue';import OwnerExitParkingSpace from './OwnerExitParkingSpace.vue';
        export default {
            props: {"deleteOwnerParkingSpaceFlag":"false"},
            components: {
                
            },
            data () {
                return {"showOwnerParkingSpaceInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
            //加载 业主信息
            var _ownerId = this.$vc.getParam('ownerId')
            if(!this.$vc.notNull(_ownerId)){
                return ;
            }

            this.showOwnerParkingSpaceInfo.ownerId = _ownerId;

            this.loadParkingSpaces();
        })()(function(){
            this.$vc.on('showOwnerParkingSpace','notify',function(_owner){
                this.showOwnerParkingSpaceInfo.ownerId = _owner.ownerId;

                //查询 根据业主查询房间信息
                this.loadParkingSpaces();
            });

        })()   
            },
            methods: {
                loadParkingSpaces:function(){
                var param = {
                    params:{
                        communityId:this.$vc.getCurrentCommunity().communityId,
                        ownerId:this.showOwnerParkingSpaceInfo.ownerId
                    }
                };

                //发送get请求
                this.$vc.http.get('showOwnerParkingSpace',
                            'list',
                             param,
                             function(json){
                                var _parkingSpaceInfo = JSON.parse(json);
                                this.showOwnerParkingSpaceInfo.parkingSpaces = _parkingSpaceInfo.parkingSpaces;
                             },function(){
                                console.log('请求失败处理');
                             }
                           );
            },ownerExitParkingSpaceModel:function(_psId){
                this.$vc.emit('ownerExitParkingSpace','openExitParkingSpaceModel',{
                    ownerId:this.showOwnerParkingSpaceInfo.ownerId,
                    psId:_psId
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
    