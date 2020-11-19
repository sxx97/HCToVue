
        <template>
            <div class="pg" id="component">
    <div class="upload-component">
        <div class="uploadImage row">
            <div v-if="editTurnstileAdvertising.adImg != '' && editTurnstileAdvertising.adImg != null">
                <img :src="editTurnstileAdvertising.adImg" width="100px" height="100px"/>
                <span v-on:click="removeImage" class="glyphicon glyphicon-remove"
                      style="position: relative; top: -35px;right: 20px; color: #d9534f"></span>
            </div>
            <div class="uploadButton" @click="triggerUploadPhoto" >
                <i class="glyphicon glyphicon-plus"></i>
            </div>
            <input type="file" class="file" accept="image/*" id="uploadImage" hidden
                   @change="choosePhoto($event)">
        </div>
    </div>
    <button class="btn btn-primary"
            style="margin-top: 10px;"
        @click="saveTurnstileAdvertising">保存</button>
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
                props: {},
                components: {
                    
                },
                data () {
                    return {"editTurnstileAdvertising":{"communityId":"","adImg":"","adId":"-1"}}    
                },
                mounted() {
                (() => {
            this.getTurnstileAdvertising();
        })()
(() => {

        })()   
                },
                methods: {
                    triggerUploadPhoto() {
                $("#uploadImage").trigger("click")
            },removeImage() {
                this.editTurnstileAdvertising.adImg = '';
            },choosePhoto(event) {
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
                            this.editTurnstileAdvertising.adImg = imgSrc;
                        }
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
            },getTurnstileAdvertising() {
                this.$vc.http.get(
                    'editTurnstileAdvertising',
                    'getAd',
                    {
                        params: {
                            communityId: this.$vc.getCurrentCommunity().communityId
                        }
                    },
                    (json,res) =>{

                        if (res.body.data && res.body.data.length > 0) {
                            this.editTurnstileAdvertising.adId = res.body.data[0].adId;
                            this.editTurnstileAdvertising.adImg = res.body.data[0].adImg;
                        } else {
                            this.editTurnstileAdvertising.adImg = '';
                            this.editTurnstileAdvertising.adId = '-1';
                        }
                    },
                    (errInfo,error) =>{
                        this.$vc.message(errInfo);
                    });
            },saveTurnstileAdvertising() {
                this.$vc.http.post(
                    'editTurnstileAdvertising',
                    'saveTurnstileAdvertising',
                    JSON.stringify(this.editTurnstileAdvertising),
                    {
                        emulateJSON:true
                    },
                    (json,res) =>{
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        this.$vc.message(json);
                    },
                    (errInfo,error) =>{
                        this.$vc.message(errInfo);
                    });
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    