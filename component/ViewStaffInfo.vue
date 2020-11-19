
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>员工信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectStaffInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <!--<div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">员工ID：</label>
                            <label class="">{{viewStaffInfo.userId}}</label>
                        </div>
                    </div>-->
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">员工名称：</label>
                            <label class="">{{viewStaffInfo.name}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">员工邮箱：</label>
                            <label class="">{{viewStaffInfo.email}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">手机号：</label>
                            <label class="">{{viewStaffInfo.tel}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">员工性别：</label>
                            <label class="">{{viewStaffInfo.sex=='0' ? '男' : '女'}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="searchStaff"
               callBackListener="viewStaffInfo"
               callBackFunction="chooseStaff"
    ></vc:create>
</div>

        </template>
        <script>
            
            import SearchStaff from '@/component/SearchStaff.vue';



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
                props: {"callBackListener":"chooseStaff","callBackFunction":"chooseStaff"},
                components: {
                    SearchStaff
                },
                data () {
                    return {"viewStaffInfo":{"index":0,"flowComponent":"viewStaffInfo","userId":"","name":"","email":"","tel":"","sex":"","orgId":""}}    
                },
                mounted() {
                (() =>{
            //根据请求参数查询 查询 业主信息
            this._loadStaffInfoData();
        })()
(() =>{
            this.$vc.on('viewStaffInfo','chooseStaff',(_app) =>{
                this.$vc.copyObject(_app, this.viewStaffInfo);
                this.$vc.emit(this.$vc._thiscallBackListener,this.$vc._thiscallBackFunction,this.viewStaffInfo);
            });

            this.$vc.on('viewStaffInfo', 'onIndex', (_index) =>{
                this.viewStaffInfo.index = _index;
            });

            this.$vc.on('viewStaffInfo', '_initInfo', (_info) =>{
                //this.viewStaffInfo.index = _index;
                this.$vc.copyObject(_info,this.viewStaffInfo);
                console.log(_info);
            });

            this.$vc.on('viewStaffInfo', '_clear', (_info) =>{
                //this.viewStaffInfo.index = _index;
                this.viewStaffInfo = {
                    index:0,
                    flowComponent:'viewStaffInfo',
                    userId:'',
                    name:'',
                    email:'',
                    tel:'',
                    sex:'',
                    orgId:''
                };
            });

        })()   
                },
                methods: {
                    _openSelectStaffInfoModel(){
                this.$vc.emit('searchStaff','openSearchStaffModel',{
                    orgId:this.viewStaffInfo.orgId
                });
            },_loadStaffInfoData:function(){

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    