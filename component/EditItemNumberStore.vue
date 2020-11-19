
        <template>
            <div id="editItemNumberStoreModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <h3 class="m-t-none m-b ">物品出库</h3>
                <div class="ibox-content">
                    <div>
                        <div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">物品名称</label>
                                <div class="col-sm-10">
                                    <input v-model="editResourceStoreInfo.resName" type="text" placeholder="必填，请填写物品名称"
                                           class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">物品编码</label>
                                <div class="col-sm-10">
                                    <input v-model="editResourceStoreInfo.resCode" type="text" placeholder="选填，请填写物品编码，如终端串码"
                                           class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">物品价格</label>
                                <div class="col-sm-10">
                                    <input v-model="editResourceStoreInfo.price" type="text" placeholder="必填，请填写物品价格"
                                           class="form-control" readonly>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">物品库存</label>
                                <div class="col-sm-10">
                                    <input v-model="editResourceStoreInfo.stock" type="text" placeholder="必填，请填写物品库存"
                                           class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">描述</label>
                                <div class="col-sm-10">
                                    <textarea placeholder="选填，请填写描述" class="form-control"
                                              v-model="editResourceStoreInfo.description"></textarea></div>
                            </div>

                            <div class="ibox-content">
                                <button class="btn btn-primary float-right" type="button"
                                        v-on:click="editResourceStoreForStock()"><i class="fa fa-check"></i>&nbsp;保存
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
                    return {"editResourceStoreInfo":{"resId":"","resName":"","resCode":"","price":"","description":"","stock":""}}    
                },
                mounted() {
                ( () => {

        })()
( () => {
            this.$vc.on('editItemNumberStore', 'openEditItemNumberStoreModal',  (_params) => {
                this.refreshEditResourceStoreInfo();
                $('#editItemNumberStoreModel').modal('show');
                this.$vc.copyObject(_params, this.editResourceStoreInfo);
                this.editResourceStoreInfo.stock = _params.stock;
                this.editResourceStoreInfo.communityId = this.$vc.getCurrentCommunity().communityId;
            });
        })()   
                },
                methods: {
                    editResourceStoreValidate:function () {
                return this.$vc.validate.validate({
                    editResourceStoreInfo: this.editResourceStoreInfo
                }, {
                    'editResourceStoreInfo.resName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "物品名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,100",
                            errInfo: "物品名称长度为2至100"
                        },
                    ],
                    'editResourceStoreInfo.resCode': [
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "物品编码不能超过50位"
                        },
                    ],
                    'editResourceStoreInfo.price': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "物品价格不能为空"
                        },
                        {
                            limit: "money",
                            param: "",
                            errInfo: "物品价格格式错误"
                        },
                    ],

                    'editResourceStoreInfo.description': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "描述不能为空"
                        },
                    ],
                    'editResourceStoreInfo.resId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "物品ID不能为空"
                        }]

                });
            },editResourceStoreForStock:function () {
                if (!this.editResourceStoreValidate()) {
                    console.log("开始判断!");

                    this.$vc.toast(this.$vc.validate.errInfo);
                    return;
                }
                console.log("开始向后台发送请求!");
                this.$vc.http.post(
                    'editResourceStore',
                    'update',
                    JSON.stringify(this.editResourceStoreInfo),
                    {
                        emulateJSON: true
                    },
                     (json, res) => {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        console.log("请求结果为：");
                        console.log(res);
                        console.log(json);
                        if (res.status == 200) {
                            //关闭model
                            $('#editItemNumberStoreModel').modal('hide');
                            this.$vc.emit('resourceStoreManage', 'listResourceStore', {});
                            return;
                        }
                        this.$vc.message(json);
                    },
                     (errInfo, error) => {
                        console.log('请求失败处理');

                        this.$vc.message(errInfo);
                    });
            },refreshEditResourceStoreInfo:function () {
                this.editResourceStoreInfo = {
                    resId: '',
                    resName: '',
                    resCode: '',
                    price: '',
                    description: '',
                    stock: ''
                }
            },
                },
            }
    
        </script>
        <style>
            
        </style>
    