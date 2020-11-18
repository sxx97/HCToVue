
        <template>
            <div id = "editStaffModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改员工</h3>
                <div class="ibox-content">
                    <div>
                        <p style="color:red;">{{editStaffInfo.errorInfo}}</p>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">员工名称</label>
                                <div class="col-sm-10"><input v-model="editStaffInfo.username" type="text" placeholder="必填，请填写员工名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">员工邮箱</label>
                                <div class="col-sm-10"><input v-model="editStaffInfo.email" type="email" placeholder="可选，请填写员工名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">手机号码</label>
                                <div class="col-sm-10"><input v-model="editStaffInfo.tel" type="tel" placeholder="必填，请填写手机号码" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">员工性别</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editStaffInfo.sex">
                                        <option selected value="">必填，请选择员工性别</option>
                                        <option value="0">男</option>
                                        <option value="1">女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">家庭住址</label>
                                <div class="col-sm-10"><input v-model="editStaffInfo.address" type="text" placeholder="请填写家庭住址" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">照片</label>
                                <div class="col-sm-10">
                                    <template v-if="editStaffInfo.photo == ''">
                                        <div class="commodity-upload-img glyphicon glyphicon-plus"
                                             @click="arouseChoosePhoto"></div>
                                    </template>
                                    <template v-else>
                                        <div class="commodity-img" @click="arouseChoosePhoto">
                                            <img :src="editStaffInfo.photo">
                                        </div>
                                    </template>
                                    <input type="file" class="file" accept="images/*" id="uploadStaffPhoto" hidden @change="chooseStaffPhoto($event)">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">RFID卡号</label>
                                <div class="col-sm-10"><input v-model="editStaffInfo.rfidCard" type="text" placeholder="请填写家庭住址" class="form-control"></div>
                            </div>
                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editStaffSubmit()" ><i class="fa fa-check"></i>&nbsp;修改</button>
                                <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
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
    