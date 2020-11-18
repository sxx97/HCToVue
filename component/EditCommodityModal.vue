
        <template>
            <div id="editCommodityModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">
                    {{commodityInfo.commodityId == -1 ? '上架' : '编辑'}}商品
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </h3>
                <div class="ibox-content">
                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">配图</label>
                        <div class="col-sm-10">
                            <template v-for="(src, index) in commodityInfo.photos"
                              :key="index">
                                <div class="commodity-img delete" @click="removeCommodityPhotos(index)">
                                    <img :src="src">
                                </div>
                            </template>
                            <template v-if="commodityInfo.photos.length < 5">
                                <div class="commodity-upload-img glyphicon glyphicon-plus"
                                    @click="emitChoosePhoto"></div>
                                <input type="file" class="file" accept="images/*" id="uploadOwnerPhoto" hidden @change="choosePhoto($event)">
                            </template>
                        </div>
                    </div><div class="form-group row">
                        <label  class="col-sm-2 col-form-label">标题</label>
                        <div class="col-sm-10">
                            <input type="text" v-model="commodityInfo.title" class="form-control" placeholder="请输入">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">原价</label>
                        <div class="col-sm-10">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div>
                                        <div class="form-check">
                                            <input class="form-check-input" v-model="hasOriginalPrice" type="radio" name="haveOriginal" id="noOriginal" :value="false">
                                            <label class="form-check-label mr-4" for="noOriginal">
                                                无
                                            </label>
                                            <input class="form-check-input" v-model="hasOriginalPrice" type="radio" name="haveOriginal" id="haveOriginal" :value="true">
                                            <label class="form-check-label" for="haveOriginal">
                                                有
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 row">
                                    <label class="col-sm-3 col-form-label">现价</label>
                                    <input v-model="commodityInfo.currentPrice"
                                           placeholder="请输入"
                                           type="number" class="col-sm-6 form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-if="hasOriginalPrice">
                        <div class="form-group row">
                            <label  class="col-sm-2 col-form-label"> </label>
                            <div class="col-sm-4">
                                <input v-model="commodityInfo.originalPrice"
                                       placeholder="请输入"
                                       type="number" class="form-control">
                            </div>
                        </div>
                    </template>
                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">库存</label>
                        <div class="col-sm-10">
                            <input v-model="commodityInfo.stockpile" type="number" class="col-sm-4 form-control"
                                placeholder="请输入">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">介绍</label>
                        <div class="col-sm-10">
                            <vc:create name="wangEditor"
                                parentComponent="editCommodityModal"></vc:create>
                        </div>
                    </div>
                    <div class="form-group row text-content">
                       <button class="btn btn-primary btn-submit-commodity"
                            @click="createOrChange">{{commodityInfo.commodityId > -1 ? '保存' : '上传'}}</button>
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
                return {"hasOriginalPrice":"false","commodityInfo":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {
            this.Vue.config.devtools = true;
        })()(_initEvent() {
            this.$vc.on('editCommodityModal', 'changeEditor', this.changeEditor);
            this.$vc.on('editCommodityModal', 'show', this.listenerShowModal);
        })()   
            },
            methods: {
                editorCommodityValidate () {
                return this.$vc.validate.validate({
                    commodityInfo: this.commodityInfo
                }, {
                    'commodityInfo.currentPrice': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "价格不能为空"
                        },
                    ],
                    'commodityInfo.title': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "标题不能为空"
                        },
                    ],
                    'commodityInfo.intro': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "商品介绍不能为空"
                        },
                    ],
                    'commodityInfo.photos': [
                        {
                            limit: "minLength",
                            param: "1",
                            errInfo: "最少上传一张图"
                        },
                    ],
                    'commodityInfo.stockpile': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "库存不能为空"
                        },
                    ]
                })
            },changeEditor(html) {
                this.commodityInfo.intro = html;
            },listenerShowModal(commodityInfo) {
                $('#editCommodityModal').modal('show');
                console.log(commodityInfo, "查看修改编辑商品的传入的信息");
                this.resetCommodityInfo(commodityInfo);
            },resetCommodityInfo(commodityInfo) {
                if (commodityInfo == null || commodityInfo == 'null') {
                    this.commodityInfo = {
                        originalPrice: '',
                        currentPrice: '',
                        remark: '',
                        title: '',
                        commodityId: -1,
                        communityId: JSON.parse(localStorage.getItem('hc_currentCommunityInfo')).communityId,
                        show: 1,    // 1为上架 0下架
                        photos: [],
                        intro: '',
                        stockpile: '',
                    };
                } else {
                    for (let key in this.commodityInfo) {
                        switch (key) {
                            case 'photos':
                                if (typeof commodityInfo[key] == 'string') {
                                    this.commodityInfo[key] =   commodityInfo[key].split(',');
                                } else {
                                    this.commodityInfo[key] = commodityInfo[key] || [];
                                }
                                break;
                            case 'originalPrice': case 'currentPrice':
                                this.commodityInfo[key] = (commodityInfo[key] - 0) / 100;
                                if (commodityInfo['originalPrice'] == commodityInfo['currentPrice']) {
                                    this.commodityInfo['originalPrice'] = '';
                                    this.hasOriginalPrice = false;
                                } else {
                                   this.hasOriginalPrice = true;
                                }
                                break;
                            default:
                                this.commodityInfo[key] = commodityInfo[key];
                        }
                    }
                }
                this.$vc.emit('wangEditor', 'setWangEditorContent', this.commodityInfo.intro);
            },emitChoosePhoto() {
                $("#uploadOwnerPhoto").trigger("click")
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
                        let imgSrc = await this.uploadPhoto(reader.result).catch(err => {
                            this.$vc.toast('上传图片错误,请重新上传');
                        });
                        if (imgSrc && imgSrc != '') {
                            this.commodityInfo.photos.push(imgSrc);
                        }
                    }
                }
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
            },removeCommodityPhotos(index) {
                this.commodityInfo.photos.splice(index, 1);
            },createOrChange() {
                if (!this.editorCommodityValidate()) {
                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }
                let commodityInfo = {};
                for (let key in this.commodityInfo) {
                    if (key == 'photos') {
                        commodityInfo[key] = this.commodityInfo[key].toString();
                    } else {
                        commodityInfo[key] = this.commodityInfo[key];
                    }
                }
                this.priceDispose(commodityInfo);
                if (this.commodityInfo.commodityId > -1) {
                    this.changeCommodityInfo(commodityInfo);
                } else {
                    this.createCommodityInfo(commodityInfo);
                }
            },changeCommodityInfo(commodityInfo) {
                this.$vc.http.post('updateCommodity',
                    'update',
                    commodityInfo,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    },
                    (resText, res) => {
                        console.log(resText, '上传商品信息成功返回', res);
                        $('#editCommodityModal').modal('hide');
                        this.$vc.emit('mallMange', 'commodityList', 'refresh', null);
                    },
                    (errText, err) => {
                        console.log(errText, '上传商品信息失败返回', err)
                    })
            },priceDispose(commodityInfo) {
                commodityInfo.currentPrice = commodityInfo.currentPrice*100;
                if (!this.hasOriginalPrice) {
                    commodityInfo.originalPrice = commodityInfo.currentPrice;
                } else {
                    commodityInfo.originalPrice = commodityInfo.originalPrice*100;
                }
            },prefixAddZero(num) {
                return num >= 10 ? num.toString() : '0' + num;
            },createCommodityInfo(commodityInfo) {
                const date = new Date();
                commodityInfo['issuedTime'] = `${date.toLocaleDateString().replace(/\//g, '-')} ${
                    this.prefixAddZero(date.getHours())}:${
                    this.prefixAddZero(date.getMinutes())}:${
                    this.prefixAddZero(date.getSeconds())}`
                this.$vc.http.post('addCommodity',
                    'save',
                    commodityInfo,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    },
                    (resText, res) => {
                        $('#editCommodityModal').modal('hide');
                        this.$vc.emit('mallMange', 'commodityList', 'refresh', null);
                    },
                    (errText, err) => {

                    })
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    