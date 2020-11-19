
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>钥匙申请信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewApplicationKeyInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectApplicationKeyInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择钥匙申请</button>

                    <button type="button" v-if="viewApplicationKeyInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddApplicationKeyInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加钥匙申请</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >姓名：</label>
                            <label class="">{{viewApplicationKeyInfo.name}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >手机号：</label>
                            <label class="">{{viewApplicationKeyInfo.tel}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >用户类型：</label>
                            <label class="">{{viewApplicationKeyInfo.typeCd}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >性别：</label>
                            <label class="">{{viewApplicationKeyInfo.sex}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >年龄：</label>
                            <label class="">{{viewApplicationKeyInfo.age}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >身份证号：</label>
                            <label class="">{{viewApplicationKeyInfo.idCard}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >开始时间：</label>
                            <label class="">{{viewApplicationKeyInfo.startTime}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >结束时间：</label>
                            <label class="">{{viewApplicationKeyInfo.endTime}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addApplicationKey"
               callBackListener="viewApplicationKeyInfo"
               callBackFunction="chooseApplicationKey"
    ></vc:create>


    <vc:create name="chooseApplicationKey"
               emitChooseApplicationKey="viewApplicationKeyInfo"
               emitLoadData="viewApplicationKeyInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddApplicationKey from '@/component/AddApplicationKey.vue';import ChooseApplicationKey from '@/component/ChooseApplicationKey.vue';



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
                    AddApplicationKey,ChooseApplicationKey
                },
                data () {
                    return {"viewApplicationKeyInfo":{"index":0,"flowComponent":"viewApplicationKeyInfo","name":"","tel":"","typeCd":"","sex":"","age":"","idCard":"","startTime":"","endTime":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadApplicationKeyInfoData();
        })()
(() =>{
            this.$vc.on('viewApplicationKeyInfo','chooseApplicationKey',(_app) =>{
                this.$vc.copyObject(_app, this.viewApplicationKeyInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewApplicationKeyInfo);
            });

            this.$vc.on('viewApplicationKeyInfo', 'onIndex', (_index) =>{
                this.viewApplicationKeyInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectApplicationKeyInfoModel(){
                this.$vc.emit('chooseApplicationKey','openChooseApplicationKeyModel',{});
            },_openAddApplicationKeyInfoModel(){
                this.$vc.emit('addApplicationKey','openAddApplicationKeyModal',{});
            },_loadApplicationKeyInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    