
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>服务提供信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewServiceProvideInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectServiceProvideInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择服务提供</button>

                    <button type="button" v-if="viewServiceProvideInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddServiceProvideInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加服务提供</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >服务名称：</label>
                            <label class="">{{viewServiceProvideInfo.name}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >服务编码：</label>
                            <label class="">{{viewServiceProvideInfo.serviceCode}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >参数：</label>
                            <label class="">{{viewServiceProvideInfo.params}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >实现方式：</label>
                            <label class="">{{viewServiceProvideInfo.queryModel}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >sql：</label>
                            <label class="">{{viewServiceProvideInfo.sql}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >输出模板：</label>
                            <label class="">{{viewServiceProvideInfo.template}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >存储过程：</label>
                            <label class="">{{viewServiceProvideInfo.proc}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >java：</label>
                            <label class="">{{viewServiceProvideInfo.javaScript}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >描述：</label>
                            <label class="">{{viewServiceProvideInfo.remark}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addServiceProvide"
               callBackListener="viewServiceProvideInfo"
               callBackFunction="chooseServiceProvide"
    ></vc:create>


    <vc:create name="chooseServiceProvide"
               emitChooseServiceProvide="viewServiceProvideInfo"
               emitLoadData="viewServiceProvideInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddServiceProvide from '@/component/AddServiceProvide.vue';import ChooseServiceProvide from '@/component/ChooseServiceProvide.vue';



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
                    AddServiceProvide,ChooseServiceProvide
                },
                data () {
                    return {"viewServiceProvideInfo":{"index":0,"flowComponent":"viewServiceProvideInfo","name":"","serviceCode":"","params":"","queryModel":"","sql":"","template":"","proc":"","javaScript":"","remark":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadServiceProvideInfoData();
        })()
(() =>{
            this.$vc.on('viewServiceProvideInfo','chooseServiceProvide',(_app) =>{
                this.$vc.copyObject(_app, this.viewServiceProvideInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewServiceProvideInfo);
            });

            this.$vc.on('viewServiceProvideInfo', 'onIndex', (_index) =>{
                this.viewServiceProvideInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectServiceProvideInfoModel(){
                this.$vc.emit('chooseServiceProvide','openChooseServiceProvideModel',{});
            },_openAddServiceProvideInfoModel(){
                this.$vc.emit('addServiceProvide','openAddServiceProvideModal',{});
            },_loadServiceProvideInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    