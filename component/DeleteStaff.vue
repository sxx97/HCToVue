
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
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"positionList":"","addStaffViewInfo":"[object Object]"}    
            },
            mounted() {
             (function() {
        })()(function() {
            this.$vc.on('addStaffViewInfo', 'onIndex', function(addStaffStepInfo) {
                if (addStaffStepInfo.departmemtOrgInfo.department != null && addStaffStepInfo.departmemtOrgInfo.department !== '') {
                    this.getPositionList(addStaffStepInfo.departmemtOrgInfo.department);
                }
            });
        })()   
            },
            methods: {
                getPositionList(id) {
                this.$vc.http.get('chooseOrg', 'staffPositionList', {
                    params: {
                        departmentId: id,
                    }
                },
                    (resText, res) => {
                    this.positionList = res.body.data || [];
                    console.log(res, '获取职位列表结果');
                },
                err => {
                    console.log(err, '获取职位列表错误');
                })
            },arouseChoosePhoto() {
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
                        this.addStaffViewInfo.photo = await this.uploadPhoto(reader.result).catch(err => {
                            console.error('上传照片失败');
                            return '';
                        })
                    }
                }
            },addStaffValidate() {
                return this.$vc.validate.validate({
                    addStaffViewInfo: this.addStaffViewInfo
                },
                {
                    'addStaffViewInfo.username': [{
                        limit: "required",
                        param: "",
                        errInfo: "员工名称不能为空"
                    },
                    {
                        limit: "maxin",
                        param: "2,10",
                        errInfo: "员工名称长度必须在2位至10位"
                    },
                    ],
                    'addStaffViewInfo.sex': [{
                        limit: "required",
                        param: "",
                        errInfo: "员工性别不能为空"
                    },
                    ],
                    'addStaffViewInfo.relCd': [{
                        limit: "required",
                        param: "",
                        errInfo: "员工岗位不能为空"
                    },
                    {
                        limit: "num",
                        param: "",
                        errInfo: "员工岗位错误"
                    },
                    ],
                    'addStaffViewInfo.tel': [{
                        limit: "photo",
                        param: "",
                        errInfo: "联系方式不是有效手机"
                    },
                    ],
                    'addStaffViewInfo.address': [{
                        limit: "required",
                        param: "",
                        errInfo: "家庭住址不能为空"
                    },
                    {
                        limit: "maxLength",
                        param: "200",
                        errInfo: "家庭住址不能超过200位"
                    },
                    ],

                });
            },saveAddStaffInfo:function() {
                if (this.addStaffValidate()) {
                    //侦听回传
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addStaffViewInfo);
                    return;
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    