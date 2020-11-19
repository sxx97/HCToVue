
        <template>
            <div class="row">
    <div class="col-lg-12">
        <div class="ibox">
            <div class="ibox-title">
                <h5>{{editActivitiesViewInfo.activitiesId == '' ? '新' : '修改'}}活动</h5>
                <div class="ibox-tools" style="top:10px;">

                </div>
            </div>
            <div class="ibox-content">
                <div>
                    <div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">活动标题</label>
                            <div class="col-sm-10">
                                <input v-model="editActivitiesViewInfo.title" type="text" placeholder="必填，请填写活动标题"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">活动类型</label>
                            <div class="col-sm-10">
                                <select class="custom-select" v-model="editActivitiesViewInfo.typeCd">
                                    <option selected disabled value="">必填，请选择活动类型</option>
                                    <option value="10001">活动</option>
                                    <option value="10002">其他</option>
                                </select></div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">首页用图</label>
                            <div class="col-sm-10">
                                <div class="uploadImage row">
                                    <div v-for="image in editActivitiesViewInfo.homePageImage">
                                        <img v-bind:src="image" width="100px" height="100px"/>
                                        <span v-on:click="removeHomeImage(image)" class="glyphicon glyphicon-remove"
                                              style="position: relative; top: -35px;right: 20px; color: #d9534f"></span>
                                    </div>
                                    <div class="uploadButton" v-on:click="uploadHomePhoto">
                                        <i class="glyphicon glyphicon-plus"></i>
                                    </div>
                                    <input type="file" class="file" accept="image/*" id="uploadHomeImage" hidden
                                           v-on:change="chooseHomePhoto($event)">
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">详情页用图</label>
                            <div class="col-sm-10">
                                <vc:create name="uploadImage"
                                           callBackListener="editActivitiesView"
                                           callBackFunction="activityUploadImage"
                                           namespace="editActivitiesView"
                                ></vc:create>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">开始时间</label>
                            <div class="col-sm-10">
                                <input v-model="editActivitiesViewInfo.startTime" readonly
                                       type="text" placeholder="必填，请填写开始时间" class="form-control editActivitiesStartTime">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">结束时间</label>
                            <div class="col-sm-10">
                                <input v-model="editActivitiesViewInfo.endTime" readonly type="text" placeholder="必填，请填写结束时间" class="form-control editActivitiesEndTime">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">活动内容</label>
                            <div class="col-sm-10 ">
                                <vc:create name="wangEditor"
                                           parentComponent="editActivitiesView"></vc:create>
                                <!--<textarea v-model="addNoticeViewInfo.context" cols="3"  type="text" placeholder="必填，请填写公告内容" class="form-control"></textarea>-->
                            </div>
                        </div>



                        <div class="ibox-content">
                            <button class="btn btn-primary float-right" type="button" v-on:click="editActivities()"><i
                                    class="fa fa-check"></i>&nbsp;保存
                            </button>
                            <button type="button" class="btn btn-warning float-right" style="margin-right:20px;" v-on:click="closeEditActivitiesInfo()"
                                    >取消
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
            
            import UploadImage from '@/component/UploadImage.vue';import WangEditor from '@/component/WangEditor.vue';



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
                props: {},
                components: {
                    UploadImage,WangEditor
                },
                data () {
                    return {"editActivitiesViewInfo":{"activitiesId":"","title":"","typeCd":"","photos":"","headerImg":"","context":"","startTime":"","endTime":"","homePageImage":""}}    
                },
                mounted() {
                (() =>{
             this._initEditActivitiesInfo();
         })()
(() =>{
             this.$vc.on('editActivitiesView','openEditActivitiesModal',(_params) =>{
                this.refreshEditActivitiesInfo();
                // _params.context = filterXSS(_params.context);
                this.editActivitiesViewInfo = _params;
            });
             this.$vc.on('editActivitiesView', 'changeEditor', this.changeEditor);
            this.$vc.on('editActivitiesView','activitiesEditActivitiesInfo',(_params) =>{
                this.refreshEditActivitiesInfo();
                if (_params != null){
                    // _params.context = filterXSS(_params.context);
                    this.$vc.copyObject(_params,this.editActivitiesViewInfo);
                    this.$vc.emit('wangEditor', 'setWangEditorContent', this.editActivitiesViewInfo.context);
                    var photos = [];
                    photos.push(this.editActivitiesViewInfo.photos);
                    if (this.editActivitiesViewInfo.homePageImage) {
                        this.editActivitiesViewInfo.homePageImage = this.editActivitiesViewInfo.homePageImage.split(',');
                    }

                    this.$vc.emit('editActivitiesView', 'uploadImage', 'notifyPhotos', photos);
                } else {
                    this.editActivitiesViewInfo.startTime = this.$vc.dateFormat(new Date().getTime());
                }
            });

             this.$vc.on("editActivitiesView", "activityUploadImage",  (_param) => {
                 if(!this.$vc.isEmpty(_param) && _param.length >0){
                     this.editActivitiesViewInfo.photos = _param[0];
                 }else{
                     this.editActivitiesViewInfo.photos = '';
                 }
             });

        })()   
                },
                methods: {
                    removeHomeImage:function (_photo) {
                var _tmpPhotos = this.editActivitiesViewInfo.homePageImage;
                this.editActivitiesViewInfo.homePageImage = [];
                for (var _photoIndex = 0; _photoIndex < _tmpPhotos.length; _photoIndex++) {
                    if (_tmpPhotos[_photoIndex] != _photo) {
                        this.editActivitiesViewInfo.homePageImage.push(_tmpPhotos[_photoIndex]);
                    }
                }
            },uploadHomePhoto:function (event) {
                $("#uploadHomeImage").trigger("click")
            },chooseHomePhoto:function (event) {
                var photoFiles = event.target.files;
                if (photoFiles && photoFiles.length > 0) {
                    // 获取目前上传的文件
                    var file = photoFiles[0];// 文件大小校验的动作
                    if (file.size > 1024 * 1024 * 2) {
                        this.$vc.toast("图片大小不能超过 2M!")
                        return false;
                    }
                    var reader = new FileReader(); //新建FileReader对象
                    reader.readAsDataURL(file); //读取为base64
                    reader.onloadend = async function (e) {
                        // 传入图片内容是地址链接的组件

                        let imgSrc = await this.uploadPhoto(reader.result).catch(err => {
                            this.$vc.toast('上传图片错误,请重新上传');
                        });
                        if (imgSrc && imgSrc != '') {
                            this.editActivitiesViewInfo.homePageImage = [];
                            this.editActivitiesViewInfo.homePageImage.push(imgSrc);
                        }
                    }
                }
                event.target.value = null;
            },changeEditor(html) {
                this.editActivitiesViewInfo.context = html;
            },editActivitiesValidate:function(){
                return this.$vc.validate.validate({
                    editActivitiesViewInfo: this.editActivitiesViewInfo
                }, {
                    'editActivitiesViewInfo.title': [
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
                    'editActivitiesViewInfo.typeCd': [
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
                    'editActivitiesViewInfo.photos': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "头部照片不能为空"
                        }
                    ],
                    'editActivitiesViewInfo.context': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "活动内容不能为空"
                        }
                    ],
                    'editActivitiesViewInfo.startTime': [
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
                    'editActivitiesViewInfo.endTime': [
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
             },editActivities:function(){
                if(!this.editActivitiesValidate()){
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return ;
                }
                this.editActivitiesViewInfo.homePageImage = this.editActivitiesViewInfo.homePageImage.toString();
                this.editActivitiesViewInfo.communityId = this.$vc.getCurrentCommunity().communityId;

                this.$vc.http.post(
                    this.editActivitiesViewInfo.activitiesId == '' ? 'addActivitiesView' : 'editActivitiesView',
                    this.editActivitiesViewInfo.activitiesId == ''? 'save' : 'update',
                    JSON.stringify(this.editActivitiesViewInfo),
                    {
                        emulateJSON:true
                     },
                     (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if(res.status == 200){
                            //关闭model
                             this.$vc.emit('activitiesManage','listActivities',{});
                            return ;
                        }
                        this.$vc.message(json);
                     },
                     (errInfo,error) =>{
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                     });
            },refreshEditActivitiesInfo:function(){
                this.editActivitiesViewInfo= {
                    activitiesId: '',
                    title: '',
                    typeCd: '',
                    photos: '',
                    headerImg: '',
                    context: '',
                    startTime: '',
                    endTime: '',
                    homePageImage: '',
                }
                this.$vc.emit('wangEditor', 'setWangEditorContent', this.editActivitiesViewInfo.context);
            },_initEditActivitiesInfo:function(){

                 $('.editActivitiesStartTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.editActivitiesStartTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".editActivitiesStartTime").val();
                        this.editActivitiesViewInfo.startTime = value;
                    });
                $('.editActivitiesEndTime').datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editActivitiesEndTime').datetimepicker()
                    .on('changeDate',  (ev) => {
                        var value = $(".editActivitiesEndTime").val();
                        this.editActivitiesViewInfo.endTime = value;
                    });
                /*$('.eidtSummernote').summernote({
                    lang:'zh-CN',
                    height: 300,
                    placeholder:'必填，请输入公告内容',
                    callbacks : {
                         onImageUpload: function(files, editor, $editable) {
                             this.sendEditFile(files);
                         },
                         onChange:function(contents,$editable){
                            this.editActivitiesViewInfo.context = contents;
                         }
                    }
                });*/

            },sendEditFile:function(files){
                console.log('上传图片');
            },closeEditActivitiesInfo:function(){
                 this.$vc.emit('activitiesManage','listActivities',{});

            },
                },
            }
    
        </script>
        <style>
            
        </style>
    