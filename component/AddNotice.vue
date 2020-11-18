
        <template>
            <div id="addNoticeModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">添加公告</h3>
                <div class="ibox-content">
                    <div>
                        <div>


                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">标题</label>
                                <div class="col-sm-10">
                                    <input v-model="addNoticeInfo.title" type="text" placeholder="必填，请填写标题"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">公告类型</label>
                                <div class="col-sm-10">
                                    <select class="custom-select" v-model="addNoticeInfo.noticeTypeCd">
                                        <option selected disabled value="">必填，请选择公告类型</option>
                                        <option value="1000">用户小程序</option>
                                    </select></div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">开始时间</label>
                                <div class="col-sm-10">
                                    <input v-model="addNoticeInfo.startTime" type="text" placeholder="必填，请填写开始时间"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">公告内容</label>
                                <div class="col-sm-10 summernote">
                                    <!--<textarea v-model="addNoticeInfo.context" cols="3"  type="text" placeholder="必填，请填写公告内容" class="form-control"></textarea>-->
                                </div>
                            </div>


                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button" v-on:click="saveNoticeInfo()">
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
            
        export default {
            props: {},
            components: {
                
            },
            data () {
                return {"addNoticeInfo":"[object Object]"}    
            },
            mounted() {
             (function () {
            this._initNoticeContextText();

        })()(function () {
            this.$vc.on('addNotice', 'openAddNoticeModal', function () {
                $('#addNoticeModel').modal('show');
            });
        })()   
            },
            methods: {
                addNoticeValidate() {
                return this.$vc.validate.validate({
                    addNoticeInfo: this.addNoticeInfo
                }, {
                    'addNoticeInfo.title': [
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
                    'addNoticeInfo.noticeTypeCd': [
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
                    'addNoticeInfo.context': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "公告内容不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "500",
                            errInfo: "公告内容不能超过500个字"
                        },
                    ],
                    'addNoticeInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "开始时间不能为空"
                        },
                        {
                            limit: "date",
                            param: "",
                            errInfo: "开始时间不是有效的日志"
                        },
                    ],


                });
            },saveNoticeInfo:function () {
                if (!this.addNoticeValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);

                    return;
                }

                this.addNoticeInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                this.$vc.http.post(
                    'addNotice',
                    'save',
                    JSON.stringify(this.addNoticeInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#addNoticeModel').modal('hide');
                            this.clearAddNoticeInfo();
                            this.$vc.emit('noticeManage', 'listNotice', {});

                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);

                    });
            },clearAddNoticeInfo:function () {
                this.addNoticeInfo = {
                    title: '',
                    noticeTypeCd: '',
                    context: '',
                    startTime: '',

                };
            },_initNoticeContextText:function () {

            },
            },
        }
    
        </script>
        <style>
            
        </style>
    