
        <template>
            <div class="">
    <div class="progress" v-if="this.uploadVedioInfo.progress > 0" style="height: 1px;">
        <div class="progress-bar" role="progressbar" v-bind:style="{width: this.uploadVedioInfo.progress+'%'}"
             v-bind:aria-valuenow="this.uploadVedioInfo.progress" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div style="margin-bottom: 5px;" v-if="this.uploadVedioInfo.progress > 0">
        <span>{{this.uploadVedioInfo.fileName}}</span>
    </div>
    <div>
        <button class="btn btn-primary" v-on:click="this._uploadVedio()">上传视频</button>
        <input type="file" class="file" accept="video/*" capture="camcorder" id="uploadVedio" hidden
               v-on:change="this._chooseVedio($event)">
    </div>
</div>
        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"uploadVedioInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('uploadVedio', 'openAddApplicationKeyModal', function () {

            });
            this.$vc.on('uploadVedio', 'clearVedio', function () {
                this.uploadVedioInfo = {
                    vedio: {},
                    fileName: '',
                    realFileName: '',
                    progress: 0
                }
            });
            this.$vc.on('uploadVedio', 'notifyVedio', function (_fileName) {
                this.uploadVedioInfo.fileName = _fileName;
                this.uploadVedioInfo.realFileName = _fileName;
                this.uploadVedioInfo.progress = 100;
            });

        })()   
            },
            methods: {
                _uploadVedio:function (event) {
                $("#uploadVedio").trigger("click")
            },_chooseVedio:function (event) {
                var photoFiles = event.target.files;
                if (photoFiles && photoFiles.length > 0) {
                    // 获取目前上传的文件
                    var file = photoFiles[0];// 文件大小校验的动作
                    if (file.size > 1024 * 1024 * 500) {
                        this.$vc.toast("图片大小不能超过 500MB!")
                        return false;
                    }
                    this.uploadVedioInfo.fileName = file.name;
                    this._doUploadVedio(file);
                }
            },_doUploadVedio:function (_file) {
                var param = new FormData();
                param.append("uploadFile", _file);
                param.append('communityId', this.$vc.getCurrentCommunity().communityId);

                //发送get请求
                this.$vc.http.upload('uploadVedio',
                    'upload',
                    param,
                    {
                        emulateJSON: true,
                        //添加请求头
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        progress: function (event) {
                            //console.log(event);
                            //this.$vc.toast("视频上传中，请稍后");
                            var rate = event.loaded / event.total;  //已上传的比例
                            if (rate < 0.9) {
                                //这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
                                //因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
                                //等响应回来时，再将进度设为100%
                                this.uploadVedioInfo.progress = (rate * 100).toFixed(2);
                            }
                        }
                    },
                    function (json, res) {
                        if (res.status != 200) {
                            this.$vc.toast("上传文件失败");
                            return;
                        }
                        var _json = JSON.parse(json);
                        this.uploadVedioInfo.progress = 100.00;
                        this.$vc.toast("视频上传成功");

                        this.uploadVedioInfo.fileName = _json.fileName;
                        this.uploadVedioInfo.realFileName = _json.realFileName;
                        this.$vc.emit(this.$vc._thiscallBackListener, this.$vc._thiscallBackFunction, _json);
                    }, function (errInfo, error) {
                        console.log('请求失败处理', error);
                        this.$vc.toast("上传视频失败");
                    });
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    