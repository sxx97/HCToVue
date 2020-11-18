
        <template>
            <div>
    <div class="row">
        <div class="col-lg-12">
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>资产信息</h5>
                    <div class="ibox-tools" style="top:10px;">
                        <button type="button" class="btn btn-primary btn-sm"
                                v-on:click="_openDownloadHcExcelTemplate()">
                            <i class="glyphicon glyphicon-download-alt"></i>
                            模板
                        </button>

                        <button type="button" class="btn btn-primary btn-sm"
                                v-on:click="_exitCommunityData()">
                            <i class="glyphicon glyphicon-floppy-save"></i>
                            资产导出
                        </button>
                    </div>
                </div>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">选择文件</label>
                                <div class="col-sm-10">
                                    <!--<input ref="excelTemplate" type="file" placeholder="必填，请选择数据文件"
                                           class="form-control"
                                           name="excelTemplate"
                                           v-on:change="getExcelTemplate($event)"
                                           accept=".xls,.xlsx"
                                    >-->

                                    <div class="custom-file">
                                        <input id="excelTemplate" ref="excelTemplate" type="file" class="custom-file-input form-control"
                                               name="excelTemplate"
                                               v-on:change="getExcelTemplate($event)"
                                               accept=".xls,.xlsx"
                                        >
                                        <label for="excelTemplate" class="custom-file-label">{{assetImportInfo.excelTemplate==''?'必填，请选择数据文件':assetImportInfo.excelTemplate.name}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">备注</label>
                                <div class="col-sm-10">
                                <textarea v-model="assetImportInfo.remark" type="text" placeholder="请填写备注信息" rows="3"
                                          class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-10"></div>
        <div class="col-md-2 " style="margin-bottom:10px; text-align:right">
            <button type="button" class="btn btn-primary"
                    v-on:click="_importData()">导入
            </button>
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
                return {"assetImportInfo":"[object Object]"}    
            },
            mounted() {
             (function () {

        })()(function () {

        })()   
            },
            methods: {
                assetImportValidate:function () {
                return this.$vc.validate.validate({
                    assetImportInfo: this.assetImportInfo
                }, {

                    'assetImportInfo.excelTemplate': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "文件不能为空"
                        }
                    ],
                    'assetImportInfo.communityId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "还未入驻写字楼，请先入驻写字楼"
                        }
                    ]
                });
            },_openDownloadHcExcelTemplate:function () {
                //下载 模板
                this.$vc.jumpToPage('/import/hc.xlsx')
            },getExcelTemplate:function (e) {
                //console.log("getExcelTemplate 开始调用")
                this.assetImportInfo.excelTemplate = e.target.files[0];
            },_importData:function () {

                if (!this.assetImportValidate()) {
                    return;
                }
                // 导入数据
                if (!this.checkFileType(this.assetImportInfo.excelTemplate.name.split('.')[1])) {
                    this.$vc.message('不是有效的Excel格式');
                    return;
                }
                if (!this.checkFileSize(this.assetImportInfo.excelTemplate.size)) {
                    this.$vc.message('Excel文件大小不能超过2M');
                    return;
                }
                var param = new FormData();
                param.append("uploadFile", this.assetImportInfo.excelTemplate);
                param.append('communityId', this.assetImportInfo.communityId);


                this.$vc.http.upload(
                    'assetImport',
                    'importData',
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
                            //关闭model
                            this.$vc.message("处理成功");
                            this.$vc.jumpToPage('/flow/ownerFlow')
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });
            },_exitCommunityData:function () {
                this.$vc.jumpToPage('/callComponent/assetImport/exitCommunityData?communityId='+this.$vc.getCurrentCommunity().communityId);
                /*var param = {
                    params:{
                        communityId: this.$vc.getCurrentCommunity().communityId
                    }
                };
                this.$vc.http.get(
                    'assetImport',
                    'exitCommunityData',
                    param,
                    {
                        emulateJSON: true,
                        //添加请求头
                        /!*headers: {
                            "Content-Type": "multipart/form-data"
                        }*!/
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            this.$vc.toast("导出成功");
                            return;
                        }
                        this.$vc.message(json);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        this.$vc.message(errInfo);
                    });*/
            },checkFileType:function (fileType) {
                const acceptTypes = ['xls', 'xlsx'];
                for (var i = 0; i < acceptTypes.length; i++) {
                    if (fileType === acceptTypes[i]) {
                        return true;
                    }
                }
                return false;
            },checkFileSize:function (fileSize) {
                //2M
                const MAX_SIZE = 2 * 1024 * 1024;
                if (fileSize > MAX_SIZE) {
                    return false;
                }
                return true;
            },
            },
        }
    
        </script>
        <style>
            
        </style>
    