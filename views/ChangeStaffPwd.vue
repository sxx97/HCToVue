
        <template>
            <div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>修改密码</h5>
                    <div class="ibox-tools" style="top:10px;">

                    </div>
                </div>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <div class="col-sm-3"></div>
                                <label class="col-sm-2 col-form-label">原始密码</label>
                                <div class="col-sm-4">
                                    <div class="custom-file">
                                        <input v-model="changeStaffPwdInfo.oldPwd" type="password" placeholder="必填，请输入原始密码"
                                               class="form-control">
                                    </div>
                                </div>
                                <div class="col-sm-3"></div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3"></div>
                                <label class="col-sm-2 col-form-label">新密码</label>
                                <div class="col-sm-4">
                                    <div class="custom-file">
                                        <input v-model="changeStaffPwdInfo.newPwd" type="password" placeholder="必填，请输入新密码"
                                               class="form-control">
                                    </div>
                                </div>
                                <div class="col-sm-3"></div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3"></div>
                                <label class="col-sm-2 col-form-label">确认密码</label>
                                <div class="col-sm-4">
                                    <div class="custom-file">
                                        <input v-model="changeStaffPwdInfo.reNewPwd" type="password" placeholder="必填，请输入确认密码"
                                               class="form-control">
                                    </div>
                                </div>
                                <div class="col-sm-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-primary"
                    v-on:click="_changePwd()">确认修改
            </button>
        </div>
    </div>
</div>
        </template>
        <script>
            
            



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
                    
                },
                data () {
                    return {"changeStaffPwdInfo":{"oldPwd":"","newPwd":"","reNewPwd":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {

        })()   
                },
                methods: {
                    assetImportValidate:function () {
                return this.$vc.validate.validate({
                    changeStaffPwdInfo: this.changeStaffPwdInfo
                }, {

                    'changeStaffPwdInfo.oldPwd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "原始密码不能为空"
                        }
                    ],
                    'changeStaffPwdInfo.newPwd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "新密码不能为空"
                        }
                    ],
                    'changeStaffPwdInfo.reNewPwd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "确认密码不能为空"
                        }
                    ]
                });
            },_changePwd:function () {

                if (!this.assetImportValidate()) {
                    return;
                }

                var _userInfo = this.$vc.getData("/nav/getUserInfo");

                if(_userInfo.name == 'wuxw' || _userInfo.name == 'dev' || _userInfo.name == 'dails' || _userInfo.name == 'admin'){
                    this.$vc.toast("演示环境密码，不允许修改");
                    return ;
                }


                if(this.changeStaffPwdInfo.newPwd != this.changeStaffPwdInfo.reNewPwd){
                    this.$vc.toast('两次密码不一致');
                    return ;
                }

                this.$vc.http.post(
                    'changeStaffPwd',
                    'change',
                    JSON.stringify(this.changeStaffPwdInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            this.$vc.toast("修改成功");
                            this.changeStaffPwdInfo.oldPwd = '';
                            this.changeStaffPwdInfo.newPwd = '';
                            this.changeStaffPwdInfo.reNewPwd = '';
                            return ;
                        }
                        this.$vc.toast(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');
                        this.$vc.toast(errInfo);
                     });

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    