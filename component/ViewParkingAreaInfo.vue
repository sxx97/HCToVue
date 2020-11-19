
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>停车场信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewParkingAreaInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectParkingAreaInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择停车场</button>

                    <button type="button" v-if="viewParkingAreaInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddParkingAreaInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加停车场</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >停车场编号：</label>
                            <label class="">{{viewParkingAreaInfo.num}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >停车场类型：</label>
                            <label class="">{{viewParkingAreaInfo.typeCd}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >备注：</label>
                            <label class="">{{viewParkingAreaInfo.remark}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addParkingArea"
               callBackListener="viewParkingAreaInfo"
               callBackFunction="chooseParkingArea"
    ></vc:create>


    <vc:create name="chooseParkingArea"
               emitChooseParkingArea="viewParkingAreaInfo"
               emitLoadData="viewParkingAreaInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddParkingArea from '@/component/AddParkingArea.vue';import ChooseParkingArea from '@/component/ChooseParkingArea.vue';



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
                props: {"callBackListener":"false","callBackFunction":"false"},
                components: {
                    AddParkingArea,ChooseParkingArea
                },
                data () {
                    return {"viewParkingAreaInfo":{"index":0,"flowComponent":"viewParkingAreaInfo","num":"","typeCd":"","remark":""}}    
                },
                mounted() {
                (() => {
            //根据请求参数查询 查询 业主信息
            this._loadParkingAreaInfoData();
        })()
(() => {
            this.$vc.on('viewParkingAreaInfo', 'chooseParkingArea',
            (_app) => {
                this.$vc.copyObject(_app, this.viewParkingAreaInfo);
                this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.viewParkingAreaInfo);
            });

            this.$vc.on('viewParkingAreaInfo', 'onIndex',
            (_index) => {
                this.viewParkingAreaInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectParkingAreaInfoModel() {
                this.$vc.emit('chooseParkingArea', 'openChooseParkingAreaModel', {});
            },_openAddParkingAreaInfoModel() {
                this.$vc.emit('addParkingArea', 'openAddParkingAreaModal', {});
            },_loadParkingAreaInfoData:function() {

},
                },
            }
    
        </script>
        <style>
            
        </style>
    