
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>申请钥匙</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">
                <div class="row">
                    <div class="col-sm-5" style="text-align:center">
                        <video id="addApplicationKeyPhoto" style="width: 100%;"></video>
                        <canvas id="AddApplicationKeyCanvas" style="display:none;"></canvas>
                        <div style="margin-top:20px">
                            <button class="btn btn-primary" type="button" v-on:click="_takePhoto()"><span
                                    class="glyphicon glyphicon-camera"></span> 拍照
                            </button>
                            <span class="btn btn-default btn-file" v-on:click="_uploadPhoto($event)">
                                    <span class="fileinput-new">上传照片</span>
                                </span>
                            <input type="file" class="file" accept="images/*" id="uploadApplicationKeyPhoto" hidden
                                   v-on:change="_choosePhoto($event)">
                        </div>
                    </div>
                    <div class="col-sm-7">
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">姓名</label>
                            <div class="col-sm-10">
                                <input v-model="addApplicationKeyInfo.name" type="text" placeholder="必填，请填写姓名"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">手机号</label>
                            <div class="col-sm-10">
                                <input v-model="addApplicationKeyInfo.tel" type="text" placeholder="必填，请填写手机号"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">用户类型</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="addApplicationKeyInfo.typeCd">
                                    <option selected disabled value="">必填，请选择用户类型</option>
                                    <option value="10001">保洁</option>
                                    <option value="10002">保安</option>
                                    <option value="10003">其他人员</option>
                                </select></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">钥匙类型</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="addApplicationKeyInfo.typeFlag">
                                    <option selected disabled value="">必填，请选择钥匙类型申请</option>
                                    <option value="1100101">人脸</option>
                                    <option value="1100102">固定密码</option>
                                    <option value="1100103">临时密码</option>
                                </select></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">性别</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="addApplicationKeyInfo.sex">
                                    <option selected disabled value="">必填，请选择性别</option>
                                    <option value="0">男</option>
                                    <option value="1">女</option>
                                </select></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">年龄</label>
                            <div class="col-sm-10">
                                <input v-model="addApplicationKeyInfo.age" type="text" placeholder="必填，请填写年龄"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">身份证号</label>
                            <div class="col-sm-10">
                                <input v-model="addApplicationKeyInfo.idCard" type="text" placeholder="必填，请填写身份证号"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">设备位置</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="addApplicationKeyInfo.locationTypeCd"
                                        placeholder="必填，请选择设备位置">
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
                             v-show="addApplicationKeyInfo.locationTypeCd == '2000' || addApplicationKeyInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属楼栋</label>
                            <div class="col-sm-10">
                                <vc:create name="floorSelect2"
                                           parentModal="addApplicationKeyModel"
                                           namespace="addApplicationKey"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="addApplicationKeyInfo.locationTypeCd == '2000' || addApplicationKeyInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属单元</label>
                            <div class="col-sm-10">
                                <vc:create name="unitSelect2"
                                           parentModal="addApplicationKeyModel"
                                           callBackListener="addApplicationKey"
                                           callBackFunction="notify"
                                           namespace="addApplicationKey"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row"
                             v-show="addApplicationKeyInfo.locationTypeCd == '3000'  ">
                            <label class="col-sm-2 col-form-label">归属房间</label>
                            <div class="col-sm-10">
                                <vc:create name="roomSelect2"
                                           parentModal="addApplicationKeyModel"
                                           callBackListener="addApplicationKey"
                                           callBackFunction="notify"
                                           namespace="addApplicationKey"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">开始时间</label>
                            <div class="col-sm-10">
                                <input v-model="addApplicationKeyInfo.startTime" readonly type="text"
                                       placeholder="必填，请填写开始时间"
                                       class="form-control addApplicationStartTime">
                            </div>
                        </div>
                        <div class="form-group row" v-show="addApplicationKeyInfo.typeFlag == '1100101' || addApplicationKeyInfo.typeFlag == '1100102' ">
                            <label class="col-sm-2 col-form-label">结束时间</label>
                            <div class="col-sm-10">
                                <input v-model="addApplicationKeyInfo.endTime" readonly type="text"
                                       placeholder="必填，请填写结束时间"
                                       class="form-control addApplicationEndTime">
                            </div>
                        </div>
                        <div class="form-group row" v-if="addApplicationKeyInfo.typeFlag == '1100101'">
                            <label class="col-sm-2 col-form-label">照片</label>
                            <div class="col-sm-10"><img width="100%" height="100%"
                                                        v-bind:src="addApplicationKeyInfo.photo" alt="申请人照片"></div>
                        </div>

                        <div class="ibox-content">
                            <button class="btn btn-primary float-right" type="button"
                                    v-on:click="saveApplicationKeyInfo()"><i class="fa fa-check"></i>&nbsp;保存
                            </button>
                            <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                    v-on:click="_closeAddApplicationKeyView()">取消
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
            
            import FloorSelect2 from '@/component/FloorSelect2.vue';import UnitSelect2 from '@/component/UnitSelect2.vue';import RoomSelect2 from '@/component/RoomSelect2.vue';



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
                    FloorSelect2,UnitSelect2,RoomSelect2
                },
                data () {
                    return {"addApplicationKeyInfo":{"applicationKeyId":"","name":"","tel":"","typeCd":"","sex":"","age":"","idCard":"","startTime":"","endTime":"","floorId":"","floorNum":"","floorName":"","unitId":"","unitName":"","roomId":"","locationTypeCd":"","locationObjId":"","roomName":"","typeFlag":"","photo":"","mediaStreamTrack":null}}    
                },
                mounted() {
                ( () => {
            this._initAddApplicationKeyDateInfo();
            //this._initAddApplicationKeyMedia();
        })()
( () => {
            this.$vc.on('addApplicationKey', 'openAddApplicationKeyModal',  () => {
                $('#addApplicationKeyModel').modal('show');
            });
            this.$vc.on('addApplicationKey', "_initAddApplicationKeyData",  () => {
                this._initAddApplicationKeyMedia();
            });
            this.$vc.on("addApplicationKey", "notify",  (_param) => {
                if (_param.hasOwnProperty("floorId")) {
                    this.addApplicationKeyInfo.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.addApplicationKeyInfo.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.addApplicationKeyInfo.roomId = _param.roomId;
                }
            });
        })()   
                },
                methods: {
                    _initAddApplicationKeyDateInfo:function () {
                this.addApplicationKeyInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.addApplicationStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.addApplicationStartTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addApplicationStartTime").val();
                        this.addApplicationKeyInfo.startTime = value;
                    });
                $('.addApplicationEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.addApplicationEndTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addApplicationEndTime").val();
                        this.addApplicationKeyInfo.endTime = value;
                    });
            },addApplicationKeyValidate:function () {
                return this.$vc.validate.validate({
                    addApplicationKeyInfo: this.addApplicationKeyInfo
                }, {
                    'addApplicationKeyInfo.name': [
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
                    'addApplicationKeyInfo.tel': [
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
                    'addApplicationKeyInfo.typeCd': [
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
                    'addApplicationKeyInfo.sex': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "性别不能为空"
                        }

                    ],
                    'addApplicationKeyInfo.age': [
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
                    'addApplicationKeyInfo.idCard': [
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
                    'addApplicationKeyInfo.startTime': [
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
                    'addApplicationKeyInfo.endTime': [
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
                    'addApplicationKeyInfo.locationTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "申请位置不能为空"
                        }
                    ],
                    'addApplicationKeyInfo.locationObjId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "具体位置不能为空"
                        }
                    ]


                });
            },saveApplicationKeyInfo:function () {
                this.addApplicationKeyInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.addApplicationKeyInfo.locationTypeCd != '2000' && this.addApplicationKeyInfo.locationTypeCd != '3000') { //大门时直接写 写字楼ID
                    this.addApplicationKeyInfo.locationObjId = this.addApplicationKeyInfo.communityId;
                } else if (this.addApplicationKeyInfo.locationTypeCd == '2000') {
                    this.addApplicationKeyInfo.locationObjId = this.addApplicationKeyInfo.unitId;
                } else if (this.addApplicationKeyInfo.locationTypeCd == '3000') {
                    this.addApplicationKeyInfo.locationObjId = this.addApplicationKeyInfo.roomId;
                } else {
                    this.$vc.toast("设备位置值错误");
                    return;
                }
                if (!this.addApplicationKeyValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addApplicationKeyInfo);
                    $('#addApplicationKeyModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addApplicationKey',
                    'save',
                    JSON.stringify(this.addApplicationKeyInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            //$('#addApplicationKeyModel').modal('hide');
                            this.clearAddApplicationKeyInfo();
                            this.$vc.emit('applicationKeyManage', 'listApplicationKey', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddApplicationKeyInfo:function () {
                this.addApplicationKeyInfo = {
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
                    unitName: '',
                    roomId: '',
                    locationTypeCd: '',
                    locationObjId: '',
                    roomName: '',
                    photo: '',
                    videoPlaying: false,
                    mediaStreamTrack: null,
                    typeFlag:'',
                };
            },_closeAddApplicationKeyView:function () {
                this.$vc.emit('applicationKeyManage', 'listApplicationKey', {});
                //关闭拍照摄像头
                if (this.addApplicationKeyInfo.mediaStreamTrack != null) {
                    this.addApplicationKeyInfo.mediaStreamTrack.stop();
                }
            },_addUserMedia:function () {
                return navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || null;
            },_initAddApplicationKeyMedia:function () {
                if (this._addUserMedia()) {
                    this.addApplicationKeyInfo.videoPlaying = false;
                    var constraints = {
                        video: true,
                        audio: false
                    };
                    var addVideo = document.getElementById('addApplicationKeyPhoto');
                    var media = navigator.getUserMedia(constraints,  (stream) => {
                        var url = window.URL || window.webkitURL;
                        //video.src = url ? url.createObjectURL(stream) : stream;
                        this.addApplicationKeyInfo.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
                        try {
                            addVideo.src = url ? url.createObjectURL(stream) : stream;
                        } catch (error) {
                            addVideo.srcObject = stream;
                        }
                        addVideo.play();
                        this.addApplicationKeyInfo.videoPlaying = true;
                    },  (error) => {
                        console.log("ERROR");
                        console.log(error);
                    });
                } else {
                    console.log("初始化视频失败");
                }
            },_takePhoto:function () {
                if (this.addApplicationKeyInfo.videoPlaying) {
                    var canvas = document.getElementById('AddApplicationKeyCanvas');
                    var takeAddVideo = document.getElementById('addApplicationKeyPhoto');
                    canvas.width = takeAddVideo.videoWidth;
                    canvas.height = takeAddVideo.videoHeight;
                    canvas.getContext('2d').drawImage(takeAddVideo, 0, 0);
                    var data = canvas.toDataURL('image/webp');
                    this.addApplicationKeyInfo.photo = data;
                    //document.getElementById('photo').setAttribute('src', data);
                }
            },_uploadPhoto:function (event) {
                $("#uploadApplicationKeyPhoto").trigger("click")
            },_choosePhoto:function (event) {
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
                        this.addApplicationKeyInfo.photo = reader.result;
                    }
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    