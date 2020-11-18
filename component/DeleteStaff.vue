
        <template>
            <div class="modal fade" id="deleteStaffModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否删除!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeDeleteStaffModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="deleteStaff()">确认删除</button>
            </div>
        </div>
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"changeStaffPwdInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {

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
                     function(json,res){
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
                     function(errInfo,error){
                        console.log('请求失败处理');
                        this.$vc.toast(errInfo);
                     });

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    