
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>服务实现信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewServiceImplInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectServiceImplInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择服务实现</button>

                    <button type="button" v-if="viewServiceImplInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddServiceImplInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加服务实现</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >服务实现ID：</label>
                            <label class="">{{viewServiceImplInfo.serviceBusinessId}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >业务类型：</label>
                            <label class="">{{viewServiceImplInfo.businessTypeCd}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >业务名称：</label>
                            <label class="">{{viewServiceImplInfo.name}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >调用类型：</label>
                            <label class="">{{viewServiceImplInfo.invokeType}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >调用地址：</label>
                            <label class="">{{viewServiceImplInfo.url}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >kafka主题：</label>
                            <label class="">{{viewServiceImplInfo.messageTopic}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >超时时间：</label>
                            <label class="">{{viewServiceImplInfo.timeout}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >重试次数：</label>
                            <label class="">{{viewServiceImplInfo.retryCount}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >描述：</label>
                            <label class="">{{viewServiceImplInfo.description}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addServiceImpl"
               callBackListener="viewServiceImplInfo"
               callBackFunction="chooseServiceImpl"
    ></vc:create>


    <vc:create name="chooseServiceImpl"
               emitChooseServiceImpl="viewServiceImplInfo"
               emitLoadData="viewServiceImplInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddServiceImpl from '@/component/AddServiceImpl.vue';import ChooseServiceImpl from '@/component/ChooseServiceImpl.vue';



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
                props: {"callBackListener":"true","callBackFunction":"true"},
                components: {
                    AddServiceImpl,ChooseServiceImpl
                },
                data () {
                    return {"viewServiceImplInfo":{"index":0,"flowComponent":"viewServiceImplInfo","serviceBusinessId":"","businessTypeCd":"","name":"","invokeType":"","url":"","messageTopic":"","timeout":"","retryCount":"","description":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadServiceImplInfoData();
        })()
(() =>{
            this.$vc.on('viewServiceImplInfo','chooseServiceImpl',(_app) =>{
                this.$vc.copyObject(_app, this.viewServiceImplInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewServiceImplInfo);
            });

            this.$vc.on('viewServiceImplInfo', 'onIndex', (_index) =>{
                this.viewServiceImplInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectServiceImplInfoModel(){
                this.$vc.emit('chooseServiceImpl','openChooseServiceImplModel',{});
            },_openAddServiceImplInfoModel(){
                this.$vc.emit('addServiceImpl','openAddServiceImplModal',{});
            },_loadServiceImplInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    