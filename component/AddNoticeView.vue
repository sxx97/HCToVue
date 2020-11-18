
        <template>
            <div class="row" v-if="noticeManageInfo.componentShow == 'addNoticeView'">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>新公告</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">标题</label>
                    <div class="col-sm-10">
                        <input v-model="addNoticeViewInfo.title" type="text" placeholder="必填，请填写标题"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">公告类型</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addNoticeViewInfo.noticeTypeCd">
                            <option selected disabled value="">必填，请选择公告类型</option>
                            <option value="1000">用户小程序</option>
                            <!--<option value="1001">员工通知</option>
                            <option value="1002">写字楼通知</option>-->
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">开始时间</label>
                    <div class="col-sm-10">
                        <input v-model="addNoticeViewInfo.startTime" readonly type="text" placeholder="必填，请填写开始时间"
                               class="form-control noticeStartTime">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">结束时间</label>
                    <div class="col-sm-10">
                        <input v-model="addNoticeViewInfo.endTime" readonly type="text" placeholder="必填，请填写结束时间"
                               class="form-control noticeEndTime">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">公告内容</label>
                    <div class="col-sm-10 ">


                        <!--<div class="ibox-content no-padding">
                            <div class="summernote"></div>
                        </div>-->
                        <!--<textarea v-model="addNoticeViewInfo.context" cols="3"  type="text" placeholder="必填，请填写公告内容" class="form-control"></textarea>-->
                    </div>
                </div>

                <div class="ibox-content">
                    <button class="btn btn-primary float-right" type="button" v-on:click="saveNoticeInfo()"><i
                            class="fa fa-check"></i>&nbsp;提交
                    </button>
                    <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                            v-on:click="closeNoticeInfo()">取消
                    </button>
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
                return {"addNoticeViewInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initNoticeInfo();
        })()(function () {
            this.$vc.on('addNoticeView', 'openAddNoticeView', function () {
                //this._initNoticeInfo();
            });
            this.$vc.on('addNoticeView', 'changeEditor', this.changeEditor);
        })()   
            },
            methods: {
                changeEditor(html) {
                this.addNoticeViewInfo.context = html;
            },addNoticeValidate() {
                return this.$vc.validate.validate({
                    addNoticeViewInfo: this.addNoticeViewInfo
                }, {
                    'addNoticeViewInfo.title': [
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
                    'addNoticeViewInfo.noticeTypeCd': [
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
                    'addNoticeViewInfo.context': [
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
                    'addNoticeViewInfo.startTime': [
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
                    'addNoticeViewInfo.endTime': [
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


                });
            },saveNoticeInfo:function () {
                if (!this.addNoticeValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addNoticeViewInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                this.$vc.http.post(
                    'addNoticeView',
                    'save',
                    JSON.stringify(this.addNoticeViewInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model

                            this.clearaddNoticeViewInfo();
                            this.$vc.emit('noticeManage', 'listNotice', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearaddNoticeViewInfo:function () {
                this.addNoticeViewInfo = {
                    title: '',
                    noticeTypeCd: '',
                    context: '',
                    startTime: '',
                };
                this.$vc.emit('wangEditor', 'setWangEditorContent', this.addNoticeViewInfo.context);
            },_initNoticeInfo:function () {
                this.addNoticeViewInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.noticeStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.noticeStartTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".noticeStartTime").val();
                        this.addNoticeViewInfo.startTime = value;
                    });
                $('.noticeEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.noticeEndTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".noticeEndTime").val();
                        this.addNoticeViewInfo.endTime = value;
                    });
                /*var $summernote = $('.summernote').summernote({
                    lang: 'zh-CN',
                    height: 300,
                    placeholder: '必填，请输入公告内容',
                    callbacks: {
                        onImageUpload: function (files, editor, $editable) {
                            this.sendFile($summernote, files);
                        },
                        onChange: function (contents, $editable) {
                            this.addNoticeViewInfo.context = contents;
                        }
                    },
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'italic', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture']],
                        ['view', ['fullscreen', 'codeview']],
                        ['help', ['help']]
                    ],
                });*/
            },closeNoticeInfo:function () {
                this.$vc.emit('noticeManage', 'listNotice', {});

            },sendFile:function ($summernote, files) {
                console.log('上传图片', files);

                var param = new FormData();
                param.append("uploadFile", files[0]);
                param.append('communityId', this.$vc.getCurrentCommunity().communityId);

                this.$vc.http.upload(
                    'addNoticeView',
                    'uploadImage',
                    param,
                    {
                        emulateJSON: true,
                        //添加请求头
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            var data = JSON.parse(json);
                            //关闭model
                            $summernote.summernote('insertImage', "/callComponent/download/getFile/file?fileId=" + data.fileId + "&communityId=" + this.$vc.getCurrentCommunity().communityId);
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    