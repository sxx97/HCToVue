
        <template>
            <div class="modal fade" id="resetStaffPwdModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">请确认您的操作!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <tr align="center"><th>确认是否重置密码!</th></tr>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeResetStaffPwdModel()">点错了</button>
                <button type="button" class="btn btn-primary" v-on:click="resetStaffPwd()">确认重置</button>
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
                return {"editStaffInfo":"[object Object]"}    
            },
            mounted() {
             (function(){
        })()(function(){
             this.$on('edit_staff_event',function(_staffInfo){
                    this.refreshEditStaffInfo(_staffInfo);
                    $('#editStaffModel').modal('show');
                });
        })()   
            },
            methods: {
                arouseChoosePhoto() {
                $('#uploadStaffPhoto').trigger('click');
            },async uploadPhoto(base64) {
                return new Promise((reslove, reject) => {
                    this.$vc.http.post('uploadImg', 'upload', {
                            img: base64,
                        },
                        {
                            headres: {
                                "Content-Type": "application/json"
                            }
                        },
                        (resStr, res) => {
                            reslove(res.body.fileSaveName);
                        },
                        (errText, err) => {
                            reject(errText);
                        })
                })
            },chooseStaffPhoto(event) {
                var photoFiles = event.target.files;
                if (photoFiles && photoFiles.length > 0) {
                    // 获取目前上传的文件
                    var file = photoFiles[0];// 文件大小校验的动作
                    if (file.size > 1024 * 1024 * 1) {
                        this.$vc.toast("图片大小不能超过 2MB!")
                        return false;
                    }
                    var reader = new FileReader(); //新建FileReader对象
                    reader.readAsDataURL(file); //读取为base64
                    reader.onloadend = async function (e) {
                        this.editStaffInfo.photo = await this.uploadPhoto(reader.result).catch(err => {
                            console.error('上传照片失败');
                            return '';
                        })
                    }
                }
            },refreshEditStaffInfo(_staffInfo){
                this.editStaffInfo.userId = _staffInfo.userId;
                this.editStaffInfo.username = _staffInfo.name;
                this.editStaffInfo.email = _staffInfo.email;
                this.editStaffInfo.tel = _staffInfo.tel;
                this.editStaffInfo.sex = _staffInfo.sex;
                this.editStaffInfo.address = _staffInfo.address;
                this.editStaffInfo.rfidCard = _staffInfo.rfidCard;
                this.editStaffInfo.photo = _staffInfo.photo;
            },editStaffValidate(){
                return this.$vc.validate.validate({
                    editStaffInfo:this.editStaffInfo
                },{
                    'editStaffInfo.username':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"用户名不能为空"
                        },
                        {
                            limit:"maxin",
                            param:"2,10",
                            errInfo:"用户名长度必须在2位至10位"
                        },
                    ],
                    'editStaffInfo.tel':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"手机号不能为空"
                        },
                        {
                            limit:"phone",
                            param:"",
                            errInfo:"不是有效的手机号"
                        }
                    ],
                    'editStaffInfo.sex':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"性别不能为空"
                        }
                    ],
                    'editStaffInfo.address':[
                        {
                            limit:"required",
                            param:"",
                            errInfo:"地址不能为空"
                        },
                        {
                            limit:"maxLength",
                            param:"200",
                            errInfo:"地址长度不能超过200位"
                        },
                    ]

                });
            },editStaffSubmit:function(){
                 if(!this.editStaffValidate()){
                    this.editStaffInfo.errorInfo = this.$vc.validate.errInfo;
                    return ;
                }

                this.editStaffInfo.errorInfo = "";
                this.$vc.http.post(
                    'editStaff',
                    'modifyStaff',
                    JSON.stringify(this.editStaffInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                            $('#editStaffModel').modal('hide');
                            this.$emit('editStaff_reload_event',{});
                            return ;
                        }
                        this.editStaffInfo.errorInfo = json;
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        this.editStaffInfo.errorInfo = errInfo;
                     });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    