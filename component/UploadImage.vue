
        <template>
            <div class="uploadImage row">
    <div v-for="image in this.uploadImageInfo.photos">
        <img v-bind:src="image" width="100px" height="100px"/>
        <span v-on:click="this._removeImage(image)" class="glyphicon glyphicon-remove"
              style="position: relative; top: -35px;right: 20px; color: #d9534f"></span>
    </div>
    <div class="uploadButton" v-on:click="this._uploadPhoto()">
        <i class="glyphicon glyphicon-plus"></i>
    </div>
    <input type="file" class="file" accept="image/*" id="uploadImage" hidden
           v-on:change="this._choosePhoto($event)">
</div>
        </template>
        <script>
            
        export default {
            props: {"callBackListener":"true","callBackFunction":"true"},
            components: {
                
            },
            data () {
                return {"uploadImageInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {
            this.$vc.on('uploadImage', 'openAddApplicationKeyModal', function () {

            });
            this.$vc.on('uploadImage', 'clearImage', function () {
                this.uploadImageInfo = {
                    photos: []
                }
            });

            this.$vc.on('uploadImage', 'notifyPhotos', function (_photos) {
                this.uploadImageInfo = {
                    photos: []
                };
                // 传入图片内容是地址链接的组件
                const filePathComponent = ['addActivitiesView', 'editActivitiesView', 'editNoticeView'];
                if (filePathComponent.includes(this.$vc._thiscallBackListener)) {
                    _photos.forEach(function (_photo) {
                        this.uploadImageInfo.photos.push(_photo);
                    });
                    return ;
                }
                _photos.forEach(function (_photo) {
                    //?objId=772019092507000013&communityId=7020181217000001&fileTypeCd=10000
                    this.$vc.urlToBase64(photoUrl + "?fileId=" + _photo + "&communityId=" + this.$vc.getCurrentCommunity().communityId + "&time=" + new Date(), function (_base64Data) {
                        this.uploadImageInfo.photos.push(_base64Data);
                    })
                });
            });

        })()   
            },
            methods: {
                _uploadPhoto:function (event) {
                $("#uploadImage").trigger("click")
            },_choosePhoto:function (event) {
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
                        const filePathComponent = ['addActivitiesView', 'editActivitiesView', 'editNoticeView'];
                        if (filePathComponent.includes(this.$vc._thiscallBackListener)) {
                            let imgSrc = await this.uploadPhoto(reader.result).catch(err => {
                                this.$vc.toast('上传图片错误,请重新上传');
                            });
                            if (imgSrc && imgSrc != '') {
                                this.uploadImageInfo.photos.push(imgSrc);
                            }
                            return ;
                        }
                        this.uploadImageInfo.photos.push(reader.result);
                    }
                }
                event.target.value = null;
            },async uploadPhoto(base64) {
                return new Promise((reslove, reject) => {
                    this.$vc.http.post('uploadImg', 'upload', {
                            img: base64,
                        },
                        {
                            headres: {
                                "Content-Type": "application/json"
                            }
                        },
                        (resStr, res) => {
                            reslove(res.body.fileSaveName);
                        },
                        (errText, err) => {
                            reject(errText);
                        })
                })
            },_removeImage:function (_photo) {
                var _tmpPhotos = this.uploadImageInfo.photos;
                this.uploadImageInfo.photos = [];
                for (var _photoIndex = 0; _photoIndex < _tmpPhotos.length; _photoIndex++) {
                    if (_tmpPhotos[_photoIndex] != _photo) {
                        this.uploadImageInfo.photos.push(_tmpPhotos[_photoIndex]);
                    }
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    