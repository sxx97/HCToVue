
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
    <vc:create name="addRoom"></vc:create>
</div>
        </template>
        <script>
            
            import SearchFloor from '@/component/SearchFloor.vue';import AddRoom from '@/component/AddRoom.vue';



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
                props: {"openAddRoomModelName":"false"},
                components: {
                    SearchFloor,AddRoom
                },
                data () {
                    return {"floorInfo":{"floorId":"","floorName":"","floorNum":""}}    
                },
                mounted() {
                (() =>{

        })()
(() =>{
            this.$vc.on('roomSelectFloor','chooseFloor',(_floor) =>{
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
    