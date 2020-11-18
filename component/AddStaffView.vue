
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>添加员工</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">员工名称</label>
                    <div class="col-sm-10">
                        <input v-model="addStaffViewInfo.username" type="text" placeholder="必填，请填写员工名称"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">员工性别</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addStaffViewInfo.sex">
                            <option selected disabled value="">必填，请选择员工性别</option>
                            <option value="0">男</option>
                            <option value="1">女</option>
                        </select></div>
                </div>

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">员工岗位</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addStaffViewInfo.relCd">
                            <option selected disabled value="">必填，请选择岗位</option>
                            <option v-for="item in positionList"
                                :value="item.id">{{item.name}}</option>
                            <!--<option value="10000">普通员工</option>
                            <option value="20000">部门经理</option>
                            <option value="30000">主管</option>-->
                        </select></div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">员工邮箱</label>
                    <div class="col-sm-10">
                        <input v-model="addStaffViewInfo.email" type="text" placeholder="可选，请填写员工邮箱"
                               class="form-control">
                    </div>
                </div>


                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">手机</label>
                    <div class="col-sm-10">
                        <input v-model="addStaffViewInfo.tel" type="text" placeholder="必填，请填写手机" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">家庭住址</label>
                    <div class="col-sm-10">
                        <input v-model="addStaffViewInfo.address" type="text" placeholder="必填，请填写家庭住址"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">员工照片</label>
                    <div class="col-sm-10">
                        <template v-if="addStaffViewInfo.photo == ''">
                            <div class="commodity-upload-img glyphicon glyphicon-plus"
                                 @click="arouseChoosePhoto"></div>
                        </template>
                        <template v-else>
                            <div class="commodity-img" @click="arouseChoosePhoto">
                                <img :src="addStaffViewInfo.photo">
                            </div>
                        </template>
                        <input type="file" class="file" accept="images/*" id="uploadStaffPhoto" hidden @change="chooseStaffPhoto($event)">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">RFID卡</label>
                    <div class="col-sm-10">
                        <input v-model="addStaffViewInfo.rfidCard" type="text" placeholder="请输入卡号"
                               class="form-control">
                    </div>
                </div>
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
    