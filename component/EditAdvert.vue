
        <template>
            <div id="editAdvertModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">修改广告</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">广告名称</label>
                                <div class="col-sm-10">
                                    <input v-model="editAdvertInfo.adName" type="text" placeholder="必填，请填写广告名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">广告类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editAdvertInfo.adTypeCd">
                                        <option selected disabled value="">必填，请选择广告类型</option>
                                        <option value="10000">门禁机</option>
                                        <option value="20000">其他设备</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">广告分类</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editAdvertInfo.classify">
                                        <option selected disabled value="">必填，请选择广告分类</option>
                                        <option value="9001">物流</option>
                                        <option value="9002">餐饮</option>
                                        <option value="9003">旅游</option>
                                        <option value="9004">酒店</option>
                                        <option value="9005">教育</option>
                                        <option value="9006">互联网</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">投放位置</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editAdvertInfo.locationTypeCd">
                                        <option selected disabled value="">必填，请选择投放位置</option>
                                        <option value="1000">大门</option>
                                        <option value="2000">单元门</option>
                                        <option value="3000">房间门</option>
                                        <option value="4000">楼栋</option>
                                    </select></div>
                            </div>
                            <div class="form-group row"
                                 v-show="editAdvertInfo.locationTypeCd == '2000' || editAdvertInfo.locationTypeCd == '3000' ||editAdvertInfo.locationTypeCd == '4000' ">
                                <label class="col-sm-2 col-form-label">归属楼栋</label>
                                <div class="col-sm-10">
                                    <vc:create name="floorSelect2"
                                               parentModal="editAdvertModel"
                                               namespace="editAdvert"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row"
                                 v-show="editAdvertInfo.locationTypeCd == '2000' || editAdvertInfo.locationTypeCd == '3000'  ">
                                <label class="col-sm-2 col-form-label">归属单元</label>
                                <div class="col-sm-10">
                                    <vc:create name="unitSelect2"
                                               parentModal="editAdvertModel"
                                               callBackListener="editAdvert"
                                               callBackFunction="notify"
                                               namespace="editAdvert"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row"
                                 v-show="editAdvertInfo.locationTypeCd == '3000'  ">
                                <label class="col-sm-2 col-form-label">归属房间</label>
                                <div class="col-sm-10">
                                    <vc:create name="roomSelect2"
                                               parentModal="editAdvertModel"
                                               callBackListener="editAdvert"
                                               callBackFunction="notify"
                                               namespace="editAdvert"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">播放顺序</label>
                                <div class="col-sm-10">
                                    <input v-model="editAdvertInfo.seq" type="text" placeholder="必填，请填写播放顺序"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">投放时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editAdvertInfo.startTime" type="text" placeholder="必填，请填写投放时间"
                                           class="form-control editAdvertStartTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">结束时间</label>
                                <div class="col-sm-10">
                                    <input v-model="editAdvertInfo.endTime" type="text" placeholder="必填，请填写结束时间"
                                           class="form-control editAdvertEndTime">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">播放方式</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="editAdvertInfo.viewType">
                                        <option selected disabled value="">必填，请选择播放方式</option>
                                        <option value="8888">图片</option>
                                        <option value="9999">视频</option>
                                    </select></div>
                            </div>
                            <div class="form-group row" v-if="editAdvertInfo.viewType == '8888'">
                                <label class="col-sm-2 col-form-label">图片</label>
                                <div class="content-img col-sm-10">
                                    <vc:create name="uploadImage"
                                               callBackListener="editAdvert"
                                               callBackFunction="notifyUploadImage"
                                               namespace="editAdvert"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row" v-if="editAdvertInfo.viewType == '9999'">
                                <label class="col-sm-2 col-form-label">视频</label>
                                <div class="content-img col-sm-10">
                                    <vc:create name="uploadVedio"
                                               callBackListener="editAdvert"
                                               callBackFunction="notifyUploadVedio"
                                               namespace="editAdvert"
                                    ></vc:create>
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="editAdvert()"><i
                                        class="fa fa-check"></i>&nbsp;保存
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
    </div>
</div>

        </template>
        <script>
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"editAdvertInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initEditAdvertDateInfo();

        })()(function () {
            this.$vc.on('editAdvert', 'openEditAdvertModal', function (_params) {
                this.refreshEditAdvertInfo();
                $('#editAdvertModel').modal('show');
                this.$vc.copyObject(_params, this.editAdvertInfo);
                //根据位置类型 传输数据
                if (this.editAdvertInfo.locationTypeCd == '4000') {
                    this.$vc.emit('editAdvert', 'floorSelect2', 'setFloor', {
                        floorId: this.editAdvertInfo.floorId,
                        floorNum: this.editAdvertInfo.floorNum
                    });

                } else if (this.editAdvertInfo.locationTypeCd == '2000') {
                    this.$vc.emit('editAdvert', 'floorSelect2', 'setFloor', {
                        floorId: this.editAdvertInfo.floorId,
                        floorNum: this.editAdvertInfo.floorNum
                    });
                    this.$vc.emit('editAdvert', 'unitSelect2', 'setUnit', {
                        floorId: this.editAdvertInfo.floorId,
                        floorNum: this.editAdvertInfo.floorNum,
                        unitId: this.editAdvertInfo.unitId,
                        unitNum: this.editAdvertInfo.unitNum,
                    });
                } else if (this.editAdvertInfo.locationTypeCd == '3000') {
                    this.$vc.emit('editAdvert', 'floorSelect2', 'setFloor', {
                        floorId: this.editAdvertInfo.floorId,
                        floorNum: this.editAdvertInfo.floorNum
                    });
                    this.$vc.emit('editAdvert', 'unitSelect2', 'setUnit', {
                        floorId: this.editAdvertInfo.floorId,
                        floorNum: this.editAdvertInfo.floorNum,
                        unitId: this.editAdvertInfo.unitId,
                        unitNum: this.editAdvertInfo.unitNum,
                    });
                    this.$vc.emit('editAdvert', 'roomSelect2', 'setRoom', {
                        floorId: this.editAdvertInfo.floorId,
                        floorNum: this.editAdvertInfo.floorNum,
                        unitId: this.editAdvertInfo.unitId,
                        unitNum: this.editAdvertInfo.unitNum,
                        roomId: this.editAdvertInfo.roomId,
                        roomNum: this.editAdvertInfo.roomNum,
                    });
                }
                this._loadAdvertItem();
                this.editAdvertInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //查询 广告属性
            });

            this.$vc.on("editAdvert", "notify", function (_param) {
                if (_param.hasOwnProperty("floorId")) {
                    this.editAdvertInfo.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.editAdvertInfo.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.editAdvertInfo.roomId = _param.roomId;
                }
            });

            this.$vc.on("editAdvert", "notifyUploadImage", function (_param) {
                this.editAdvertInfo.photos = _param;
            });
            this.$vc.on("editAdvert", "notifyUploadVedio", function (_param) {
                this.editAdvertInfo.vedioName = _param.realFileName;
            });
        })()   
            },
            methods: {
                _initEditAdvertDateInfo:function () {
                this.editAdvertInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.editAdvertStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.editAdvertStartTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editAdvertStartTime").val();
                        this.editAdvertInfo.startTime = value;
                    });
                $('.editAdvertEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editAdvertEndTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editAdvertEndTime").val();
                        this.editAdvertInfo.endTime = value;
                    });
            },editAdvertValidate:function () {
                return this.$vc.validate.validate({
                    editAdvertInfo: this.editAdvertInfo
                }, {
                    'editAdvertInfo.adName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "广告名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,200",
                            errInfo: "广告名称不能超过200位"
                        },
                    ],
                    'editAdvertInfo.adTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "广告类型不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "广告类型不能为空"
                        },
                    ],
                    'editAdvertInfo.classify': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "广告分类不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "广告分类格式错误"
                        },
                    ],
                    'editAdvertInfo.locationTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投放位置不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "投放位置格式错误"
                        },
                    ],
                    'editAdvertInfo.locationObjId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "具体位置不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "具体位置不是有效数字"
                        },
                    ],
                    'editAdvertInfo.seq': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "播放顺序不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "播放顺序不是有效的数字"
                        },
                    ],
                    'editAdvertInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "投放时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "不是有效的时间格式"
                        },
                    ],
                    'editAdvertInfo.endTime': [
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
                    'editAdvertInfo.advertId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "广告ID不能为空"
                        }]

                });
            },editAdvert:function () {
                this.editAdvertInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.editAdvertInfo.locationTypeCd == '1000') { //大门时直接写 写字楼ID
                    this.editAdvertInfo.locationObjId = this.editAdvertInfo.communityId;
                } else if (this.editAdvertInfo.locationTypeCd == '2000') {
                    this.editAdvertInfo.locationObjId = this.editAdvertInfo.unitId;
                } else if (this.editAdvertInfo.locationTypeCd == '3000') {
                    this.editAdvertInfo.locationObjId = this.editAdvertInfo.roomId;
                } else if (this.editAdvertInfo.locationTypeCd == '4000') {
                    this.editAdvertInfo.locationObjId = this.editAdvertInfo.floorId;
                } else {
                    this.$vc.toast("设备位置值错误");
                    return;
                }
                if (!this.editAdvertValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }

                if (this.editAdvertInfo.viewType == '8888') {
                    this.editAdvertInfo.vedioName = '';
                } else {
                    this.editAdvertInfo.photos = [];

                }

                this.$vc.http.post(
                    'editAdvert',
                    'update',
                    JSON.stringify(this.editAdvertInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editAdvertModel').modal('hide');
                            this.$vc.emit('advertManage', 'listAdvert', {});
                            return;
                        }
                        this.$vc.toast(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.toast(errInfo);
                    });
            },_loadAdvertItem:function () {
                var param = {
                    params: {
                        advertId: this.editAdvertInfo.advertId,
                        communityId: this.$vc.getCurrentCommunity().communityId
                    }
                };
                //发送get请求
                this.$vc.http.get('editAdvert',
                    'listAdvertItem',
                    param,
                    function (json, res) {
                        var _advertItemInfo = JSON.parse(json);
                        this._freshPhotoOrVedio(_advertItemInfo.advertItems);

                    }, function (errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },_freshPhotoOrVedio:function (_advertItems) {
                //判断属性中是否有照片
                _advertItems.forEach(function (_item) {
                        this.editAdvertInfo.viewType = _item.itemTypeCd;
                        var _photos = [];
                        if (_item.itemTypeCd == '8888') {
                            //this.editAdvertInfo.photos.push(_item.url);
                            _photos.push(_item.url);
                            this.$vc.emit('editAdvert', 'uploadImage', 'notifyPhotos', _photos);
                        } else {
                            this.editAdvertInfo.vedioName = _item.url;
                            this.$vc.emit('editAdvert', 'uploadVedio', 'notifyVedio', _item.url);
                        }

                    }
                );


            },refreshEditAdvertInfo:function () {
                this.editAdvertInfo = {
                    advertId: '',
                    adName: '',
                    adTypeCd: '',
                    classify: '',
                    locationTypeCd: '',
                    locationObjId: '',
                    state: '',
                    seq: '',
                    startTime: '',
                    endTime: '',
                    floorId: '',
                    floorNum: '',
                    floorName: '',
                    unitId: '',
                    unitNum: '',
                    roomId: '',
                    roomNum: '',
                    photos: [],
                    viewType: '',
                    vedioName: '',

                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    