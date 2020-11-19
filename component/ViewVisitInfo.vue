
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>新增访客</h5>
                <div class="ibox-tools" style="top:10px;">
<!--                    <button type="button" v-if="viewVisitInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectAppInfoModel()">-->
<!--                        <i class="glyphicon glyphicon-search"></i> 选择访客</button>-->

                    <button type="button" v-if="viewVisitInfo.index == 0 && viewVisitInfo.needShowAddAppButton== 'true'" class="btn btn-primary btn-sm" v-on:click="_openAddVisitInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加访客</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">访客姓名：</label>
                            <label class="">{{viewVisitInfo.vName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >访客联系方式：</label>
                            <label class="">{{viewVisitInfo.phoneNumber}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >访客性别：</label>
                            <label class="">{{viewVisitInfo.visitGender=="0"?"男":"女"}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >开始时间：</label>
                            <label class="">{{viewVisitInfo.visitTime}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >结束时间：</label>
                            <label class="">{{viewVisitInfo.departureTime}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<!--    <vc:create name="addApp"-->
<!--               callBackListener="viewVisitInfo"-->
<!--               callBackFunction="chooseApp"-->
<!--    ></vc:create>-->

    <vc:create name="addVisit"
               callBackListener="viewVisitInfo"
               callBackFunction="addNewVisit"
    ></vc:create>
<!--    <vc:create name="chooseApp"-->
<!--               emitChooseApp="viewVisitInfo"-->
<!--               emitLoadData="viewVisitInfo"-->
<!--    ></vc:create>-->
</div>
        </template>
        <script>
            
            import AddVisit from '@/component/AddVisit.vue';



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
                props: {},
                components: {
                    AddVisit
                },
                data () {
                    return {"viewVisitInfo":{"index":0,"flowComponent":"visit","needShowAddAppButton":"true","vName":"","visitGender":"","phoneNumber":"","visitTime":"","departureTime":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadAppInfoData();
        })()
(() =>{
            this.$vc.on('viewVisitInfo','addNewVisit',(_app) =>{
                console.log(_app);
                this._clearVisitInfo();
                this.$vc.copyObject(_app, this.viewVisitInfo);
                this.$vc.emit('addVisitSpace','notify',this.viewVisitInfo);
            });

            this.$vc.on('viewVisitInfo', 'onIndex', (_index) =>{
                this.viewAppInfo.index = _index;
            });


        })()   
                },
                methods: {
                    _openSelectAppInfoModel(){
                alert("打开查询访客模态框");
                // this.$vc.emit('chooseApp','openChooseAppModel',{});
            },_openAddVisitInfoModel(){
                this.$vc.emit('addVisit','openAddVisitAppModal',{});
                // $("#addNewVisitModel").model("show");
            },_loadAppInfoData:function(){

            },_clearVisitInfo:function(){
                this.viewVisitInfo.vName='';
                this.viewVisitInfo.visitGender='';
                this.viewVisitInfo.phoneNumber='';
                this.viewVisitInfo.visitTime='';
                this.viewVisitInfo.departureTime='';

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    