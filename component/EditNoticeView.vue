
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>{{editNoticeViewInfo.noticeId != '' ? '修改' : '新'}}公告</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">
                <div>
                    <div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">标题</label>
                            <div class="col-sm-10">
                                <input v-model="editNoticeViewInfo.title" type="text" placeholder="必填，请填写标题"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">公告类型</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="editNoticeViewInfo.noticeTypeCd">
                                    <option selected disabled value="">必填，请选择公告类型</option>
                                    <option value="1000">用户小程序</option>
                                </select></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">头部照片</label>
                            <div class="col-sm-10">
                                <vc:create name="uploadImage"
                                           callBackListener="editNoticeView"
                                           callBackFunction="notifyUploadImage"
                                           namespace="editNoticeView"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">开始时间</label>
                            <div class="col-sm-10">
                                <input v-model="editNoticeViewInfo.startTime" readonly type="text" placeholder="必填，请填写开始时间" class="form-control editNoticeStartTime">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">结束时间</label>
                            <div class="col-sm-10">
                                <input v-model="editNoticeViewInfo.endTime" readonly type="text" placeholder="必填，请填写结束时间" class="form-control editNoticeEndTime">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">公告内容</label>
                            <div class="col-sm-10 ">
                                <vc:create name="wangEditor"
                                           parentComponent="editNoticeView"></vc:create>
                                <!--<textarea v-model="addNoticeViewInfo.context" cols="3"  type="text" placeholder="必填，请填写公告内容" class="form-control"></textarea>-->
                            </div>
                        </div>
                        <div class="ibox-content">
                            <button class="btn btn-primary float-right" type="button" v-on:click="editNotice()"><i
                                    class="fa fa-check"></i>&nbsp;保存
                            </button>
                            <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                                    v-on:click="closeEditNoticeInfo()">取消
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
                return {"editNoticeViewInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            console.log(this.$vc, 'this.$vc对象');
            this._initEditNoticeInfo();
        })()(function () {
           /* this.$vc.on('editNoticeViewInfo', 'openEditNoticeModal', function (_params) {
                this.refreshEditNoticeInfo();
                _params.context = filterXSS(_params.context);
                this.editNoticeInfo = _params;
            });*/
            this.$vc.on('editNoticeView', 'changeEditor', this.changeNoticeEditor);
            this.$vc.on('editNoticeViewInfo', 'noticeEditNoticeInfo', function (_params) {
                this.refreshEditNoticeInfo();
                if (_params != null) {
                    // _params.context = filterXSS(_params.context);
                    this.$vc.copyObject(_params, this.editNoticeViewInfo);
                    this.$vc.emit('wangEditor', 'setWangEditorContent', this.editNoticeViewInfo.context);
                    var photos = [];
                    photos.push(this.editNoticeViewInfo.photos);
                    this.$vc.emit('editNoticeView', 'uploadImage', 'notifyPhotos', photos);
                } else {
                    this.editNoticeViewInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                }
            });
            this.$vc.on("editNoticeView", "notifyUploadImage", function (_param) {
                if(!this.$vc.isEmpty(_param) && _param.length >0){
                    this.editNoticeViewInfo.photos = _param[0];
                }else{
                    this.editNoticeViewInfo.photos = '';
                }
            });
        })()   
            },
            methods: {
                changeNoticeEditor(html) {
                this.editNoticeViewInfo.context = html;
            },editNoticeValidate:function () {
                return this.$vc.validate.validate({
                    editNoticeViewInfo: this.editNoticeViewInfo
                },
                    {
                    'editNoticeViewInfo.title': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "标题不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "4,100",
                            errInfo: "标题必须在4至100字符之间"
                        },
                    ],
                    'editNoticeViewInfo.noticeTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "公告类型不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "公告类型错误"
                        },
                    ],
                    'editNoticeViewInfo.context': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "公告内容不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "10000",
                            errInfo: "公告内容不能超过10000个字"
                        },
                    ],
                    'editNoticeViewInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "开始时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "开始时间不是有效的日期"
                        },
                    ],
                    'editNoticeViewInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "结束时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "开始时间不是有效的日期"
                        },
                    ],
                });
            },editNotice:function () {
                if (!this.editNoticeValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }
                this.editNoticeViewInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                this.$vc.http.post(
                    this.editNoticeViewInfo.noticeId == '' ? 'addNoticeView' : 'editNotice',
                    this.editNoticeViewInfo.noticeId == '' ? 'save' : 'update',
                    JSON.stringify(this.editNoticeViewInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            this.$vc.emit('noticeManage', 'listNotice', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditNoticeInfo:function () {
                this.editNoticeViewInfo = {
                    noticeId: '',
                    title: '',
                    noticeTypeCd: '',
                    context: '',
                    startTime: '',
                    endTime: '',
                    photos: '',
                }
                this.$vc.emit('wangEditor', 'setWangEditorContent', this.editNoticeViewInfo.context);
            },_initEditNoticeInfo:function () {

                $('.editNoticeStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editNoticeStartTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editNoticeStartTime").val();
                        this.editNoticeViewInfo.startTime = value;
                    });
                $('.editNoticeEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editNoticeEndTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editNoticeEndTime").val();
                        this.editNoticeViewInfo.endTime = value;
                    });
                /*$('.eidtSummernote').summernote({
                    lang: 'zh-CN',
                    height: 300,
                    placeholder: '必填，请输入公告内容',
                    callbacks: {
                        onImageUpload: function (files, editor, $editable) {
                            sendEditFile(files);
                        },
                        onChange: function (contents, $editable) {
                            this.editNoticeViewInfo.context = contents;
                        }
                    }
                });*/
            },sendEditFile:function (files) {
                console.log('上传图片');
            },closeEditNoticeInfo:function () {
                this.$vc.emit('noticeManage', 'listNotice', {});
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    