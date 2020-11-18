
        <template>
            <div id="editCompanyOwnerModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">{{titleText()}} </h3>
                <div class="ibox-content">

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">企业名称</label>
                        <div class="col-sm-9">
                            <input type="text"
                                   placeholder="必填，请填写名称" class="form-control"
                                    v-model="editCompanyOwnerInfo.enterpriseName">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">法人代表</label>
                        <div class="col-sm-9">
                            <input type="text"
                                   placeholder="必填，请填写法人" class="form-control"
                                   v-model="editCompanyOwnerInfo.legalPerson">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">营业执照</label>
                        <div class="col-sm-9">
                            <template v-if="editCompanyOwnerInfo.businessLicense != ''">
                                <img :src="editCompanyOwnerInfo.businessLicense" alt=""
                                     @click="uploadEditCompanyPhoto"
                                     style="max-width:300px;max-height:200px;">
                            </template>
                            <template v-else>
                                <button class="btn btn-primary" @click="uploadEditCompanyPhoto">上传照片</button>
                            </template>
                            <input type="file" class="file" accept="images/*" id="uploadEditCompanyOwnerPhoto" hidden @change="chooseEditCompanyBusinessLicense($event)">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">统一社会信用代码</label>
                        <div class="col-sm-9">
                            <input type="text"
                                   v-model="editCompanyOwnerInfo.unifiedSocialCreditCode"
                                   placeholder="必填，请填写社会统一代码" class="form-control">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">楼内具体位置</label>
                        <div class="col-sm-9">
                            <input type="text"
                                   v-model="editCompanyOwnerInfo.companyFloor"
                                   placeholder="必填，楼栋楼层或房间号" class="form-control">
                        </div>
                    </div>
                </div>

                <div class="ibox-content">
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">企业代表</label>
                        <div class="col-sm-9">
                            <input type="text"
                                   v-model="editCompanyOwnerInfo.name"
                                   placeholder="必填，请填写企业代表" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">性别</label>
                        <div class="col-sm-9">
                            <select class="custom-select"
                                v-model="editCompanyOwnerInfo.sex">
                                <option selected disabled value="">必填，请选择性别</option>
                                <option value="0">男</option>
                                <option value="1">女</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">年龄</label>
                        <div class="col-sm-9">
                            <input type="number"
                                   v-model="editCompanyOwnerInfo.age"
                                   placeholder="必填，请填写年龄" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">身份证</label>
                        <div class="col-sm-9">
                            <input type="text"
                                   v-model="editCompanyOwnerInfo.idCard"
                                   placeholder="必填，请填写身份证" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">手机</label>
                        <div class="col-sm-9">
                            <input type="text"
                                   v-model="editCompanyOwnerInfo.link"
                                   placeholder="必填，请填写手机号码" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label">备注</label>
                        <div class="col-sm-9">
                            <input type="text"
                                   v-model="editCompanyOwnerInfo.remark"
                                   placeholder="可填，请填写备注" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="ibox-content">
                    <button class="btn btn-primary float-right" type="button"
                            @click="editCompanyOwnerMethod">
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
        </template>
        <script>
            
        export default {
            props: {"notifyLoadDataComponentName":"true","componentTitle":"true","ownerTypeCd":"true"},
            components: {
                
            },
            data () {
                return {"editCompanyOwnerInfo":"[object Object]"}    
            },
            mounted() {
             (_initMethod() {

        })()(_initEvent() {
            this.$vc.on('companyOwner', 'editCompanyOwner', 'show', this.changeModalStatus)
        })()   
            },
            methods: {
                titleText() {
                if (!this.editCompanyOwnerInfo) {
                    return '';
                }
                let ownerTypeStr = this.editCompanyOwnerInfo.ownerTypeCd == OWNER_TYPE.OWNER ? '业主' : '租客';
                let addOrEditStr = '修改';
                if (this.editCompanyOwnerInfo.ownerTypeCd == OWNER_TYPE.OWNER){
                    if (this.editCompanyOwnerInfo.ownerId == '-1') {
                        addOrEditStr = '添加';
                    }
                } else {
                    if (this.editCompanyOwnerInfo.ownerId == '') {
                        addOrEditStr = '添加';
                    }
                }
                return addOrEditStr + ownerTypeStr;
            },uploadEditCompanyPhoto() {
                $('#uploadEditCompanyOwnerPhoto').trigger('click');
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
            },chooseEditCompanyBusinessLicense(event) {
                var photoFiles = event.target.files;
                if (photoFiles && photoFiles.length > 0) {
                    // 获取目前上传的文件
                    var file = photoFiles[0];// 文件大小校验的动作
                    if (file.size > 1024 * 1024 * 1) {
                        this.$vc.toast("图片大小不能超过 2MB!")
                        return false;
                    }
                    var reader = new FileReader(); //新建FileReader对象
                    reader.readAsDataURL(file); //读取为base64
                    reader.onloadend = async function (e) {
                        this.editCompanyOwnerInfo.businessLicense = await this.uploadPhoto(reader.result).catch(err => {
                            console.error('上传营业执照失败');
                            return '';
                        })
                    }
                }
            },changeModalStatus(owner) {
                $('#editCompanyOwnerModel').modal('show');
                if (owner != null) {
                    for (let key in this.editCompanyOwnerInfo) {
                        this.editCompanyOwnerInfo[key] = owner[key];
                    }
                    this.editCompanyOwnerInfo['companyFloor'] = owner['companyAddress'];
                    return ;
                }
                this.resetCompanyEditOwnerInfo();
            },resetCompanyEditOwnerInfo() {
                this.editCompanyOwnerInfo = {
                    ownerPhoto: '',
                        componentTitle: this.$vc._thiscomponentTitle,
                        name: '',
                        age: '',
                        link: '',
                        sex: '',
                        ownerTypeCd: this.$vc._thisownerTypeCd,
                        remark: '',
                        ownerId: this.$vc._thisownerTypeCd == OWNER_TYPE.OWNER ? '-1' : '',
                        memberId: this.$vc._thisownerTypeCd == OWNER_TYPE.OWNER ? '-1' : '',
                        idCard: '',
                        videoPlaying: false,
                        communityId: '',
                        companyName: '',
                        companyFloor: '',
                        isEnterprise: '1',
                        enterpriseName: '',
                        legalPerson: '',
                        unifiedSocialCreditCode: '',
                        businessLicense: '',
                };
            },createCompanyOwnerInfo() {
                this.$vc.http.post(
                'addOwner',
                'saveOwner',
                JSON.stringify(this.editCompanyOwnerInfo),
                {
                    emulateJSON: true
                },
                function (json, res) {
                    //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                    if (res.status == 200) {
                        //关闭model
                        $('#editCompanyOwnerModel').modal('hide');

                        this.$vc.emit(this.$vc._thisnotifyLoadDataComponentName, 'listCompanyOwnerData', {});

                        return;
                    }
                    this.$vc.message(json);
                },
                function (errInfo, error) {
                    console.log('请求失败处理');
                    this.$vc.message(errInfo);
                });
            },updateCompanyOwnerInfo() {
                this.$vc.http.post(
                    'editOwner',
                    'changeOwner',
                    JSON.stringify(this.editCompanyOwnerInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editCompanyOwnerModel').modal('hide');
                            this.$vc.emit(this.$vc._thisnotifyLoadDataComponentName, 'listCompanyOwnerData', {});
                            return;
                        }
                        this.$vc.message(json);

                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });
            },editCompanyOwnerMethod() {
                this.editCompanyOwnerInfo.communityId = this.$vc.getCurrentCommunity().communityId;
                if (this.editCompanyOwnerInfo.ownerId == '-1' || this.editCompanyOwnerInfo.ownerId == '') {
                    this.createCompanyOwnerInfo();
                } else {
                    this.updateCompanyOwnerInfo();
                }
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    