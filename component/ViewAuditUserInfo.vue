
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox ">
            <div class="ibox-title">
                <h5>审核人员信息</h5>
                <div class="ibox-tools" style="top:10px;">
                    <button type="button" v-if="viewAuditUserInfo.index != 2" class="btn btn-primary btn-sm"
                            style="margin-right:10px;" v-on:click="_openSelectAuditUserInfoModel()">
                        <i class="glyphicon glyphicon-search"></i> 选择审核人员
                    </button>

                    <button type="button" v-if="viewAuditUserInfo.index != 2" class="btn btn-primary btn-sm"
                            v-on:click="_openAddAuditUserInfoModel()">
                        <i class="glyphicon glyphicon-plus"></i> 添加审核人员
                    </button>
                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">用户ID：</label>
                            <label class="">{{viewAuditUserInfo.userId}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">用户名称：</label>
                            <label class="">{{viewAuditUserInfo.userName}}</label>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">审核环节：</label>
                            <label class="">{{viewAuditUserInfo.auditLink}}</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="col-form-label">流程对象：</label>
                            <label class="">{{viewAuditUserInfo.objCode}}</label>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <vc:create name="addAuditUser"
               callBackListener="viewAuditUserInfo"
               callBackFunction="chooseAuditUser"
    ></vc:create>


    <vc:create name="chooseAuditUser"
               emitChooseAuditUser="viewAuditUserInfo"
               emitLoadData="viewAuditUserInfo"
    ></vc:create>
</div>

        </template>
        <script>
            
            import AddAuditUser from '@/component/AddAuditUser.vue';import ChooseAuditUser from '@/component/ChooseAuditUser.vue';



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
                    AddAuditUser,ChooseAuditUser
                },
                data () {
                    return {"viewAuditUserInfo":{"index":0,"flowComponent":"viewAuditUserInfo","userId":"","userName":"","auditLink":"","objCode":""}}    
                },
                mounted() {
                ( () => {
            //根据请求参数查询 查询 业主信息
            this._loadAuditUserInfoData();
        })()
( () => {
            this.$vc.on('viewAuditUserInfo', 'chooseAuditUser',  (_app) => {
                this.$vc.copyObject(_app, this.viewAuditUserInfo);
                this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.viewAuditUserInfo);
            });

            this.$vc.on('viewAuditUserInfo', 'onIndex',  (_index) => {
                this.viewAuditUserInfo.index = _index;
            });

        })()   
                },
                methods: {
                    _openSelectAuditUserInfoModel() {
                this.$vc.emit('chooseAuditUser', 'openChooseAuditUserModel', {});
            },_openAddAuditUserInfoModel() {
                this.$vc.emit('addAuditUser', 'openAddAuditUserModal', {});
            },_loadAuditUserInfoData:function () {

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    