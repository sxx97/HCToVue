
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
            <vc:create name="ownerExitParkingSpace"></vc:create>
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
        <vc:create name="ownerExitParkingSpace"></vc:create>
    </div>
</div>
        </template>
        <script>
            
            import OwnerExitParkingSpace from '@/component/OwnerExitParkingSpace.vue';import OwnerExitParkingSpace from '@/component/OwnerExitParkingSpace.vue';



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
                props: {"deleteOwnerParkingSpaceFlag":"false"},
                components: {
                    OwnerExitParkingSpace,OwnerExitParkingSpace
                },
                data () {
                    return {"showOwnerParkingSpaceInfo":{"ownerId":"","parkingSpaces":[]}}    
                },
                mounted() {
                (() =>{
            //加载 业主信息
            var _ownerId = this.$vc.getParam('ownerId')
            if(!this.$vc.notNull(_ownerId)){
                return ;
            }

            this.showOwnerParkingSpaceInfo.ownerId = _ownerId;

            this.loadParkingSpaces();
        })()
(() =>{
            this.$vc.on('showOwnerParkingSpace','notify',(_owner) =>{
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
                             (json) =>{
                                var _parkingSpaceInfo = JSON.parse(json);
                                this.showOwnerParkingSpaceInfo.parkingSpaces = _parkingSpaceInfo.parkingSpaces;
                             },() =>{
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
    