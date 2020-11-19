
        <template>
            <div id="addAdvertModel" class="modal fade" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">发布广告</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">广告名称</label>
                                <div class="col-sm-10">
                                    <input v-model="addAdvertInfo.adName" type="text" placeholder="必填，请填写广告名称"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">广告类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addAdvertInfo.adTypeCd">
                                        <option selected disabled value="">必填，请选择广告类型</option>
                                        <option value="10000">门禁机</option>
                                        <option value="20000">其他设备</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">广告分类</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addAdvertInfo.classify">
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
                                    <select class="custom-select" v-model="addAdvertInfo.locationTypeCd">
                                        <option selected disabled value="">必填，请选择投放位置</option>
                                        <option value="1000">大门</option>
                                        <option value="4000">楼栋</option>
                                        <option value="2000">单元门</option>
                                        <option value="3000">房间门</option>
                                    </select></div>
                            </div>
                            <div class="form-group row"
                                 v-show="addAdvertInfo.locationTypeCd == '2000' || addAdvertInfo.locationTypeCd == '3000' ||addAdvertInfo.locationTypeCd == '4000' ">
                                <label class="col-sm-2 col-form-label">归属楼栋</label>
                                <div class="col-sm-10">
                                    <vc:create name="floorSelect2"
                                               parentModal="addAdvertModel"
                                               namespace="addAdvert"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row"
                                 v-show="addAdvertInfo.locationTypeCd == '2000' || addAdvertInfo.locationTypeCd == '3000'  ">
                                <label class="col-sm-2 col-form-label">归属单元</label>
                                <div class="col-sm-10">
                                    <vc:create name="unitSelect2"
                                               parentModal="addAdvertModel"
                                               callBackListener="addAdvert"
                                               callBackFunction="notify"
                                               namespace="addAdvert"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row"
                                 v-show="addAdvertInfo.locationTypeCd == '3000'  ">
                                <label class="col-sm-2 col-form-label">归属房间</label>
                                <div class="col-sm-10">
                                    <vc:create name="roomSelect2"
                                               parentModal="addAdvertModel"
                                               callBackListener="addAdvert"
                                               callBackFunction="notify"
                                               namespace="addAdvert"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">播放顺序</label>
                                <div class="col-sm-10">
                                    <input v-model="addAdvertInfo.seq" type="text" placeholder="必填，请填写播放顺序"
                                           class="form-control">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">投放时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addAdvertInfo.startTime" type="text" readonly
                                           placeholder="必填，请填写投放时间"
                                           class="form-control addAdvertStartTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">结束时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addAdvertInfo.endTime" type="text" readonly placeholder="必填，请填写结束时间"
                                           class="form-control addAdvertEndTime">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">播放方式</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addAdvertInfo.viewType">
                                        <option selected disabled value="">必填，请选择播放方式</option>
                                        <option value="8888">图片</option>
                                        <option value="9999">视频</option>
                                    </select></div>
                            </div>
                            <div class="form-group row" v-if="addAdvertInfo.viewType == '8888'">
                                <label class="col-sm-2 col-form-label">图片</label>
                                <div class="content-img col-sm-10">
                                    <vc:create name="uploadImage"
                                               callBackListener="addAdvert"
                                               callBackFunction="notifyUploadImage"
                                               namespace="addAdvert"
                                    ></vc:create>
                                </div>
                            </div>
                            <div class="form-group row" v-if="addAdvertInfo.viewType == '9999'">
                                <label class="col-sm-2 col-form-label">视频</label>
                                <div class="content-img col-sm-10">
                                    <vc:create name="uploadVedio"
                                               callBackListener="addAdvert"
                                               callBackFunction="notifyUploadVedio"
                                               namespace="addAdvert"
                                    ></vc:create>
                                </div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="saveAdvertInfo()">
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
    </div>
</div>

        </template>
        <script>
            
            import FloorSelect2 from '@/component/FloorSelect2.vue';import UnitSelect2 from '@/component/UnitSelect2.vue';import RoomSelect2 from '@/component/RoomSelect2.vue';import UploadImage from '@/component/UploadImage.vue';import UploadVedio from '@/component/UploadVedio.vue';



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
                props: {"callBackListener":"string","callBackFunction":"string"},
                components: {
                    FloorSelect2,UnitSelect2,RoomSelect2,UploadImage,UploadVedio
                },
                data () {
                    return {"addAdvertInfo":{"advertId":"","adName":"","adTypeCd":"","classify":"","locationTypeCd":"","locationObjId":"","seq":"","startTime":"","endTime":"","floorId":"","floorNum":"","floorName":"","unitId":"","unitName":"","roomId":"","photos":[],"viewType":"","vedioName":""}}    
                },
                mounted() {
                ( () => {
            this._initAddAdvertDateInfo();
        })()
( () => {
            this.$vc.on('addAdvert', 'openAddAdvertModal',  () => {
                $('#addAdvertModel').modal('show');
            });

            this.$vc.on("addAdvert", "notify",  (_param) => {
                if (_param.hasOwnProperty("floorId")) {
                    this.addAdvertInfo.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    this.addAdvertInfo.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    this.addAdvertInfo.roomId = _param.roomId;
                }
            });

            this.$vc.on("addAdvert", "notifyUploadImage",  (_param) => {
                this.addAdvertInfo.photos = _param;
            });
            this.$vc.on("addAdvert", "notifyUploadVedio",  (_param) => {
                this.addAdvertInfo.vedioName = _param.realFileName;
            });
        })()   
                },
                methods: {
                    _initAddAdvertDateInfo:function () {
                this.addAdvertInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.addAdvertStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.addAdvertStartTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addAdvertStartTime").val();
                        this.addAdvertInfo.startTime = value;
                    });
                $('.addAdvertEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.addAdvertEndTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".addAdvertEndTime").val();
                        this.addAdvertInfo.endTime = value;
                    });
            },addAdvertValidate:function () {
                return this.$vc.validate.validate({
                    addAdvertInfo: this.addAdvertInfo
                }, {
                    'addAdvertInfo.adName': [
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
                    'addAdvertInfo.adTypeCd': [
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
                    'addAdvertInfo.classify': [
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
                    'addAdvertInfo.locationTypeCd': [
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
                    'addAdvertInfo.locationObjId': [
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
                    'addAdvertInfo.seq': [
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
                    'addAdvertInfo.startTime': [
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
                    'addAdvertInfo.endTime': [
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


                });
            },saveAdvertInfo:function () {
                this.addAdvertInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.addAdvertInfo.locationTypeCd == '1000') { //大门时直接写 写字楼ID
                    this.addAdvertInfo.locationObjId = this.addAdvertInfo.communityId;
                } else if (this.addAdvertInfo.locationTypeCd == '2000') {
                    this.addAdvertInfo.locationObjId = this.addAdvertInfo.unitId;
                } else if (this.addAdvertInfo.locationTypeCd == '3000') {
                    this.addAdvertInfo.locationObjId = this.addAdvertInfo.roomId;
                } else if (this.addAdvertInfo.locationTypeCd == '4000') {
                    this.addAdvertInfo.locationObjId = this.addAdvertInfo.floorId;
                } else {
                    this.$vc.toast("设备位置值错误");
                    return;
                }
                if (!this.addAdvertValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }
                if (this.addAdvertInfo.viewType == '8888') {
                    this.addAdvertInfo.vedioName = '';
                } else {
                    this.addAdvertInfo.photos = [];

                }

                this.addAdvertInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                //不提交数据将数据 回调给侦听处理
                if (this.$vc.notNull(this.$vc._thiscallBackListener)) {
                    this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, this.addAdvertInfo);
                    $('#addAdvertModel').modal('hide');
                    return;
                }

                this.$vc.http.post(
                    'addAdvert',
                    'save',
                    JSON.stringify(this.addAdvertInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addAdvertModel').modal('hide');
                            this.clearAddAdvertInfo();
                            this.$vc.emit('advertManage', 'listAdvert', {});

                            return;
                        }
                        this.$vc.toast(json);

                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.toast(errInfo);

                    });
            },clearAddAdvertInfo:function () {
                this.$vc.emit('addAdvert', 'floorSelect2', 'clearFloor', {});
                this.$vc.emit('addAdvert', 'unitSelect2', 'clearUnit', {});
                this.$vc.emit('addAdvert', 'roomSelect2', 'clearRoom', {});
                this.$vc.emit('addAdvert', 'uploadImage', 'clearImage', {});
                this.$vc.emit('addAdvert', 'uploadVedio', 'clearVedio', {});
                this._initAddAdvertDateInfo();

                this.addAdvertInfo = {
                    advertId: '',
                    adName: '',
                    adTypeCd: '',
                    classify: '',
                    locationTypeCd: '',
                    locationObjId: '',
                    seq: '',
                    startTime: '',
                    endTime: '',
                    floorId: '',
                    floorNum: '',
                    floorName: '',
                    unitId: '',
                    unitName: '',
                    roomId: '',
                    photos: [],
                    viewType: '',
                    vedioName: ''
                };
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    