
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>活动信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewActivitiesInfo.index != 2" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectActivitiesInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择活动
                    </button>

                    <button type="button" v-if="viewActivitiesInfo.index != 2" class="btn btn-primary btn-sm"
                            v-on:click="_openAddActivitiesInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加活动
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">活动标题：</label>
                            <label class="">{{viewActivitiesInfo.title}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">活动类型：</label>
                            <label class="">{{viewActivitiesInfo.typeCd}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">头部照片：</label>
                            <label class="">{{viewActivitiesInfo.headerImg}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">活动内容：</label>
                            <label class="">{{viewActivitiesInfo.context}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">开始时间：</label>
                            <label class="">{{viewActivitiesInfo.startTime}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">结束时间：</label>
                            <label class="">{{viewActivitiesInfo.endTime}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="addActivities"
               callBackListener="viewActivitiesInfo"
               callBackFunction="chooseActivities"
    ></vc:create>


    <vc:create name="chooseActivities"
               emitChooseActivities="viewActivitiesInfo"
               emitLoadData="viewActivitiesInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddActivities from '@/component/AddActivities.vue';import ChooseActivities from '@/component/ChooseActivities.vue';



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
                props: {"callBackListener":"string","callBackFunction":"string"},
                components: {
                    AddActivities,ChooseActivities
                },
                data () {
                    return {"viewActivitiesInfo":{"index":0,"flowComponent":"viewActivitiesInfo","title":"","typeCd":"","headerImg":"","context":"","startTime":"","endTime":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadActivitiesInfoData();
        })()
(() =>{
            this.$vc.on('viewActivitiesInfo','chooseActivities',(_app) =>{
                this.$vc.copyObject(_app, this.viewActivitiesInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewActivitiesInfo);
            });

            this.$vc.on('viewActivitiesInfo', 'onIndex', (_index) =>{
                this.viewActivitiesInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectActivitiesInfoModel(){
                this.$vc.emit('chooseActivities','openChooseActivitiesModel',{});
            },_openAddActivitiesInfoModel(){
                this.$vc.emit('addActivities','openAddActivitiesModal',{});
            },_loadActivitiesInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    