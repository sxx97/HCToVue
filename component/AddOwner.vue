
        <template>
            <div id="addOwnerModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加{{addOwnerInfo.componentTitle}}</h3>
                <div class="ibox-content">
                    <div class="row">
                        <!--<div class="col-sm-6" style="text-align:center">
                            <video id="ownerPhoto" style="width: 100%;"></video>
                            <canvas id="canvas" style="display:none;"></canvas>
                            <div style="margin-top:20px">
                                <button class="btn btn-primary" type="button" v-on:click="_takePhoto()"><span class="glyphicon glyphicon-camera"></span> 拍照</button>
                                <span class="btn btn-default btn-file" v-on:click="_uploadPhoto($event)">
                                    <span class="fileinput-new" >上传照片</span>
                                </span>
                                <input type="file" class="file" accept="images/*" id="uploadOwnerPhoto" hidden v-on:change="_choosePhoto($event)">
                            </div>
                        </div>-->
                        <div class="col-sm-12">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">名称</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.name" type="text"
                                                              placeholder="必填，请填写名称" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">性别</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addOwnerInfo.sex">
                                        <option selected disabled value="">必填，请选择性别</option>
                                        <option value="0">男</option>
                                        <option value="1">女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">年龄</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.age" type="number"
                                                              placeholder="必填，请填写年龄" class="form-control"></div>
                            </div>
                            <div class="form-group row" v-if="addOwnerInfo.componentTitle == '成员'">
                                <label class="col-sm-2 col-form-label">类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addOwnerInfo.ownerTypeCd">
                                        <option selected disabled value="">必填，请选择类型</option>
                                        <option value="1002">员工</option>
                                        <option value="1003">租客</option>
                                        <option value="1005">访客</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">身份证</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.idCard" type="number"
                                                              placeholder="必填，请填写身份证" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">手机</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.link" type="number"
                                                              placeholder="必填，请填写联系方式" class="form-control"></div>
                            </div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">公司楼层</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.companyFloor" type="text"
                                                              placeholder="请填写公司楼层" class="form-control"></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">公司名称</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.companyName" type="text"
                                                              placeholder="请填写公司名称" class="form-control"></div>
                            </div>-->
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10"><input v-model="addOwnerInfo.remark" type="tel"
                                                              placeholder="可填，请填写备注" class="form-control"></div>
                            </div>
                            <!--<div class="form-group row">
                                <label class="col-sm-2 col-form-label">照片</label>
                                <div class="col-sm-10"><img width="100%" height="100%"
                                                            v-bind:src="addOwnerInfo.ownerPhoto" alt="业主照片"></div>
                            </div>-->
                        </div>

                    </div>
                    <div class="ibox-content">
                        <button class="btn btn-primary float-right" type="button" v-on:click="saveOwnerInfo()">
                            <i class="fa fa-check"></i>&nbsp;保存
                        </button>
                        <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                data-dismiss="modal">取消
                        </button>
                    </div>
                </div>
            </div>
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
                props: {"notifyLoadDataComponentName":"true","componentTitle":"true"},
                components: {
                    
                },
                data () {
                    return {"addOwnerInfo":{"componentTitle":"","name":"","age":"","link":"","sex":"","ownerTypeCd":"-1","remark":"","ownerId":"","ownerPhoto":"","idCard":"","videoPlaying":false}}    
                },
                mounted() {
                ( () => {
            this.addOwnerInfo.componentTitle = this.$vc._thiscomponentTitle;
        })()
( () => {
            this.$vc.on('addOwner', 'openAddOwnerModal',  (_ownerId) => {
                if (_ownerId != null || _ownerId != -1) {
                    this.addOwnerInfo.ownerId = _ownerId;
                }
                $('#addOwnerModel').modal('show');
                // this._initAddOwnerMedia();
            });
        })()   
                },
                methods: {
                    addOwnerValidate:function () {
                return this.$vc.validate.validate({
                    addOwnerInfo: this.addOwnerInfo
                }, {
                    'addOwnerInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,10",
                            errInfo: "名称长度必须在2位至10位"
                        },
                    ],
                    'addOwnerInfo.age': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "年龄不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "年龄不是有效的数字"
                        },
                    ],
                    'addOwnerInfo.sex': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "性别不能为空"
                        }
                    ],
                    'addOwnerInfo.link': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "手机号不能为空"
                        },
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "不是有效的手机号"
                        }
                    ],
                    /*'addOwnerInfo.companyName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "公司名称不能为空"
                        },
                    ],
                    'addOwnerInfo.companyFloor': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "公司楼层不能为空"
                        },
                    ],*/
                    'addOwnerInfo.idCard': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "身份证不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "18",
                            errInfo: "身份证长度不能超过200位"
                        }
                    ],
                    'addOwnerInfo.ownerTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "人员类型不能为空"
                        }
                    ],
                    'addOwnerInfo.remark': [

                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注长度不能超过200位"
                        }
                    ]

                });
            },saveOwnerInfo:function () {
                if (!this.addOwnerValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addOwnerInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                this.$vc.http.post(
                    'addOwner',
                    'saveOwner',
                    JSON.stringify(this.addOwnerInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addOwnerModel').modal('hide');
                            this.clearAddOwnerInfo();
                            this.$vc.emit(this.$vc._thisnotifyLoadDataComponentName, 'listOwnerData', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddOwnerInfo:function () {
                this.addOwnerInfo = {
                    componentTitle: '',
                    name: '',
                    age: '',
                    link: '',
                    sex: '',
                    ownerTypeCd: '-1',
                    remark: '',
                    ownerId: '',
                    ownerPhoto: '',
                    idCard: '',
                    /*companyName: '',
                    companyFloor: '',*/
                    videoPlaying: false
                };
                this.addOwnerInfo.componentTitle = this.$vc._thiscomponentTitle;
            },_addUserMedia:function () {
                return navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || null;
            },_initAddOwnerMedia:function () {
                if (this._addUserMedia()) {
                    this.addOwnerInfo.videoPlaying = false;
                    var constraints = {
                        video: true,
                        audio: false
                    };
                    var video = document.getElementById('ownerPhoto');
                    var media = navigator.getUserMedia(constraints,  (stream) => {
                        var url = window.URL || window.webkitURL;
                        //video.src = url ? url.createObjectURL(stream) : stream;
                        try {
                            video.src = url ? url.createObjectURL(stream) : stream;
                        } catch (error) {
                            video.srcObject = stream;
                        }
                        video.play();
                        this.addOwnerInfo.videoPlaying = true;
                    },  (error) => {
                        console.log("ERROR");
                        console.log(error);
                    });
                } else {
                    console.log("初始化视频失败");
                }
            },_takePhoto:function () {
                if (this.addOwnerInfo.videoPlaying) {
                    var canvas = document.getElementById('canvas');
                    var video = document.getElementById('ownerPhoto');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0);
                    var data = canvas.toDataURL('image/webp');
                    this.addOwnerInfo.ownerPhoto = data;
                    //document.getElementById('photo').setAttribute('src', data);
                }
            },_uploadPhoto:function (event) {
                $("#uploadOwnerPhoto").trigger("click")
            },_choosePhoto:function (event) {
                var photoFiles = event.target.files;
                if (photoFiles && photoFiles.length > 0) {
                    // 获取目前上传的文件
                    var file = photoFiles[0];// 文件大小校验的动作
                    if (file.size > 1024 * 1024 * 1) {
                        this.$vc.toast("图片大小不能超过 1MB!")
                        return false;
                    }
                    var reader = new FileReader(); //新建FileReader对象
                    reader.readAsDataURL(file); //读取为base64
                    reader.onloadend = function (e) {
                        this.addOwnerInfo.ownerPhoto = reader.result;
                    }
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    