
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>修改钥匙申请</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="row">
                    <div class="col-sm-5" style="text-align:center">
                        <video id="editApplicationKeyPhoto" style="width: 100%;"></video>
                        <canvas id="editApplicationKeyCanvas" style="display:none;"></canvas>
                        <div style="margin-top:20px">
                            <button class="btn btn-primary" type="button" v-on:click="_takeEditPhoto()"><span
                                    class="glyphicon glyphicon-camera"></span> 拍照
                            </button>
                            <span class="btn btn-default btn-file" v-on:click="_uploadEditPhoto($event)">
                                    <span class="fileinput-new">上传照片</span>
                                </span>
                            <input type="file" class="file" accept="images/*" id="uploadEditApplicationKeyPhoto" hidden
                                   v-on:change="_chooseEidtPhoto($event)">
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">姓名</label>
                            <div class="col-sm-10">
                                <input v-model="editApplicationKeyInfo.name" type="text" placeholder="必填，请填写姓名"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">手机号</label>
                            <div class="col-sm-10">
                                <input v-model="editApplicationKeyInfo.tel" type="text" placeholder="必填，请填写手机号"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">用户类型</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="editApplicationKeyInfo.typeCd">
                                    <option selected disabled value="">必填，请选择用户类型</option>
                                    <option value="10001">保洁</option>
                                    <option value="10002">保安</option>
                                    <option value="10003">其他人员</option>
                                </select></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">钥匙类型</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="editApplicationKeyInfo.typeFlag" readonly="true">
                                    <option selected disabled value="">必填，请选择钥匙类型申请</option>
                                    <option value="1100101">人脸</option>
                                    <option value="1100102">固定密码</option>
                                    <option value="1100103">临时密码</option>
                                </select></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">性别</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="editApplicationKeyInfo.sex">
                                    <option selected disabled value="">必填，请选择性别</option>
                                    <option value="0">男</option>
                                    <option value="1">女</option>
                                </select></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">年龄</label>
                            <div class="col-sm-10">
                                <input v-model="editApplicationKeyInfo.age" type="text" placeholder="必填，请填写年龄"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">身份证号</label>
                            <div class="col-sm-10">
                                <input v-model="editApplicationKeyInfo.idCard" type="text" placeholder="必填，请填写身份证号"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">设备位置</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="editApplicationKeyInfo.locationTypeCd">
                                    <option selected disabled value="">必填，请选择设备位置</option>
                                    <option value="1000">东大门</option>
                                    <option value="1001">西大门</option>
                                    <option value="1002">北大门</option>
                                    <option value="1003">南大门</option>
                                    <option value="2000">单元门</option>
                                    <option value="3000">房间门</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="editApplicationKeyInfo.locationTypeCd == '2000' || editApplicationKeyInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属楼栋</label>
                            <div class="col-sm-10">
                                <vc:create name="floorSelect2"
                                           parentModal="editApplicationKeyModel"
                                           namespace="editApplicationKey"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="editApplicationKeyInfo.locationTypeCd == '2000' || editApplicationKeyInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属单元</label>
                            <div class="col-sm-10">
                                <vc:create name="unitSelect2"
                                           parentModal="editApplicationKeyModel"
                                           callBackListener="editApplicationKey"
                                           callBackFunction="notify"
                                           namespace="editApplicationKey"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="editApplicationKeyInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属房间</label>
                            <div class="col-sm-10">
                                <vc:create name="roomSelect2"
                                           parentModal="editApplicationKeyModel"
                                           callBackListener="editApplicationKey"
                                           callBackFunction="notify"
                                           namespace="editApplicationKey"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">开始时间</label>
                            <div class="col-sm-10">
                                <input v-model="editApplicationKeyInfo.startTime" readonly type="text"
                                       placeholder="必填，请填写开始时间"
                                       class="form-control editApplicationStartTime">
                            </div>
                        </div>
                        <div class="form-group row" v-show="editApplicationKeyInfo.typeFlag == '1100101' || editApplicationKeyInfo.typeFlag == '1100102' ">
                            <label class="col-sm-2 col-form-label">结束时间</label>
                            <div class="col-sm-10">
                                <input v-model="editApplicationKeyInfo.endTime" readonly type="text"
                                       placeholder="必填，请填写结束时间"
                                       class="form-control editApplicationEndTime">
                            </div>
                        </div>
                        <div class="form-group row" v-if="editApplicationKeyInfo.typeFlag == '1100101'">
                            <label class="col-sm-2 col-form-label">照片</label>
                            <div class="col-sm-10"><img width="100%" height="100%"
                                                        v-bind:src="editApplicationKeyInfo.photo" alt="申请人照片"></div>
                        </div>

                        <div class="ibox-content">
                            <button class="btn btn-primary float-right" type="button"
                                    v-on:click="editApplicationKey()"><i class="fa fa-check"></i>&nbsp;保存
                            </button>
                            <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                    v-on:click="_closeEditApplicationKeyView()">取消
                            </button>
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
                return {"editApplicationKeyInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initEditApplicationKeyDateInfo();
            //this._initEditApplicationKeyMedia();


        })()(function () {
            this.$vc.on('editApplicationKey', 'openEditApplicationKeyModal', function (_params) {
                this.refreshEditApplicationKeyInfo();
                // $('#editApplicationKeyModel').modal('show');
                this.$vc.copyObject(_params, this.editApplicationKeyInfo);
                if (this.editApplicationKeyInfo.locationTypeCd == '2000') {
                    this.$vc.emit('editApplicationKey', 'floorSelect2', 'setFloor', {
                        floorId: this.editApplicationKeyInfo.floorId,
                        floorNum: this.editApplicationKeyInfo.floorNum
                    });
                    this.$vc.emit('editApplicationKey', 'unitSelect2', 'setUnit', {
                        floorId: this.editApplicationKeyInfo.floorId,
                        floorNum: this.editApplicationKeyInfo.floorNum,
                        unitId: this.editApplicationKeyInfo.unitId,
                        unitNum: this.editApplicationKeyInfo.unitNum,
                    });
                } else if (this.editApplicationKeyInfo.locationTypeCd == '3000') {
                    this.$vc.emit('editApplicationKey', 'floorSelect2', 'setFloor', {
                        floorId: this.editApplicationKeyInfo.floorId,
                        floorNum: this.editApplicationKeyInfo.floorNum
                    });
                    this.$vc.emit('editApplicationKey', 'unitSelect2', 'setUnit', {
                        floorId: this.editApplicationKeyInfo.floorId,
                        floorNum: this.editApplicationKeyInfo.floorNum,
                        unitId: this.editApplicationKeyInfo.unitId,
                        unitNum: this.editApplicationKeyInfo.unitNum,
                    });
                    this.$vc.emit('editApplicationKey', 'roomSelect2', 'setRoom', {
                        floorId: this.editApplicationKeyInfo.floorId,
                        floorNum: this.editApplicationKeyInfo.floorNum,
                        unitId: this.editApplicationKeyInfo.unitId,
                        unitNum: this.editApplicationKeyInfo.unitNum,
                        roomId: this.editApplicationKeyInfo.roomId,
                        roomNum: this.editApplicationKeyInfo.roomNum,
                    });
                }
                this.editApplicationKeyInfo.communityId = this.$vc.getCurrentCommunity().communityId;


            });

            this.$vc.on('editApplicationKey', "_initEditApplicationKeyData", function () {
                this._initEditApplicationKeyMedia();
            });

            this.$vc.on("editApplicationKey", "notify", function (_param) {
                if (_param.hasOwnProperty("floorId")) {
                    this.editApplicationKeyInfo.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.editApplicationKeyInfo.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.editApplicationKeyInfo.roomId = _param.roomId;
                }
            });
        })()   
            },
            methods: {
                _initEditApplicationKeyDateInfo:function () {
                this.editApplicationKeyInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.editApplicationStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.editApplicationStartTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editApplicationStartTime").val();
                        this.editApplicationKeyInfo.startTime = value;
                    });
                $('.editApplicationEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editApplicationEndTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editApplicationEndTime").val();
                        this.editApplicationKeyInfo.endTime = value;
                    });
            },editApplicationKeyValidate:function () {
                return this.$vc.validate.validate({
                    editApplicationKeyInfo: this.editApplicationKeyInfo
                }, {
                    'editApplicationKeyInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "姓名不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,64",
                            errInfo: "姓名不能超过64位"
                        },
                    ],
                    'editApplicationKeyInfo.tel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "手机号不能为空"
                        },
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "手机号格式错误"
                        },
                    ],
                    'editApplicationKeyInfo.typeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "用户类型不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "用户类型格式错误"
                        },
                    ],
                    'editApplicationKeyInfo.sex': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "性别不能为空"
                        }
                    ],
                    'editApplicationKeyInfo.age': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "年龄不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "年龄不是有效数字"
                        },
                    ],
                    'editApplicationKeyInfo.idCard': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "身份证号不能为空"
                        },
                        {
                            limit: "idCard",
                            param: "",
                            errInfo: "不是有效的身份证号"
                        },
                    ],
                    'editApplicationKeyInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "开始时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "不是有效的时间格式"
                        },
                    ],
                    'editApplicationKeyInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "结束时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "不是有效的时间格式"
                        },
                    ],
                    'editApplicationKeyInfo.applicationKeyId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "钥匙申请ID不能为空"
                        }],
                    'editApplicationKeyInfo.locationTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "申请位置不能为空"
                        }
                    ],
                    'editApplicationKeyInfo.locationObjId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "具体位置不能为空"
                        }
                    ]

                });
            },editApplicationKey:function () {
                this.editApplicationKeyInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.editApplicationKeyInfo.locationTypeCd != '2000' && this.editApplicationKeyInfo.locationTypeCd != '3000') { //大门时直接写 写字楼ID
                    this.editApplicationKeyInfo.locationObjId = this.editApplicationKeyInfo.communityId;
                } else if (this.editApplicationKeyInfo.locationTypeCd == '2000') {
                    this.editApplicationKeyInfo.locationObjId = this.editApplicationKeyInfo.unitId;
                } else if (this.editApplicationKeyInfo.locationTypeCd == '3000') {
                    this.editApplicationKeyInfo.locationObjId = this.editApplicationKeyInfo.roomId;
                } else {
                    this.$vc.toast("设备位置值错误");
                    return;
                }
                if (!this.editApplicationKeyValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                this.$vc.http.post(
                    'editApplicationKey',
                    'update',
                    JSON.stringify(this.editApplicationKeyInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editApplicationKeyModel').modal('hide');
                            this.$vc.emit('applicationKeyManage', 'listApplicationKey', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditApplicationKeyInfo:function () {
                this.editApplicationKeyInfo = {
                    applicationKeyId: '',
                    name: '',
                    tel: '',
                    typeCd: '',
                    sex: '',
                    age: '',
                    idCard: '',
                    startTime: '',
                    endTime: '',
                    floorId: '',
                    floorNum: '',
                    floorName: '',
                    unitId: '',
                    unitNum: '',
                    roomId: '',
                    locationTypeCd: '',
                    locationObjId: '',
                    roomName: '',
                    videoPlaying: false,
                    photo: '',
                    mediaStreamTrack: null,
                    typeFlag:'',
                }
            },_closeEditApplicationKeyView:function () {
                this.$vc.emit('applicationKeyManage', 'listApplicationKey', {});
                //关闭拍照摄像头
                if (this.editApplicationKeyInfo.mediaStreamTrack != null) {
                    this.editApplicationKeyInfo.mediaStreamTrack.stop();
                }
            },_editUserMedia:function () {
                return navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || null;
            },_initEditApplicationKeyMedia:function () {
                if (this._editUserMedia()) {
                    this.editApplicationKeyInfo.videoPlaying = false;
                    var constraints = {
                        video: true,
                        audio: false
                    };
                    var editVideo = document.getElementById('editApplicationKeyPhoto');
                    var media = navigator.getUserMedia(constraints, function (stream) {
                        var url = window.URL || window.webkitURL;
                        //video.src = url ? url.createObjectURL(stream) : stream;

                        this.editApplicationKeyInfo.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
                        try {
                            editVideo.src = url ? url.createObjectURL(stream) : stream;
                        } catch (error) {
                            editVideo.srcObject = stream;
                        }
                        editVideo.play();
                        this.editApplicationKeyInfo.videoPlaying = true;
                    }, function (error) {
                        console.log("ERROR");
                        console.log(error);
                    });
                } else {
                    console.log("初始化视频失败");
                }
            },_takeEditPhoto:function () {
                if (this.editApplicationKeyInfo.videoPlaying) {
                    var canvas = document.getElementById('editApplicationKeyCanvas');
                    var takeEditVideo = document.getElementById('editApplicationKeyPhoto');
                    canvas.width = takeEditVideo.videoWidth;
                    canvas.height = takeEditVideo.videoHeight;
                    canvas.getContext('2d').drawImage(takeEditVideo, 0, 0);
                    var data = canvas.toDataURL('image/webp');
                    this.editApplicationKeyInfo.photo = data;
                    //document.getElementById('photo').setAttribute('src', data);
                }
            },_uploadEditPhoto:function (event) {
                $("#uploadEditApplicationKeyPhoto").trigger("click")
            },_chooseEditPhoto:function (event) {
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
                    reader.onloadend = function (e) {
                        this.editApplicationKeyInfo.photo = reader.result;
                    }
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    