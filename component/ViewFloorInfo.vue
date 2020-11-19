
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>楼信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewFloorInfo.index != 2" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectFloorInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择楼
                    </button>

                    <button type="button" v-if="viewFloorInfo.index != 2 && viewFloorInfo.showAddFloorButton== 'true'" class="btn btn-primary btn-sm"
                            v-on:click="_openAddFloorInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加楼
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">楼ID：</label>
                            <label class="">{{viewFloorInfo.floorId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">楼名称：</label>
                            <label class="">{{viewFloorInfo.floorName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">楼编号：</label>
                            <label class="">{{viewFloorInfo.floorNum}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">备注：</label>
                            <label class="">{{viewFloorInfo.remark}}</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <vc:create name="addFloor"
               callBackListener="viewFloorInfo"
               callBackFunction="chooseFloor"
    ></vc:create>


    <vc:create name="chooseFloor"
               emitChooseFloor="viewFloorInfo"
               emitLoadData="viewFloorInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddFloor from '@/component/AddFloor.vue';import ChooseFloor from '@/component/ChooseFloor.vue';



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
                props: {"callBackListener":"true","callBackFunction":"true","showAddFloorButton":"true"},
                components: {
                    AddFloor,ChooseFloor
                },
                data () {
                    return {"viewFloorInfo":{"index":0,"flowComponent":"viewFloorInfo","floorId":"","floorName":"","name":"","floorNum":"","remark":"","communityId":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadFloorInfoData();
        })()
(() =>{
            this.$vc.on('viewFloorInfo','chooseFloor',(_app) =>{
                this.$vc.copyObject(_app, this.viewFloorInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewFloorInfo);
                this.$vc.emit('chooseUnit', 'onFloorInfo', {
                    floorId: this.viewFloorInfo.floorId
                });
                this.$vc.emit('addUnit', 'onFloorInfo', {
                    floorId: this.viewFloorInfo.floorId
                });
                this.$vc.emit('viewUnitInfo', 'onFloorInfo', {
                    floorId: this.viewFloorInfo.floorId
                });
            });

            this.$vc.on('viewFloorInfo', 'onIndex', (_index) =>{
                this.viewFloorInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectFloorInfoModel(){
                this.$vc.emit('chooseFloor','openChooseFloorModel',{});
            },_openAddFloorInfoModel(){
                this.$vc.emit('addFloor','openAddFloorModal',{});
            },_loadFloorInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    