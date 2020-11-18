
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>新活动</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">

                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">活动标题</label>
                    <div class="col-sm-10">
                        <input v-model="addActivitiesViewInfo.title" type="text" placeholder="必填，请填写活动标题"
                               class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">活动类型</label>
                    <div class="col-sm-10">
                        <select class="custom-select" v-model="addActivitiesViewInfo.typeCd">
                            <option selected disabled value="">必填，请选择活动类型</option>
                            <option value="10001">活动</option>
<!--                            <option value="10002">其他</option>-->
                        </select></div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">头部照片</label>
                    <div class="col-sm-10">
                        <vc:create name="uploadImage"
                                   callBackListener="addActivitiesView"
                                   callBackFunction="notifyUploadImage"
                                   namespace="addActivitiesView"
                        ></vc:create>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">开始时间</label>
                    <div class="col-sm-10">
                        <input v-model="addActivitiesViewInfo.startTime" readonly type="text" placeholder="必填，请填写开始时间"
                               class="form-control activitiesStartTime">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">结束时间</label>
                    <div class="col-sm-10">
                        <input v-model="addActivitiesViewInfo.endTime" readonly type="text" placeholder="必填，请填写结束时间"
                               class="form-control activitiesEndTime">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">活动内容</label>
                    <div class="col-sm-10">
                        <vc:create name="wangEditor"
                                   parentComponent="addActivitiesView"></vc:create>
                        <!--<input v-model="addActivitiesViewInfo.context" type="text" placeholder="必填，请填写活动内容"
                               class="form-control">-->
                    </div>
                </div>


                <div class="ibox-content">
                    <button class="btn btn-primary float-right" type="button" v-on:click="saveActivitiesInfo()"><i
                            class="fa fa-check"></i>&nbsp;提交
                    </button>
                    <button type="button" class="btn btn-warning float-right" style="margin-right:20px;"
                            v-on:click="closeActivitiesInfo()">取消
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
                return {"addActivitiesViewInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initActivitiesInfo();

        })()(function () {
            this.$vc.on('addActivitiesView', 'openAddActivitiesView', function () {
                //this._initActivitiesInfo();

            });

            this.$vc.on("addActivitiesView", "notifyUploadImage", function (_param) {
                if(!this.$vc.isEmpty(_param) && _param.length >0){
                    this.addActivitiesViewInfo.photos = _param[0];
                }else{
                    this.addActivitiesViewInfo.photos = '';
                }
            });
            this.$vc.on('addActivitiesView', 'changeEditor', this.changeActivitiesEditor);
        })()   
            },
            methods: {
                changeActivitiesEditor(html) {
                this.addActivitiesViewInfo.context = html;
            },addActivitiesValidate() {
                return this.$vc.validate.validate({
                    addActivitiesViewInfo: this.addActivitiesViewInfo
                }, {
                    'addActivitiesViewInfo.title': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "活动标题不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,200",
                            errInfo: "活动标题不能超过200位"
                        },
                    ],
                    'addActivitiesViewInfo.typeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "活动类型不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "活动类型格式错误"
                        },
                    ],
                    'addActivitiesViewInfo.photos': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "必须上传图片"
                        }
                    ],
                    'addActivitiesViewInfo.context': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "活动内容不能为空"
                        }
                    ],
                    'addActivitiesViewInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "开始时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "开始时间格式错误"
                        },
                    ],
                    'addActivitiesViewInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "结束时间不能为空"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "结束时间格式错误"
                        },
                    ],


                });
            },saveActivitiesInfo:function () {
                if (!this.addActivitiesValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addActivitiesViewInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                this.$vc.http.post(
                    'addActivitiesView',
                    'save',
                    JSON.stringify(this.addActivitiesViewInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model

                            this.clearaddActivitiesViewInfo();
                            this.$vc.emit('activitiesManage', 'listActivities', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearaddActivitiesViewInfo:function () {
                this.addActivitiesViewInfo = {
                    activitiesId: '',
                    title: '',
                    typeCd: '',
                    photos: '',
                    headerImg: '',
                    context: '',
                    startTime: '',
                    endTime: ''
                };
                this.$vc.emit('wangEditor', 'setWangEditorContent', this.addActivitiesViewInfo.context);
            },_initActivitiesInfo:function () {
                this.addActivitiesViewInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                $('.activitiesStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.activitiesStartTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".activitiesStartTime").val();
                        this.addActivitiesViewInfo.startTime = value;
                    });
                $('.activitiesEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.activitiesEndTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".activitiesEndTime").val();
                        this.addActivitiesViewInfo.endTime = value;
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
                            this.addActivitiesViewInfo.context = contents;
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
            },closeActivitiesInfo:function () {
                this.$vc.emit('activitiesManage', 'listActivities', {});

            },sendFile:function ($summernote, files) {
                console.log('上传图片', files);

                var param = new FormData();
                param.append("uploadFile", files[0]);
                param.append('communityId', this.$vc.getCurrentCommunity().communityId);

                this.$vc.http.upload(
                    'addActivitiesView',
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
    