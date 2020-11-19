
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>投诉建议信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewComplaintInfo.index != 2" class="btn btn-primary btn-sm" style="margin-right:10px;"  v-on:click="_openSelectComplaintInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择投诉建议</button>

                    <button type="button" v-if="viewComplaintInfo.index != 2" class="btn btn-primary btn-sm" v-on:click="_openAddComplaintInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加投诉建议</button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >商户ID：</label>
                            <label class="">{{viewComplaintInfo.storeId}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >投诉类型：</label>
                            <label class="">{{viewComplaintInfo.typeCd}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >房间编号：</label>
                            <label class="">{{viewComplaintInfo.roomId}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >投诉人：</label>
                            <label class="">{{viewComplaintInfo.complaintName}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >投诉电话：</label>
                            <label class="">{{viewComplaintInfo.tel}}</label>
                        </div>
</div>
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >投诉状态：</label>
                            <label class="">{{viewComplaintInfo.state}}</label>
                        </div>
</div>
</div>
<div class="row">
<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label" >投诉内容：</label>
                            <label class="">{{viewComplaintInfo.context}}</label>
                        </div>
</div>
</div>

            </div>
        </div>
    </div>

    <vc:create name="addComplaint"
               callBackListener="viewComplaintInfo"
               callBackFunction="chooseComplaint"
    ></vc:create>


    <vc:create name="chooseComplaint"
               emitChooseComplaint="viewComplaintInfo"
               emitLoadData="viewComplaintInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddComplaint from '@/component/AddComplaint.vue';import ChooseComplaint from '@/component/ChooseComplaint.vue';



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
                    AddComplaint,ChooseComplaint
                },
                data () {
                    return {"viewComplaintInfo":{"index":0,"flowComponent":"viewComplaintInfo","storeId":"","typeCd":"","roomId":"","complaintName":"","tel":"","state":"","context":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadComplaintInfoData();
        })()
(() =>{
            this.$vc.on('viewComplaintInfo','chooseComplaint',(_app) =>{
                this.$vc.copyObject(_app, this.viewComplaintInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewComplaintInfo);
            });

            this.$vc.on('viewComplaintInfo', 'onIndex', (_index) =>{
                this.viewComplaintInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectComplaintInfoModel(){
                this.$vc.emit('chooseComplaint','openChooseComplaintModel',{});
            },_openAddComplaintInfoModel(){
                this.$vc.emit('addComplaint','openAddComplaintModal',{});
            },_loadComplaintInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    